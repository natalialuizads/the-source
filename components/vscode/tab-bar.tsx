'use client';

import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { useRouter } from 'next/navigation';

export function TabBar() {
  const pathname = usePathname();
  const router = useRouter();
  
  if (pathname === '/docs') return null; // Logic: don't show tab bar or show "Welcome" if on root? For now, let's show it if there is a slug.
  // Actually usually in VS Code "Welcome" is also a tab.
  
  const segments = pathname.split('/').filter(Boolean);
  const fileName = segments.length > 0 ? segments[segments.length - 1] : 'docs';
  const displayTitle = fileName.replace(/-/g, ' ') + '.md';

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    router.push('/docs'); // "Close" goes back to root
  };

  return (
    <div className="flex items-center bg-terminal-black h-9 border-b border-[#2b2b2b] overflow-x-auto">
      <div className="flex items-center h-full px-3 bg-[#1e1e1e] border-t border-t-neon-green text-off-white min-w-[120px] max-w-[200px] border-r border-[#2b2b2b] group cursor-pointer relative">
         <span className="mr-2 text-[13px] truncate flex-1">{displayTitle}</span>
         <div onClick={handleClose} className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-[#333] rounded-md transition-opacity">
            <X size={14} className="text-muted-gray hover:text-off-white" />
         </div>
      </div>
    </div>
  );
}
