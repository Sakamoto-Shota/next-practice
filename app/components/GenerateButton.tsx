export default function GenerateButton({
  onGenerate,
  onCancel,
  isGenerating = false,
}: {
  onGenerate: () => void;
  onCancel: () => void;
  isGenerating?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={isGenerating ? onCancel : onGenerate}
      className="w-full rounded-xl bg-slate-800 px-6 py-4 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:bg-slate-900 hover:shadow-xl active:scale-[0.98] dark:bg-slate-700 dark:hover:bg-slate-600"
    >
      {isGenerating ? "中止" : "デザインを作成"}
    </button>
  );
}
