import type { Metadata } from "next";
import Link from "next/link";
import { ferramentas } from "@/data/ferramentas";
import { ANO_BASE } from "@/lib/calculos/tabelas2026";
import Newsletter from "@/components/Newsletter/Newsletter";

export const metadata: Metadata = {
  title: "Calculadoras gratuitas | Sólida Assessoria Contábil",
  description: `Calculadoras de DAS MEI, pró-labore, regime tributário, margem de lucro, ponto de equilíbrio e 13º salário, atualizadas para ${ANO_BASE}, e planilha de controle financeiro grátis.`,
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

      {/* Planilha para baixar */}
      <section id="planilha" className="scroll-mt-28 px-6 pb-20 md:pb-28" aria-labelledby="planilha-titulo">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="flex flex-col rounded-3xl bg-azul p-8 text-white md:p-10">
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Download grátis</p>
            <h2 id="planilha-titulo" className="mt-3 font-display text-3xl leading-snug text-balance md:text-4xl">
              Planilha de controle financeiro
            </h2>
            <p className="mt-3 max-w-xl font-sans text-base leading-relaxed text-white/75">
              Registre as entradas e saídas da empresa e veja, mês a mês, quanto entrou, quanto saiu e quanto sobrou. Abre
              no Excel e no Google Planilhas.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                ["Lançamentos", "Data, descrição, categoria e valor de cada movimento."],
                ["Fluxo mensal", "Entradas, saídas e saldo do caixa de janeiro a dezembro."],
                ["Resumo", "Total do ano, lucro, margem e gráfico por mês."],
                ["Categorias", "Já vem pronta e você ajusta para o seu negócio."],
              ].map(([titulo, texto]) => (
                <li key={titulo} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-sans text-sm font-semibold text-dourado">{titulo}</p>
                  <p className="mt-1 font-sans text-sm leading-relaxed text-white/70">{texto}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="/downloads/planilha-controle-financeiro-solida.xlsx"
                download
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-dourado px-7 font-sans text-sm font-semibold text-azul transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-2 focus-visible:ring-offset-azul"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-4 w-4">
                  <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Baixar planilha
              </a>
              <span className="font-sans text-xs text-white/50">Arquivo .xlsx, 60 KB. Sem cadastro.</span>
            </div>
          </div>

          <Newsletter />
        </div>
      </section>
    </main>
  );
}
