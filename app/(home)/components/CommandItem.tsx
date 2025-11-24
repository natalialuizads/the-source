'use client';

import Link from 'next/link';

interface CommandItemProps {
  href: string;
  command: string;
  path: string;
  comment: string;
  id: string;
  selectedCommand: string;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  className?: string;
}

export function CommandItem({
  href,
  command,
  path,
  comment,
  id,
  selectedCommand,
  onMouseEnter,
  onMouseLeave,
  className = ''
}: CommandItemProps) {
  const isSelected = selectedCommand === id;

  return (
    <Link
      href={href}
      className={`block group ${className}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`flex items-center gap-3 p-1 px-2 -mx-2 rounded transition-all duration-200 border-l-2 cursor-pointer ${isSelected ? 'bg-neon-green/10 border-neon-green' : 'border-transparent hover:bg-neon-green/10 hover:border-neon-green'}`}>
        <span className={`font-bold transition-colors ${isSelected ? 'text-neon-green' : 'text-off-white group-hover:text-neon-green'}`}>
          {command}
        </span>
        <span className={`font-bold transition-colors ${isSelected ? 'text-white' : 'text-cyan-light group-hover:text-cyan-400'}`}>
          {path}
        </span>
        <span className={`text-xs md:text-sm transition-colors ${isSelected ? 'text-off-white/80' : 'text-muted-gray group-hover:text-off-white/80'}`}>
          {comment}
        </span>
      </div>
    </Link>
  );
}
