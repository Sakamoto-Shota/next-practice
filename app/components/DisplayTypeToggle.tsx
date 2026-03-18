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
    <section className="flex flex-col gap-3">
      <h2 className="text-lg font-medium text-slate-700 dark:text-slate-300">
        表示する画像を選ぶ
      </h2>
      <div className="flex gap-2">
        {displayTypes.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelectDisplayType(option.id)}
            className={`flex-1 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-all duration-200 ${
              displayType === option.id
                ? "border-slate-800 bg-slate-100 text-slate-800 shadow-sm dark:border-slate-400 dark:bg-slate-800/80 dark:text-slate-100"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:bg-slate-800"
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
