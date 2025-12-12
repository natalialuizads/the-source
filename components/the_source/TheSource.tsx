"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, BookOpen, Layers, Zap } from "lucide-react";
import Link from "next/link";

export function TheSource() {
  const cards = [
    {
      title: "Fundamentos",
      description:
        "Algoritmos, Estruturas de Dados e conceitos base da computação.",
      href: "/01-fundamentos",
      icon: BookOpen,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      title: "Minha Stack",
      description: "React, Node, Next.js, Docker e todo o ecossistema moderno.",
      href: "/02-minha-stack",
      icon: Layers,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
    {
      title: "Cola",
      description: "Snippets rápidos, configurações e guias de sobrevivência.",
      href: "/cola",
      icon: Zap,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
  ];

  return (
    <div className={cn("flex flex-col gap-12 py-8")}>
      <div className={cn("flex flex-col gap-4")}>
        <h1
          className={cn(
            "text-4xl font-bold tracking-tight text-white sm:text-5xl"
          )}
        >
          The Source
        </h1>
        <p className={cn("text-lg text-muted-foreground max-w-2xl")}>
          Seu segundo cérebro para desenvolvimento de software. Uma base de
          conhecimento centralizada para fundamentos, ferramentas e referências
          rápidas.
        </p>
      </div>

      <div className={cn("grid gap-6 sm:grid-cols-2 lg:grid-cols-3")}>
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={cn(
              "group relative flex flex-col gap-4 overflow-hidden rounded-xl",
              "border border-white/10 bg-white/5",
              "p-6 hover:bg-white/10 transition-colors"
            )}
          >
            <div className={cn("p-3 w-fit rounded-lg", card.bg)}>
              <card.icon className={cn("w-6 h-6", card.color)} />
            </div>

            <div className={cn("flex flex-col gap-2")}>
              <h3
                className={cn(
                  "font-semibold text-xl text-white",
                  "group-hover:text-neon-green transition-colors"
                )}
              >
                {card.title}
              </h3>
              <p className={cn("text-muted-foreground text-sm")}>
                {card.description}
              </p>
            </div>

            <div
              className={cn(
                "mt-auto pt-4 flex items-center text-sm font-medium",
                "text-muted-foreground group-hover:text-white transition-colors"
              )}
            >
              Acessar{" "}
              <ArrowRight
                className={cn(
                  "ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                )}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
