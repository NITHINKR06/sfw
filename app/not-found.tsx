import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <p className="text-sm uppercase tracking-[0.5em] text-cyan-300">
          Lost signal
        </p>
        <h1 className="text-6xl font-semibold text-white">404</h1>
        <p className="text-lg text-slate-300">
          The page you requested doesn&apos;t exist. Pick another track and keep building.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:shadow-cyan-500/40 transition-shadow"
        >
          ← Back to the roadmap
        </Link>
      </div>
    </div>
  );
}

