"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ferramentasDestaque } from "@/data/ferramentasDestaque";

export default function FerramentasDestaque() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const track = trackRef.current!;
      const section = sectionRef.current!;
      const cards = Array.from(track.children) as HTMLElement[];

      gsap.set(track, { x: 0 });

      const containerWidth = window.innerWidth;
      const firstRect = cards[0].getBoundingClientRect();
      const lastRect = cards[cards.length - 1].getBoundingClientRect();

      const startX = containerWidth / 2 - (firstRect.left + firstRect.width / 2);
      const endX = containerWidth / 2 - (lastRect.left + lastRect.width / 2);
      const travelDistance = Math.abs(startX - endX);

      gsap.set(track, { x: startX });

      const updateOpacity = () => {
        const centerX = window.innerWidth / 2;
        cards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          const cardCenter = rect.left + rect.width / 2;
          const distance = Math.abs(cardCenter - centerX);
          const maxDistance = window.innerWidth / 2 + rect.width / 2;
          const proximity = 1 - Math.min(distance / maxDistance, 1);
          gsap.set(card, {
            opacity: gsap.utils.clamp(0.15, 1, Math.pow(proximity, 1.4)),
          });
        });
      };

      updateOpacity();

      const tween = gsap.to(track, {
        x: endX,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: `+=${travelDistance}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: updateOpacity,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-0 bg-azul overflow-hidden py-16 md:py-0 md:h-screen md:flex md:flex-col md:justify-center"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/fundo-ferramentas.jpg"
          alt=""
          fill
          className="object-cover scale-110 blur-md"
        />
        <div className="absolute inset-0 bg-azul/60" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center mb-10 px-6">
        <span className="font-sans text-dourado text-xs uppercase tracking-widest">
          Ferramentas gratuitas
        </span>
        <h2 className="font-display text-white text-3xl md:text-4xl mt-3">
          Recursos para cuidar da sua empresa
        </h2>
      </div>

      <div
        ref={trackRef}
        className="relative z-10 flex gap-6 px-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-4 md:pb-0"
      >
        {ferramentasDestaque.map((f) => (
          <Link
            key={f.slug}
            href={f.href}
            className="snap-center shrink-0 w-[85vw] md:w-[420px] rounded-2xl overflow-hidden bg-azul/70 backdrop-blur-sm border border-dourado/40 hover:border-dourado/70 transition-colors shadow-xl"
          >
            <div className="relative w-full h-56">
              <Image src={f.images[0]} alt={f.title} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-display text-dourado text-xl mb-2">{f.title}</h3>
              <p className="font-sans text-white/80 text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}