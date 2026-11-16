import Image from "next/image";
import { servicos, type Servico } from "@/data/servicos";
import { propsWhatsApp } from "@/data/contato";

// Serviços agrupados pelo momento da empresa. Os nomes precisam bater
// com os títulos em data/servicos.ts; o que não estiver em nenhum grupo
// entra no último, para nada sumir do site.
// foto: imagem do topo do card (em public/images/servicos/); null = card sem foto.
const fases: { nome: string; chamada: string; acao: string; foto: string | null; fotoAlt: string; servicos: string[] }[] = [
  {
    nome: "Abrir",
    chamada: "Para tirar a empresa do papel ou mudar a estrutura dela.",
    acao: "Quero abrir minha empresa",
    foto: "/images/servicos/abrir.webp",
    fotoAlt: "Mão assinando um contrato com caneta dourada",
    servicos: ["Legalização e Paralegal", "Estruturação de Holdings"],
  },
  {
    nome: "Manter em dia",
    chamada: "Para a rotina fiscal, contábil e da folha andar sem atraso.",
    acao: "Quero a rotina em dia",
    foto: "/images/servicos/manter.webp",
    fotoAlt: "Mãos usando notebook e calculadora sobre notas fiscais",
    servicos: ["Escrituração Fiscal", "Escrituração Contábil", "Gestão de Pessoal"],
  },
  {
    nome: "Crescer",
    chamada: "Para decidir com números e se preparar para o que muda.",
    acao: "Quero planejar o crescimento",
    foto: "/images/servicos/crescer.webp",
    fotoAlt: "Dedo apontando um painel de gráficos financeiros em um tablet",
    servicos: [
      "Assessoria Contábil e Tributária",
      "Planejamento Tributário",
      "Reforma Tributária",
      "Importação e Exportação",
    ],
  },
];

function montarFases() {
  const usados = new Set(fases.flatMap((f) => f.servicos));
  const sobra = servicos.filter((s) => !usados.has(s.titulo));
  return fases.map((fase, i) => {
    const itens = fase.servicos
      .map((t) => servicos.find((s) => s.titulo === t))
      .filter((s): s is Servico => Boolean(s));
    return { ...fase, itens: i === fases.length - 1 ? [...itens, ...sobra] : itens };
  });
}

function Seta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Servicos() {
  const grupos = montarFases();

  return (
    <section id="servicos" className="bg-creme px-6 py-24 md:py-32" aria-labelledby="servicos-titulo">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
            Nossos serviços
          </p>
          <h2 id="servicos-titulo" className="mt-3 font-display text-4xl leading-[1.1] text-azul text-balance md:text-5xl">
            Contabilidade para cada fase da sua empresa
          </h2>
          <p className="mt-5 font-sans text-base leading-relaxed text-azul/70 md:text-lg">
            Encontre o que você precisa pelo momento do seu negócio: abrindo,
            mantendo a rotina em dia ou crescendo.
          </p>
        </div>

        {/* Fases */}
        <ol className="relative mt-14 grid gap-10 md:mt-20 lg:grid-cols-3 lg:gap-6">
          {/* Linha da jornada ligando as fases (desktop) */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[16.66%] right-[16.66%] top-[22px] hidden h-px bg-gradient-to-r from-dourado/60 via-dourado to-dourado/60 lg:block"
          />

          {grupos.map((fase, i) => (
            <li key={fase.nome} className="relative flex flex-col">
              {/* Marcador da fase */}
              <div className="relative z-10 flex items-center gap-4 lg:flex-col lg:gap-3 lg:text-center">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-dourado bg-creme font-display text-xl text-azul shadow-[0_0_0_6px_#F3EEE6]">
                  {i + 1}
                </span>
                <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
                  Fase {i + 1}
                </span>
              </div>

              <div className="mt-5 flex flex-1 flex-col overflow-hidden rounded-3xl border border-azul/10 bg-white shadow-md shadow-azul/5">
                {fase.foto && (
                  <div className="relative aspect-[16/9]">
                    <Image
                      src={fase.foto}
                      alt={fase.fotoAlt}
                      fill
                      sizes="(min-width: 1024px) 370px, (min-width: 768px) 700px, 100vw"
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-7 md:p-8">
                  <h3 className="font-display text-3xl text-azul md:text-4xl">{fase.nome}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-azul/65 md:text-base">
                    {fase.chamada}
                  </p>

                  <ul className="mt-6 flex flex-col border-t border-azul/10">
                    {fase.itens.map((servico) => (
                      <li key={servico.titulo} className="border-b border-azul/10 last:border-b-0">
                        <a
                          {...propsWhatsApp(`Olá! Quero saber mais sobre ${servico.titulo}.`)}
                          className="group -mx-3 flex items-start gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-creme focus-visible:bg-creme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                              <span className="font-sans text-base font-semibold text-azul">
                                {servico.titulo}
                              </span>
                              {servico.destaque && (
                                <span className="rounded-full bg-dourado px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-azul">
                                  Tema atual
                                </span>
                              )}
                            </span>
                            <span className="mt-1 block font-sans text-sm leading-relaxed text-azul/60">
                              {servico.descricao}
                            </span>
                          </span>
                          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-azul/15 text-azul transition-colors duration-300 group-hover:border-dourado group-hover:bg-dourado">
                            <Seta className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-6">
                    <a
                      {...propsWhatsApp(`Olá! ${fase.acao}. Podemos conversar?`)}
                      className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-azul/20 px-5 font-sans text-sm font-semibold text-azul transition-colors hover:border-azul hover:bg-azul hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                    >
                      {fase.acao}
                      <Seta className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
