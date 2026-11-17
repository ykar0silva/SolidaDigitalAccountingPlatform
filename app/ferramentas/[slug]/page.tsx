import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buscarFerramenta, ferramentas } from "@/data/ferramentas";
import { calculadoras } from "@/components/Calculadoras";
import { propsWhatsApp } from "@/data/contato";
import { ANO_BASE } from "@/lib/calculos/tabelas2026";

// Só existem as calculadoras listadas em data/ferramentas.ts
export const dynamicParams = false;

export function generateStaticParams() {
  return ferramentas.map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: PageProps<"/ferramentas/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const f = buscarFerramenta(slug);
  if (!f) return {};
  return {
    title: `${f.titulo} | Sólida Assessoria Contábil`,
    description: f.descricao,
  };
}

export default async function Page({ params }: PageProps<"/ferramentas/[slug]">) {
  const { slug } = await params;
  const f = buscarFerramenta(slug);
  const Calculadora = calculadoras[slug];
  if (!f || !Calculadora) notFound();

  const outras = ferramentas.filter((o) => o.slug !== f.slug);

  return (
    <main id="conteudo" className="bg-creme">
      {/* Cabeçalho */}
      <section className="bg-azul px-6 pb-14 pt-36 md:pb-16 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <nav aria-label="Você está em" className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">
            <ol className="flex flex-wrap items-center gap-2 text-white/50">
              <li>
                <Link href="/ferramentas" className="text-dourado transition-colors hover:text-white">
                  Ferramentas
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">{f.nome}</li>
            </ol>
          </nav>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] text-white text-balance md:text-5xl">{f.titulo}</h1>
          <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-white/70 md:text-lg">{f.intro}</p>
        </div>
      </section>

      {/* Calculadora */}
      <section className="px-6 py-12 md:py-16" aria-label={`Calculadora: ${f.nome}`}>
        <div className="mx-auto max-w-6xl">
          <Calculadora />
        </div>
      </section>

      {/* Como é feito o cálculo + aviso */}
      <section className="px-6 pb-16 md:pb-24" aria-labelledby="como-titulo">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 id="como-titulo" className="font-display text-3xl text-azul">
              Como é feito o cálculo
            </h2>
            <ul className="mt-6 space-y-4">
              {f.comoFunciona.map((item) => (
                <li key={item} className="flex gap-3 font-sans text-base leading-relaxed text-azul/75">
                  <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8C6239]" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-sans text-sm leading-relaxed text-azul/55">
              Valores e tabelas de {ANO_BASE}. O resultado é uma estimativa: cada empresa tem detalhes que mudam a
              conta, e ele não substitui a análise de um contador.
            </p>
          </div>

          <div className="rounded-3xl bg-white p-7 shadow-sm shadow-azul/5 md:p-8">
            <p className="font-display text-2xl leading-snug text-azul text-balance">
              Quer essa conta feita com os números da sua empresa?
            </p>
            <p className="mt-3 font-sans text-sm leading-relaxed text-azul/65">
              A gente analisa o seu caso e mostra o caminho que faz mais sentido.
            </p>
            <a
              {...propsWhatsApp(`Olá! Usei a calculadora de ${f.nome} no site e quero ajuda com o meu caso.`)}
              className="mt-6 inline-flex min-h-12 items-center rounded-full bg-azul px-7 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#8C6239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] focus-visible:ring-offset-2"
            >
              Falar com a Sólida
            </a>
          </div>
        </div>
      </section>

      {/* Outras calculadoras */}
      <section className="border-t border-azul/10 px-6 py-16 md:py-20" aria-labelledby="outras-titulo">
        <div className="mx-auto max-w-6xl">
          <h2 id="outras-titulo" className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
            Outras calculadoras
          </h2>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {outras.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/ferramentas/${o.slug}`}
                  className="flex h-full flex-col rounded-2xl border border-azul/10 bg-white px-5 py-4 transition-colors hover:border-dourado focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                >
                  <span className="font-sans text-sm font-semibold text-azul">{o.nome}</span>
                  <span className="mt-1 font-sans text-xs leading-relaxed text-azul/55">{o.descricao}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
