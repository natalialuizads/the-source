import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-terminal-black text-off-white font-mono flex flex-col items-center justify-center p-4 md:p-8">


      <div className="w-full max-w-3xl bg-terminal-black border border-gray-800 rounded-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-500 ease-out">

        <div className="bg-gray-900 px-4 py-2 flex items-center gap-2 border-b border-gray-800">
          <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></div>
          <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></div>
          <div className="ml-4 text-xs text-muted-gray select-none">natalialuizads@the-source:~</div>
        </div>

        <div className="p-6 md:p-10 space-y-6">

          <div className="space-y-1 text-muted-gray text-sm md:text-base font-mono">
            <p>&gt; iniciando protocolo the_source... <span className="text-neon-green">[OK]</span></p>
            <p>&gt; carregando base de conhecimento... <span className="text-neon-green">[OK]</span></p>
            <p>&gt; acesso concedido.</p>
          </div>


          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold">
              # Olá, <span className="text-neon-green">Dev.</span>
            </h1>
            <p className="text-muted-gray text-lg">
              Este é o diretório raiz do seu segundo cérebro.
            </p>
          </div>

          <div className="flex items-center gap-2 text-neon-green text-xl">
            <span>&gt;</span>
            <span className="w-3 h-6 bg-neon-green animate-pulse"></span>
          </div>

          <div className="h-px bg-gray-800 my-6"></div>

          <div className="space-y-3 font-mono text-sm md:text-base">
            <p className="text-muted-gray">// Comandos disponíveis (Navegação):</p>

            <div className="group flex flex-wrap gap-2 items-center">
              <span className="text-off-white">$ cd</span>
              <Link href="/docs/fundamentos" className="text-cyan-light hover:underline hover:text-cyan-400 transition-colors">/01-fundamentos</Link>
              <span className="text-muted-gray">// Ir para Algoritmos, Estrutura de Dados...</span>
            </div>

            <div className="group flex flex-wrap gap-2 items-center">
              <span className="text-off-white">$ cd</span>
              <Link href="/docs/stack" className="text-cyan-light hover:underline hover:text-cyan-400 transition-colors">/02-minha-stack</Link>
              <span className="text-muted-gray">// React, Node, Docker e ferramentas.</span>
            </div>

            <Link href="/docs/cola" className="block mt-6 group">
              <div className="border border-neon-green bg-neon-green/10 p-4 rounded flex flex-wrap gap-2 items-center transition-all duration-300 hover:bg-neon-green/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:scale-[1.02] cursor-pointer">
                <span className="text-neon-green font-bold">$ exec</span>
                <span className="text-white font-bold">/acessar-cola</span>
                <span className="text-off-white/80 group-hover:text-white transition-colors">// Snippets rápidos e configs essenciais.</span>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}
