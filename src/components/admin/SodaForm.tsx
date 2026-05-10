import type { DietSoda } from "@/generated/prisma";
import { SODA_FORM_FIELDS } from "@/app/admin/_fields";
import { tagsToCsv } from "@/lib/json-tags";

type Props = {
  action: (formData: FormData) => Promise<void>;
  submitLabel: string;
  defaults?: DietSoda;
};

export function SodaForm({ action, submitLabel, defaults }: Props) {
  const valueFor = (name: string): string | undefined => {
    if (!defaults) return undefined;
    if (name === "tags") return tagsToCsv(defaults.tags);
    if (name === "flavorNoteTags") return tagsToCsv(defaults.flavorNoteTags);
    const v = defaults[name as keyof DietSoda];
    if (v === undefined || v === null) return undefined;
    return String(v);
  };

  return (
    <form action={action} className="space-y-5">
      {SODA_FORM_FIELDS.map((field) => (
        <label key={field.name} className="block space-y-2">
          <span className="text-sm font-medium text-zinc-200">{field.label}</span>
          {field.type === "textarea" ? (
            <textarea
              name={field.name}
              rows={field.rows ?? 3}
              defaultValue={valueFor(field.name)}
              placeholder={"placeholder" in field ? field.placeholder : undefined}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none ring-emerald-400/0 transition focus:ring-2 focus:ring-emerald-400/80"
            />
          ) : (
            <input
              name={field.name}
              type={field.type}
              required={"required" in field ? field.required : false}
              defaultValue={
                valueFor(field.name) ??
                ("defaultValue" in field ? field.defaultValue : undefined)
              }
              placeholder={"placeholder" in field ? field.placeholder : undefined}
              className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-sm text-zinc-100 outline-none ring-emerald-400/0 transition focus:ring-2 focus:ring-emerald-400/80"
            />
          )}
        </label>
      ))}

      <button
        type="submit"
        className="w-full rounded-2xl bg-emerald-500 py-3 text-sm font-semibold text-emerald-950 transition hover:bg-emerald-400"
      >
        {submitLabel}
      </button>
    </form>
  );
}
