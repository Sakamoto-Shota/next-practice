"use client";

import { useCallback } from "react";

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

const DOWNLOAD_FILENAME = "ring-design.png";

function downloadDataUrl(imageUrl: string, filename: string) {
  const a = document.createElement("a");
  a.href = imageUrl;
  a.download = filename;
  a.rel = "noopener";
  document.body.appendChild(a);
  a.click();
  a.remove();
}

async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl);
  const blob = await res.blob();
  return new File([blob], filename, { type: blob.type || "image/png" });
}

type ResultPreviewProps = {
  imageUrl: string | null;
  /** Gemini テキスト提案（画像生成前の疎通確認用） */
  aiSuggestion?: string | null;
  /** API 失敗時のユーザー向けメッセージ */
  apiError?: string | null;
  isGenerating?: boolean;
};

export default function ResultPreview({
  imageUrl,
  aiSuggestion = null,
  apiError = null,
  isGenerating = false,
}: ResultPreviewProps) {
  const hasImage = Boolean(imageUrl);

  const handleDownload = useCallback(() => {
    if (!imageUrl) return;
    downloadDataUrl(imageUrl, DOWNLOAD_FILENAME);
  }, [imageUrl]);

  const handleShare = useCallback(async () => {
    if (!imageUrl) return;
    try {
      const file = await dataUrlToFile(imageUrl, DOWNLOAD_FILENAME);
      if (
        navigator.share &&
        navigator.canShare &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          files: [file],
          title: "指輪デザイン",
          text: "カスタム指輪のイメージ",
        });
        return;
      }
      window.alert(
        "このブラウザでは画像の共有ができません。ダウンロードボタンから保存してください。"
      );
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      console.error("share:", e);
      window.alert("共有を完了できませんでした。");
    }
  }, [imageUrl]);

  const iconButtonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-sm transition-all hover:bg-slate-50 disabled:pointer-events-none disabled:opacity-40 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-800 dark:disabled:opacity-40";

  return (
    <section className="flex flex-col gap-4">
      {apiError && !isGenerating && (
        <div
          role="alert"
          className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-900 dark:border-red-800 dark:bg-red-950/50 dark:text-red-100"
        >
          {apiError}
        </div>
      )}
      <div className="relative flex min-h-[320px] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-200 bg-gradient-to-br from-slate-50 via-slate-100/50 to-slate-200/30 dark:border-slate-700 dark:from-slate-900/80 dark:via-slate-800/50 dark:to-slate-900 md:min-h-[480px]">
        {isGenerating ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600 dark:border-slate-600 dark:border-t-slate-400"
              aria-hidden
            />
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              作成中
            </p>
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="生成された指輪"
            className="max-h-full max-w-full object-contain"
          />
        ) : aiSuggestion ? (
          <div className="max-h-full max-w-full overflow-auto px-4 py-6 text-center">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
              AI からの提案（テキスト）
            </p>
            <p className="mt-3 text-base leading-relaxed text-slate-800 dark:text-slate-200">
              {aiSuggestion}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="rounded-full bg-slate-200/80 p-4 dark:bg-slate-700/50">
              <svg
                className="h-12 w-12 text-slate-500 dark:text-slate-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="4" />
              </svg>
            </div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              生成画像表示エリア
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500">
              「デザインを作成」をクリックしてプレビューを表示
            </p>
          </div>
        )}
      </div>
      {/* ボタンは常に画像の下（PC/SP共通）*/}
      {!isGenerating && (
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className={iconButtonClass}
            aria-label="共有"
            disabled={!hasImage}
            onClick={handleShare}
          >
            <UploadIcon />
          </button>
          <button
            type="button"
            className={iconButtonClass}
            aria-label="ダウンロード"
            disabled={!hasImage}
            onClick={handleDownload}
          >
            <DownloadIcon />
          </button>
        </div>
      )}
    </section>
  );
}
