export default function DisplayTypeToggle() {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-lg font-medium text-black dark:text-zinc-50">
        表示する画像を選ぶ
      </h2>
      <div className="flex gap-2">
        <button
          className="rounded border-2 border-zinc-900 bg-zinc-100 px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-200 dark:border-zinc-100 dark:bg-zinc-800 dark:hover:bg-zinc-700"
          aria-pressed="true"
        >
          リング単体
        </button>
        <button
          className="rounded border-2 border-zinc-300 bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-zinc-100 dark:border-zinc-600 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          aria-pressed="false"
        >
          着用イメージ
        </button>
      </div>
    </section>
  );
}
