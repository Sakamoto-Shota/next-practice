/** public/images/parts の命名（ring-0.png, mount-1.png, gem-2.png など） */
const PREFIXES = ["ring", "mount", "gem"] as const;

export type PartCategoryIndex = 0 | 1 | 2;

/** ブラウザ用 URL（先頭 /） */
export function partImageUrl(categoryIndex: number, partIndex: number): string {
  const key = PREFIXES[categoryIndex as PartCategoryIndex];
  if (key === undefined) return "";
  return `/images/parts/${key}-${partIndex}.png`;
}
