import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteSodaButton } from "@/components/admin/DeleteSodaButton";
import { renderStars } from "@/lib/stars";

export const dynamic = "force-dynamic";

export default async function AdminIndexPage() {
  const sodas = await prisma.dietSoda.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-12 text-zinc-50">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-400/90">CMS</p>
            <h1 className="mt-2 text-3xl font-semibold">Diet sodas</h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Create, read, update, and delete entries stored in the database. Add authentication before exposing publicly.
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/new"
              className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-emerald-950 hover:bg-emerald-400"
            >
              New soda
            </Link>
            <Link
              href="/"
              className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-zinc-200 hover:border-emerald-400/50"
            >
              View canvas
            </Link>
          </div>
        </div>

        {sodas.length === 0 ? (
          <p className="mt-16 rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 py-16 text-center text-zinc-400">
            No sodas yet.{" "}
            <Link href="/admin/new" className="font-medium text-emerald-400 hover:text-emerald-300">
              Create one
            </Link>
            .
          </p>
        ) : (
          <div className="mt-10 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-black/30 text-xs uppercase tracking-wide text-zinc-500">
                  <th className="px-4 py-3 font-medium">Image</th>
                  <th className="px-4 py-3 font-medium">Title</th>
                  <th className="px-4 py-3 font-medium">Brand</th>
                  <th className="px-4 py-3 font-medium">Rating</th>
                  <th className="px-4 py-3 font-medium">Updated</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {sodas.map((soda) => (
                  <tr key={soda.id} className="border-b border-white/5 hover:bg-white/[0.03]">
                    <td className="px-4 py-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={soda.imageUrl}
                        alt=""
                        className="h-14 w-11 rounded-md object-cover ring-1 ring-white/10"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-zinc-100">{soda.title}</td>
                    <td className="px-4 py-3 text-zinc-400">{soda.brand || "—"}</td>
                    <td className="px-4 py-3 text-amber-300/90" title={`${soda.ratingStars}/5`}>
                      {renderStars(soda.ratingStars)}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">
                      {soda.updatedAt.toLocaleString(undefined, {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/${soda.id}/edit`}
                          className="rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-zinc-200 hover:border-emerald-400/50 hover:text-white"
                        >
                          Edit
                        </Link>
                        <DeleteSodaButton id={soda.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
