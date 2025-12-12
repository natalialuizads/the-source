"use client";

import { TreeRoot } from "@/lib/types";
import { cn, findNode, formatFileName } from "@/lib/utils";
import { File, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTabs } from "./tabs-context";

interface TabBarProps {
  tree: TreeRoot;
}

export function TabBar({ tree }: TabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { tabs, removeTab } = useTabs();

  if (tabs.length === 0) return null;

  return (
    <nav
      className={cn(
        "flex items-center h-9 overflow-x-auto no-scrollbar",
        "bg-terminal-black border-b border-[#2b2b2b]"
      )}
      aria-label="Open tabs"
      role="tablist"
    >
      {tabs.map((tabPath) => {
        const node = findNode(tree.children, tabPath);
        const displayTitle = node ? formatFileName(node.name) : "untitled.md";
        const fullTitle = node ? (node.name as string) : "Untitled";
        const isActive = pathname === tabPath;

        return (
          <div
            key={tabPath}
            role="tab"
            aria-selected={isActive}
            className={cn(
              "flex items-center h-full px-3 min-w-[120px] max-w-[200px]",
              "border-r border-[#2b2b2b] cursor-pointer relative group",
              "text-off-white",
              isActive
                ? "bg-[#1e1e1e] border-t border-t-neon-green"
                : "bg-[#2d2d2d] border-t border-t-transparent hover:bg-[#2a2d2e]"
            )}
            title={fullTitle}
            onClick={() => router.push(tabPath)}
          >
            <File
              size={14}
              className={cn(
                "mr-2 shrink-0",
                isActive ? "text-blue-400" : "text-muted-gray"
              )}
            />
            <span
              className={cn(
                "mr-2 text-[13px] truncate flex-1 font-mono",
                isActive ? "text-[#d4d4d4]" : "text-muted-gray italic"
              )}
            >
              {displayTitle}
            </span>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tabPath);
              }}
              className={cn(
                "p-0.5 rounded-md transition-opacity",
                "hover:bg-[#333] focus:outline-none focus:bg-[#333]"
              )}
              aria-label={`Close ${fullTitle}`}
            >
              <X size={14} className="text-muted-gray hover:text-off-white" />
            </button>
          </div>
        );
      })}
    </nav>
  );
}
