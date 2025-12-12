"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { TabsContext } from "./tabs-context";

export function TabsProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<string[]>([]);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname && pathname !== "/") {
      setTabs((prev) => {
        if (prev.includes(pathname)) return prev;
        const newTabs = [...prev, pathname];
        if (newTabs.length > 10) {
          return newTabs.slice(1);
        }
        return newTabs;
      });
    }
  }, [pathname]);

  const addTab = (path: string) => {
    if (!tabs.includes(path)) {
      setTabs((prev) => {
        const newTabs = [...prev, path];
        if (newTabs.length > 10) return newTabs.slice(1);
        return newTabs;
      });
    }
  };

  const removeTab = (path: string) => {
    const newTabs = tabs.filter((t) => t !== path);
    setTabs(newTabs);

    if (path === pathname) {
      if (newTabs.length > 0) {
        router.push(newTabs[newTabs.length - 1]);
      } else {
        router.push("/");
      }
    }
  };

  return (
    <TabsContext.Provider value={{ tabs, addTab, removeTab }}>
      {children}
    </TabsContext.Provider>
  );
}
