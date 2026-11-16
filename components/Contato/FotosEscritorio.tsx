import Image from "next/image";
import { fotosEscritorio } from "@/data/escritorio";

// Faixa com fotos do escritório (some sozinha enquanto não houver fotos).
export default function FotosEscritorio() {
  if (fotosEscritorio.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
        Venha tomar um café com a gente
      </p>
      <ul className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
        {fotosEscritorio.slice(0, 4).map((foto) => (
          <li key={foto.src} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-azul/5">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 768px) 280px, 50vw"
              className="object-cover"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
