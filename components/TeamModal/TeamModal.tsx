"use client";

import Image from "next/image";
import { Person } from "@/data/team";
import { useDialogo } from "@/lib/useDialogo";

type Props = {
  person: Person | null;
  onClose: () => void;
};

export default function TeamModal({ person, onClose }: Props) {
  const { caixaRef, fecharRef } = useDialogo<HTMLDivElement>(person !== null, onClose);

  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-azul/90 backdrop-blur-sm px-4 overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-modal-titulo"
    >
      <div
        ref={caixaRef}
        className="relative bg-azul border border-dourado/30 rounded-2xl max-w-md w-full max-h-[90dvh] overflow-y-auto overscroll-contain p-8 flex flex-col items-center text-center"
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

        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image src={person.photo} alt={person.name} fill sizes="128px" className="object-cover" />
        </div>

        <h2 id="team-modal-titulo" className="font-display text-dourado text-2xl text-balance">{person.name}</h2>
        <p className="font-sans text-white/70 text-sm mb-4">{person.role}</p>
        <p className="font-sans text-white text-sm leading-relaxed">{person.bio}</p>
      </div>
    </div>
  );
}