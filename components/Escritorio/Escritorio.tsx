"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fotosEscritorio, type FotoEscritorio } from "@/data/escritorio";

/* ------------------------------------------------------------------
   Galeria "Nosso escritório".
   - A foto ativa fica nítida e maior; as próximas aparecem menores e
     apagadas à direita.
   - O fundo da seção é a própria foto ativa, desfocada.
   - Setas, bolinhas, teclado (← →), deslizar o dedo e clicar na próxima.
------------------------------------------------------------------- */

type Slide = FotoEscritorio | { src: null; alt: string; legenda: string };

// Sem fotos ainda: molduras de exemplo, só no ambiente de desenvolvimento.
const EXEMPLOS: Slide[] = ["Recepção", "Sala de reunião", "Atendimento", "Equipe", "Fachada"].map((legenda) => ({
  src: null,
  alt: legenda,
  legenda,
}));

const MOSTRAR_EXEMPLOS = process.env.NODE_ENV === "development";

function Seta({ direcao }: { direcao: "esq" | "dir" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
      <path
        d={direcao === "esq" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Moldura({ legenda, fundo = false }: { legenda: string; fundo?: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#E9DFCF] via-[#DCC9AC] to-[#C9AE86]">
      {!fundo && (
        <>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-9 w-9 text-azul/40">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <circle cx="9" cy="10" r="2" />
            <path d="m21 16-5-5-8 8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="font-sans text-xs uppercase tracking-[0.2em] text-azul/50">{legenda}</span>
        </>
      )}
    </div>
  );
}

export default function Escritorio() {
  const slides: Slide[] = fotosEscritorio.length > 0 ? fotosEscritorio : MOSTRAR_EXEMPLOS ? EXEMPLOS : [];
  const total = slides.length;

  const [ativo, setAtivo] = useState(0);
  const [deslocamento, setDeslocamento] = useState(0);
  const trilhoRef = useRef<HTMLUListElement>(null);
  const toqueRef = useRef<number | null>(null);

  const ir = (i: number) => setAtivo(((i % total) + total) % total);

  // Desloca o trilho para a foto ativa ficar no ponto de partida
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const medir = () => {
      const itens = trilho.children;
      const primeiro = itens[0] as HTMLElement | undefined;
      const atual = itens[ativo] as HTMLElement | undefined;
      if (primeiro && atual) setDeslocamento(atual.offsetLeft - primeiro.offsetLeft);
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(trilho);
    return () => ro.disconnect();
  }, [ativo]);

  if (total === 0) return null;

  const atual = slides[ativo];

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      ir(ativo - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      ir(ativo + 1);
      e.preventDefault();
    }
  };

  return (
    <section
      id="escritorio"
      aria-labelledby="escritorio-titulo"
      className="relative overflow-hidden bg-creme py-16 md:py-20"
    >
      {/* Fundo: foto ativa desfocada, com véu creme por cima */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {slides.map((s, i) => (
          <div
            key={`fundo-${i}`}
            className={`absolute inset-0 scale-110 blur-2xl transition-opacity duration-700 motion-reduce:transition-none ${
              i === ativo ? "opacity-100" : "opacity-0"
            }`}
          >
            {s.src ? (
              <Image src={s.src} alt="" fill sizes="640px" className="object-cover" />
            ) : (
              <Moldura legenda="" fundo />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-creme/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-creme via-creme/40 to-transparent md:via-creme/20" />
      </div>

      <div className="relative">
        {/* Título */}
        <div className="px-6 md:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6239]">Conheça</p>
          <h2 id="escritorio-titulo" className="mt-3 font-display text-4xl text-azul md:text-5xl">
            Nosso <span className="text-[#8C6239]">escritório</span>
          </h2>
        </div>

        {/* Carrossel */}
        <div
          role="region"
          aria-roledescription="carrossel"
          aria-label="Fotos do escritório. Use as setas do teclado para navegar."
          tabIndex={0}
          onKeyDown={aoTeclar}
          className="relative mt-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8C6239] md:mt-4"
        >
          <ul
            ref={trilhoRef}
            onPointerDown={(e) => (toqueRef.current = e.clientX)}
            onPointerUp={(e) => {
              if (toqueRef.current === null) return;
              const dx = e.clientX - toqueRef.current;
              toqueRef.current = null;
              if (Math.abs(dx) > 50) ir(ativo + (dx < 0 ? 1 : -1));
            }}
            onPointerCancel={() => (toqueRef.current = null)}
            style={{ transform: `translate3d(${-deslocamento}px,0,0)` }}
            className="flex items-center gap-4 pl-6 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [touch-action:pan-y] motion-reduce:transition-none md:gap-6 md:pl-[40%]"
          >
            {slides.map((s, i) => {
              const eAtivo = i === ativo;
              const passou = i < ativo;
              return (
                <li
                  key={`${s.legenda}-${i}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${total}: ${s.legenda}`}
                  aria-hidden={!eAtivo}
                  className={`relative aspect-[9/16] w-[62vw] max-w-[300px] shrink-0 overflow-hidden rounded-2xl shadow-xl shadow-azul/10 transition-[opacity,transform] duration-700 motion-reduce:transition-none md:w-[270px] lg:w-[290px] ${
                    eAtivo ? "scale-100 opacity-100" : passou ? "scale-90 opacity-0" : "scale-[0.92] opacity-45"
                  }`}
                >
                  {s.src ? (
                    <Image
                      src={s.src}
                      alt={s.alt}
                      fill
                      sizes="(min-width: 768px) 290px, 62vw"
                      draggable={false}
                      className="select-none object-cover"
                    />
                  ) : (
                    <Moldura legenda={s.legenda} />
                  )}
                  {!eAtivo && !passou && (
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={() => ir(i)}
                      aria-label={`Ver ${s.legenda}`}
                      className="absolute inset-0 cursor-pointer bg-creme/30"
                    />
                  )}
                </li>
              );
            })}
          </ul>

          {/* Setas */}
          <button
            type="button"
            onClick={() => ir(ativo - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-azul shadow-md shadow-azul/15 transition-colors hover:bg-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] md:left-10 md:flex"
          >
            <Seta direcao="esq" />
          </button>
          <button
            type="button"
            onClick={() => ir(ativo + 1)}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-azul shadow-md shadow-azul/15 transition-colors hover:bg-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] md:right-10 md:flex"
          >
            <Seta direcao="dir" />
          </button>
        </div>

        {/* Legenda + bolinhas */}
        <div className="mt-8 px-6 md:-mt-16 md:px-16">
          <p aria-live="polite" className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6239]">
            {atual.legenda}
          </p>
          <div className="mt-4 flex items-center gap-1">
            {slides.map((s, i) => (
              <button
                key={`ponto-${i}`}
                type="button"
                onClick={() => ir(i)}
                aria-label={`Ir para a foto ${i + 1}: ${s.legenda}`}
                aria-current={i === ativo ? "true" : undefined}
                className="group flex h-6 items-center px-1 focus-visible:outline-none"
              >
                <span
                  className={`block h-1.5 rounded-full transition-all duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#8C6239] ${
                    i === ativo ? "w-6 bg-dourado-escuro" : "w-1.5 bg-azul/20 group-hover:bg-azul/40"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
