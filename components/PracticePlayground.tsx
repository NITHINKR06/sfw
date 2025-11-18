"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Language = "html" | "css" | "js" | "ts";

const editorTabs: { id: Language; label: string; accent: string }[] = [
  { id: "html", label: "HTML", accent: "border-orange-500 text-orange-500" },
  { id: "css", label: "CSS", accent: "border-blue-500 text-blue-500" },
  { id: "js", label: "JavaScript", accent: "border-yellow-400 text-yellow-500" },
  { id: "ts", label: "TypeScript", accent: "border-sky-500 text-sky-500" },
];

const defaultSnippets: Record<Language, string> = {
  html: `<!-- You can update the markup freely -->
<main class="h-screen w-full flex flex-col items-center justify-center gap-6 bg-slate-900 text-white">
  <h1 class="text-4xl font-bold tracking-tight">Hello learner 👋</h1>
  <p>Start editing HTML/CSS/JS/TS and run it instantly.</p>
  <button class="cta">Run the code!</button>
</main>`,
  css: `:root {
  font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

body {
  margin: 0;
  background: linear-gradient(135deg, #0f172a, #1e293b);
}

.cta {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  background: #22d3ee;
  color: #0f172a;
  font-weight: 700;
  border: none;
  cursor: pointer;
}`,
  js: `const button = document.querySelector(".cta");

if (button) {
  button.addEventListener("click", () => {
    console.log("🚀 Code executed successfully!");
    alert("Great job! Keep experimenting.");
  });
}`,
  ts: `type Mood = "motivated" | "curious" | "confident";

const learnerMood: Mood = "motivated";

const encourage = (mood: Mood): string => {
  return mood === "motivated"
    ? "Amazing energy! Keep building."
    : mood === "curious"
      ? "Curiosity builds expertise."
      : "You're on track—trust the process.";
};

console.log(encourage(learnerMood));`,
};

interface PracticePlaygroundProps {
  topics?: { id: string; title: string }[];
  initialTopicId?: string | null;
  categoryTitle?: string;
}

export default function PracticePlayground({
  topics,
  initialTopicId,
  categoryTitle,
}: PracticePlaygroundProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [currentTab, setCurrentTab] = useState<Language>("html");
  const [code, setCode] = useState<Record<Language, string>>(defaultSnippets);
  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const [runtimeError, setRuntimeError] = useState<string | null>(null);
  const [typescript, setTypescript] =
    useState<typeof import("typescript") | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(
    initialTopicId ?? topics?.[0]?.id ?? null
  );

  useEffect(() => {
    if (initialTopicId && initialTopicId !== selectedTopicId) {
      setSelectedTopicId(initialTopicId);
    } else if (!selectedTopicId && topics && topics.length > 0) {
      setSelectedTopicId(topics[0].id);
    }
  }, [initialTopicId, topics, selectedTopicId]);

  // Load the TypeScript transpiler lazily on the client
  useEffect(() => {
    let mounted = true;
    import("typescript")
      .then((ts) => {
        if (mounted) setTypescript(ts);
      })
      .catch((err) => {
        console.error("Unable to load TypeScript runtime", err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // Listen for console logs and errors from the sandbox iframe
  useEffect(() => {
    const listener = (event: MessageEvent) => {
      if (event.data?.source !== "practice-playground") return;
      if (event.data.type === "log") {
        setConsoleLogs((prev) => [...prev, event.data.message]);
      }
      if (event.data.type === "error") {
        setRuntimeError(event.data.message);
      }
    };

    window.addEventListener("message", listener);
    return () => window.removeEventListener("message", listener);
  }, []);

  const showTsWarning = useMemo(() => {
    return !typescript && Boolean(code.ts.trim());
  }, [code.ts, typescript]);

  const updateCode = (value: string) => {
    setCode((prev) => ({ ...prev, [currentTab]: value }));
  };

  const resetEditors = () => {
    setCode(defaultSnippets);
    setConsoleLogs([]);
    setRuntimeError(null);
  };

  const runCode = useCallback(async () => {
    if (!iframeRef.current) return;
    setIsRunning(true);
    setConsoleLogs([]);
    setRuntimeError(null);

    let compiledTs = "";
    if (code.ts.trim()) {
      if (!typescript) {
        setRuntimeError(
          "TypeScript runtime is still loading. Please wait a second and try again."
        );
        setIsRunning(false);
        return;
      }
      try {
        compiledTs = typescript.transpileModule(code.ts, {
          compilerOptions: {
            module: typescript.ModuleKind.ESNext,
            target: typescript.ScriptTarget.ES2017,
            jsx: typescript.JsxEmit.ReactJSX,
          },
        }).outputText;
      } catch (err) {
        setRuntimeError(
          err instanceof Error ? err.message : "Failed to transpile TypeScript."
        );
        setIsRunning(false);
        return;
      }
    }

    const combinedJs = `${code.js}\n${compiledTs}`.trim();

    const sandboxDocument = iframeRef.current.contentDocument;
    if (!sandboxDocument) return;

    const payload = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Practice Playground</title>
    <style>${code.css}</style>
  </head>
  <body>
    ${code.html}
    <script>
      const sendMessage = (message) => {
        parent.postMessage({ source: "practice-playground", ...message }, "*");
      };

      const originalLog = console.log;
      console.log = (...args) => {
        sendMessage({ type: "log", message: args.map(String).join(" ") });
        originalLog.apply(console, args);
      };

      window.onerror = (message, source, lineno, colno) => {
        sendMessage({
          type: "error",
          message: message + " (line " + lineno + ", col " + colno + ")"
        });
      };
    </script>
    <script>
      try {
        ${combinedJs}
      } catch (err) {
        parent.postMessage({
          source: "practice-playground",
          type: "error",
          message: err?.message || String(err)
        }, "*");
      }
    </script>
  </body>
</html>`;

    sandboxDocument.open();
    sandboxDocument.write(payload);
    sandboxDocument.close();
    setIsRunning(false);
  }, [code, typescript]);

  const currentTopic = topics?.find((topic) => topic.id === selectedTopicId);

  const recommendations = [
    `Write the smallest UI related to "${currentTopic?.title ?? "your idea"}" first.`,
    "Layer CSS after HTML, then connect logic with JS/TS.",
    "Use console.log frequently so you always know what the browser sees.",
  ];

  const troubleshootingTips = [
    "Reference errors? Make sure the element exists before you use it.",
    "Type errors? Confirm the TS type matches the actual value.",
    "Silent screen? Check the browser console panel for runtime hints.",
  ];

  return (
    <section
      id="practice-lab"
      className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 text-slate-100"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">
            Practice Lab
          </p>
          <h2 className="text-3xl font-semibold mt-1">
            Run HTML, CSS, JavaScript, or TypeScript instantly
          </h2>
          <p className="text-sm text-slate-300 mt-2 max-w-3xl">
            Use the in-browser sandbox to validate the steps you just read.
            Every run shows live output, console logs, and friendly guidance if
            something breaks.
          </p>
          {topics && topics.length > 0 && (
            <p className="text-xs text-slate-400 mt-2">
              Currently focused on:{" "}
              <span className="text-cyan-200 font-semibold">
                {currentTopic?.title ?? "General practice"}
              </span>{" "}
              {categoryTitle ? `in ${categoryTitle}` : ""}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={runCode}
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-400/20 px-4 py-2 font-semibold text-cyan-200 hover:bg-cyan-400/30 transition-colors disabled:opacity-50"
            disabled={isRunning}
          >
            {isRunning ? "Running..." : "▶ Run code"}
          </button>
          <button
            onClick={resetEditors}
            className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 font-semibold text-slate-200 hover:bg-white/20 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {topics && topics.length > 0 && (
        <div className="mt-6 flex flex-col gap-3">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            Focus by topic
          </p>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                  selectedTopicId === topic.id
                    ? "border-cyan-400/60 bg-cyan-400/20 text-cyan-100"
                    : "border-white/10 text-slate-300 hover:border-cyan-400/40 hover:text-white"
                }`}
              >
                {topic.title}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="bg-slate-950/60 rounded-2xl border border-white/5">
          <div className="flex overflow-x-auto border-b border-white/5">
            {editorTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCurrentTab(tab.id)}
                className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                  currentTab === tab.id
                    ? `${tab.accent} bg-white/5`
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <textarea
            value={code[currentTab]}
            onChange={(event) => updateCode(event.target.value)}
            spellCheck={false}
            className="w-full h-72 bg-transparent p-4 font-mono text-sm resize-none text-slate-100 focus:outline-none"
            placeholder={`Write your ${currentTab.toUpperCase()} snippet here...`}
          />

          {showTsWarning && (
            <div className="mx-4 mb-4 rounded-lg border border-amber-500/40 bg-amber-500/10 p-3 text-sm text-amber-200">
              Loading TypeScript transpiler... you can still edit your code, and
              we will run it once the compiler is ready.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="h-72 rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden">
            <iframe
              ref={iframeRef}
              title="Practice output"
              className="w-full h-full bg-white"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide">
              Console & Feedback
            </h3>
            <div className="mt-3 space-y-2 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto">
              {consoleLogs.length === 0 && !runtimeError && (
                <p className="text-slate-500">
                  Console output will appear here. Use <code>console.log()</code>{" "}
                  generously!
                </p>
              )}
              {consoleLogs.map((log, index) => (
                <p key={`log-${index}`} className="text-emerald-300">
                  {log}
                </p>
              ))}
              {runtimeError && (
                <p className="text-rose-400 font-semibold">{runtimeError}</p>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-white/5 bg-slate-950/40 p-4">
            <h3 className="text-sm font-semibold text-slate-200 uppercase tracking-wide mb-2">
              How to debug quickly
            </h3>
            <ul className="text-sm text-slate-300 space-y-1">
              {recommendations.map((tip) => (
                <li key={tip}>• {tip}</li>
              ))}
            </ul>
            <div className="mt-3 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-100">
              <p className="font-semibold uppercase tracking-wide mb-1">
                Common fixes when errors appear
              </p>
              <ul className="space-y-1">
                {troubleshootingTips.map((tip) => (
                  <li key={tip}>• {tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


