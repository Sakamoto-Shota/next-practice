import Header from "./components/Header";
import PartsSelector from "./components/PartsSelector";
import DisplayTypeToggle from "./components/DisplayTypeToggle";
import GenerateButton from "./components/GenerateButton";
import ResultPreview from "./components/ResultPreview";

export default function Home() {
  return (
    <main className="flex min-h-screen bg-zinc-50 font-sans dark:bg-black">
      {/* 左カラム：操作パネル */}
      <div className="flex w-1/3 flex-col gap-6  border-zinc-200 p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <Header />
        <PartsSelector />
        <DisplayTypeToggle />
        <GenerateButton />
      </div>

      {/* 右カラム：プレビューエリア */}
      <div className="flex w-2/3 p-6">
        <ResultPreview />
      </div>
    </main>
  );
}
