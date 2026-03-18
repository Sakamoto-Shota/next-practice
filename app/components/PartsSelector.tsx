export default function PartsSelector() {
  const parts = [
    { name: "リング", count: 3 },
    { name: "台座", count: 3 },
    { name: "宝石", count: 3 },
  ];

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-medium text-black dark:text-zinc-50">
        パーツを選ぶ
      </h2>
      {parts.map((part) => (
        <div key={part.name} className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
            {part.name}
          </h3>
          <div className="flex gap-2">
            {Array.from({ length: part.count }).map((_, i) => (
              <button
                key={i}
                className={`h-16 w-16 rounded border-2 bg-zinc-200 transition-colors hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 ${
                  i === 0
                    ? "border-zinc-900 dark:border-zinc-100"
                    : "border-zinc-300 dark:border-zinc-600"
                }`}
                aria-label={`${part.name} オプション ${i + 1}`}
              >
                サムネ
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
