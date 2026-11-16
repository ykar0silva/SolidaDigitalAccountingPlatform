"use client";

import Image from "next/image";
import { avaliacoes, type Avaliacao } from "@/data/avaliacoes";
import { Estrelas } from "./CardGoogle";
import { useCarrosselInfinito } from "@/lib/useCarrosselInfinito";

// Carrossel de avaliações: o movimento (andar sozinho, arrastar, inércia)
// fica em lib/useCarrosselInfinito.ts.

const COPIAS = 3; // repetições da lista para nunca faltar card na tela

function Card({ item }: { item: Avaliacao }) {
  return (
    <div className="mr-6 flex min-h-[230px] w-[290px] shrink-0 select-none flex-col justify-between rounded-2xl border border-azul/10 bg-white p-6 shadow-md shadow-azul/10 md:w-[340px]">
      <div>
        <Estrelas nota={item.nota} className="text-lg" />
        <p className="mt-3 line-clamp-5 font-sans text-sm leading-relaxed text-azul/70">“{item.texto}”</p>
      </div>

      <div className="mt-5 flex items-center gap-3">
        {item.foto ? (
          <Image
            src={item.foto}
            alt=""
            width={44}
            height={44}
            draggable={false}
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-azul font-display text-lg text-dourado">
            {item.nome.charAt(0)}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate font-sans text-sm font-semibold text-azul">{item.nome}</p>
          <p className="font-sans text-xs text-azul/50">{item.detalhe}</p>
        </div>
      </div>
    </div>
  );
}

export default function Avaliacoes() {
  const mask = "linear-gradient(to right, transparent, black 8%, black 92%, transparent)";
  const { trilhoRef, primeiraRef, propsViewport, pausado, setPausado, arrastando, empurrar } =
    useCarrosselInfinito({ velocidade: 32 });

  const aoTeclar = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      empurrar(700);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      empurrar(-700);
      e.preventDefault();
    }
  };

  return (
    <section className="bg-creme pb-10 pt-6 md:pb-12 md:pt-8" aria-label="Avaliações de clientes no Google">
      <div className="mb-4 flex justify-end px-6 md:px-12">
        <button
          type="button"
          onClick={() => setPausado((p) => !p)}
          aria-pressed={pausado}
          className="marquee-toggle rounded-full border border-azul/20 px-4 py-1.5 font-sans text-xs font-semibold text-azul/70 transition-colors hover:border-dourado-escuro hover:text-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado-escuro"
        >
          {pausado ? "Retomar avaliações" : "Pausar avaliações"}
        </button>
      </div>

      <div
        {...propsViewport}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Avaliações de clientes. Arraste ou use as setas do teclado para navegar."
        tabIndex={0}
        onKeyDown={aoTeclar}
        className={`overflow-hidden py-2 [touch-action:pan-y] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-dourado-escuro ${
          arrastando ? "cursor-grabbing" : "cursor-grab"
        }`}
        style={{ maskImage: mask, WebkitMaskImage: mask }}
      >
        <div ref={trilhoRef} className="flex w-max will-change-transform">
          {Array.from({ length: COPIAS }, (_, copia) => (
            <div
              key={copia}
              ref={copia === 0 ? primeiraRef : undefined}
              className="flex"
              aria-hidden={copia > 0 ? true : undefined}
            >
              {avaliacoes.map((item) => (
                <Card key={`${copia}-${item.nome}`} item={item} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
