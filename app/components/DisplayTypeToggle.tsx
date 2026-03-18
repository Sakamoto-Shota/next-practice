"use client";

import displayTypesData from "../../data/displayTypes.json";

const displayTypes = displayTypesData.options as { id: string; label: string }[];

type DisplayTypeToggleProps = {
  displayType: string;
  onSelectDisplayType: (id: string) => void;
};

export default function DisplayTypeToggle({
  displayType,
  onSelectDisplayType,
}: DisplayTypeToggleProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-black dark:text-zinc-50">
        表示する画像を選ぶ
      </h2>
      <div className="flex gap-2">
        {displayTypes.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectDisplayType(option.id)}
            className={`rounded border-2 px-4 py-2 text-sm font-medium transition-colors ${
              displayType === option.id
                ? "border-zinc-900 bg-zinc-100 hover:bg-zinc-200 dark:border-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                : "border-zinc-300 bg-white hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            }`}
            aria-pressed={displayType === option.id}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}
