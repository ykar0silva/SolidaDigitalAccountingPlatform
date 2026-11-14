"use client";

import Image from "next/image";
import { Person } from "@/data/team";

type Props = {
  person: Person | null;
  onClose: () => void;
};

export default function TeamModal({ person, onClose }: Props) {
  if (!person) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-azul/90 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-azul border border-dourado/30 rounded-2xl max-w-md w-full p-8 flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl leading-none"
          aria-label="Fechar"
        >
          ×
        </button>

        <div className="relative w-32 h-32 rounded-full overflow-hidden mb-4">
          <Image src={person.photo} alt={person.name} fill className="object-cover" />
        </div>

        <h3 className="font-display text-dourado text-2xl">{person.name}</h3>
        <p className="font-sans text-white/70 text-sm mb-4">{person.role}</p>
        <p className="font-sans text-white text-sm leading-relaxed">{person.bio}</p>
      </div>
    </div>
  );
}