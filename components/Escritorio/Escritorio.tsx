"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { fotosEscritorio, type FotoEscritorio } from "@/data/escritorio";
import { useCarrosselInfinito } from "@/lib/useCarrosselInfinito";

/* ------------------------------------------------------------------
   Galeria "Nosso escritório".
   - Desliza sozinha, como as avaliações: dá para segurar, arrastar e
     arremessar (o movimento fica em lib/useCarrosselInfinito.ts).
   - A foto que passa pelo ponto de destaque fica nítida e maior; as
     outras, dos dois lados, aparecem menores e apagadas.
   - O fundo da seção é a fachada do escritório, desfocada e clareada.
   - Setas, bolinhas e teclado (← →) levam a uma foto; clicar numa
     foto apagada também.
------------------------------------------------------------------- */

type Slide = FotoEscritorio | { src: null; alt: string; legenda: string };

// Sem fotos ainda: molduras de exemplo, só no ambiente de desenvolvimento.
const EXEMPLOS: Slide[] = ["Recepção", "Sala de reunião", "Atendimento", "Equipe", "Fachada"].map((legenda) => ({
  src: null,
  alt: legenda,
  legenda,
}));

const MOSTRAR_EXEMPLOS = process.env.NODE_ENV === "development";
const COPIAS = 4;
const FUNDO = "/images/escritorio/fachada.webp"; // foto de fundo da seção // repetições da lista para nunca faltar foto na tela

function Seta({ direcao }: { direcao: "esq" | "dir" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
      <path d={direcao === "esq" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Moldura({ legenda }: { legenda: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#E9DFCF] via-[#DCC9AC] to-[#C9AE86]">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-9 w-9 text-azul/40">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="2" />
        <path d="m21 16-5-5-8 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="font-sans text-xs uppercase tracking-[0.2em] text-azul/50">{legenda}</span>
    </div>
  );
}

export default function Escritorio() {
  const slides: Slide[] = fotosEscritorio.length > 0 ? fotosEscritorio : MOSTRAR_EXEMPLOS ? EXEMPLOS : [];
  const total = slides.length;

  const [ativo, setAtivo] = useState(0);
  const ativoRef = useRef(0);

  // Cards de todas as cópias e a posição de cada um dentro do trilho
  const cardsRef = useRef<{ el: HTMLElement; i: number; pos: number }[]>([]);
  const passoRef = useRef(1); // distância entre um card e o próximo

  // A cada quadro: escala/opacidade por distância do ponto de destaque
  const aoQuadro = (x: number) => {
    const passo = passoRef.current;
    let melhor = -1;
    let menor = Infinity;
    for (const c of cardsRef.current) {
      const t = (x + c.pos) / passo; // 0 = no destaque; >0 à direita; <0 à esquerda
      const d = Math.min(Math.abs(t), 1);
      // Mesmo efeito dos dois lados: menores e apagadas, sem sumir
      const opacidade = 1 - d * 0.55;
      const escala = 1 - d * 0.08;
      c.el.style.opacity = opacidade.toFixed(3);
      c.el.style.transform = `scale(${escala.toFixed(4)})`;
      if (Math.abs(t) < menor) {
        menor = Math.abs(t);
        melhor = c.i;
      }
    }
    if (melhor >= 0 && melhor !== ativoRef.current) {
      ativoRef.current = melhor;
      setAtivo(melhor);
    }
  };

  const { mov, trilhoRef, primeiraRef, propsViewport, arrastando, irPara } =
    useCarrosselInfinito({ velocidade: 28, aoQuadro });

  // Mede a posição dos cards (e de novo quando a tela muda de tamanho)
  useEffect(() => {
    const trilho = trilhoRef.current;
    if (!trilho) return;
    const medir = () => {
      const els = Array.from(trilho.querySelectorAll<HTMLElement>("[data-card]"));
      cardsRef.current = els.map((el) => ({ el, i: Number(el.dataset.card), pos: el.offsetLeft }));
      if (els.length > 1) passoRef.current = els[1].offsetLeft - els[0].offsetLeft;
    };
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(trilho);
    return () => ro.disconnect();
  }, [trilhoRef, total]);

  if (total === 0) return null;

  // Leva a foto i (da primeira cópia) ao destaque, pelo caminho mais curto
  const irParaFoto = (i: number) => {
    const j = ((i % total) + total) % total;
    const card = cardsRef.current.find((c) => c.i === j);
    if (card) irPara(-card.pos);
  };

  const aoTeclar = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      irParaFoto(ativo - 1);
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      irParaFoto(ativo + 1);
      e.preventDefault();
    }
  };

  const atual = slides[ativo] ?? slides[0];

  return (
    <section id="escritorio" aria-labelledby="escritorio-titulo" className="relative overflow-hidden bg-creme py-16 md:py-20">
      {/* Fundo: fachada do escritório desfocada, com véu creme por cima */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <Image
          src={FUNDO}
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover object-center blur-[6px]"
        />
        <div className="absolute inset-0 bg-creme/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-creme/90 via-creme/30 to-creme/10" />
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
        <div className="relative mt-10 md:mt-4">
          <div
            {...propsViewport}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Fotos do escritório. Arraste ou use as setas do teclado para navegar."
            tabIndex={0}
            onKeyDown={aoTeclar}
            className={`overflow-hidden py-4 pl-6 [touch-action:pan-y] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8C6239] md:pl-[40%] ${
              arrastando ? "cursor-grabbing" : "cursor-grab"
            }`}
          >
            <div ref={trilhoRef} className="relative flex w-max will-change-transform">
              {Array.from({ length: COPIAS }, (_, copia) => (
                <div
                  key={copia}
                  ref={copia === 0 ? primeiraRef : undefined}
                  className="flex"
                  aria-hidden={copia > 0 ? true : undefined}
                >
                  {slides.map((s, i) => (
                    <div
                      key={`${copia}-${i}`}
                      data-card={i}
                      onClick={(e) => {
                        // Clique (sem arrastar) numa foto leva ela ao destaque
                        if (mov.current.arrastou > 6) return;
                        irPara(-e.currentTarget.offsetLeft);
                      }}
                      className="relative mr-4 aspect-[9/16] w-[62vw] max-w-[300px] shrink-0 select-none overflow-hidden rounded-2xl shadow-xl shadow-azul/10 will-change-transform md:mr-6 md:w-[270px] lg:w-[290px]"
                    >
                      {s.src ? (
                        <Image
                          src={s.src}
                          alt={copia === 0 ? s.alt : ""}
                          fill
                          sizes="(min-width: 768px) 290px, 62vw"
                          draggable={false}
                          className="pointer-events-none object-cover"
                        />
                      ) : (
                        <Moldura legenda={s.legenda} />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Setas (no celular a navegação é arrastando) */}
          <button
            type="button"
            onClick={() => irParaFoto(ativo - 1)}
            aria-label="Foto anterior"
            className="absolute left-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-azul shadow-md shadow-azul/15 transition-colors hover:bg-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] md:left-10 md:flex"
          >
            <Seta direcao="esq" />
          </button>
          <button
            type="button"
            onClick={() => irParaFoto(ativo + 1)}
            aria-label="Próxima foto"
            className="absolute right-3 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-azul shadow-md shadow-azul/15 transition-colors hover:bg-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] md:right-10 md:flex"
          >
            <Seta direcao="dir" />
          </button>
        </div>

        {/* Legenda + bolinhas */}
        <div className="mt-6 px-6 md:px-16">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6239]">{atual.legenda}</p>
          <div className="mt-4 flex items-center gap-1">
            {slides.map((s, i) => (
              <button
                key={`ponto-${i}`}
                type="button"
                onClick={() => irParaFoto(i)}
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
