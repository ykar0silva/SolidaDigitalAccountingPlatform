"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------
   Movimento de carrossel infinito (usado em Avaliações e Escritório).
   - Anda sozinho devagar.
   - Segurar (dedo ou mouse) para; arrastar move para frente ou para trás.
   - Soltar com força: continua rápido e vai desacelerando até voltar
     à velocidade normal (inércia).
   - Pausa com o mouse em cima, com foco de teclado, com o botão de
     pausa, fora da tela e com "reduzir movimento" no sistema.
   - irPara(x): desliza suavemente até uma posição e volta a andar.

   Estrutura esperada:
     viewport (overflow-hidden, recebe os handlers)
       trilho (é ele que se move)
         cópia 1 (primeiraRef: a largura dela é o tamanho do laço)
         cópia 2, cópia 3...
------------------------------------------------------------------- */

const ATRITO = 2.2; // quanto maior, mais rápido a inércia some
const VEL_MAX = 4500; // px/s no arremesso
const SUAVIDADE = 7; // velocidade do deslize do irPara

type Opcoes = {
  velocidade?: number; // px/s andando sozinho
  // Chamado a cada quadro com a posição atual (para efeitos por card)
  aoQuadro?: (x: number, largura: number) => void;
};

export function useCarrosselInfinito({ velocidade = 32, aoQuadro }: Opcoes = {}) {
  const [pausado, setPausado] = useState(false);
  const [arrastando, setArrastando] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const trilhoRef = useRef<HTMLDivElement>(null);
  const primeiraRef = useRef<HTMLDivElement>(null);
  const aoQuadroRef = useRef(aoQuadro);

  // Estado do movimento fora do React (não re-renderiza a cada quadro)
  const mov = useRef({
    x: 0,
    v: -velocidade,
    largura: 0,
    destino: null as number | null,
    arrastando: false,
    arrastou: 0, // distância arrastada no último toque (para ignorar o clique)
    sobre: false,
    foco: false,
    pausado: false,
    visivel: true,
    menosMovimento: false,
    amostras: [] as { x: number; t: number }[],
  });

  useEffect(() => {
    aoQuadroRef.current = aoQuadro;
  }, [aoQuadro]);

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
        if (m.destino !== null) {
          // Deslize suave até o destino; chegando, volta a andar devagar
          m.x += (m.destino - m.x) * (1 - Math.exp(-SUAVIDADE * dt));
          if (Math.abs(m.destino - m.x) < 0.5) {
            m.x = m.destino;
            m.destino = null;
            m.v = 0;
          }
        } else {
          const parado = m.pausado || m.sobre || m.foco || m.menosMovimento;
          const alvo = parado ? 0 : -velocidade;
          // Inércia: a velocidade volta aos poucos para o alvo
          m.v = alvo + (m.v - alvo) * Math.exp(-ATRITO * dt);
          m.x += m.v * dt;
        }
      }

      // Laço infinito: mantém x entre -largura e 0 (o destino acompanha)
      if (m.largura > 0) {
        while (m.x <= -m.largura) {
          m.x += m.largura;
          if (m.destino !== null) m.destino += m.largura;
        }
        while (m.x > 0) {
          m.x -= m.largura;
          if (m.destino !== null) m.destino -= m.largura;
        }
      }
      trilho.style.transform = `translate3d(${m.x}px,0,0)`;
      aoQuadroRef.current?.(m.x, m.largura);
      raf = requestAnimationFrame(quadro);
    };
    raf = requestAnimationFrame(quadro);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mq.removeEventListener("change", lerMq);
    };
  }, [velocidade]);

  /* ---------- Deslizar até uma posição ---------- */

  // Leva o trilho até x (no laço, pelo caminho mais curto)
  const irPara = (x: number) => {
    const m = mov.current;
    if (m.largura <= 0) return;
    const voltas = Math.round((m.x - x) / m.largura);
    m.destino = m.menosMovimento ? null : x + voltas * m.largura;
    if (m.menosMovimento) m.x = x + voltas * m.largura;
    m.v = 0;
  };

  // Empurrão (setas do teclado nas avaliações)
  const empurrar = (dv: number) => {
    mov.current.destino = null;
    mov.current.v += dv;
  };

  /* ---------- Arrastar (dedo e mouse) ---------- */

  const aoPressionar = (e: React.PointerEvent<HTMLElement>) => {
    if (e.button !== 0) return;
    const m = mov.current;
    m.arrastando = true;
    m.arrastou = 0;
    m.destino = null;
    m.v = 0;
    // Quem arrastou quer o carrossel andando ao soltar: tira a pausa do hover
    m.sobre = false;
    m.amostras = [{ x: e.clientX, t: performance.now() }];
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ponteiro já liberado pelo navegador: o arrasto segue sem captura
    }
    setArrastando(true);
  };

  const aoMover = (e: React.PointerEvent<HTMLElement>) => {
    const m = mov.current;
    if (!m.arrastando) return;
    const ultima = m.amostras[m.amostras.length - 1];
    const dx = e.clientX - ultima.x;
    m.x += dx;
    m.arrastou += Math.abs(dx);
    const agora = performance.now();
    m.amostras.push({ x: e.clientX, t: agora });
    // Guarda só os últimos ~100 ms para medir a velocidade do arremesso
    while (m.amostras.length > 2 && agora - m.amostras[0].t > 100) m.amostras.shift();
  };

  const aoSoltar = (e: React.PointerEvent<HTMLElement>) => {
    const m = mov.current;
    if (!m.arrastando) return;
    m.arrastando = false;
    const a = m.amostras[0];
    const b = m.amostras[m.amostras.length - 1];
    const dt = (b.t - a.t) / 1000;
    const segurou = performance.now() - b.t > 80; // ficou parado antes de soltar
    const v = dt > 0 && !segurou ? (b.x - a.x) / dt : 0;
    m.v = Math.max(-VEL_MAX, Math.min(VEL_MAX, v));
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // nada a liberar
    }
    setArrastando(false);
  };

  // Props para o viewport
  const propsViewport = {
    ref: viewportRef,
    // Só pausa com foco de TECLADO (tocar/clicar também foca, e isso travava)
    onFocus: (e: React.FocusEvent<HTMLElement>) => {
      mov.current.foco = e.currentTarget.matches(":focus-visible");
    },
    onBlur: () => (mov.current.foco = false),
    onPointerEnter: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse" && !mov.current.arrastando) mov.current.sobre = true;
    },
    onPointerLeave: (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType === "mouse") mov.current.sobre = false;
    },
    onPointerDown: aoPressionar,
    onPointerMove: aoMover,
    onPointerUp: aoSoltar,
    onPointerCancel: aoSoltar,
  };

  return { mov, trilhoRef, primeiraRef, propsViewport, pausado, setPausado, arrastando, irPara, empurrar };
}
