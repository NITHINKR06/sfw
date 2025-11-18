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
      {/* Prerequisites Section */}
      {prerequisites && prerequisites.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2 flex items-center gap-2">
            <span>📋</span> Prerequisites
          </h3>
          <ul className="list-disc list-inside text-yellow-700 space-y-1">
            {prerequisites.map((prereq, index) => (
              <li key={index}>{prereq}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Learning Objectives */}
      {learningObjectives && learningObjectives.length > 0 && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <span>🎯</span> Learning Objectives
          </h3>
          <ul className="list-disc list-inside text-blue-700 space-y-1">
            {learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Step-by-Step Instructions */}
      {steps && steps.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
          <h3 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
            <span>📝</span> Step-by-Step Instructions
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-green-700">
            {steps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Code Files Section */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
        {/* File Tabs (if multiple files) */}
        {files.length > 1 && (
          <div className="bg-gray-100 border-b border-gray-200 flex overflow-x-auto">
            {files
              .sort((a, b) => a.order - b.order)
              .map((file) => (
                <button
                  key={file.name}
                  onClick={() => setSelectedFile(file)}
                  className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    selectedFile?.name === file.name
                      ? "border-blue-600 text-blue-600 bg-white"
                      : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                  }`}
                >
                  {file.name}
                </button>
              ))}
          </div>
        )}

        {/* File Info */}
        {selectedFile && (
          <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-mono text-gray-700">
                  {selectedFile.name}
                </div>
                {selectedFile.description && (
                  <div className="text-xs text-gray-600 mt-1">
                    {selectedFile.description}
                  </div>
                )}
              </div>
              <button
                onClick={handleCopy}
                disabled={loading || !!error}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <span>✓</span> Copied!
                  </>
                ) : (
                  <>
                    <span>📋</span> Copy Code
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Code Display */}
        <div className="relative">
          {loading && (
            <div className="p-8 text-center text-gray-600">Loading code...</div>
          )}
          {error && (
            <div className="p-8 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-yellow-800 mb-2">
                <strong>⚠️ File Not Available</strong>
              </div>
              <div className="text-sm text-yellow-700 mb-4">
                {error}
              </div>
              <div className="text-sm text-yellow-600">
                <p><strong>Don't worry!</strong> You can still complete this lesson using the instructions below:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Check the <strong>Step-by-Step Instructions</strong> section above</li>
                  <li>Follow the <strong>Execution Steps</strong> for guidance</li>
                  <li>Review the <strong>Expected Output</strong> to verify your results</li>
                </ul>
              </div>
            </div>
          )}
          {!loading && !error && code && (
            <pre className="p-6 overflow-x-auto bg-gray-900 text-gray-100 font-mono text-sm">
              <code>{code}</code>
            </pre>
          )}
        </div>
      </div>

      {/* Execution Steps */}
      {executionSteps && executionSteps.length > 0 && (
        <div className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded">
          <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
            <span>⚙️</span> How to Execute
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-purple-700">
            {executionSteps.map((step, index) => (
              <li key={index} className="pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Expected Output */}
      {expectedOutput && (
        <div className="bg-indigo-50 border-l-4 border-indigo-400 p-4 rounded">
          <h3 className="font-semibold text-indigo-800 mb-2 flex items-center gap-2">
            <span>✨</span> Expected Output
          </h3>
          <p className="text-indigo-700">{expectedOutput}</p>
        </div>
      )}

      {/* Tip Section */}
      <div className="bg-blue-50 border-t border-blue-200 px-6 py-4 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Tip:</strong> Follow the steps in order, copy the code, and
          execute as instructed. Make sure you've completed all prerequisites
          before starting.
        </p>
      </div>
    </div>
  );
}
