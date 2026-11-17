import type { Metadata } from "next";
import GlossarioLista from "@/components/Glossario/GlossarioLista";
import { glossario, slugTermo } from "@/data/glossario";
import { propsWhatsApp } from "@/data/contato";

export const metadata: Metadata = {
  title: "Glossário contábil | Sólida Assessoria Contábil",
  description:
    "Termos de contabilidade e impostos explicados em linguagem simples: DAS, Fator R, pró-labore, Simples Nacional, Lucro Presumido, Reforma Tributária e mais.",
};

// Dados estruturados: ajudam o Google e as IAs a entender cada termo
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  name: "Glossário contábil da Sólida Assessoria Contábil",
  inLanguage: "pt-BR",
  hasDefinedTerm: glossario.map((t) => ({
    "@type": "DefinedTerm",
    name: t.termo,
    ...(t.nome ? { alternateName: t.nome } : {}),
    description: t.definicao,
    termCode: slugTermo(t.termo),
  })),
};

export default function Page() {
  return (
    <main id="conteudo" className="bg-creme">
      <script
        type="application/ld+json"
        // JSON gerado só a partir de data/glossario.ts; "<" escapado por segurança
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="bg-azul px-6 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Glossário</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-6xl">
            Contabilidade sem complicação
          </h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">
            Os termos e siglas que aparecem na rotina da sua empresa, explicados em linguagem simples.
          </p>
        </div>
      </section>

      <section className="px-6 py-12 md:py-16" aria-label="Termos do glossário">
        <div className="mx-auto max-w-6xl">
          <GlossarioLista />
        </div>
      </section>

      <section className="px-6 pb-20 md:pb-28">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 rounded-3xl bg-azul p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div>
            <p className="font-display text-2xl leading-snug text-white text-balance md:text-3xl">
              Ficou alguma dúvida sobre a sua empresa?
            </p>
            <p className="mt-2 font-sans text-sm text-white/70">A gente explica o que cada termo significa para o seu caso.</p>
          </div>
          <a
            {...propsWhatsApp("Olá! Vi o glossário no site e fiquei com uma dúvida.")}
            className="inline-flex min-h-12 shrink-0 items-center rounded-full bg-dourado px-7 font-sans text-sm font-semibold text-azul transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-2 focus-visible:ring-offset-azul"
          >
            Tirar dúvida no WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
