import Link from "next/link";

export default function AdminIndexPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">Static catalog</p>
        <h1 className="mt-2 text-3xl font-semibold">Editing is disabled</h1>
        <p className="mt-4 text-sm leading-6 text-zinc-400">
          This version has no database. To update the catalog, edit <code>src/data/sodas.ts</code> and redeploy.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-emerald-400/50"
        >
          View canvas
        </Link>
      </div>
    </div>
  );
}
