import Image from "next/image";
import Link from "next/link";
import { socias } from "@/data/socias";

// Foto das duas (dentro de public/)
const FOTO_JUNTAS = "/images/socias/socias-juntas.webp";

// Logo da Sólida (usada só pelo símbolo "S", como marca d'água)
const MARCA_DAGUA = "/images/logo-principal-sem-fundo.png";

// Só informações confirmadas. Acrescente número de clientes e anos
// de experiência quando as sócias confirmarem.
const DESTAQUES = ["Desde 2008", "Contabilidade para empresas", "Palmas-TO"];

// Faz a base da foto desaparecer, escondendo o corte
const MASCARA_BASE =
  "linear-gradient(to bottom, #000 0%, #000 68%, rgba(0,0,0,0.6) 82%, rgba(0,0,0,0.2) 93%, transparent 100%)";

export default function Socias() {
  const [esquerda, direita] = socias;

  return (
    <section id="socias" aria-labelledby="socias-titulo" className="relative overflow-hidden bg-azul px-6 pb-20 pt-16 md:pb-28 md:pt-20">
      {/* Fundo: leve clareado no centro */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 48%, #16283D 0%, #0D1B2A 70%)",
        }}
      />

      {/* Marca d'água: só o S, atrás das cabeças */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-center">
        <div className="relative mt-[24px] h-[280px] w-[280px] overflow-hidden opacity-[0.10] md:mt-[60px] md:h-[480px] md:w-[480px]">
          <div className="absolute left-1/2 top-1/2 -ml-[241px] -mt-[527px] h-[1016px] w-[1016px] md:-ml-[450px] md:-mt-[984px] md:h-[1896px] md:w-[1896px]">
            <Image
              src={MARCA_DAGUA}
              alt=""
              aria-hidden="true"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        {/* Celular e tablet: foto → título → botão → sócias. Desktop (≥1024px): sócias dos lados da foto, título embaixo. */}
        <div className="mx-auto flex w-full max-w-7xl flex-col lg:grid lg:grid-cols-[1fr_minmax(0,34rem)_1fr] xl:grid-cols-[1fr_minmax(0,48rem)_1fr] lg:items-center">
          {/* Foto das duas */}
          <div className="relative h-[360px] w-full md:h-[620px] order-1 lg:order-none lg:col-start-2 lg:row-start-1 lg:h-[740px]">
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 55% 50% at 50% 48%, rgba(209,168,117,0.22) 0%, rgba(209,168,117,0.08) 45%, rgba(13,27,42,0) 75%)",
              }}
            />

            <Image
              src={FOTO_JUNTAS}
              alt={socias.map((s) => s.name).join(" e ")}
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              style={{ maskImage: MASCARA_BASE, WebkitMaskImage: MASCARA_BASE }}
              className="origin-bottom object-cover object-bottom md:scale-[1.15] md:object-contain lg:scale-[1.3]"
            />
          </div>

          {/* Sócia da esquerda */}
          {esquerda && (
            <div className="hidden lg:block lg:order-none lg:col-start-1 lg:row-start-1 lg:mt-0 lg:justify-self-end lg:pr-4 lg:text-right">
              <div className="mx-auto mb-4 h-px w-12 bg-dourado lg:ml-auto lg:mr-0" />
              <p className="font-display text-2xl text-white md:text-3xl">
                {esquerda.name}
              </p>
              <p className="mt-1 font-sans text-sm text-dourado">{esquerda.role}</p>
              <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/70 lg:ml-auto lg:mr-0 lg:max-w-[15rem]">
                {esquerda.descricao}
              </p>
            </div>
          )}

          {/* Sócia da direita */}
          {direita && (
            <div className="hidden lg:block lg:order-none lg:col-start-3 lg:row-start-1 lg:mt-0 lg:justify-self-start lg:pl-4 lg:text-left">
              <div className="mx-auto mb-4 h-px w-12 bg-dourado lg:mx-0" />
              <p className="font-display text-2xl text-white md:text-3xl">
                {direita.name}
              </p>
              <p className="mt-1 font-sans text-sm text-dourado">{direita.role}</p>
              <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/70 lg:mx-0 lg:max-w-[15rem]">
                {direita.descricao}
              </p>
            </div>
          )}

          {/* Título no pé das duas + botão */}
          <div className="relative z-10 order-2 -mt-24 text-center lg:order-none lg:col-span-3 lg:row-start-2 lg:-mt-32">
            <h2 id="socias-titulo" className="pointer-events-none mx-auto max-w-4xl font-display text-3xl text-white md:text-5xl text-balance">
              Quem está à frente da Sólida
            </h2>
            {/* No celular, os nomes ficam aqui (os textos laterais só aparecem no desktop) */}
            <p className="mx-auto mt-3 max-w-xs font-sans text-sm text-dourado text-balance lg:hidden">
              {socias.map((s) => s.name).join(" e ")}, sócias-fundadoras
            </p>
            <Link
              href="/sobre"
              className="mt-6 inline-block rounded-full bg-dourado px-8 py-3 font-sans text-sm font-semibold text-azul transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-4 focus-visible:ring-offset-azul md:mt-8"
            >
              Conhecer nossa história
            </Link>
          </div>
        </div>

        {/* Faixa de destaques */}
        <ul className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-2 border-t border-dourado/20 pt-6 font-sans text-sm text-white/70">
          {DESTAQUES.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1 w-1 rounded-full bg-dourado" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}