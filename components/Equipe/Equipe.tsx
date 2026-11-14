"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function Equipe() {
  const imageRef = useRef<HTMLDivElement>(null);
  const sombraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !sombraRef.current) return;

    const mm = gsap.matchMedia();

    // A foto "acende" com o scroll: anima só a opacidade de uma camada escura
    // (mais leve que filter) e só para quem não pediu menos movimento.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.fromTo(
        sombraRef.current,
        { opacity: 0.95 },
        {
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 30%",
            end: "center center",
            scrub: true,
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section className="bg-azul py-24 px-6">
      <div
        ref={imageRef}
        className="relative w-full max-w-6xl mx-auto h-[70dvh] md:h-[85vh] rounded-2xl overflow-hidden"
      >
        <Image
          src="/images/team/foto-equipe.png"
          alt="Equipe Sólida Assessoria Contábil"
          fill
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
        <div
          ref={sombraRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-black opacity-0"
        />
      </div>

      <div className="max-w-2xl mx-auto text-center mt-10">
        <p className="font-sans text-white/80 text-base leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </section>
  );
}
