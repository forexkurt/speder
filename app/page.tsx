"use client";

import { useSpeedReader } from "@/hooks/useSpeedReader";
import { ReaderDisplay } from "@/components/ReaderDisplay";
import { Sidebar } from "@/components/Sidebar";

export default function Home() {
  const { state, actions } = useSpeedReader();

  return (
    <div className="h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden flex flex-col md:flex-row">

      {/* Sidebar */}
      <Sidebar state={state} actions={actions} />

      {/* Main Content */}
      <main className="flex-grow relative bg-white dark:bg-zinc-900 flex flex-col items-center justify-center overflow-hidden">

        {/* Header / Top Bar (Optional, can be added if needed) */}
        <div className="absolute top-0 right-0 p-4 z-20">
          {/* Theme toggle could go here if not in sidebar */}
        </div>

        {/* Reader Area */}
        <div
          className="w-full h-full flex items-center justify-center relative transition-all duration-300"
          style={{ maxWidth: state.mode === 'guided' ? '100%' : `${state.contentWidth}px` }}
        >
          <ReaderDisplay
            mode={state.mode}
            currentWord={state.currentWord}
            words={state.words}
            currentWordIndex={state.currentWordIndex}
            contentWidth={state.contentWidth}
          />
        </div>

      </main>
    </div>
  );
}
