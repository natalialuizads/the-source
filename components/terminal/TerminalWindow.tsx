'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  step: number;
  children: ReactNode;
}

export function TerminalWindow({ step, children }: TerminalWindowProps) {
  // Dynamic height based on animation step
  const getMinHeight = () => {
    if (step === 0) return 'min-h-[200px]'; // Boot sequence only
    if (step === 1) return 'min-h-[280px]'; // + Welcome header
    if (step === 2) return 'min-h-[350px]'; // + Subtitle
    if (step === 3) return 'min-h-[400px]'; // + Cursor
    return 'min-h-[600px]'; // + Commands
  };

  return (
    <div className={`w-full max-w-3xl bg-terminal-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 ease-out ${getMinHeight()} transition-all duration-500`}>
      {/* Terminal Header */}
      <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
        <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
        <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
        <div className="ml-4 text-xs text-muted-gray select-none">natalialuizads@the-source:~</div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 md:p-10 space-y-6">
        {children}
      </div>
    </div>
  );
}
