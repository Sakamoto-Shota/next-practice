export default function ResultPreview() {
  return (
    <section className="relative flex min-h-[400px] w-full items-center justify-center rounded-lg bg-zinc-200 dark:bg-zinc-800">
      <p className="text-zinc-500 dark:text-zinc-400">生成画像表示エリア</p>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 transition-colors hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
          aria-label="アップロード"
        >
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
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-300 transition-colors hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
          aria-label="ダウンロード"
        >
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
        </button>
      </div>
    </section>
  );
}
