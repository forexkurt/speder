"use client";

import { useSpeedReader } from "@/hooks/useSpeedReader";
import { ReaderDisplay } from "@/components/ReaderDisplay";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export default function Home() {
  const { state, actions } = useSpeedReader();

  return (
    <div className="h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300 overflow-hidden flex flex-col">

      {/* Header */}
      <Header />

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden">

        {/* Sidebar */}
        <Sidebar state={state} actions={actions} />

        {/* Main Content */}
        <section className="flex-grow relative bg-white dark:bg-zinc-900 flex flex-col items-center justify-center overflow-hidden">

          {/* Countdown Overlay */}
          {state.isPlaying && state.currentWordIndex === 0 && (
            // Note: Countdown logic is handled inside useSpeedReader hook usually, 
            // but if we need a visual overlay we can add it here.
            // For now, we'll rely on the hook's delay or add a visual if requested.
            null
          )}

          {/* Reader Area */}
          <div
            className="reading-container border-x border-dashed border-transparent px-4 md:px-0 transition-all h-full flex items-center justify-center relative"
            style={{
              maxWidth: state.mode === 'guided' ? '100%' : `${state.contentWidth}px`,
              borderColor: state.mode === 'flash' ? 'transparent' : undefined // Only show border if needed or based on width change
            }}
          >
            <ReaderDisplay
              mode={state.mode}
              currentWord={state.currentWord}
              words={state.words}
              currentWordIndex={state.currentWordIndex}
              contentWidth={state.contentWidth}
            />
          </div>

        </section>
      </main>
    </div>
  );
}
