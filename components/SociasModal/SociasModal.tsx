"use client";

import { useEffect } from "react";
import {
  socias,
  historiaSolida,
  missaoSolida,
  valoresSolida,
} from "@/data/socias";

type Props = {
  aberta: boolean;
  onClose: () => void;
};

export default function SociasModal({ aberta, onClose }: Props) {
  useEffect(() => {
    if (!aberta) return;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [aberta, onClose]);

  if (!aberta) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-azul/90 backdrop-blur-sm md:items-center md:px-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quem está à frente da Sólida"
    >
      <div
        className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-dourado/30 bg-azul md:max-h-[88dvh] md:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechar: fica fixo no topo ao rolar */}
        <div className="sticky top-0 z-20 -mb-12 flex justify-end p-3">
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-dourado/30 bg-azul/90 text-xl leading-none text-white transition-colors hover:border-dourado hover:text-dourado"
            aria-label="Fechar"
          >
            ×
          </button>
        </div>

        <div className="px-6 pb-8 pt-12 md:px-12 md:pb-12 md:pt-14">
          {/* Cabeçalho */}
          <header className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dourado">
              Desde 2008
            </p>
            <h2 className="mt-3 font-display text-3xl text-white md:text-4xl">
              Quem está à frente da Sólida
            </h2>
            <div className="mx-auto mt-5 h-px w-12 bg-dourado" />
            <p className="mt-6 font-sans text-base leading-relaxed text-white/85 md:text-lg">
              {historiaSolida}
            </p>
          </header>

          {/* Cartões das sócias */}
          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-6">
            {socias.map((socia) => (
              <article
                key={socia.slug}
                className="flex flex-col rounded-xl border border-dourado/20 bg-white/[0.04] p-6 md:p-7"
              >
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-dourado">
                  {socia.role}
                </p>
                <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">
                  {socia.name}
                </h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:min-h-[4.5rem]">
                  {socia.descricao}
                </p>

                <div className="mt-5 border-t border-dourado/20 pt-5">
                  <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                    Formação e atuação
                  </p>
                  <ul className="space-y-2.5">
                    {socia.qualificacoes.map((q) => (
                      <li
                        key={q}
                        className="flex gap-3 font-sans text-sm leading-snug text-white/85"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-dourado" />
                        {q}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* Missão */}
          <section className="mt-8 rounded-xl bg-dourado/10 px-6 py-7 text-center md:mt-10 md:px-12 md:py-9">
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-dourado">
              Nossa missão
            </p>
            <h3 className="mx-auto mt-3 max-w-2xl font-display text-2xl leading-snug text-white md:text-3xl">
              Construindo solidez e confiança desde 2008
            </h3>
            <p className="mx-auto mt-4 max-w-2xl font-sans text-sm leading-relaxed text-white/75">
              {missaoSolida}
            </p>
          </section>

          {/* Valores */}
          <section className="mt-8 md:mt-10">
            <p className="mb-6 text-center font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50">
              Nossos valores
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-7 md:grid-cols-4 md:gap-0 md:divide-x md:divide-dourado/20">
              {valoresSolida.map((v) => (
                <div key={v.titulo} className="px-2 text-center md:px-5">
                  <p className="font-display text-xl text-dourado">{v.titulo}</p>
                  <p className="mt-2 font-sans text-[13px] leading-snug text-white/70">
                    {v.texto}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}