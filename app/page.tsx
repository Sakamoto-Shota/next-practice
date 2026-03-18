import Header from "./components/Header";
import PartsSelector from "./components/PartsSelector";
import DisplayTypeToggle from "./components/DisplayTypeToggle";
import GenerateButton from "./components/GenerateButton";
import ResultPreview from "./components/ResultPreview";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-zinc-50 font-sans dark:bg-black md:flex-row">
      {/* SP: 縦並び / PC: 左カラム */}
      <div className="flex flex-col gap-6 border-b border-zinc-200 p-4 dark:border-zinc-800 dark:bg-zinc-950 md:w-1/3 md:border-b-0 md:border-r md:p-6">
        <Header />
        <PartsSelector />
        <DisplayTypeToggle />
        <GenerateButton />
      </div>

      {/* SP: 縦並び / PC: 右カラム */}
      <div className="flex flex-1 flex-col p-4 md:p-6">
        <ResultPreview />
      </div>
    </main>
  );
}
