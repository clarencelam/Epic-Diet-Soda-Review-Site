import Link from "next/link";
import { createDietSoda } from "@/app/actions/soda";
import { SodaForm } from "@/components/admin/SodaForm";

export default function AdminNewPage() {
  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">CMS · Create</p>
        <h1 className="mt-2 text-3xl font-semibold">New diet soda</h1>

        <div className="mt-10">
          <SodaForm action={createDietSoda} submitLabel="Create soda" />
        </div>

        <p className="mt-8 text-center text-sm text-zinc-500">
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300">
            ← Back to list
          </Link>
        </p>
      </div>
    </div>
  );
}
