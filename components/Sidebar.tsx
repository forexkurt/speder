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

                {/* PDF Upload Area */}
                <div className="p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-center group hover:border-blue-500 transition-colors">
                    <label className="cursor-pointer block">
                        <div className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 font-medium">
                            {state.isPdfLoaded ? `✅ PDF Yüklendi (${state.pdfPages.length} Sayfa)` : '📂 PDF Kitap Yükle'}
                        </div>
                        {state.isLoading && (
                            <div className="flex justify-center items-center gap-2 text-sm text-blue-600 mt-2">
                                <div className="loader"></div> İşleniyor...
                            </div>
                        )}
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

                {/* Text Input */}
                <div>
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Metin Kaynağı</label>
                    <textarea
                        className="w-full h-24 p-3 text-sm border dark:border-zinc-600 rounded-lg bg-zinc-50 dark:bg-zinc-800 focus:ring-2 focus:ring-blue-500 outline-none resize-none dark:text-zinc-200"
                        placeholder="PDF yükleyin veya metni buraya yapıştırın..."
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
                            className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-600 dark:text-zinc-200"
                        >
                            <option value="flash">⚡ Flaş Kart (ORP)</option>
                            <option value="guided">📖 Rehberli</option>
                        </select>
                    </div>
                    <div>
                        <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Grup</label>
                        <select
                            value={state.groupSize}
                            onChange={(e) => actions.setGroupSize(Number(e.target.value))}
                            className="w-full p-2 text-sm bg-zinc-50 dark:bg-zinc-800 rounded-lg border dark:border-zinc-600 dark:text-zinc-200"
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
