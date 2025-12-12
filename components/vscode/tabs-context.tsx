'use client';

import { createContext, useContext } from 'react';

export interface TabsContextType {
  tabs: string[];
  addTab: (path: string) => void;
  removeTab: (path: string) => void;
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export function useTabs() {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('useTabs must be used within a TabsProvider');
  }
  return context;
}
