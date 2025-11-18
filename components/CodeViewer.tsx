"use client";

import {
  Children,
  useState,
  useEffect,
  useMemo,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";

interface CodeFile {
  name: string;
  filePath: string;
  description?: string;
  order: number;
}

interface CodeViewerProps {
  files: CodeFile[];
  learningObjectives?: string[];
  prerequisites?: string[];
  steps?: string[];
  executionSteps?: string[];
  expectedOutput?: string;
  exampleTitle?: string;
  exampleDescription?: string;
}

type MarkdownCodeProps = ComponentPropsWithoutRef<"code"> & {
  inline?: boolean;
  children?: ReactNode;
};

type MarkdownParagraphProps = ComponentPropsWithoutRef<"p"> & {
  node?: {
    children?: Array<{
      type?: string;
      tagName?: string;
    }>;
  };
  children?: ReactNode;
};

const CONTROL_CHARS_REGEX = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g;
const CONTROL_CHARS_DETECT = /[\u0000-\u0008\u000b\u000c\u000e-\u001f]/;

const stripControlChars = (value: string) =>
  value.replace(CONTROL_CHARS_REGEX, "");

const LANGUAGE_LABELS: Record<string, string> = {
  bash: "Bash",
  sh: "Shell",
  shell: "Shell",
  zsh: "Zsh",
  powershell: "PowerShell",
  ps: "PowerShell",
  cmd: "Command Prompt",
  terminal: "Terminal",
  javascript: "JavaScript",
  typescript: "TypeScript",
  tsx: "TypeScript",
  jsx: "JavaScript",
};

const normalizeLabel = (label: string | undefined) => {
  if (!label) return undefined;
  if (LANGUAGE_LABELS[label]) return LANGUAGE_LABELS[label];
  return label.charAt(0).toUpperCase() + label.slice(1);
};

const normalizeShellKeyword = (keyword: string) => {
  if (!keyword) return undefined;
  const normalized = keyword.toLowerCase();
  if (normalized === "ash") return LANGUAGE_LABELS["bash"];
  return LANGUAGE_LABELS[normalized] ?? normalizeLabel(normalized);
};

const trimBlankEdges = (lines: string[]) => {
  let start = 0;
  let end = lines.length;
  while (start < end && !lines[start]?.trim()) start += 1;
  while (end > start && !lines[end - 1]?.trim()) end -= 1;
  return lines.slice(start, end);
};

const repairLeadingKeyword = (rawLine: string, cleanedLine: string) => {
  if (!cleanedLine) return cleanedLine;
  if (!rawLine) return cleanedLine;
  const hasLeadingControl = CONTROL_CHARS_DETECT.test(rawLine[0] ?? "");
  if (!hasLeadingControl) return cleanedLine;

  if (/^ash(\s|$)/i.test(cleanedLine)) {
    return cleanedLine.replace(/^ash/i, "bash");
  }

  return cleanedLine;
};

const findShellInfo = (
  rawLines: string[],
  cleanedLines: string[],
  className?: string
) => {
  const hasLanguageClass = Boolean(className);
  for (let index = 0; index < cleanedLines.length; index++) {
    const cleaned = cleanedLines[index]?.trim();
    if (!cleaned) continue;

    const rawLine = rawLines[index];
    const hasControlChars = rawLine ? CONTROL_CHARS_DETECT.test(rawLine) : false;
    const normalized = cleaned.toLowerCase();

    if (!hasLanguageClass) {
      const inlineMatch = cleaned.match(
        /^(bash|ash|sh|shell|zsh|powershell|ps|cmd|terminal)\b\s*(.*)$/i
      );
      if (inlineMatch) {
        const label = normalizeShellKeyword(inlineMatch[1]);
        const remainder = inlineMatch[2]?.trim() ?? "";
        return {
          label,
          index,
          remainder: remainder.length > 0 ? remainder : undefined,
        };
      }
    }

    if (LANGUAGE_LABELS[normalized]) {
      return {
        label: LANGUAGE_LABELS[normalized],
        index,
        remainder: undefined,
        removeLine: true,
      };
    }

    if (hasControlChars && normalized === "ash") {
      return {
        label: LANGUAGE_LABELS["bash"],
        index,
        remainder: undefined,
        removeLine: true,
      };
    }

    break;
  }
  return null;
};

const MarkdownCode = ({
  inline,
  className,
  children,
  ...props
}: MarkdownCodeProps) => {
  const [copied, setCopied] = useState(false);
  const rawText = useMemo(
    () =>
      Children.toArray(children)
        .map((child) => (typeof child === "string" ? child : ""))
        .join(""),
    [children]
  );

  const { textForDisplay, textForCopy, shellLabel, languageLabel } = useMemo(() => {
    const normalizedRaw = rawText.replace(/\r/g, "");
    const rawLines = normalizedRaw.split("\n");
    const cleanedLines = rawLines.map((line) =>
      repairLeadingKeyword(line, stripControlChars(line))
    );
    const languageMatch = className?.match(/language-([a-z0-9]+)/i);
    const language = normalizeLabel(languageMatch?.[1]?.toLowerCase());
    const shellInfo = findShellInfo(rawLines, cleanedLines, className);
    let processedLines = [...cleanedLines];

    if (shellInfo) {
      if (shellInfo.remainder !== undefined) {
        processedLines[shellInfo.index] = shellInfo.remainder;
      } else {
        processedLines.splice(shellInfo.index, 1);
      }
    }

    const trimmedLines = trimBlankEdges(
      processedLines.map((line) => line.replace(/\s+$/, ""))
    );

    const processedText = processedLines.join("\n").trimEnd();
    const fallbackText = processedText || stripControlChars(normalizedRaw).trimEnd();
    const finalText = trimmedLines.join("\n") || fallbackText;

    return {
      textForDisplay: finalText,
      textForCopy: finalText,
      shellLabel: shellInfo?.label,
      languageLabel: language,
    };
  }, [className, rawText]);

  const handleCopy = async () => {
    const cleaned = textForCopy?.replace(/\s+$/, "");
    if (!cleaned) return;

    try {
      await navigator.clipboard.writeText(cleaned);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (error) {
      console.error("Failed to copy snippet:", error);
    }
  };

  if (inline) {
    return (
      <code
        className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-cyan-200"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-slate-950/80 shadow-inner shadow-black/20">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-2 text-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-base">
            $
          </span>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            {shellLabel ?? languageLabel ?? "Command ready"}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="rounded-lg bg-slate-800/80 px-4 py-1.5 text-xs font-semibold text-slate-100 hover:bg-slate-700/80"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="bg-slate-950/60 px-5 py-4 text-sm text-slate-100">
        <code {...props} className={className}>
          {textForDisplay}
        </code>
      </pre>
    </div>
  );
};

const markdownComponents: Components = {
  h1: (props) => (
    <h1 className="text-3xl font-semibold text-white mt-0 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold text-white mt-6 mb-3" {...props} />
  ),
  h3: (props) => (
    <h3 className="text-xl font-semibold text-white mt-5 mb-2" {...props} />
  ),
  p: ({ node, children, ...props }: MarkdownParagraphProps) => {
    const hasBlockChild =
      node?.children?.some(
        (child) =>
          child?.type === "element" &&
          child?.tagName &&
          ["pre", "div", "ol", "ul", "table"].includes(child.tagName)
      ) ?? false;

    if (hasBlockChild) {
      return (
        <div className="space-y-4 text-slate-200" {...props}>
          {children}
        </div>
      );
    }

    return (
      <p className="text-base leading-relaxed text-slate-200 mb-4" {...props}>
        {children}
      </p>
    );
  },
  ul: (props) => (
    <ul className="list-disc pl-6 space-y-2 text-slate-100 mb-4" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 space-y-2 text-slate-100 mb-4" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  code: MarkdownCode,
  strong: (props) => (
    <strong className="text-white font-semibold" {...props} />
  ),
  a: (props) => (
    <a
      className="text-cyan-300 underline underline-offset-4 hover:text-cyan-200"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="border-l-4 border-cyan-400/60 pl-4 italic text-slate-300 mb-4"
      {...props}
    />
  ),
};

export default function CodeViewer({
  files,
  learningObjectives,
  prerequisites,
  steps,
  executionSteps,
  expectedOutput,
  exampleTitle,
  exampleDescription,
}: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [previewMarkdown, setPreviewMarkdown] = useState(false);

  const sortedFiles = useMemo(
    () => [...files].sort((a, b) => a.order - b.order),
    [files]
  );

  const generatedGuide = useMemo(() => {
    const sections: string[] = [];
    const heading =
      exampleTitle ||
      files[0]?.name?.replace(/\.[^/.]+$/, "") ||
      "Lesson Guide";

    sections.push(`# ${heading}`);

    if (exampleDescription) {
      sections.push(exampleDescription);
    }

    if (prerequisites && prerequisites.length > 0) {
      sections.push(
        `## Prerequisites\n${prerequisites.map((item) => `- ${item}`).join("\n")}`
      );
    }

    if (learningObjectives && learningObjectives.length > 0) {
      sections.push(
        `## Learning objectives\n${learningObjectives
          .map((item) => `- ${item}`)
          .join("\n")}`
      );
    }

    if (steps && steps.length > 0) {
      sections.push(
        `## Step-by-step instructions\n${steps
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")}`
      );
    }

    if (executionSteps && executionSteps.length > 0) {
      sections.push(
        `## How to execute\n${executionSteps
          .map((item, index) => `${index + 1}. ${item}`)
          .join("\n")}`
      );
    }

    if (expectedOutput) {
      sections.push(`## Expected output\n${expectedOutput}`);
    }

    if (sections.length === 1 && sections[0].trim() === `# ${heading}`) {
      return "";
    }

    return sections.join("\n\n");
  }, [
    exampleTitle,
    exampleDescription,
    prerequisites,
    learningObjectives,
    steps,
    executionSteps,
    expectedOutput,
    files,
  ]);

  // Set first file as selected by default
  useEffect(() => {
    if (files.length > 0) {
      setSelectedFile((prev) => prev ?? files[0]);
    }
  }, [files]);

  // Fetch code when selected file changes
  useEffect(() => {
    if (!selectedFile) return;

    const currentFile = selectedFile; // Capture for TypeScript narrowing
    const fileLooksMarkdown = currentFile.name.toLowerCase().endsWith(".md");

    async function fetchCode() {
      if (!currentFile) return; // Additional check for TypeScript
      try {
        setLoading(true);
        const response = await fetch(
          `/api/code?path=${encodeURIComponent(currentFile.filePath)}`
        );
        const data = await response.json();

        const hasGuide = generatedGuide && generatedGuide.trim().length > 0;

        if (data.isPlaceholder) {
          if (hasGuide) {
            setCode(stripControlChars(generatedGuide));
          } else {
            setCode(stripControlChars(data.content));
          }
          setPreviewMarkdown(true);
          setError(null);
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || data.hint || "Failed to load code");
        }

        setCode(stripControlChars(data.content));
        setPreviewMarkdown(fileLooksMarkdown);
        setError(null);
      } catch (err: unknown) {
        const hasGuide = generatedGuide && generatedGuide.trim().length > 0;
        if (hasGuide) {
          setCode(stripControlChars(generatedGuide));
          setPreviewMarkdown(true);
          setError(null);
        } else {
          const errorMessage =
            err instanceof Error ? err.message : "Failed to load code";
          setPreviewMarkdown(false);
          setError(errorMessage);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCode();
  }, [selectedFile, generatedGuide]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-slate-950/70">
        {sortedFiles.length > 1 && (
          <div className="flex flex-wrap gap-2 border-b border-white/5 p-4">
            {sortedFiles.map((file) => {
              const isActive = selectedFile?.name === file.name;
              return (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? "bg-cyan-400/20 text-cyan-100 border border-cyan-400/60"
                      : "bg-slate-900/40 text-slate-400 border border-transparent hover:text-white"
                  }`}
                >
                  {file.name}
                </button>
              );
            })}
          </div>
        )}

        {selectedFile && (
          <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-mono text-slate-100">{selectedFile.name}</p>
              {selectedFile.description && (
                <p className="text-xs text-slate-400">{selectedFile.description}</p>
              )}
            </div>
            <button
              onClick={handleCopy}
              disabled={loading || !!error}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-400/90 px-4 py-2 text-sm font-semibold text-slate-900 transition-opacity disabled:opacity-40"
            >
              {copied ? (
                <>
                  <span>✓</span> Copied
                </>
              ) : (
                <>
                  <span>📋</span> Copy code
                </>
              )}
            </button>
          </div>
        )}

        <div className="min-h-64">
          {loading && (
            <div className="p-8 text-center text-slate-400">Loading code...</div>
          )}
          {error && (
            <div className="space-y-3 bg-amber-500/10 p-6 text-amber-50">
              <p className="font-semibold text-amber-200">File not available</p>
              <p className="text-sm text-amber-100">{error}</p>
              <p className="text-sm text-amber-100/80">
                Follow the guide below or try another file while this one loads.
              </p>
            </div>
          )}
          {!loading && !error && code && (
            <>
              {previewMarkdown ? (
                <article className="space-y-4 bg-slate-900 px-6 py-6 text-slate-100">
                  <ReactMarkdown components={markdownComponents}>{code}</ReactMarkdown>
                </article>
              ) : (
                <pre className="bg-slate-900 px-6 py-6 font-mono text-base leading-relaxed text-slate-100">
                  <code>{code}</code>
                </pre>
              )}
            </>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-slate-900/60 px-5 py-4 text-sm text-slate-200">
        <strong className="text-white">Tip:</strong> Follow the steps, copy the code, and
        mirror the commands in your terminal. If something fails, compare your files with
        the ones shown here and note the exact error.
      </section>
    </div>
  );
}
