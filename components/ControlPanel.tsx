import React from 'react';

interface ControlPanelProps {
    isPlaying: boolean;
    onTogglePlay: () => void;
    onRestart: () => void;
    wpm: number;
    onWpmChange: (wpm: number) => void;
    progress: number;
    onSeek: (value: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    isPlaying,
    onTogglePlay,
    onRestart,
    wpm,
    onWpmChange,
    progress,
    onSeek,
}) => {
    return (
        <div className="flex flex-col gap-6 w-full max-w-2xl p-6 bg-white rounded-xl shadow-sm border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
            {/* Progress Bar */}
            <div className="w-full">
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={(e) => onSeek(Number(e.target.value))}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-600"
                />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                {/* Playback Controls */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={onRestart}
                        className="p-3 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        title="Restart"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                        </svg>
                    </button>

                    <button
                        onClick={onTogglePlay}
                        className="flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-md transition-all hover:scale-105 active:scale-95"
                    >
                        {isPlaying ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* WPM Control */}
                <div className="flex items-center gap-4 bg-zinc-50 dark:bg-zinc-800 px-4 py-2 rounded-lg">
                    <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Speed</span>
                    <input
                        type="range"
                        min="100"
                        max="1000"
                        step="50"
                        value={wpm}
                        onChange={(e) => onWpmChange(Number(e.target.value))}
                        className="w-32 h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-600"
                    />
                    <span className="text-sm font-bold w-16 text-right tabular-nums">{wpm} WPM</span>
                </div>
            </div>
        </div>
    );
};
