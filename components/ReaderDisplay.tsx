import React, { useEffect, useRef } from 'react';
import { ReaderMode } from '@/hooks/useSpeedReader';

interface ReaderDisplayProps {
    mode: ReaderMode;
    currentWord: string;
    words: string[];
    currentWordIndex: number;
    contentWidth: number;
}

export const ReaderDisplay: React.FC<ReaderDisplayProps> = ({
    mode,
    currentWord,
    words,
    currentWordIndex,
    contentWidth
}) => {
    const activeWordRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Auto-scroll for Guided Mode
    useEffect(() => {
        if (mode === 'guided' && activeWordRef.current && containerRef.current) {
            const activeEl = activeWordRef.current;
            const container = containerRef.current;

            const activeRect = activeEl.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect();

            // Check if active word is near the bottom of the visible area
            const safeZoneBottom = containerRect.bottom - 60;

            if (activeRect.bottom > safeZoneBottom) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [currentWordIndex, mode]);

    if (!currentWord && words.length === 0) {
        return (
            <div className="flex h-64 w-full items-center justify-center rounded-xl bg-zinc-100 dark:bg-zinc-900">
                <span className="text-zinc-400">Ready to read</span>
            </div>
        );
    }

    if (mode === 'flash') {
        // Flash Mode (ORP)
        const word = currentWord || "Ready";
        const middleIndex = Math.floor((word.length - 1) / 2);
        const start = word.slice(0, middleIndex);
        const middle = word[middleIndex];
        const end = word.slice(middleIndex + 1);

        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="text-6xl font-bold tracking-wide text-zinc-900 dark:text-zinc-100 font-mono">
                    <span className="text-zinc-800 dark:text-zinc-300">{start}</span>
                    <span className="text-red-500">{middle}</span>
                    <span className="text-zinc-800 dark:text-zinc-300">{end}</span>
                </div>
            </div>
        );
    } else {
        // Guided Mode
        return (
            <div
                ref={containerRef}
                className="w-full h-full overflow-y-auto no-scrollbar relative py-4 scroll-smooth"
                style={{ maxWidth: `${contentWidth}px` }}
            >
                <div className="text-left leading-loose text-2xl text-zinc-400 dark:text-zinc-600 transition-all duration-300">
                    {words.map((word, index) => (
                        <span
                            key={index}
                            ref={index === currentWordIndex ? activeWordRef : null}
                            className={`inline-block mr-2 p-1 rounded transition-colors duration-100 border border-transparent ${index === currentWordIndex
                                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 shadow-[0_0_0_2px_rgba(59,130,246,0.1)]'
                                    : ''
                                }`}
                        >
                            {word}
                        </span>
                    ))}
                </div>
                <div className="h-[50vh]"></div>
            </div>
        );
    }
};
