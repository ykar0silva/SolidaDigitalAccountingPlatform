import type { Metadata } from "next";
import Image from "next/image";
import { socias, historiaSolida, missaoSolida, valoresSolida, equipe } from "@/data/socias";
import { propsWhatsApp } from "@/data/contato";

export const metadata: Metadata = {
  title: "Sobre | Sólida Assessoria Contábil",
  description:
    "Conheça a história da Sólida Assessoria Contábil, fundada em 2008 em Palmas-TO pelas irmãs Cleia e Núbia Fernandes.",
};

// Página Sobre: história, sócias, equipe, missão e valores.
export default function Page() {
  return (
    <main id="conteudo" className="bg-azul">
      {/* Cabeçalho + história */}
      <section className="px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-dourado">
            Desde 2008
          </p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Quem está à frente da Sólida
          </h1>
          <div aria-hidden="true" className="mx-auto mt-6 h-px w-12 bg-dourado" />
          <p className="mt-6 font-sans text-base leading-relaxed text-white/85 md:text-lg">
            {historiaSolida}
          </p>
        </div>
      </section>

      {/* Sócias */}
      <section aria-labelledby="socias-titulo" className="px-6 pb-16 md:pb-24">
        <h2 id="socias-titulo" className="sr-only">
          As sócias
        </h2>
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {socias.map((socia) => (
            <article
              key={socia.slug}
              className="flex flex-col rounded-2xl border border-dourado/20 bg-white/[0.04] p-6 md:p-8"
            >
              <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-dourado">
                {socia.role}
              </p>
              <h3 className="mt-2 font-display text-2xl text-white md:text-3xl">{socia.name}</h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-white/80 md:min-h-[4.5rem] md:text-base">
                {socia.descricao}
              </p>

              <div className="mt-5 border-t border-dourado/20 pt-5">
                <p className="mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-white/50">
                  Formação e atuação
                </p>
                <ul className="space-y-2.5">
                  {socia.qualificacoes.map((q) => (
                    <li key={q} className="flex gap-3 font-sans text-sm leading-snug text-white/85">
                      <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-dourado" />
                      {q}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Equipe */}
      <section aria-labelledby="equipe-titulo" className="border-t border-dourado/15 px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_1fr] md:gap-14">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-dourado/20 bg-white/[0.04]">
            {equipe.foto ? (
              <Image
                src={equipe.foto}
                alt={equipe.fotoAlt}
                fill
                sizes="(min-width: 1024px) 540px, 100vw"
                className="object-cover"
              />
            ) : (
              // Sem foto ainda: moldura neutra no lugar
              <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" className="h-10 w-10 text-dourado/50">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <circle cx="9" cy="10" r="2" />
                  <path d="m21 16-5-5-8 8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-sans text-xs uppercase tracking-[0.2em] text-white/40">Foto da equipe</p>
              </div>
            )}
          </div>

          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-dourado">
              Nossa equipe
            </p>
            <h2 id="equipe-titulo" className="mt-3 font-display text-3xl leading-snug text-white text-balance md:text-4xl">
              {equipe.titulo}
            </h2>
            <div aria-hidden="true" className="mt-5 h-px w-12 bg-dourado" />
            {equipe.paragrafos.map((p) => (
              <p key={p} className="mt-5 font-sans text-base leading-relaxed text-white/80">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Missão e valores */}
      <section className="bg-creme px-6 py-20 md:py-28" aria-labelledby="missao-titulo">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#8C6239]">
              Nossa missão
            </p>
            <h2 id="missao-titulo" className="mt-3 font-display text-3xl leading-snug text-azul text-balance md:text-4xl">
              Construindo solidez e confiança desde 2008
            </h2>
            <p className="mt-5 font-sans text-base leading-relaxed text-azul/70">{missaoSolida}</p>
          </div>

          <h2 className="mt-16 text-center font-sans text-xs font-semibold uppercase tracking-[0.25em] text-azul/50">
            Nossos valores
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4 md:gap-0 md:divide-x md:divide-azul/10">
            {valoresSolida.map((v) => (
              <li key={v.titulo} className="px-2 text-center md:px-6">
                <p className="font-display text-2xl text-azul">{v.titulo}</p>
                <p className="mt-2 font-sans text-sm leading-snug text-azul/65">{v.texto}</p>
              </li>
            ))}
          </ul>

          <div className="mt-16 text-center">
            <a
              {...propsWhatsApp("Olá! Conheci a história da Sólida pelo site e quero conversar.")}
              className="inline-flex min-h-12 items-center rounded-full bg-azul px-8 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#8C6239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] focus-visible:ring-offset-2 focus-visible:ring-offset-creme"
            >
              Falar com a Sólida
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
