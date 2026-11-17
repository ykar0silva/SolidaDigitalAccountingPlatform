import type { Metadata } from "next";
import Link from "next/link";
import { ferramentas } from "@/data/ferramentas";
import { ANO_BASE } from "@/lib/calculos/tabelas2026";

export const metadata: Metadata = {
  title: "Calculadoras gratuitas | Sólida Assessoria Contábil",
  description: `Calculadoras de DAS MEI, pró-labore, regime tributário, margem de lucro, ponto de equilíbrio e 13º salário, atualizadas para ${ANO_BASE}.`,
};

export default function Page() {
  return (
    <main id="conteudo" className="bg-creme">
      <section className="bg-azul px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Ferramentas gratuitas</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Calculadoras para a sua empresa
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            Faça as contas antes de decidir. Valores e tabelas atualizados para {ANO_BASE}.
          </p>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24" aria-label="Calculadoras">
        <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ferramentas.map((f) => (
            <li key={f.slug}>
              <Link
                href={`/ferramentas/${f.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-azul/10 bg-white p-7 shadow-sm shadow-azul/5 transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] motion-reduce:hover:translate-y-0"
              >
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">{f.publico}</span>
                <span className="mt-3 font-display text-2xl text-azul">{f.nome}</span>
                <span className="mt-2 flex-1 font-sans text-sm leading-relaxed text-azul/65">{f.descricao}</span>
                <span className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-azul">
                  Calcular
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
