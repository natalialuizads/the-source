'use client';

import { useState, useEffect } from 'react';
import { Typewriter } from './components/Typewriter';
import { CommandItem } from './components/CommandItem';
import { TerminalWindow } from './components/TerminalWindow';

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [selectedCommand, setSelectedCommand] = useState('cola');

  useEffect(() => {
    if (step === 3) {
      const timeout = setTimeout(() => setStep(4), 1000);
      return () => clearTimeout(timeout);
    }
  }, [step]);

  return (
    <main className="min-h-screen bg-terminal-black text-off-white font-mono flex flex-col items-center justify-center p-4 md:p-8">

      {/* Terminal Window Container with Animation */}
      <TerminalWindow step={step}>
        {/* Boot Sequence - Step 0 */}
        <div className="space-y-1 text-muted-gray text-sm md:text-base font-mono min-h-[80px]">
          <Typewriter
            text={[
              "> iniciando protocolo the_source... [OK]",
              "> carregando base de conhecimento... [OK]",
              "> acesso concedido."
            ]}
            speed={30}
            onComplete={() => setStep(1)}
          />
        </div>

        {/* Welcome Message - Step 1 & 2 */}
        <div className="space-y-2 min-h-[100px]">
          {step >= 1 && (
            <h1 className="text-4xl md:text-5xl font-bold flex flex-wrap gap-2">
              <span>#</span>
              <Typewriter
                text="Olá,"
                speed={50}
                className="text-off-white"
                onComplete={() => { }}
              />
              <Typewriter
                text="Dev."
                speed={50}
                delay={500}
                className="text-neon-green"
                onComplete={() => setStep(2)}
              />
            </h1>
          )}
          {step >= 2 && (
            <Typewriter
              text="Este é o diretório raiz do seu segundo cérebro."
              speed={30}
              className="text-muted-gray text-lg"
              onComplete={() => setStep(3)}
            />
          )}
        </div>

        {/* Blinking Cursor - Step 3 */}
        <div className="flex items-center gap-2 text-neon-green text-xl min-h-[32px]">
          {step >= 3 && (
            <>
              <span>&gt;</span>
              <span className="w-3 h-6 bg-neon-green animate-pulse"></span>
            </>
          )}
        </div>

        <div className={`h-px bg-gray-800 my-6 transition-opacity duration-500 ${step >= 4 ? 'opacity-100' : 'opacity-0'}`}></div>

        {/* Commands - Step 4 */}
        {step >= 4 && (
          <div className="space-y-1 font-mono text-sm md:text-base">
            <p className="text-muted-gray mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">// Comandos disponíveis (Navegação):</p>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
              <CommandItem
                href="/docs/fundamentos"
                command="$ cd"
                path="/01-fundamentos"
                comment="// Ir para Algoritmos, Estrutura de Dados..."
                id="fundamentos"
                selectedCommand={selectedCommand}
                onMouseEnter={() => setSelectedCommand('fundamentos')}
                onMouseLeave={() => setSelectedCommand('cola')}
              />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <CommandItem
                href="/docs/stack"
                command="$ cd"
                path="/02-minha-stack"
                comment="// React, Node, Docker e ferramentas."
                id="stack"
                selectedCommand={selectedCommand}
                onMouseEnter={() => setSelectedCommand('stack')}
                onMouseLeave={() => setSelectedCommand('cola')}
              />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <CommandItem
                href="/docs/cola"
                command="$ exec"
                path="/acessar-cola"
                comment="// Snippets rápidos e configs essenciais."
                id="cola"
                selectedCommand={selectedCommand}
                onMouseEnter={() => setSelectedCommand('cola')}
                onMouseLeave={() => setSelectedCommand('cola')}
              />
            </div>
          </div>
        )}
      </TerminalWindow>
    </main>
  );
}
