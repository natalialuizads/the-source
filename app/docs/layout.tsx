import { Sidebar } from '@/components/vscode/sidebar';
import { StatusBar } from '@/components/vscode/status-bar';
import { TabBar } from '@/components/vscode/tab-bar';
import { source } from '@/lib/source';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] md:h-screen bg-terminal-black overflow-hidden font-sans">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar tree={source.pageTree} />
        <main className="flex-1 flex flex-col min-w-0 bg-terminal-black">
          <TabBar />
          {/* Editor Area */}
          <div className="flex-1 relative">
             <div className="absolute inset-0 overflow-auto">
                <div className="flex min-h-full">
                    {/* Content */}
                    <div className="flex-1 p-8 pt-6 max-w-4xl">
                        {children}
                    </div>
                </div>
             </div>
          </div>
        </main>
      </div>
      <StatusBar />
    </div>
  );
}
