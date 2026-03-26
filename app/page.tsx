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
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

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

  const handleGenerate = async () => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setIsGenerating(true);
    setGeneratedImageUrl(null);
    setAiSuggestion(null);
    setApiError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selectedParts, displayType }),
        signal: ac.signal,
      });

      const data = (await res.json()) as {
        imageDataUrl?: string;
        text?: string;
        error?: string;
        details?: string;
      };

      if (!res.ok) {
        const details = data.details ?? "";
        console.error("/api/generate:", data.error, details);
        const quotaLike =
          /quota|exceeded your current quota|limit:\s*0/i.test(details);
        setApiError(
          quotaLike
            ? "Google AI の画像生成モデルが、現在の API キーでは利用できない状態です（無料枠の上限 0、またはクォータ超過）。Google AI Studio で課金・プランを確認するか、https://ai.google.dev/gemini-api/docs/rate-limits でレート制限を確認してください。"
            : details || data.error || "生成エラーが発生しました。"
        );
        return;
      }

      if (data.imageDataUrl) {
        setGeneratedImageUrl(data.imageDataUrl);
        setAiSuggestion(null);
      } else if (data.text) {
        console.log(data.text);
        setAiSuggestion(data.text);
      }
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      console.error(e);
    } finally {
      setIsGenerating(false);
      if (abortRef.current === ac) abortRef.current = null;
    }
  };

  const handleCancel = () => {
    abortRef.current?.abort();
    abortRef.current = null;
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
          aiSuggestion={aiSuggestion}
          apiError={apiError}
          isGenerating={isGenerating}
        />
      </div>
    </main>
  );
}
