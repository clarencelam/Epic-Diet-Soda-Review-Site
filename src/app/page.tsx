import Link from "next/link";
import { SodaInfiniteCanvas } from "@/components/SodaInfiniteCanvas";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const sodas = await prisma.dietSoda.findMany({ orderBy: { createdAt: "desc" } });

  if (sodas.length === 0) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center text-stone-800"
        style={{ backgroundColor: "#f6f0e6" }}
      >
        <p className="text-lg">No diet sodas yet.</p>
        <p className="max-w-md text-sm text-stone-600">
          Seed the database with{" "}
          <code className="rounded bg-black/5 px-2 py-1 text-xs">npx prisma db seed</code> or add one via the admin page.
        </p>
        <Link
          href="/admin"
          className="rounded-full border border-stone-300 bg-white px-5 py-2 text-sm font-semibold text-stone-800 shadow-sm hover:bg-stone-50"
        >
          Open admin
        </Link>
      </div>
    );
  }

  return <SodaInfiniteCanvas sodas={sodas} />;
}
