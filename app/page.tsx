"use client";

import { useState } from "react";
import Header from "./components/Header";
import PartsSelector from "./components/PartsSelector";
import DisplayTypeToggle from "./components/DisplayTypeToggle";
import GenerateButton from "./components/GenerateButton";
import ResultPreview from "./components/ResultPreview";

export default function Home() {
  const [selectedParts, setSelectedParts] = useState<number[]>([0, 0, 0]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayType, setDisplayType] = useState("ring-only");

  const handleSelectPart = (categoryIndex: number, partIndex: number) => {
    setSelectedParts((prev) => {
      const next = [...prev];
      next[categoryIndex] = partIndex;
      return next;
    });
  };

  const handleSelectCategory = (categoryIndex: number) => {
    setSelectedCategoryIndex(categoryIndex);
  };

  const handleSelectDisplayType = (id: string) => {
    setDisplayType(id);
  };

  const handleGenerate = () => {
    console.log("生成", { selectedParts, displayType });
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 md:flex-row">
      {/* SP: 縦並び / PC: 左カラム */}
      <div className="flex flex-col gap-8 border-b border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/95 md:w-[380px] md:flex-shrink-0 md:border-b-0 md:border-r md:shadow-lg">
        <Header />
        <PartsSelector
          selectedParts={selectedParts}
          selectedCategoryIndex={selectedCategoryIndex}
          onSelectPart={handleSelectPart}
          onSelectCategory={handleSelectCategory}
        />
        <DisplayTypeToggle
          displayType={displayType}
          onSelectDisplayType={handleSelectDisplayType}
        />
        <GenerateButton onGenerate={handleGenerate} />
      </div>

      {/* SP: 縦並び / PC: 右カラム */}
      <div className="flex flex-1 flex-col p-6 md:p-10">
        <ResultPreview />
      </div>
    </main>
  );
}
