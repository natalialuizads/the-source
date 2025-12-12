import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TreeNode } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function findNode(nodes: TreeNode[], path: string): TreeNode | null {
  for (const node of nodes) {
    if (node.url === path) return node;
    if (node.children) {
      const found = findNode(node.children, path);
      if (found) return found;
    }
  }
  return null;
}

export function formatFileName(name: any): string {
  const stringName = typeof name === 'string' ? name : String(name);
  return stringName.toLowerCase().replace(/\s+/g, '-').normalize('NFD').replace(/[\u0300-\u036f]/g, '') + '.md';
}
