"use client";

import { useState, useRef } from "react";
import Header from "./components/Header";
import PartsSelector from "./components/PartsSelector";
import DisplayTypeToggle from "./components/DisplayTypeToggle";
import GenerateButton from "./components/GenerateButton";
import ResultPreview from "./components/ResultPreview";

export default function Home() {
  const [selectedParts, setSelectedParts] = useState<number[]>([0, 0, 0]);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  const [displayType, setDisplayType] = useState("ring-only");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSelectPart = (categoryIndex: number, partIndex: number) => {
    if (isGenerating) return;
    setSelectedParts((prev) => {
      const next = [...prev];
      next[categoryIndex] = partIndex;
      return next;
    });
  };

  const handleSelectCategory = (categoryIndex: number) => {
    if (isGenerating) return;
    setSelectedCategoryIndex(categoryIndex);
  };

  const handleSelectDisplayType = (id: string) => {
    if (isGenerating) return;
    setDisplayType(id);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedImageUrl(null);

    // 仮: 2秒後に完了（後で AI 生成 API に差し替え）
    timeoutRef.current = setTimeout(() => {
      setGeneratedImageUrl(
        "https://placehold.co/400x400/e2e8f0/64748b?text=Ring+Preview"
      );
      setIsGenerating(false);
      timeoutRef.current = null;
    }, 2000);
  };

  const handleCancel = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsGenerating(false);
  };

  return (
    <main className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950 md:flex-row">
      {/* SP: 縦並び / PC: 左カラム */}
      <div className="flex flex-col gap-8 border-b border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/95 md:w-[380px] md:shrink-0 md:border-b-0 md:border-r md:shadow-lg">
        <Header />
        <div
          className={`flex flex-col gap-8 ${isGenerating ? "pointer-events-none select-none opacity-60" : ""}`}
        >
        <PartsSelector
          selectedParts={selectedParts}
          selectedCategoryIndex={selectedCategoryIndex}
          onSelectPart={handleSelectPart}
          onSelectCategory={handleSelectCategory}
          disabled={isGenerating}
        />
        <DisplayTypeToggle
          displayType={displayType}
          onSelectDisplayType={handleSelectDisplayType}
          disabled={isGenerating}
        />
        </div>
        <GenerateButton
          onGenerate={handleGenerate}
          onCancel={handleCancel}
          isGenerating={isGenerating}
        />
      </div>

      {/* SP: 縦並び / PC: 右カラム */}
      <div className="flex flex-1 flex-col p-6 md:p-10">
        <ResultPreview
          imageUrl={generatedImageUrl}
          isGenerating={isGenerating}
        />
      </div>
    </main>
  );
}
