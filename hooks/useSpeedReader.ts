import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { extractTextFromPdf } from '@/lib/pdfUtils';

export type ReaderMode = 'flash' | 'guided';

export interface SpeedReaderState {
    isPlaying: boolean;
    wpm: number;
    text: string;
    currentWordIndex: number;
    words: string[];
    mode: ReaderMode;
    groupSize: number;
    contentWidth: number;
    // PDF State
    pdfPages: string[];
    pdfCurrentPage: number; // 0-indexed
    isPdfLoaded: boolean;
    currentWord: string;
    progress: number;
}

export interface SpeedReaderActions {
    play: () => void;
    pause: () => void;
    togglePlay: () => void;
    setWpm: (wpm: number) => void;
    setText: (text: string) => void;
    restart: () => void;
    seek: (index: number) => void;
    setMode: (mode: ReaderMode) => void;
    setGroupSize: (size: number) => void;
    setContentWidth: (width: number) => void;
    // PDF Actions
    loadPdf: (file: File) => Promise<void>;
    goToPage: (pageIndex: number) => void;
    nextPage: () => void;
    prevPage: () => void;
}

export const useSpeedReader = (initialText: string = '', initialWpm: number = 300) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [wpm, setWpm] = useState(initialWpm);
    const [text, setTextState] = useState(initialText);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [mode, setMode] = useState<ReaderMode>('flash');
    const [groupSize, setGroupSize] = useState(1);
    const [contentWidth, setContentWidth] = useState(700);

    // PDF State
    const [pdfPages, setPdfPages] = useState<string[]>([]);
    const [pdfCurrentPage, setPdfCurrentPage] = useState(0);

    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Process text into words/groups using useMemo
    const words = useMemo(() => {
        const rawWords = text.trim().split(/\s+/).filter(word => word.length > 0);
        if (groupSize === 1) return rawWords;

        const groupedWords: string[] = [];
        for (let i = 0; i < rawWords.length; i += groupSize) {
            groupedWords.push(rawWords.slice(i, i + groupSize).join(' '));
        }
        return groupedWords;
    }, [text, groupSize]);

    const clearTimer = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    }, []);

    const nextWord = useCallback(() => {
        setCurrentWordIndex((prev) => {
            if (prev >= words.length - 1) {
                setIsPlaying(false);
                return prev;
            }
            return prev + 1;
        });
    }, [words.length]);

    useEffect(() => {
        if (isPlaying && words.length > 0 && currentWordIndex < words.length) {
            const msPerGroup = (60000 / wpm) * groupSize;
            timerRef.current = setInterval(nextWord, msPerGroup);
        } else {
            clearTimer();
        }

        return () => clearTimer();
    }, [isPlaying, wpm, words.length, currentWordIndex, nextWord, clearTimer, groupSize]);

    const play = () => setIsPlaying(true);
    const pause = () => setIsPlaying(false);
    const togglePlay = () => setIsPlaying((prev) => !prev);

    const setText = (newText: string) => {
        setTextState(newText);
        setCurrentWordIndex(0);
        setIsPlaying(false);
        // Eğer manuel metin girilirse PDF modundan çıkmış oluruz (isteğe bağlı, şimdilik PDF state'i koruyoruz ama text değişiyor)
    };

    const restart = () => {
        setIsPlaying(false);
        setCurrentWordIndex(0);
    };

    const seek = (index: number) => {
        if (index >= 0 && index < words.length) {
            setCurrentWordIndex(index);
        }
    };

    // PDF Actions
    const loadPdf = async (file: File) => {
        setIsPlaying(false);
        try {
            const { pages } = await extractTextFromPdf(file);
            setPdfPages(pages);
            if (pages.length > 0) {
                setPdfCurrentPage(0);
                setTextState(pages[0]);
                setCurrentWordIndex(0);
            }
        } catch (error: any) {
            console.error("Failed to load PDF:", error);
            alert(`PDF yüklenirken bir hata oluştu: ${error.message || error}`);
        }
    };

    const goToPage = (pageIndex: number) => {
        if (pageIndex >= 0 && pageIndex < pdfPages.length) {
            setIsPlaying(false);
            setPdfCurrentPage(pageIndex);
            setTextState(pdfPages[pageIndex]);
            setCurrentWordIndex(0);
        }
    };

    const nextPage = () => goToPage(pdfCurrentPage + 1);
    const prevPage = () => goToPage(pdfCurrentPage - 1);

    return {
        state: {
            isPlaying,
            wpm,
            text,
            currentWordIndex,
            words,
            mode,
            groupSize,
            contentWidth,
            currentWord: words[currentWordIndex] || '',
            progress: words.length > 0 ? (currentWordIndex / words.length) * 100 : 0,
            pdfPages,
            pdfCurrentPage,
            isPdfLoaded: pdfPages.length > 0,
        },
        actions: {
            play,
            pause,
            togglePlay,
            setWpm,
            setText,
            restart,
            seek,
            setMode,
            setGroupSize,
            setContentWidth,
            loadPdf,
            goToPage,
            nextPage,
            prevPage,
        },
    };
};
