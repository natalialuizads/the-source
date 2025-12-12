import { Sidebar } from "@/components/vscode/sidebar";
import { StatusBar } from "@/components/vscode/status-bar";
import { TabBar } from "@/components/vscode/tab-bar";
import { TabsProvider } from "@/components/vscode/tabs-provider";
import { source } from "@/lib/source";
import { TreeRoot } from "@/lib/types";
import { cn } from "@/lib/utils";
import { RootProvider } from "fumadocs-ui/provider/next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import "./global.css";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          <TabsProvider>
            <div
              className={cn(
                "flex flex-col h-[calc(100vh-2rem)] md:h-screen",
                "bg-terminal-black overflow-hidden font-sans"
              )}
            >
              <div className="flex flex-1 overflow-hidden">
                <Sidebar tree={source.pageTree as unknown as TreeRoot} />
                <main className="flex-1 flex flex-col min-w-0 bg-terminal-black">
                  <TabBar tree={source.pageTree as unknown as TreeRoot} />
                  <div className="flex-1 relative">
                    <div className="absolute inset-0 overflow-auto">
                      <div className="flex min-h-full">
                        <div
                          className={cn("flex-1 p-8 pt-6 max-w-4xl mx-auto")}
                        >
                          {children}
                        </div>
                      </div>
                    </div>
                  </div>
                </main>
              </div>
              <StatusBar />
            </div>
          </TabsProvider>
        </RootProvider>
      </body>
    </html>
  );
}
