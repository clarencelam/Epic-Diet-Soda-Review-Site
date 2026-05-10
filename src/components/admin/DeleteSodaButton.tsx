"use client";

import { deleteDietSoda } from "@/app/actions/soda";

type Props = {
  id: string;
};

export function DeleteSodaButton({ id }: Props) {
  return (
    <form
      action={deleteDietSoda.bind(null, id)}
      onSubmit={(e) => {
        if (!confirm("Delete this diet soda permanently?")) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="rounded-lg border border-red-500/40 bg-red-950/40 px-3 py-1.5 text-xs font-medium text-red-200 hover:bg-red-950/70"
      >
        Delete
      </button>
    </form>
  );
}
