'use client';

import { cn } from '@/lib/utils';
import { File, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useTabs } from './tabs-context';

interface TabBarProps {
  tree: any;
}

export function TabBar({ tree }: TabBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { tabs, removeTab } = useTabs();
  
  // Logic: Only hide if tabs array is empty (which typically means we're on Home and visited nothing yet)
  // OR if we strictly want to hide tabs on home.
  // Requirement: "quando for o docs.md principal... nao exibir tab". 
  // Let's interpret: If on Home ('/'), don't show the tab functionality?
  // Actually, if we are on Home, we might still have other tabs open.
  // VS Code behavior: You can be on "Welcome" (Home) and have other tabs.
  // But user said: "Ao fechar... redirecionando para docs... deve ser /".
  // And "Quando for o docs.md principal... nao exibir tab".
  // Let's keep logic: HIDE bar if on Home AND no other tabs? Or just render the list of tabs?
  // If we are on Home, `pathname` is `/`.
  
  if (tabs.length === 0) return null;

  // Find node in tree
  function findNode(nodes: any[], path: string): any {
    for (const node of nodes) {
      if (node.url === path) return node;
      if (node.children) {
        const found = findNode(node.children, path);
        if (found) return found;
      }
    }
    return null;
  }

  // Format filename helper
  const formatFileName = (name: string) => {
      return name.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '.md';
  };

  return (
    <div className="flex items-center bg-terminal-black h-9 border-b border-[#2b2b2b] overflow-x-auto no-scrollbar">
      {tabs.map((tabPath) => {
        const node = findNode(tree.children, tabPath);
        const displayTitle = node ? formatFileName(node.name) : 'untitled.md';
        const fullTitle = node ? node.name : 'Untitled';
        const isActive = pathname === tabPath;

        return (
          <div 
            key={tabPath}
            className={cn(
              "flex items-center h-full px-3 text-off-white min-w-[120px] max-w-[200px] border-r border-[#2b2b2b] group cursor-pointer relative",
              isActive ? "bg-[#1e1e1e] border-t border-t-neon-green" : "bg-[#2d2d2d] border-t border-t-transparent hover:bg-[#2a2d2e]" // Inactive style
            )}
            title={fullTitle}
            onClick={() => router.push(tabPath)}
          >
             <File size={14} className={cn("mr-2 shrink-0", isActive ? "text-blue-400" : "text-muted-gray")} />
             <span className={cn("mr-2 text-[13px] truncate flex-1 font-mono", isActive ? "text-[#d4d4d4]" : "text-muted-gray italic")}>{displayTitle}</span>
             <div 
               onClick={(e) => { e.stopPropagation(); removeTab(tabPath); }} 
               className="p-0.5 hover:bg-[#333] rounded-md transition-opacity"
             >
                <X size={14} className="text-muted-gray hover:text-off-white" />
             </div>
          </div>
        );
      })}
    </div>
  );
}
