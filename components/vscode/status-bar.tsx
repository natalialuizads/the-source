import { cn } from "@/lib/utils";
import { Bell, GitBranch, Wifi, XCircle } from "lucide-react";

export function StatusBar() {
  return (
    <footer
      className={cn(
        "h-6 flex items-center justify-between px-2",
        "bg-[#007acc] text-white text-xs select-none"
      )}
      aria-label="Status Bar"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer"
          title="Git Branch"
        >
          <GitBranch size={12} />
          <span>main</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer">
          <XCircle size={12} />
          <span>0</span>
          <span>0</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer hidden md:flex">
          <span>Ln 10, Col 42</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer hidden md:flex">
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer hidden md:flex">
          <span>TypeScript JSX</span>
        </div>
        <div
          className="flex items-center gap-1 hover:bg-[#ffffff1f] px-1 rounded cursor-pointer"
          title="Go Live"
        >
          <Wifi size={12} />
          <span>Go Live</span>
        </div>
        <div
          className="flex items-center gap-1 hover:bg-[#ffffff1f] p-1 rounded cursor-pointer"
          title="Notifications"
        >
          <Bell size={12} />
        </div>
      </div>
    </footer>
  );
}
