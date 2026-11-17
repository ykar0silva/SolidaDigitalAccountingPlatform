import type { Metadata } from "next";
import Diagnostico from "@/components/Diagnostico/Diagnostico";
import { perguntas } from "@/data/diagnostico";

export const metadata: Metadata = {
  title: "Diagnóstico empresarial gratuito | Sólida Assessoria Contábil",
  description:
    "Responda 12 perguntas rápidas e descubra a saúde financeira, fiscal e de gestão da sua empresa, com dicas do que melhorar.",
};

export default function Page() {
  return (
    <main id="conteudo" className="bg-creme">
      <section className="bg-azul px-6 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Diagnóstico empresarial</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Como está a saúde da sua empresa?
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            {perguntas.length} perguntas rápidas sobre finanças, impostos, sócios e gestão. Leva uns 2 minutos, e as
            respostas não são enviadas a ninguém.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-20" aria-label="Questionário">
        <Diagnostico />
      </section>
    </main>
  );
}
