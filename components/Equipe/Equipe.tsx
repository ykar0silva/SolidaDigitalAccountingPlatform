"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function Equipe() {
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { filter: "brightness(0.05)" },
        {
          filter: "brightness(1)",
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

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener("resize", handleResize);
    };
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
          className="object-cover"
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