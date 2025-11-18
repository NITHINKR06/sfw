import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getExample } from "@/lib/data";
import type { Topic, CodeExample } from "@/lib/data";
import CodeViewer from "@/components/CodeViewer";

interface PageProps {
  params: Promise<{
    categoryId: string;
    topicId: string;
    exampleId: string;
  }>;
}

export default async function ExamplePage({ params }: PageProps) {
  const { categoryId, topicId, exampleId } = await params;
  const category = getCategory(categoryId);
  const example = getExample(categoryId, topicId, exampleId);

  if (!category || !example) {
    notFound();
  }

  const topic = category.topics.find((t: Topic) => t.id === topicId);

  const allExamples =
    topic?.examples.sort((a: CodeExample, b: CodeExample) => a.order - b.order) ||
    [];
  const currentIndex = allExamples.findIndex((ex: CodeExample) => ex.id === exampleId);
  const prevExample = currentIndex > 0 ? allExamples[currentIndex - 1] : null;
  const nextExample =
    currentIndex < allExamples.length - 1 ? allExamples[currentIndex + 1] : null;

  const progressPercent =
    allExamples.length > 0 ? (example.order / allExamples.length) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-12 space-y-6">
          <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-[0.4em] text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>•</span>
            <Link href={`/category/${categoryId}`} className="hover:text-white">
              {category.title}
            </Link>
            <span>•</span>
            <span className="text-cyan-200">{topic?.title}</span>
          </div>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="text-4xl drop-shadow">{category.icon}</span>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
                    Guided step {example.order} / {allExamples.length}
                  </p>
                  <h1 className="text-3xl sm:text-4xl font-semibold text-white">
                    {example.title}
                  </h1>
                </div>
              </div>
              {example.description && (
                <p className="text-base text-slate-300 max-w-3xl">{example.description}</p>
              )}
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 min-w-[280px]">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Progress
              </p>
              <p className="mt-2 text-4xl font-semibold text-white">
                {Math.round(progressPercent)}%
              </p>
              <div className="mt-3 h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14">
        <div className="grid gap-8 lg:grid-cols-[320px,1fr] items-start">
          <aside className="rounded-3xl border border-white/10 bg-slate-950 p-6 space-y-6 h-fit sticky top-6 shadow-xl shadow-black/40">
            <div className="space-y-2">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                Step Navigator
              </p>
              <h2 className="text-lg font-semibold text-white">
                Jump to any lesson in this topic
              </h2>
              <p className="text-base text-slate-400">
                Click a step to open it. Use the buttons below when you simply want
                to march forward or back—no guesswork needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 mt-2">
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
            <ol className="space-y-3">
              {allExamples.map((ex) => (
                <li key={ex.id}>
                  <Link
                    href={`/category/${categoryId}/topic/${topicId}/example/${ex.id}`}
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition-colors ${
                      ex.id === example.id
                        ? "border-cyan-400/50 bg-cyan-400/10 text-white"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    }`}
                    aria-current={ex.id === example.id}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 text-xs font-semibold text-cyan-200">
                      {ex.order}
                    </span>
                    <div>
                      <p className="font-semibold leading-tight">{ex.title}</p>
                      {ex.description && (
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {ex.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300 space-y-2">
              <p className="font-semibold text-slate-200">Navigation tips</p>
              <ul className="space-y-1 list-disc list-inside">
                <li>Open steps directly from the list for quick review.</li>
                <li>Use Previous/Next when progressing in order.</li>
                <li>Need to practice? Use the topic page&apos;s lab shortcut.</li>
              </ul>
            </div>
          </aside>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/30 min-w-0 relative z-10">
            <CodeViewer
              files={example.files}
              learningObjectives={example.learningObjectives}
              prerequisites={example.prerequisites}
              steps={example.steps}
              executionSteps={example.executionSteps}
              expectedOutput={example.expectedOutput}
            />
          </div>
        </div>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {prevExample ? (
            <Link
              href={`/category/${categoryId}/topic/${topicId}/example/${prevExample.id}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-base font-semibold text-slate-200 hover:text-white hover:border-cyan-400/40 transition-colors"
            >
              ← Prev: {prevExample.title}
            </Link>
          ) : (
            <span className="text-slate-500">You&apos;re at the first step.</span>
          )}

          {nextExample ? (
            <Link
              href={`/category/${categoryId}/topic/${topicId}/example/${nextExample.id}`}
              className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-3 text-base font-semibold text-slate-900 shadow-lg hover:shadow-cyan-500/40 transition-shadow"
            >
              Next: {nextExample.title} →
            </Link>
          ) : (
            <span className="text-cyan-200 font-semibold">
              ✅ Topic complete! Return to the overview for more practice.
            </span>
          )}
        </div>
      </footer>
    </div>
  );
}
