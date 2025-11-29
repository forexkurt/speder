import React, { useState } from 'react';

interface TextInputProps {
    onStart: (text: string) => void;
}

export const TextInput: React.FC<TextInputProps> = ({ onStart }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onStart(text);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl flex flex-col gap-4">
            <textarea
                className="w-full h-48 p-4 rounded-xl border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100"
                placeholder="Paste your text here to start speed reading..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <button
                type="submit"
                disabled={!text.trim()}
                className="w-full py-4 px-6 bg-zinc-900 hover:bg-zinc-800 text-white font-semibold rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
                Start Reading
            </button>
        </form>
    );
};
