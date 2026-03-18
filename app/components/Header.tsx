export default function Header() {
  return (
    <header className="flex flex-col gap-2">
      <h1 className="text-2xl font-semibold tracking-tight text-black dark:text-zinc-50">
        指輪のデザインを作成
      </h1>
      <p className="text-base leading-6 text-zinc-600 dark:text-zinc-400">
        お好みのパーツを組み合わせて指輪のデザインを作成できます。
      </p>
    </header>
  );
}
