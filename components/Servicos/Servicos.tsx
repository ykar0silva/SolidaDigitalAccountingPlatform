import { servicos } from "@/data/servicos";
import { linkWhatsApp } from "@/data/contato";

// Linha do tempo da transição (EC 132/2023 e LC 214/2025).
// Conferir com as sócias antes de publicar.
const transicao = [
  { ano: "2026", texto: "Ano de teste: CBS e IBS aparecem nas notas com alíquotas simbólicas." },
  { ano: "2027", texto: "A CBS substitui PIS e Cofins, e começa o Imposto Seletivo." },
  { ano: "2029–2032", texto: "ICMS e ISS diminuem ano a ano enquanto o IBS aumenta." },
  { ano: "2033", texto: "O novo sistema passa a valer por completo." },
];

function Seta({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Servicos() {
  const destaque = servicos.find((s) => s.destaque);
  const lista = servicos.filter((s) => !s.destaque);

  return (
    <section id="servicos" className="bg-creme px-6 py-24 md:py-32" aria-labelledby="servicos-titulo">
      <div className="mx-auto max-w-6xl">
        {/* Cabeçalho */}
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-16">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
              Nossos serviços
            </p>
            <h2 id="servicos-titulo" className="mt-3 font-display text-4xl leading-[1.1] text-azul text-balance md:text-6xl">
              Soluções completas para a sua empresa
            </h2>
          </div>
          <p className="font-sans text-base leading-relaxed text-azul/70 md:pb-2 md:text-lg">
            Contabilidade, fiscal, trabalhista e planejamento tributário para
            empresas de todos os portes.
          </p>
        </div>

        {/* Destaque: tema do momento */}
        {destaque && (
          <article className="relative mt-14 overflow-hidden rounded-[28px] bg-azul text-white md:mt-20">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 100% 0%, rgba(209,168,117,0.22), transparent 60%)",
              }}
            />
            <div className="relative grid gap-10 p-7 md:p-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:p-14">
              <div className="flex flex-col">
                <span className="self-start rounded-full bg-dourado px-3 py-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-azul">
                  Tema atual
                </span>
                <h3 className="mt-6 font-display text-4xl leading-[1.05] text-balance md:text-5xl">
                  {destaque.titulo}
                </h3>
                <p className="mt-5 max-w-md font-sans text-base leading-relaxed text-white/75">
                  {destaque.descricao} PIS, Cofins, IPI, ICMS e ISS dão lugar a CBS,
                  IBS e Imposto Seletivo, numa transição que vai até 2033.
                </p>
                <a
                  href={linkWhatsApp(`Olá! Quero entender o impacto da ${destaque.titulo} na minha empresa.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex min-h-12 items-center gap-3 self-start rounded-full bg-dourado py-3 pl-6 pr-3 font-sans text-sm font-semibold text-azul transition-colors hover:bg-[#dcb888] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-4 focus-visible:ring-offset-azul"
                >
                  Entender o impacto na minha empresa
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-azul text-dourado transition-transform duration-300 group-hover:translate-x-0.5">
                    <Seta className="h-4 w-4" />
                  </span>
                </a>
              </div>

              <ol className="relative self-center rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
                {transicao.map((etapa, i) => (
                  <li key={etapa.ano} className="relative flex gap-5 pb-6 last:pb-0">
                    {/* Trilho da linha do tempo */}
                    {i < transicao.length - 1 && (
                      <span aria-hidden="true" className="absolute left-[5px] top-4 h-full w-px bg-dourado/30" />
                    )}
                    <span aria-hidden="true" className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-dourado bg-azul" />
                    <div>
                      <p className="font-sans text-sm font-bold tabular-nums text-dourado">{etapa.ano}</p>
                      <p className="mt-1 font-sans text-sm leading-relaxed text-white/80">{etapa.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        )}

        {/* Lista editorial dos demais serviços */}
        <ul className="mt-14 border-t border-azul/15 md:mt-20">
          {lista.map((servico, i) => (
            <li key={servico.titulo} className="border-b border-azul/15">
              <a
                href={linkWhatsApp(`Olá! Quero saber mais sobre ${servico.titulo}.`)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${servico.titulo}: ${servico.descricao} Falar no WhatsApp`}
                className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-colors hover:bg-white focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8C6239] md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] md:gap-x-8 md:px-4 md:py-8"
              >
                <span className="self-start pt-1 font-sans text-sm font-semibold tabular-nums text-[#8C6239] md:self-center md:pt-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl leading-tight text-azul transition-transform duration-300 group-hover:translate-x-1.5 md:text-[2rem]">
                  {servico.titulo}
                </span>
                <span className="col-start-2 row-start-2 font-sans text-sm leading-relaxed text-azul/65 md:col-start-3 md:row-start-1 md:text-base">
                  {servico.descricao}
                </span>
                <span className="col-start-3 row-span-2 row-start-1 flex h-11 w-11 items-center justify-center self-center rounded-full border border-azul/20 text-azul transition-colors duration-300 group-hover:border-dourado group-hover:bg-dourado md:col-start-4 md:row-span-1 md:h-12 md:w-12">
                  <Seta className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-45" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
