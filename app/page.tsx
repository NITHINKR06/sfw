import Link from "next/link";
import { categories } from "@/lib/data";
import type { Topic } from "@/lib/data";

export default function Home() {
  const sortedCategories = [...categories].sort((a, b) => a.order - b.order);
  const totalTopics = sortedCategories.reduce(
    (sum, category) => sum + category.topics.length,
    0
  );
  const totalSteps = sortedCategories.reduce((sum, category) => {
    return (
      sum +
      category.topics.reduce(
        (topicSum, topic: Topic) => topicSum + topic.examples.length,
        0
      )
    );
  }, 0);

  return (
    <div className="min-h-screen text-slate-100">
      <header className="border-b border-white/5 bg-gradient-to-b from-slate-900/80 via-slate-950 to-slate-950">
        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_55%)]" />
          <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
            <div className="space-y-5 max-w-3xl">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                Code Learning Hub
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-tight text-white">
                A full-stack roadmap with hands-on practice built in.
              </h1>
              <p className="text-lg text-slate-200">
                Every category contains prerequisites, detailed steps, runnable code,
                and a practice playground on the same page. Follow it from zero setup
                to production deployment without hunting for missing context.
              </p>
              <div className="flex flex-wrap gap-3 text-sm font-semibold uppercase tracking-wide text-slate-200">
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  Guided steps
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  Commands included
                </span>
                <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">
                  Practice lab on-page
                </span>
              </div>
            </div>
            <div className="grid w-full max-w-xl grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
              <article className="flex flex-col rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Tracks
                </p>
                <p className="mt-2 text-5xl font-semibold text-white">{sortedCategories.length}</p>
                <p className="text-base text-slate-300">Complete learning journeys</p>
              </article>
              <article className="flex flex-col rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Topics
                </p>
                <p className="mt-2 text-5xl font-semibold text-white">{totalTopics}</p>
                <p className="text-base text-slate-300">Milestones with checkpoints</p>
              </article>
              <article className="flex flex-col rounded-3xl border border-white/10 bg-white/5 px-6 py-6 backdrop-blur">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">
                  Steps
                </p>
                <p className="mt-2 text-5xl font-semibold text-white">{totalSteps}</p>
                <p className="text-base text-slate-300">Actionable lessons</p>
              </article>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-20 space-y-16">
        <section className="space-y-6">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">
              Choose a path
            </p>
            <h2 className="text-4xl font-semibold text-white">
              Pick the category that matches your next goal
            </h2>
            <p className="text-base text-slate-300 max-w-3xl">
              Each card lists prerequisites, total guided steps, and the skills you
              will master. Click through to view the full roadmap plus an embedded
              code runner for instant practice.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {sortedCategories.map((category) => {
              const totalExamples = category.topics.reduce(
                (sum: number, topic: Topic) => sum + topic.examples.length,
                0
              );

              return (
                <Link
                  key={category.id}
                  href={`/category/${category.id}`}
                  className="group relative flex min-h-[320px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/60 via-slate-950 to-slate-950 p-8 shadow-xl shadow-black/30 transition-transform hover:-translate-y-1 hover:shadow-cyan-500/20"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_55%)]" />
                  <div className="relative flex items-center gap-4 mb-6">
                    <span className="text-4xl drop-shadow">{category.icon}</span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {category.title}
                      </h3>
                      <p className="text-sm uppercase tracking-[0.3em] text-cyan-200">
                        {category.topics.length} topic
                        {category.topics.length === 1 ? "" : "s"}
                      </p>
                    </div>
                  </div>
                  <p className="text-base text-slate-300 mb-4 min-h-[84px]">
                    {category.description}
                  </p>

                  {category.prerequisites && category.prerequisites.length > 0 && (
                    <div className="mb-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
                      <p className="font-semibold text-slate-200 mb-1">
                        Key prerequisites
                      </p>
                      <p className="line-clamp-2">
                        {category.prerequisites.slice(0, 3).join(", ")}
                        {category.prerequisites.length > 3 ? "…" : ""}
                      </p>
                    </div>
                  )}

                  <div className="relative mt-auto flex items-center justify-between text-sm text-slate-300">
                    <span>
                      {category.topics.length} topic
                      {category.topics.length === 1 ? "" : "s"} • {totalExamples} step
                      {totalExamples === 1 ? "" : "s"}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-cyan-400/20 px-3 py-1 text-cyan-100 font-semibold">
                      Start learning →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 space-y-8">
          <h2 className="text-3xl font-semibold text-white">
            Built for frictionless learning
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 space-y-3">
              <p className="text-base font-semibold text-cyan-200">Actionable steps</p>
              <p className="text-base text-slate-300">
                Every lesson includes objectives, prerequisites, commands, and expected
                output so you never guess what to do next.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 space-y-3">
              <p className="text-base font-semibold text-cyan-200">
                Embedded code runner
              </p>
              <p className="text-base text-slate-300">
                Practice HTML, CSS, JavaScript, and TypeScript right on the page. Logs
                and errors show up instantly with friendly hints.
              </p>
            </article>
            <article className="rounded-2xl border border-white/10 bg-slate-950/60 p-6 space-y-3">
              <p className="text-base font-semibold text-cyan-200">Progress-aware</p>
              <p className="text-base text-slate-300">
                Topic pages show process overviews, verify-your-work checklists, and
                commands to re-run whenever something fails.
              </p>
            </article>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 py-10 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} Code Learning Hub. Keep building confidently.
        </div>
      </footer>
    </div>
  );
}
