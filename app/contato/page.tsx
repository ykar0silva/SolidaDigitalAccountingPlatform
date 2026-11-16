import type { Metadata } from "next";
import ContatoBloco from "@/components/Contato/ContatoBloco";

export const metadata: Metadata = {
  title: "Contato | Sólida Assessoria Contábil",
  description: "Fale com a Sólida Assessoria Contábil em Palmas-TO: WhatsApp, endereço, mapa e horário de atendimento.",
};

export default function Page() {
  return (
    <main id="conteudo">
      {/* Cabeçalho */}
      <section className="bg-azul px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Contato</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Fale com a Sólida
          </h1>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            Conte o momento da sua empresa e a gente responde com o caminho certo para ela.
          </p>
        </div>
      </section>

      <section className="bg-creme px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <ContatoBloco />
        </div>
      </section>
    </main>
  );
}
