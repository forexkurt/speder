import React from 'react';
import { SpeedReaderActions, SpeedReaderState, ReaderMode } from '@/hooks/useSpeedReader';

interface SidebarProps {
    state: SpeedReaderState;
    actions: SpeedReaderActions;
}

export const Sidebar: React.FC<SidebarProps> = ({ state, actions }) => {
    return (
        <aside className="w-full md:w-80 flex-none bg-white dark:bg-zinc-900 border-r dark:border-zinc-800 flex flex-col overflow-y-auto z-10 shadow-xl md:shadow-none h-full">
            <div className="p-6 space-y-6">

                {/* PDF Upload & Navigation */}
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">
                            PDF Kitap Yükle
                        </label>
                        <label className="flex cursor-pointer bg-zinc-50 dark:bg-zinc-800 border dark:border-zinc-700 rounded-lg p-3 text-sm hover:border-blue-500 transition-colors justify-center items-center gap-2 text-zinc-600 dark:text-zinc-300 group">
                            <svg className="w-5 h-5 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <span className="group-hover:text-blue-500 transition-colors">
                                {state.isPdfLoaded ? 'Yeni PDF Seç' : 'PDF Dosyası Seç'}
                            </span>
                            <input
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) actions.loadPdf(file);
                                }}
                            />
                        </label>
                    </div>

                    {state.isPdfLoaded && (
                        <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-700 space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium dark:text-zinc-300">Sayfa</span>
                                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                                    {state.pdfCurrentPage + 1} / {state.pdfPages.length}
                                </span>
                            </div>

                            <div className="flex gap-2">
                                <button
                                    onClick={actions.prevPage}
                                    disabled={state.pdfCurrentPage === 0}
                                    className="flex-1 py-2 px-3 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-md text-sm disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition dark:text-zinc-200"
                                >
                                    Önceki
                                </button>
                                <button
                                    onClick={actions.nextPage}
                                    disabled={state.pdfCurrentPage === state.pdfPages.length - 1}
                                    className="flex-1 py-2 px-3 bg-white dark:bg-zinc-700 border dark:border-zinc-600 rounded-md text-sm disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition dark:text-zinc-200"
                                >
                                    Sonraki
                                </button>
                            </div>

                            <div className="relative">
                                <input
                                    type="number"
                                    min="1"
                                    max={state.pdfPages.length}
                                    placeholder="Sayfaya git..."
                                    className="w-full p-2 text-sm border dark:border-zinc-600 rounded-md bg-white dark:bg-zinc-900 dark:text-zinc-200 pr-10"
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            const val = parseInt((e.target as HTMLInputElement).value);
                                            if (!isNaN(val)) actions.goToPage(val - 1);
                                        }
                                    }}
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400">
                                    ↵
                                </span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Text Input */}
                <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Metin Kaynağı</label>
                    <textarea
                        className="w-full h-24 p-3 text-sm border dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:text-zinc-200"
                        placeholder="Metni buraya yapıştırın..."
                        value={state.text}
                        onChange={(e) => actions.setText(e.target.value)}
                    />
                </div>

                {/* Mode & Group */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Mod</label>
                        <select
                            value={state.mode}
                            onChange={(e) => actions.setMode(e.target.value as ReaderMode)}
                            className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-700 dark:text-zinc-200"
                        >
                            <option value="flash">⚡ Flaş Kart</option>
                            <option value="guided">📖 Rehberli</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Grup</label>
                        <select
                            value={state.groupSize}
                            onChange={(e) => actions.setGroupSize(Number(e.target.value))}
                            className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-700 dark:text-zinc-200"
                        >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                <option key={num} value={num}>{num} Kelime</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Sliders */}
                <div className="space-y-5 border-t border-b border-zinc-100 dark:border-zinc-800 py-4">
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium dark:text-zinc-300">Hız (WPM)</label>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{state.wpm}</span>
                        </div>
                        <input
                            type="range"
                            min="50"
                            max="1000"
                            step="10"
                            value={state.wpm}
                            onChange={(e) => actions.setWpm(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-600"
                        />
                    </div>
                    <div>
                        <div className="flex justify-between mb-1">
                            <label className="text-sm font-medium dark:text-zinc-300">Okuma Genişliği</label>
                            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">{state.contentWidth}px</span>
                        </div>
                        <input
                            type="range"
                            min="300"
                            max="1400"
                            step="50"
                            value={state.contentWidth}
                            onChange={(e) => actions.setContentWidth(Number(e.target.value))}
                            className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer dark:bg-zinc-700 accent-blue-600"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                    <button
                        onClick={actions.restart}
                        className="py-3 px-4 rounded-lg border border-zinc-300 dark:border-zinc-600 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition text-sm dark:text-zinc-200"
                    >
                        Sıfırla
                    </button>
                    <button
                        onClick={actions.togglePlay}
                        className={`py-3 px-4 rounded-lg text-white font-bold shadow-lg transition text-sm flex justify-center items-center gap-2 ${state.isPlaying
                            ? 'bg-red-500 hover:bg-red-600 shadow-red-500/30'
                            : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30'
                            }`}
                    >
                        {state.isPlaying ? 'Durdur' : 'Başlat'}
                    </button>
                </div>
            </div>
        </aside>
    );
};
