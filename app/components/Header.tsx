export default function Header() {
  return (
    <header className="flex flex-col gap-3 border-b border-slate-200/60 pb-6 dark:border-slate-700/50">
      <h1 className="text-2xl font-semibold tracking-wide text-slate-800 dark:text-slate-100 md:text-3xl">
        指輪のデザインを作成
      </h1>
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
      お好みのパーツを組み合わせて指輪のデザインを作成できます。
      </p>
    </header>
  );
}
