"use client";

import { Ferramenta } from "@/data/ferramentas";

type Props = {
  ferramenta: Ferramenta | null;
  onClose: () => void;
};

export default function FerramentaModal({ ferramenta, onClose }: Props) {
  if (!ferramenta) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-azul/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-azul border border-dourado/30 rounded-2xl max-w-md w-full p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        <h3 className="font-display text-dourado text-2xl mb-2">{ferramenta.name}</h3>
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