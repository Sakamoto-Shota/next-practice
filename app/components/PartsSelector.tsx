"use client";

import partsData from "../../data/parts.json";
import { partImageUrl } from "@/lib/partImages";

const parts = partsData.categories as { name: string; count: number }[];

type PartsSelectorProps = {
  selectedParts: number[];
  selectedCategoryIndex: number;
  onSelectPart: (categoryIndex: number, partIndex: number) => void;
  onSelectCategory: (categoryIndex: number) => void;
  disabled?: boolean; 
};

export default function PartsSelector({
  selectedParts,
  selectedCategoryIndex,
  onSelectPart,
  onSelectCategory,
  disabled = false, 
}: PartsSelectorProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
        パーツを選ぶ
      </h2>

      {/* SP */}
      <div className="flex flex-col gap-4 md:hidden">
        <div className="flex gap-3">
          {parts.map((part, categoryIndex) => (
            <button
              key={part.name}
              onClick={() => onSelectCategory(categoryIndex)}
              disabled={disabled}
              className={`flex flex-1 flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${
                selectedCategoryIndex === categoryIndex
                  ? "border-slate-800 bg-slate-100 shadow-md dark:border-slate-400 dark:bg-slate-800/80"
                  : "border-slate-200 bg-slate-50/80 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
              }`}
            >
              <img
                src={partImageUrl(categoryIndex, selectedParts[categoryIndex])}
                alt=""
                className="h-10 w-10 object-contain"
              />
              <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                {part.name}
              </span>
            </button>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Array.from({ length: parts[selectedCategoryIndex].count }).map(
            (_, partIndex) => (
              <button
                key={partIndex}
                onClick={() => onSelectPart(selectedCategoryIndex, partIndex)}
                disabled={disabled}
                className={`flex h-20 min-w-20 shrink-0 items-center justify-center rounded-xl border-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${
                  selectedParts[selectedCategoryIndex] === partIndex
                    ? "border-slate-800 bg-slate-100 shadow-md dark:border-slate-400 dark:bg-slate-800/80"
                    : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                }`}
                aria-label={`オプション ${partIndex + 1}`}
              >
                <img
                  src={partImageUrl(selectedCategoryIndex, partIndex)}
                  alt=""
                  className="h-14 w-14 object-contain"
                />
              </button>
            )
          )}
        </div>
      </div>

      {/* PC */}
      <div className="hidden md:flex md:flex-col md:gap-5">
        {parts.map((part, categoryIndex) => (
          <div key={part.name} className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {part.name}
            </h3>
            <div className="flex flex-wrap gap-3">
              {Array.from({ length: part.count }).map((_, partIndex) => (
                <button
                  key={partIndex}
                  onClick={() => onSelectPart(categoryIndex, partIndex)}
                  disabled={disabled}
                  className={`flex h-20 w-20 items-center justify-center rounded-xl border-2 transition-all duration-200 hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none ${
                    selectedParts[categoryIndex] === partIndex
                      ? "border-slate-800 bg-slate-100 shadow-md dark:border-slate-400 dark:bg-slate-800/80"
                      : "border-slate-200 bg-white hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800/50 dark:hover:border-slate-600"
                  }`}
                  aria-label={`${part.name} オプション ${partIndex + 1}`}
                >
                  <img
                    src={partImageUrl(categoryIndex, partIndex)}
                    alt=""
                    className="h-16 w-16 object-contain"
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
