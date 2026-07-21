"use client";

import { useEffect } from "react";
import type { DietSoda } from "@/data/sodas";
import { renderStars } from "@/lib/stars";

function jsonToStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map(String);
}

type Props = {
  soda: DietSoda | null;
  onClose: () => void;
};

const REVIEW_ROWS: { key: keyof DietSoda; label: string }[] = [
  { key: "reviewCategory", label: "Style / category" },
  { key: "brand", label: "Brand" },
  { key: "sweetenerSystem", label: "Sweetener system" },
  { key: "carbonation", label: "Carbonation" },
  { key: "appearance", label: "Appearance" },
  { key: "aroma", label: "Aroma" },
  { key: "primaryFlavor", label: "Primary flavor" },
  { key: "finishAftertaste", label: "Finish / aftertaste" },
];

export function SodaModal({ soda, onClose }: Props) {
  useEffect(() => {
    if (!soda) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [soda, onClose]);

  if (!soda) return null;

  const tags = jsonToStrings(soda.tags as unknown);
  const flavorTags = jsonToStrings(soda.flavorNoteTags as unknown);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/40 p-4 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="soda-modal-title"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl border border-stone-200 bg-[#faf8f5] text-stone-900 shadow-2xl">
        <div className="relative aspect-[4/5] w-full bg-stone-100">
          {/* eslint-disable-next-line @next/next/no-img-element -- dynamic CMS URLs */}
          <img src={soda.imageUrl} alt="" className="h-full w-full object-cover" />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-medium text-stone-800 shadow hover:bg-white"
          >
            Close
          </button>
        </div>

        <div className="space-y-5 p-6">
          <div>
            <h2 id="soda-modal-title" className="text-2xl font-semibold tracking-tight">
              {soda.title}
            </h2>
            <p className="mt-1 text-sm text-stone-500">Overall rating</p>
            <p className="text-lg text-amber-600" aria-label={`${soda.ratingStars} out of 5 stars`}>
              {renderStars(soda.ratingStars)}
            </p>
          </div>

          <dl className="space-y-3 text-sm">
            {REVIEW_ROWS.map(({ key, label }) => (
              <div key={key} className="grid gap-1 border-b border-stone-200/80 pb-3">
                <dt className="text-xs uppercase tracking-wide text-stone-500">{label}</dt>
                <dd className="text-stone-800">{String(soda[key] ?? "") || "—"}</dd>
              </div>
            ))}
          </dl>

          <div>
            <p className="text-xs uppercase tracking-wide text-stone-500">Final take</p>
            <p className="mt-1 text-base leading-relaxed text-stone-800">
              {soda.finalTake || "—"}
            </p>
          </div>

          {tags.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Tags</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-stone-200/80 px-3 py-1 text-xs font-medium text-stone-800"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {flavorTags.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Flavor notes</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {flavorTags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-emerald-600/25 bg-emerald-600/10 px-3 py-1 text-xs font-medium text-emerald-900"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
