"use client";

import {
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

const codeComponent = ({ inline, className, children, ...props }: MarkdownCodeProps) =>
  inline ? (
    <code
      className="rounded-md bg-slate-800 px-1.5 py-0.5 font-mono text-sm text-cyan-200"
      {...props}
    >
      {children}
    </code>
  ) : (
    <pre className="bg-slate-900 border border-white/5 rounded-xl p-4 overflow-auto text-sm text-slate-100">
      <code {...props} className={className}>
        {children}
      </code>
    </pre>
  );

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
  p: (props) => (
    <p className="text-base leading-relaxed text-slate-200 mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 space-y-2 text-slate-100 mb-4" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal pl-6 space-y-2 text-slate-100 mb-4" {...props} />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  code: codeComponent,
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
            setCode(generatedGuide);
          } else {
            setCode(data.content);
          }
          setPreviewMarkdown(true);
          setError(null);
          return;
        }

        if (!response.ok) {
          throw new Error(data.error || data.hint || "Failed to load code");
        }

        setCode(data.content);
        setPreviewMarkdown(fileLooksMarkdown);
        setError(null);
      } catch (err: unknown) {
        const hasGuide = generatedGuide && generatedGuide.trim().length > 0;
        if (hasGuide) {
          setCode(generatedGuide);
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
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-slate-950/80 overflow-hidden">
        {files.length > 1 && (
          <div className="flex overflow-x-auto border-b border-white/10 bg-slate-900/40">
            {files
              .sort((a, b) => a.order - b.order)
              .map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`px-5 py-3 text-base font-semibold whitespace-nowrap border-b-2 transition-colors ${
                    selectedFile?.name === file.name
                      ? "border-cyan-400 text-cyan-200"
                      : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {file.name}
                </button>
              ))}
          </div>
        )}

        {selectedFile && (
          <div className="border-b border-white/5 bg-slate-900/30 px-5 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="text-sm font-mono text-slate-200">
                  {selectedFile.name}
                </p>
                {selectedFile.description && (
                  <p className="text-xs text-slate-400 mt-1">
                    {selectedFile.description}
                  </p>
                )}
              </div>
              <button
                onClick={handleCopy}
                disabled={loading || !!error}
                className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-opacity disabled:opacity-40"
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
          </div>
        )}

        <div className="relative">
          {loading && (
            <div className="p-8 text-center text-slate-400">Loading code...</div>
          )}
          {error && (
            <div className="p-8 space-y-3 bg-amber-500/10 text-amber-50">
              <p className="font-semibold text-amber-200 flex items-center gap-2">
                <span>⚠️</span> File not available
              </p>
              <p className="text-sm text-amber-100">{error}</p>
              <div className="text-sm text-amber-100/80 space-y-1">
                <p className="font-semibold text-amber-200">
                  Continue anyway:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Follow the instructions and execution steps below.</li>
                  <li>Check expected output to confirm your solution.</li>
                  <li>Use the playground to test snippets in the meantime.</li>
                </ul>
              </div>
            </div>
          )}
          {!loading && !error && code && (
            <>
              {previewMarkdown ? (
                <article className="px-6 py-6 bg-slate-900 text-slate-100 space-y-4">
                  <ReactMarkdown components={markdownComponents}>{code}</ReactMarkdown>
                </article>
              ) : (
                <pre className="p-6 overflow-x-auto bg-slate-900 text-slate-100 font-mono text-base leading-relaxed">
                  <code>{code}</code>
                </pre>
              )}
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-4 text-base text-slate-200">
        <p>
          <strong>💡 Tip:</strong> Work through steps sequentially, copy code, and
          confirm the same commands in your terminal. When errors pop up, capture the
          exact message and compare your files against the provided ones.
        </p>
      </div>
    </div>
  );
}
