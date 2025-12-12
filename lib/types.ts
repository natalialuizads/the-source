import { ReactNode } from 'react';

export interface TreeNode {
  type: 'page' | 'folder' | 'separator';
  name: string | ReactNode;
  url?: string;
  children?: TreeNode[];
  index?: TreeNode;
  icon?: ReactNode;
  [key: string]: unknown;
}

export interface TreeRoot {
  children: TreeNode[];
}
