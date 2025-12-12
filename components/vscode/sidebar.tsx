'use client';

import { cn } from '@/lib/utils';
// import type { PageTree } from 'fumadocs-core/server';

// Relaxed types to avoid deep type matching issues with Fumadocs internals
namespace PageTree {
  export interface Node {
    type: 'page' | 'folder' | 'separator';
    name: any; // name can be ReactNode apparently
    url?: string;
    children?: Node[];
    [key: string]: any;
  }
  
  export interface Root {
    children: Node[];
  }
}

import { ChevronDown, ChevronRight, File, Folder, FolderOpen } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface SidebarProps {
  tree: any; // PageTree.Root;
}

// ... imports

export function Sidebar({ tree }: SidebarProps) {
  return (
    <div className="flex flex-col w-64 h-full bg-terminal-black text-muted-gray text-sm select-none border-r border-[#2b2b2b]">
      <div className="px-4 py-2 text-xs font-bold tracking-wide text-muted-gray">EXPLORER</div>
      
      <div className="flex flex-col">
        <div className="px-4 py-1.5 flex items-center gap-1 font-bold text-muted-gray hover:bg-[#2a2d2e] cursor-pointer">
          <ChevronDown size={16} />
          <span>DOCS</span>
        </div>
        <div className="flex flex-col">
            {tree.children?.map((node: any, i: number) => (
                <TreeNode key={i} node={node} level={1} />
            ))}
        </div>
      </div>
    </div>
  );
}

function TreeNode({ node, level }: { node: any; level: number }) {
  // ... (state and effect)
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (node.index?.url && pathname.startsWith(node.index.url)) {
      setIsOpen(true);
    }
  }, [pathname, node.index]);

  if (node.type === 'separator') {
    return <div className="px-4 py-2 font-bold text-muted-gray">{node.name}</div>;
  }

  if (node.type === 'folder') {
    const hasIndex = node.index && node.index.url;
    
    return (
      <div>
        <div
          className="flex items-center py-1.5 text-muted-gray hover:text-off-white hover:bg-[#2a2d2e]"
          style={{ paddingLeft: `${level * 12 + 4}px` }}
        >
          <div 
             className="px-1 cursor-pointer hover:bg-[#ffffff1f] rounded-sm mr-1"
             onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
          >
             {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
          </div>
          
          <div className="mr-2 text-muted-gray">
            {isOpen ? <FolderOpen size={20} /> : <Folder size={20} />}
          </div>

          {hasIndex ? (
              <Link 
                href={node.index.url} 
                className={cn(
                    "flex-1 cursor-pointer truncate", 
                    pathname === node.index.url ? "text-neon-green font-medium" : ""
                )}
                onClick={() => setIsOpen(true)}
              >
                {node.name}
              </Link>
          ) : (
              <span 
                className={cn("flex-1 cursor-pointer truncate", isOpen && "font-bold")}
                onClick={() => setIsOpen(!isOpen)}
              >
                {node.name}
              </span>
          )}
        </div>
        {isOpen && (
          <div className="flex flex-col">
            {node.children?.map((child: any, i: number) => (
              <TreeNode key={i} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (node.type === 'page') {
    const isActive = pathname === node.url;
    
    return (
      <Link
        href={node.url || '#'}
        className={cn(
          "flex items-center py-1.5 cursor-pointer hover:bg-[#2a2d2e]",
          isActive ? "bg-[#2a2d2e] text-neon-green bg-opacity-50" : "text-muted-gray hover:text-off-white"
        )}
        style={{ paddingLeft: `${level * 12 + 30}px` }} 
      >
        <File size={18} className="mr-2 opacity-80 text-muted-gray" />
        <span className="truncate">{node.name}</span>
      </Link>
    );
  }

  return null;
}
