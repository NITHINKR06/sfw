"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { CodeExample } from "@/lib/data";

interface StepNavigatorProps {
  allExamples: CodeExample[];
  currentExampleId: string;
  categoryId: string;
  topicId: string;
  topicTitle?: string;
  prevExample: CodeExample | null;
  nextExample: CodeExample | null;
}

export default function StepNavigator({
  allExamples,
  currentExampleId,
  categoryId,
  topicId,
  topicTitle,
  prevExample,
  nextExample,
}: StepNavigatorProps) {
  const currentStepRef = useRef<HTMLLIElement>(null);
  const containerRef = useRef<HTMLOListElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [fetchedTitles, setFetchedTitles] = useState<Record<string, string>>({});
  const hasManySteps = allExamples.length > 5;

  // Check if title matches generic pattern
  const isGenericTitle = (title: string): boolean => {
    const genericPattern = /^Step \d+:\s*(.+?)\s+Example \d+$/i;
    return genericPattern.test(title);
  };

  // Extract HTML title from file content
  const extractHtmlTitle = (htmlContent: string): string | null => {
    const titleMatch = htmlContent.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch && titleMatch[1]) {
      return titleMatch[1].trim();
    }
    // Try h1 tag as fallback
    const h1Match = htmlContent.match(/<h1[^>]*>([^<]+)<\/h1>/i);
    if (h1Match && h1Match[1]) {
      return h1Match[1].trim();
    }
    return null;
  };

  // Fetch HTML titles for examples with generic titles
  useEffect(() => {
    const fetchTitles = async () => {
      const titlesToFetch = allExamples.filter((ex) => {
        if (!isGenericTitle(ex.title)) return false;
        if (fetchedTitles[ex.id]) return false;
        const htmlFile = ex.files.find(
          (f) => f.name.toLowerCase().endsWith('.html') || f.filePath.toLowerCase().endsWith('.html')
        );
        return !!htmlFile;
      });

      if (titlesToFetch.length === 0) return;

      const fetchPromises = titlesToFetch.map(async (ex) => {
        const htmlFile = ex.files.find(
          (f) => f.name.toLowerCase().endsWith('.html') || f.filePath.toLowerCase().endsWith('.html')
        );
        if (!htmlFile) return null;

        try {
          const response = await fetch(`/api/code?path=${encodeURIComponent(htmlFile.filePath)}`);
          const data = await response.json();
          
          if (data.content && response.ok) {
            const extractedTitle = extractHtmlTitle(data.content);
            return extractedTitle ? { id: ex.id, title: extractedTitle } : null;
          }
        } catch (error) {
          console.error(`Failed to fetch title for ${ex.id}:`, error);
        }
        return null;
      });

      const results = await Promise.all(fetchPromises);
      const newTitles: Record<string, string> = {};
      
      results.forEach((result) => {
        if (result) {
          newTitles[result.id] = result.title;
        }
      });

      if (Object.keys(newTitles).length > 0) {
        setFetchedTitles((prev) => {
          // Only update if there are new titles to avoid unnecessary re-renders
          const hasNewTitles = Object.keys(newTitles).some(
            (id) => prev[id] !== newTitles[id]
          );
          return hasNewTitles ? { ...prev, ...newTitles } : prev;
        });
      }
    };

    fetchTitles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExamples]);

  // Helper function to extract meaningful title from generic patterns
  const getDisplayTitle = (example: CodeExample): string => {
    // If we have a fetched title for this example, use it
    if (fetchedTitles[example.id]) {
      return fetchedTitles[example.id];
    }

    const genericPattern = /^Step \d+:\s*(.+?)\s+Example \d+$/i;
    const match = example.title.match(genericPattern);
    
    if (match) {
      // If it matches generic pattern, try to use description or extract meaningful part
      if (example.description && example.description.trim()) {
        // Use description if it's more descriptive than generic text
        const desc = example.description.trim();
        if (!desc.toLowerCase().includes("learn") && !desc.toLowerCase().includes("concepts with example")) {
          return desc;
        }
      }
      // Extract the category name from the pattern (e.g., "HTML" from "Step 1: HTML Example 1")
      return match[1];
    }
    
    // Remove "Step X:" prefix if it exists but doesn't match full pattern
    const stepPrefixPattern = /^Step \d+:\s*(.+)$/i;
    const stepMatch = example.title.match(stepPrefixPattern);
    if (stepMatch) {
      return stepMatch[1];
    }
    
    // Return title as is if no generic pattern found
    return example.title;
  };

  // Auto-scroll to current step when component mounts or current step changes
  useEffect(() => {
    if (currentStepRef.current && containerRef.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        const container = containerRef.current;
        const stepElement = currentStepRef.current;
        if (!container || !stepElement) return;

        const containerRect = container.getBoundingClientRect();
        const stepRect = stepElement.getBoundingClientRect();
        const scrollTop = container.scrollTop;
        const stepOffset = stepRect.top - containerRect.top + scrollTop;
        const containerHeight = container.clientHeight;
        const stepHeight = stepElement.offsetHeight;

        // Center the current step in the viewport
        container.scrollTo({
          top: stepOffset - containerHeight / 2 + stepHeight / 2,
          behavior: "smooth",
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentExampleId]);

  const scrollToCurrent = () => {
    if (currentStepRef.current && containerRef.current) {
      const container = containerRef.current;
      const stepElement = currentStepRef.current;

      const containerRect = container.getBoundingClientRect();
      const stepRect = stepElement.getBoundingClientRect();
      const scrollTop = container.scrollTop;
      const stepOffset = stepRect.top - containerRect.top + scrollTop;
      const containerHeight = container.clientHeight;
      const stepHeight = stepElement.offsetHeight;

      container.scrollTo({
        top: stepOffset - containerHeight / 2 + stepHeight / 2,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="space-y-6">
      {topicTitle && (
        <div className="pb-2 border-b border-white/10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 mb-1">
            Topic
          </p>
          <p className="text-sm font-semibold text-cyan-200 truncate" title={topicTitle}>
            {topicTitle}
          </p>
        </div>
      )}
      <div className="flex flex-wrap gap-3">
        {prevExample && (
          <Link
            href={`/category/${categoryId}/topic/${topicId}/example/${prevExample.id}`}
            className="flex-1 min-w-[140px] rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:text-white transition-colors"
          >
            ← Previous step
          </Link>
        )}
        {nextExample && (
          <Link
            href={`/category/${categoryId}/topic/${topicId}/example/${nextExample.id}`}
            className="flex-1 min-w-[140px] rounded-2xl border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:text-white transition-colors"
          >
            Next step →
          </Link>
        )}
      </div>

      {hasManySteps && (
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {allExamples.length} Steps
          </p>
          <button
            onClick={scrollToCurrent}
            className="text-xs text-cyan-300 hover:text-cyan-200 transition-colors underline underline-offset-2"
          >
            Jump to current
          </button>
        </div>
      )}

      <div
        className={`relative ${
          hasManySteps
            ? isExpanded
              ? "max-h-[600px]"
              : "max-h-[400px]"
            : ""
        } overflow-y-auto overflow-x-hidden`}
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "#475569 #0f172a",
        }}
      >
        <ol ref={containerRef} className="space-y-2 pr-2">
          {allExamples.map((ex) => {
            const isCurrent = ex.id === currentExampleId;
            const distanceFromCurrent = Math.abs(
              allExamples.findIndex((e) => e.id === currentExampleId) -
                allExamples.findIndex((e) => e.id === ex.id)
            );
            const isNearCurrent = distanceFromCurrent <= 2;

            return (
              <li
                key={ex.id}
                ref={isCurrent ? currentStepRef : null}
                className={isCurrent ? "scroll-mt-4" : ""}
              >
                <Link
                  href={`/category/${categoryId}/topic/${topicId}/example/${ex.id}`}
                  className={`flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all ${
                    isCurrent
                      ? "border-cyan-400/60 bg-cyan-400/15 text-white shadow-lg shadow-cyan-400/20"
                      : isNearCurrent || !hasManySteps
                      ? "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                      : "border-white/5 bg-white/[0.02] text-slate-400 hover:border-white/10 hover:bg-white/5 hover:text-slate-300"
                  }`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                      isCurrent
                        ? "bg-cyan-400/20 text-cyan-200"
                        : "bg-slate-900/60 text-slate-400"
                    }`}
                  >
                    {ex.order}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-semibold leading-tight truncate ${
                        isCurrent ? "text-white" : "text-slate-300"
                      }`}
                      title={getDisplayTitle(ex)}
                    >
                      {getDisplayTitle(ex)}
                    </p>
                    {ex.description && (isNearCurrent || !hasManySteps || isCurrent) && (
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {ex.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>

      {hasManySteps && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
        >
          {isExpanded ? "↑ Show less" : "↓ Show more"}
        </button>
      )}

      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 space-y-2">
        <p className="font-semibold text-slate-200">Navigation tips</p>
        <ul className="space-y-1 list-disc list-inside">
          <li>Open steps directly from the list for quick review.</li>
          <li>Use Previous/Next when progressing in order.</li>
          <li>Need to practice? Use the topic page&apos;s lab shortcut.</li>
        </ul>
      </div>
    </div>
  );
}

