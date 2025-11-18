import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory, getExample } from "@/lib/data";
import type { Topic, CodeExample } from "@/lib/data";
import CodeViewer from "@/components/CodeViewer";
import StepNavigator from "@/components/StepNavigator";

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
      <header className="border-b border-white/10 bg-linear-to-b from-slate-900/80 via-slate-950 to-slate-950">
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
                  className="h-full rounded-full bg-linear-to-r from-cyan-400 to-blue-500 transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14">
        <div className="grid gap-8 lg:grid-cols-[320px,1fr] items-start">
          <aside className="rounded-3xl border border-white/10 bg-slate-950 p-6 h-fit shadow-xl shadow-black/40">
            <StepNavigator
              allExamples={allExamples}
              currentExampleId={example.id}
              categoryId={categoryId}
              topicId={topicId}
              topicTitle={topic?.title}
              prevExample={prevExample}
              nextExample={nextExample}
            />
          </aside>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-2xl shadow-black/30 min-w-0 relative z-10">
            <CodeViewer
              files={example.files}
              learningObjectives={example.learningObjectives}
              prerequisites={example.prerequisites}
              steps={example.steps}
              executionSteps={example.executionSteps}
              expectedOutput={example.expectedOutput}
              exampleTitle={example.title}
              exampleDescription={example.description}
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
              className="inline-flex items-center gap-3 rounded-2xl bg-linear-to-r from-cyan-400 to-blue-500 px-5 py-3 text-base font-semibold text-slate-900 shadow-lg hover:shadow-cyan-500/40 transition-shadow"
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
