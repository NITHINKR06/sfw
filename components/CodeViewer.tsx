"use client";

import { useState, useEffect } from "react";

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
}

export default function CodeViewer({
  files,
  learningObjectives,
  prerequisites,
  steps,
  executionSteps,
  expectedOutput,
}: CodeViewerProps) {
  const [selectedFile, setSelectedFile] = useState<CodeFile | null>(null);
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Set first file as selected by default
  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files, selectedFile]);

  // Fetch code when selected file changes
  useEffect(() => {
    if (!selectedFile) return;

    const currentFile = selectedFile; // Capture for TypeScript narrowing
    async function fetchCode() {
      if (!currentFile) return; // Additional check for TypeScript
      try {
        setLoading(true);
        const response = await fetch(
          `/api/code?path=${encodeURIComponent(currentFile.filePath)}`
        );
        const data = await response.json();

        if (!response.ok) {
          // If we get placeholder content (for deployment guides), show it
          if (data.isPlaceholder && data.content) {
            setCode(data.content);
            setError(null);
            return;
          }
          throw new Error(data.error || data.hint || "Failed to load code");
        }

        setCode(data.content);
        setError(null);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load code";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchCode();
  }, [selectedFile]);

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
      {prerequisites && prerequisites.length > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-amber-50 space-y-2">
          <h3 className="font-semibold text-amber-200 flex items-center gap-2 text-lg">
            <span>📋</span> Prerequisites
          </h3>
          <ul className="list-disc list-inside space-y-1 text-base">
            {prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}

      {learningObjectives && learningObjectives.length > 0 && (
        <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-5 text-cyan-50 space-y-2">
          <h3 className="font-semibold text-cyan-200 flex items-center gap-2 text-lg">
            <span>🎯</span> Learning Objectives
          </h3>
          <ul className="list-disc list-inside space-y-1 text-base">
            {learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {steps && steps.length > 0 && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5 text-emerald-50 space-y-3">
          <h3 className="font-semibold text-emerald-200 flex items-center gap-2 text-lg">
            <span>📝</span> Step-by-Step Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-base">
            {steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

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
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2 text-sm font-semibold text-slate-900 shadow-lg transition-opacity disabled:opacity-40"
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
            <pre className="p-6 overflow-x-auto bg-slate-900 text-slate-100 font-mono text-base leading-relaxed">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>

      {executionSteps && executionSteps.length > 0 && (
        <div className="rounded-2xl border border-purple-400/30 bg-purple-500/10 p-5 text-purple-50 space-y-3">
          <h3 className="font-semibold text-purple-100 flex items-center gap-2 text-lg">
            <span>⚙️</span> How to Execute
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-base">
            {executionSteps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {expectedOutput && (
        <div className="rounded-2xl border border-indigo-400/30 bg-indigo-500/10 p-5 text-indigo-50 space-y-2">
          <h3 className="font-semibold text-indigo-100 flex items-center gap-2 text-lg">
            <span>✨</span> Expected Output
          </h3>
          <p className="text-base">{expectedOutput}</p>
        </div>
      )}

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
