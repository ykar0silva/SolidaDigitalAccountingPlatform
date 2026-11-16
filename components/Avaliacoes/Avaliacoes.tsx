"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { avaliacoes, type Avaliacao } from "@/data/avaliacoes";
import { Estrelas } from "./CardGoogle";

/* ------------------------------------------------------------------
   Carrossel de avaliações.
   - Anda sozinho devagar.
   - Segurar (dedo ou mouse) para; arrastar move para frente ou para trás.
   - Soltar com força: continua rápido e vai desacelerando até voltar
     à velocidade normal (inércia).
   - Setas do teclado empurram; botão de pausa; com "reduzir movimento"
     ele não anda sozinho, mas ainda dá para arrastar.
------------------------------------------------------------------- */

const VELOCIDADE = 32; // px/s andando sozinho
const ATRITO = 2.2; // quanto maior, mais rápido a inércia some
const VEL_MAX = 4500; // px/s no arremesso
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
  const [pausado, setPausado] = useState(false);
  const [arrastando, setArrastando] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const primeiraRef = useRef<HTMLDivElement>(null);

  // Estado do movimento fora do React (não re-renderiza a cada quadro)
  const mov = useRef({
    x: 0,
    v: -VELOCIDADE,
    largura: 0,
    arrastando: false,
    sobre: false,
    foco: false,
    pausado: false,
    visivel: true,
    menosMovimento: false,
    amostras: [] as { x: number; t: number }[],
  });

  useEffect(() => {
    mov.current.pausado = pausado;
  }, [pausado]);

  useEffect(() => {
    const m = mov.current;
    const viewport = viewportRef.current;
    const trilho = trilhoRef.current;
    const primeira = primeiraRef.current;
    if (!viewport || !trilho || !primeira) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const lerMq = () => (m.menosMovimento = mq.matches);
    lerMq();
    mq.addEventListener("change", lerMq);

    // Largura de uma cópia da lista: ponto onde o laço recomeça
    const medir = () => (m.largura = primeira.offsetWidth);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(primeira);

    const io = new IntersectionObserver(([e]) => (m.visivel = e.isIntersecting));
    io.observe(viewport);

    let raf = 0;
    let ultimo = performance.now();

    const quadro = (agora: number) => {
      const dt = Math.min((agora - ultimo) / 1000, 0.05);
      ultimo = agora;

      if (!m.arrastando && m.visivel && m.largura > 0) {
        const parado = m.pausado || m.sobre || m.foco || m.menosMovimento;
        const alvo = parado ? 0 : -VELOCIDADE;
        // Inércia: a velocidade volta aos poucos para o alvo
        m.v = alvo + (m.v - alvo) * Math.exp(-ATRITO * dt);
        m.x += m.v * dt;
      }

      // Laço infinito: mantém x entre -largura e 0
      if (m.largura > 0) {
        while (m.x <= -m.largura) m.x += m.largura;
        while (m.x > 0) m.x -= m.largura;
      }
      trilho.style.transform = `translate3d(${m.x}px,0,0)`;
      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", lerMq);
    };
  }, []);

  /* ---------- Arrastar (dedo e mouse) ---------- */

  const aoPressionar = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    const m = mov.current;
    m.arrastando = true;
    m.v = 0;
    m.amostras = [{ x: e.clientX, t: performance.now() }];
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ponteiro já liberado pelo navegador: o arrasto segue sem captura
    }
    setArrastando(true);
  };

  const aoMover = (e: React.PointerEvent<HTMLDivElement>) => {
    const m = mov.current;
    if (!m.arrastando) return;
    const ultima = m.amostras[m.amostras.length - 1];
    m.x += e.clientX - ultima.x;
    const agora = performance.now();
    m.amostras.push({ x: e.clientX, t: agora });
    // Guarda só os últimos ~100 ms para medir a velocidade do arremesso
    while (m.amostras.length > 2 && agora - m.amostras[0].t > 100) m.amostras.shift();
  };

  const aoSoltar = (e: React.PointerEvent<HTMLDivElement>) => {
    const m = mov.current;
    if (!m.arrastando) return;
    m.arrastando = false;
    const a = m.amostras[0];
    const b = m.amostras[m.amostras.length - 1];
    const dt = (b.t - a.t) / 1000;
    const solto = performance.now() - b.t > 80; // segurou parado antes de soltar
    const v = dt > 0 && !solto ? (b.x - a.x) / dt : 0;
    m.v = Math.max(-VEL_MAX, Math.min(VEL_MAX, v));
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // nada a liberar
    }
    setArrastando(false);
  };

  const aoTeclar = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const m = mov.current;
    if (e.key === "ArrowLeft") {
      m.v += 700;
      e.preventDefault();
    } else if (e.key === "ArrowRight") {
      m.v -= 700;
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
        ref={viewportRef}
        role="region"
        aria-roledescription="carrossel"
        aria-label="Avaliações de clientes. Arraste ou use as setas do teclado para navegar."
        tabIndex={0}
        onKeyDown={aoTeclar}
        onFocus={() => (mov.current.foco = true)}
        onBlur={() => (mov.current.foco = false)}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") mov.current.sobre = true;
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") mov.current.sobre = false;
        }}
        onPointerDown={aoPressionar}
        onPointerMove={aoMover}
        onPointerUp={aoSoltar}
        onPointerCancel={aoSoltar}
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
