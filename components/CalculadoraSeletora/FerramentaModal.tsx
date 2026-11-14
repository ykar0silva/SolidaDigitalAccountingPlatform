"use client";

import { Ferramenta } from "@/data/ferramentas";
import { useDialogo } from "@/lib/useDialogo";

type Props = {
  ferramenta: Ferramenta | null;
  onClose: () => void;
};

export default function FerramentaModal({ ferramenta, onClose }: Props) {
  const { caixaRef, fecharRef } = useDialogo<HTMLDivElement>(ferramenta !== null, onClose);

  if (!ferramenta) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-azul/90 backdrop-blur-sm px-4 overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ferramenta-modal-titulo"
    >
      <div
        ref={caixaRef}
        className="relative bg-azul border border-dourado/30 rounded-2xl max-w-md w-full max-h-[90dvh] overflow-y-auto overscroll-contain p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          ref={fecharRef}
          className="absolute top-4 right-4 text-white text-2xl leading-none transition-colors hover:text-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado rounded-full"
          aria-label="Fechar"
        >
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="ferramenta-modal-titulo" className="font-display text-dourado text-2xl mb-2 text-balance">{ferramenta.name}</h2>
        <p className="font-sans text-white/70 text-sm mb-6">{ferramenta.description}</p>

        {/* Placeholder — cada calculadora real entra aqui depois */}
        <div className="rounded-xl border border-dashed border-dourado/30 p-6 text-center">
          <p className="font-sans text-white/50 text-sm">
            Calculadora de {ferramenta.name} em construção.
          </p>
        </div>
      </div>
    </div>
  );
}