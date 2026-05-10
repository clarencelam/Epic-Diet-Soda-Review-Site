export type FieldDef =
  | {
      name: string;
      label: string;
      type: "text" | "url" | "number";
      required?: boolean;
      placeholder?: string;
      defaultValue?: string;
    }
  | {
      name: string;
      label: string;
      type: "textarea";
      rows?: number;
      placeholder?: string;
    };

export const SODA_FORM_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", type: "text", required: true, placeholder: "Diet Dew Voltage Zero" },
  { name: "slug", label: "Slug (optional)", type: "text", placeholder: "auto from title if empty" },
  {
    name: "imageUrl",
    label: "Image URL",
    type: "url",
    required: true,
    placeholder: "https://…",
  },
  {
    name: "ratingStars",
    label: "Rating (1–5)",
    type: "number",
    placeholder: "3",
    defaultValue: "3",
  },
  { name: "reviewCategory", label: "Style / category", type: "text" },
  { name: "brand", label: "Brand", type: "text" },
  { name: "sweetenerSystem", label: "Sweetener system", type: "text" },
  { name: "carbonation", label: "Carbonation", type: "text" },
  { name: "appearance", label: "Appearance", type: "text" },
  { name: "aroma", label: "Aroma", type: "text" },
  { name: "primaryFlavor", label: "Primary flavor", type: "text" },
  { name: "finishAftertaste", label: "Finish / aftertaste", type: "text" },
  {
    name: "finalTake",
    label: "Final take",
    type: "textarea",
    rows: 4,
    placeholder: "Closing verdict…",
  },
  {
    name: "tags",
    label: "Tags (comma-separated)",
    type: "text",
    placeholder: "limited, citrus, grocery",
  },
  {
    name: "flavorNoteTags",
    label: "Flavor note tags (comma-separated)",
    type: "text",
    placeholder: "lime, stevia, metallic",
  },
];
