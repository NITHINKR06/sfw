import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategory } from "@/lib/data";
import type { Topic, CodeExample } from "@/lib/data";
import PracticePlayground from "@/components/PracticePlayground";

interface PageProps {
  params: Promise<{ categoryId: string }>;
  searchParams?: Promise<{ practiceTopic?: string }>;
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { categoryId } = await params;
  const { practiceTopic } = (await searchParams) ?? {};
  const category = getCategory(categoryId);

  if (!category) {
    notFound();
  }

  const sortedTopics = [...category.topics].sort(
    (a: Topic, b: Topic) => a.order - b.order
  );

  const totalExamples = sortedTopics.reduce(
    (acc, topic) => acc + topic.examples.length,
    0
  );

  const totalSteps = sortedTopics.reduce((acc, topic) => {
    return (
      acc +
      topic.examples.reduce(
        (exampleSum, example) => exampleSum + (example.steps?.length ?? 0),
        0
      )
    );
  }, 0);

  const totalObjectives = sortedTopics.reduce((acc, topic) => {
    return (
      acc +
      topic.examples.reduce(
        (exampleSum, example) =>
          exampleSum + (example.learningObjectives?.length ?? 0),
        0
      )
    );
  }, 0);

  const commandRegex =
    /^(npm|npx|yarn|pnpm|git|node|tsc|code|pip|python|docker|brew|sudo|apt|choco|winget|curl|tar|zip|unzip|mkdir|cd)/i;

  const extractInstallationCommands = (topic: Topic): string[] => {
    const commands = new Set<string>();
    topic.examples.forEach((example) => {
      [...(example.steps ?? []), ...(example.executionSteps ?? [])].forEach(
        (step) => {
          const trimmed = step.trim();
          if (commandRegex.test(trimmed)) {
            commands.add(trimmed);
          }
        }
      );
    });
    return Array.from(commands);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="relative border-b border-white/10 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_55%)]" />
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-14 space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-base font-semibold text-cyan-200 hover:text-white transition"
          >
            ← Back to Home
          </Link>
          <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-400/80">
                Guided Program
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className="text-4xl drop-shadow">{category.icon}</span>
                <div>
                  <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-white">
                    {category.title}
                  </h1>
                  <p className="mt-2 text-lg text-slate-200 max-w-3xl">
                    {category.description}
                  </p>
                </div>
              </div>
            </div>
            <div className="inline-flex min-w-[280px] items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-6 py-5 text-base text-slate-200 backdrop-blur">
              <span className="text-4xl font-semibold text-cyan-300">
                {sortedTopics.length}
              </span>
              <div>
                <p className="font-semibold text-white text-lg">Topics in this path</p>
                <p className="text-slate-400 text-sm">
                  Follow them in order for mastery
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="#practice-lab"
              className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/50 bg-cyan-400/10 px-4 py-2 text-base font-semibold text-cyan-100 hover:text-white hover:border-cyan-300 transition"
            >
              Open Practice Lab
            </a>
            <a
              href="#detailed-roadmap"
              className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-base font-semibold text-slate-200 hover:text-white transition"
            >
              Jump to roadmap
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-16 space-y-16">
        {(category.prerequisites?.length ?? 0) > 0 && (
          <section className="rounded-3xl border border-white/10 bg-amber-500/10 p-8 shadow-lg shadow-amber-500/10 space-y-2">
            <h2 className="text-2xl font-semibold text-amber-200 flex items-center gap-2">
              <span>📋</span> Complete these first
            </h2>
            <p className="text-base text-amber-100/80">
              These prerequisites ensure the rest of the guide makes sense.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {category.prerequisites?.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-amber-50/90"
                >
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="grid gap-6 md:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Coverage
            </p>
            <h3 className="mt-3 text-4xl font-semibold text-white">
              {totalExamples}
            </h3>
            <p className="text-base text-slate-300">
              Guided steps and checkpoints you will finish.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Instructions
            </p>
            <h3 className="mt-3 text-4xl font-semibold text-white">
              {totalSteps}
            </h3>
            <p className="text-base text-slate-300">
              Detailed actions so you never wonder what to do next.
            </p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur">
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
              Objectives
            </p>
            <h3 className="mt-3 text-4xl font-semibold text-white">
              {totalObjectives}
            </h3>
            <p className="text-base text-slate-300">
              Learning goals you can tick off while progressing.
            </p>
          </article>
        </section>

        <section id="detailed-roadmap" className="space-y-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Detailed Roadmap
            </p>
            <h2 className="text-4xl font-semibold text-white">
              Follow this process topic by topic
            </h2>
            <p className="text-base text-slate-300 max-w-3xl">
              Each block below explains what to learn, how to practice, commands
              to run, and how to verify your progress. Open an example to see the
              full resources and files.
            </p>
          </div>

          {sortedTopics.map((topic) => {
            const commands = extractInstallationCommands(topic);
            const sortedExamples = [...topic.examples].sort(
              (a: CodeExample, b: CodeExample) => a.order - b.order
            );

            return (
              <article
                key={topic.id}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-950 to-slate-950 p-8 shadow-xl shadow-black/40 space-y-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <div>
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-slate-400">
                      <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-cyan-200">
                        Topic
                      </span>
                      <span>
                        {sortedExamples.length} guided step
                        {sortedExamples.length === 1 ? "" : "s"}
                      </span>
                    </div>
                    <h3 className="mt-3 text-3xl font-semibold text-white">
                      {topic.title}
                    </h3>
                    {topic.description && (
                      <p className="mt-2 text-base text-slate-300 max-w-3xl">
                        {topic.description}
                      </p>
                    )}
                  </div>
                  {topic.prerequisites && topic.prerequisites.length > 0 && (
                    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-4 text-base text-amber-100 max-w-sm">
                      <p className="font-semibold text-amber-200">Before you start</p>
                      <ul className="mt-2 space-y-1">
                        {topic.prerequisites.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                  <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/70 via-slate-950 to-slate-950 p-6">
                    <div className="flex flex-col gap-2">
                      <h4 className="text-2xl font-semibold text-white">
                        Process overview
                      </h4>
                      <p className="text-base text-slate-400">
                        Each card shows the exact actions for that step—read it, follow the
                        mini checklist, then open the lesson or launch the lab.
                      </p>
                    </div>
                    <ol className="mt-6 space-y-5">
                      {sortedExamples.map((example, index) => (
                        <li
                          key={example.id}
                          className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-inner shadow-black/30"
                        >
                          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:gap-6">
                            <div className="flex items-start gap-3 lg:w-2/3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/20 text-lg font-semibold text-cyan-200">
                                {index + 1}
                              </div>
                              <div className="space-y-2">
                                <div className="flex flex-wrap items-center gap-3">
                                  <p className="text-xl font-semibold text-white">
                                    {example.title}
                                  </p>
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                                    {example.learningObjectives?.length ?? 0} objectives
                                  </span>
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-300">
                                    {example.steps?.length ?? 0} steps
                                  </span>
                                </div>
                                {example.description && (
                                  <p className="text-base text-slate-300">
                                    {example.description}
                                  </p>
                                )}
                                {(example.steps?.length ?? 0) > 0 && (
                                  <div className="rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 mb-3">
                                      First actions
                                    </p>
                                    <ul className="text-sm text-slate-200 space-y-1">
                                      {example.steps?.slice(0, 3).map((step) => (
                                        <li key={step} className="flex gap-2">
                                          <span className="text-cyan-300">•</span>
                                          <span>{step}</span>
                                        </li>
                                      ))}
                                      {(example.steps?.length ?? 0) > 3 && (
                                        <li className="text-slate-500">
                                          +{(example.steps?.length ?? 0) - 3} more detailed steps inside the lesson
                                        </li>
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex-1 space-y-4">
                              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                                <p className="font-semibold text-slate-100 mb-1 text-base">
                                  What to prepare
                                </p>
                                <p>
                                  Make sure prerequisites are checked off and keep the Practice Lab ready for quick validation.
                                </p>
                              </div>
                              <div className="flex flex-wrap gap-3">
                                <Link
                                  href={`/category/${categoryId}/topic/${topic.id}/example/${example.id}`}
                                  className="inline-flex items-center gap-2 rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-100 hover:text-white"
                                >
                                  Open full instructions →
                                </Link>
                                <Link
                                  href={`/category/${categoryId}?practiceTopic=${topic.id}#practice-lab`}
                                  className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-slate-200 hover:text-white"
                                >
                                  Practice this topic
                                </Link>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 min-w-0">
                      <h4 className="text-base font-semibold text-slate-200 uppercase tracking-wide">
                        Installation & commands
                      </h4>
                      {commands.length > 0 ? (
                        <ul className="mt-3 space-y-2 text-sm text-slate-300">
                          {commands.map((command) => (
                            <li
                              key={command}
                              className="rounded-xl border border-white/5 bg-black/40 px-3 py-2 font-mono text-xs text-cyan-200 flex items-center justify-between gap-2"
                            >
                              <span className="truncate">{command}</span>
                              <span className="text-[10px] uppercase tracking-wide text-slate-400">
                                Copy & run
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="mt-3 text-sm text-slate-400">
                          No terminal commands required. Follow the visual steps.
                        </p>
                      )}
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-5 space-y-3">
                      <h4 className="text-base font-semibold text-slate-200 uppercase tracking-wide">
                        Verify completion
                      </h4>
                      <ul className="text-sm text-slate-300 space-y-2">
                        <li>• Screenshot your output or copy logs into notes.</li>
                        <li>
                          • Compare against the &quot;Expected Output&quot; inside each lesson.
                        </li>
                        <li>• If something fails, re-run commands from this panel.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <PracticePlayground
          topics={sortedTopics.map((topic) => ({
            id: topic.id,
            title: topic.title,
          }))}
          initialTopicId={practiceTopic ?? sortedTopics[0]?.id}
          categoryTitle={category.title}
        />

        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 space-y-6">
          <h2 className="text-3xl font-semibold text-white">
            Stuck? Here is how to self-debug
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 space-y-3">
              <h3 className="text-xl font-semibold text-cyan-200">Reproduce</h3>
              <p className="text-base text-slate-300">
                Re-run the failing step, capture the exact command and error
                message. Most fixes become obvious when you isolate the line.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 space-y-3">
              <h3 className="text-xl font-semibold text-cyan-200">Compare</h3>
              <p className="text-base text-slate-300">
                Match your code against the provided files. Small typos in import
                paths or casing are the #1 cause of runtime errors.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/40 p-6 space-y-3">
              <h3 className="text-xl font-semibold text-cyan-200">Validate</h3>
              <p className="text-base text-slate-300">
                Use the practice lab console to ensure values look right. Once it
                works there, rerun locally with the same commands.
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

