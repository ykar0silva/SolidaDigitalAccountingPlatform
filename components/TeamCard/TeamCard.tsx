  "use client";

  import Image from "next/image";
  import { Person } from "@/data/team";

  type Props = {
    person: Person;
    onOpen: (person: Person) => void;
    size?: "large" | "small";
  };

  export default function TeamCard({ person, onOpen, size = "small" }: Props) {
    const dimension = size === "large" ? "w-56 h-56 md:w-72 md:h-72" : "w-40 h-40 md:w-48 md:h-48";

    return (
      <div className="flex flex-col items-center text-center">
        <button
          onClick={() => onOpen(person)}
          className={`group relative ${dimension} rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-dourado`}
          aria-label={`Conhecer ${person.name}`}
        >
          <Image
            src={person.photo}
            alt={person.name}
            fill
            className="object-cover"
          />

          {/* Overlay de hover — só desktop */}
          <div className="hidden md:flex absolute inset-0 bg-azul/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center">
            <span className="font-sans text-dourado text-sm font-semibold">
              Conhecer história
            </span>
          </div>
        </button>

        <h3 className="font-display text-white text-xl mt-4">{person.name}</h3>
        <p className="font-sans text-dourado text-sm">{person.role}</p>

        {/* Botão "Conhecer" — só mobile */}
        <button
          onClick={() => onOpen(person)}
          className="md:hidden mt-3 px-5 py-2 rounded-full bg-dourado text-azul text-sm font-semibold"
        >
          Conhecer
        </button>
      </div>
    );
  }