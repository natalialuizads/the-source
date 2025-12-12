import { AlertTriangle, Bell, Github, RefreshCw } from 'lucide-react';

export function StatusBar() {
  return (
    <div className="h-6 bg-[#1e1e1e] text-off-white border-t border-t-neon-green flex items-center justify-between px-2 text-[11px select-none text-xs font-bold">
      <div className="flex items-center gap-3">

        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
           <RefreshCw size={12} />
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
          <AlertTriangle size={12} />
          <span>0</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
           <span>Ln 1, Col 1</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
           <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
           <div className="font-bold">{}</div>
           <span>Markdown</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer">
           <Bell size={12} />
        </div>
        <a href="https://github.com/natalialuizads/the-source" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 cursor-pointer no-underline text-inherit">
          <Github size={12} />
          <span className="font-bold">the source</span>
        </a>
      </div>
    </div>
  );
}
