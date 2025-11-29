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
    contentWidth,
}) => {
    const guidedWordRefs = useRef<(HTMLSpanElement | null)[]>([]);

    // ORP Calculation Helper
    const getORP = (word: string) => {
        if (!word || word.length < 2) return { left: '', pivot: word, right: '' };
        const centerIndex = Math.floor((word.length - 1) / 2);
        return {
            left: word.slice(0, centerIndex),
            pivot: word[centerIndex],
            right: word.slice(centerIndex + 1)
        };
    };

    // Scroll active word into view in Guided mode
    useEffect(() => {
        if (mode === 'guided' && guidedWordRefs.current[currentWordIndex]) {
            const element = guidedWordRefs.current[currentWordIndex];
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                    inline: 'nearest'
                });
            }
        }
    }, [currentWordIndex, mode]);

    if (mode === 'flash') {
        const { left, pivot, right } = getORP(currentWord || "Hazır");

        return (
            <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="relative h-32 flex items-center justify-center w-full">
                    {/* ORP Guides */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-zinc-300 dark:bg-zinc-700"></div>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-zinc-300 dark:bg-zinc-700"></div>

                    {/* Word Display */}
                    <div className="font-mono text-5xl md:text-6xl font-semibold text-zinc-800 dark:text-zinc-100 leading-none select-none flash-display flex items-center">
                        <span>{left}</span>
                        <span className="orp-char">{pivot}</span>
                        <span>{right}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className="w-full h-full overflow-y-auto no-scrollbar relative py-4 scroll-smooth"
            style={{ maxWidth: '100%' }}
        >
            <div className="text-left leading-loose text-2xl text-zinc-400 dark:text-zinc-600 transition-all duration-300">
                {words.map((word, index) => (
                    <span
                        key={index}
                        ref={el => { guidedWordRefs.current[index] = el; }}
                        className={`inline-block mr-2 p-1 rounded transition-colors duration-100 border border-transparent ${index === currentWordIndex ? 'active-word' : ''
                            }`}
                    >
                        {word}
                    </span>
                ))}
            </div>
            <div className="h-[50vh]"></div>
        </div>
    );
};
