"use client";

import { TreeNode as TreeNodeType, TreeRoot } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  ChevronRight,
  File,
  Folder,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface SidebarProps {
  tree: TreeRoot;
}

export function Sidebar({ tree }: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex flex-col w-64 h-full",
        "bg-terminal-black text-muted-gray text-sm select-none",
        "border-r border-[#2b2b2b]"
      )}
    >
      <h2 className="px-4 py-2 text-xs font-bold tracking-wide text-muted-gray">
        EXPLORER
      </h2>

      <div className="flex flex-col">
        <button
          className={cn(
            "px-4 py-1.5 flex items-center gap-1 w-full text-left",
            "font-bold text-muted-gray",
            "hover:bg-[#2a2d2e] cursor-pointer",
            "focus:outline-none focus:bg-[#2a2d2e]"
          )}
          aria-label="Toggle The Source section"
          type="button"
        >
          <ChevronDown size={16} />
          <span>THE SOURCE</span>
        </button>
        <nav className="flex flex-col" aria-label="File explorer">
          {tree.children?.map((node, i) => (
            <TreeNode key={i} node={node} level={1} />
          ))}
        </nav>
      </div>
    </aside>
  );
}

function TreeNode({ node, level }: { node: TreeNodeType; level: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (node.index?.url && pathname.startsWith(node.index.url)) {
      setIsOpen(true);
    }
  }, [pathname, node.index]);

  if (node.type === "separator") {
    return (
      <div className="px-4 py-2 font-bold text-muted-gray">
        {node.name as string}
      </div>
    );
  }

  if (node.type === "folder") {
    return (
      <div>
        <button
          type="button"
          className={cn(
            "flex items-center w-full py-1.5",
            "text-muted-gray hover:text-off-white hover:bg-[#2a2d2e]",
            "focus:outline-none focus:bg-[#2a2d2e]"
          )}
          style={
            { "--node-level": level } as React.CSSProperties & {
              "--node-level": number;
            }
          }
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen ? "true" : "false"}
        >
          <div className="px-1 mr-1">
            {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>

          <div className="mr-2 text-muted-gray">
            {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
          </div>

          <span
            className={cn("flex-1 truncate text-left", isOpen && "font-bold")}
          >
            {node.name as string}
          </span>
        </button>
        {isOpen && (
          <div className="flex flex-col">
            {node.children?.map((child, i) => (
              <TreeNode key={i} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (node.type === "page") {
    const isActive = pathname === node.url;

    return (
      <Link
        href={node.url || "#"}
        className={cn(
          "flex items-center py-1.5 cursor-pointer",
          isActive
            ? "bg-[#2a2d2e] text-neon-green bg-opacity-50"
            : "text-muted-gray hover:text-off-white hover:bg-[#2a2d2e]",
          "focus:outline-none focus:bg-[#2a2d2e]"
        )}
        style={
          { "--node-level": level } as React.CSSProperties & {
            "--node-level": number;
          }
        }
      >
        <File size={18} className="mr-2 opacity-80 text-muted-gray" />
        <span className="truncate">{node.name as string}</span>
      </Link>
    );
  }

  return null;
}
