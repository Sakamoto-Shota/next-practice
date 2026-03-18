"use client";

import partsData from "../../data/parts.json";

const parts = partsData.categories as { name: string; count: number }[];

type PartsSelectorProps = {
  selectedParts: number[];
  selectedCategoryIndex: number;
  onSelectPart: (categoryIndex: number, partIndex: number) => void;
  onSelectCategory: (categoryIndex: number) => void;
};

export default function PartsSelector({
  selectedParts,
  selectedCategoryIndex,
  onSelectPart,
  onSelectCategory,
}: PartsSelectorProps) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-black dark:text-zinc-50">
        パーツを選ぶ
      </h2>

      {/* SP: 3つのサムネ横並び + ラベル + 選択中のカテゴリのパーツ */}
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex gap-2">
          {parts.map((part, categoryIndex) => (
            <button
              key={part.name}
              onClick={() => onSelectCategory(categoryIndex)}
              className={`flex flex-1 flex-col items-center gap-2 rounded-lg border-2 p-4 transition-colors ${
                selectedCategoryIndex === categoryIndex
                  ? "border-zinc-900 bg-zinc-300 dark:border-zinc-100 dark:bg-zinc-600"
                  : "border-zinc-300 bg-zinc-200 dark:border-zinc-600 dark:bg-zinc-700"
              }`}
            >
              <span className="text-sm text-zinc-500 dark:text-zinc-400">
                サムネ
              </span>
            </button>
          ))}
        </div>
        <div className="flex justify-between px-1 text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {parts.map((part) => (
            <span key={part.name} className="flex-1 text-center">
              {part.name}
            </span>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: parts[selectedCategoryIndex].count }).map(
            (_, partIndex) => (
              <button
                key={partIndex}
                onClick={() => onSelectPart(selectedCategoryIndex, partIndex)}
                className={`h-16 min-w-[4rem] flex-shrink-0 rounded border-2 bg-zinc-200 transition-colors dark:bg-zinc-700 ${
                  selectedParts[selectedCategoryIndex] === partIndex
                    ? "border-zinc-900 dark:border-zinc-100"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}
                aria-label={`オプション ${partIndex + 1}`}
              >
                サムネ
              </button>
            )
          )}
        </div>
      </div>

      {/* PC: 従来の3列レイアウト */}
      <div className="hidden md:flex md:flex-col md:gap-4">
        {parts.map((part, categoryIndex) => (
          <div key={part.name} className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              {part.name}
            </h3>
            <div className="flex gap-2">
              {Array.from({ length: part.count }).map((_, partIndex) => (
                <button
                  key={partIndex}
                  onClick={() => onSelectPart(categoryIndex, partIndex)}
                  className={`h-16 w-16 rounded border-2 bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 ${
                    selectedParts[categoryIndex] === partIndex
                      ? "border-zinc-900 dark:border-zinc-100"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}
                  aria-label={`${part.name} オプション ${partIndex + 1}`}
                >
                  サムネ
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
