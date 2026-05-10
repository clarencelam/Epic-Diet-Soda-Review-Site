import Link from "next/link";
import { notFound } from "next/navigation";
import { updateDietSoda } from "@/app/actions/soda";
import { SodaForm } from "@/components/admin/SodaForm";
import { prisma } from "@/lib/prisma";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditPage(props: Props) {
  const { id } = await props.params;
  const soda = await prisma.dietSoda.findUnique({ where: { id } });

  if (!soda) notFound();

  const save = updateDietSoda.bind(null, soda.id);

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-2xl">
        <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">CMS · Edit</p>
        <h1 className="mt-2 text-3xl font-semibold">Edit diet soda</h1>
        <p className="mt-1 font-mono text-xs text-zinc-500">{soda.id}</p>

        <div className="mt-10">
          <SodaForm action={save} submitLabel="Save changes" defaults={soda} />
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
