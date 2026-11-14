"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { socias } from "@/data/socias";
import SociasModal from "@/components/SociasModal/SociasModal";

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
  const [aberta, setAberta] = useState(false);
  const fechar = useCallback(() => setAberta(false), []);
  const [esquerda, direita] = socias;

  return (
    <section className="relative overflow-hidden bg-azul px-6 pb-20 pt-16 md:pb-28 md:pt-20">
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
        <div className="relative -mt-[10px] h-[280px] w-[280px] overflow-hidden opacity-[0.10] md:mt-[60px] md:h-[480px] md:w-[480px]">
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
        <div className="mx-auto w-full max-w-7xl md:grid md:grid-cols-[1fr_minmax(0,48rem)_1fr] md:items-center">
          {/* Foto das duas */}
          <button
            onClick={() => setAberta(true)}
            className="group relative block h-[500px] w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-4 focus-visible:ring-offset-azul md:col-start-2 md:row-start-1 md:h-[740px]"
            aria-label="Conhecer a história das sócias"
          >
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
              className="origin-bottom scale-[1.15] object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.19] md:scale-[1.3] md:group-hover:scale-[1.34]"
            />
          </button>

          {/* Sócia da esquerda */}
          {esquerda && (
            <div className="mt-2 text-center md:col-start-1 md:row-start-1 md:mt-0 md:justify-self-end md:pr-4 md:text-right">
              <div className="mx-auto mb-4 h-px w-12 bg-dourado md:ml-auto md:mr-0" />
              <p className="font-display text-2xl text-white md:text-3xl">
                {esquerda.name}
              </p>
              <p className="mt-1 font-sans text-sm text-dourado">{esquerda.role}</p>
              <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/70 md:ml-auto md:mr-0 md:max-w-[15rem]">
                {esquerda.descricao}
              </p>
            </div>
          )}

          {/* Sócia da direita */}
          {direita && (
            <div className="mt-8 text-center md:col-start-3 md:row-start-1 md:mt-0 md:justify-self-start md:pl-4 md:text-left">
              <div className="mx-auto mb-4 h-px w-12 bg-dourado md:mx-0" />
              <p className="font-display text-2xl text-white md:text-3xl">
                {direita.name}
              </p>
              <p className="mt-1 font-sans text-sm text-dourado">{direita.role}</p>
              <p className="mx-auto mt-4 max-w-xs font-sans text-sm leading-relaxed text-white/70 md:mx-0 md:max-w-[15rem]">
                {direita.descricao}
              </p>
            </div>
          )}
        </div>

        {/* Título no pé das duas */}
        <div className="pointer-events-none relative z-10 mx-auto -mt-[300px] max-w-4xl text-center md:-mt-32">
          <h2 className="font-display text-3xl text-white md:text-5xl text-balance">
            Quem está à frente da Sólida
          </h2>
        </div>

        {/* Botão */}
        <div className="relative z-10 mt-6 text-center md:mt-8">
          <button
            onClick={() => setAberta(true)}
            className="rounded-full bg-dourado px-8 py-3 font-sans text-sm font-semibold text-azul transition-transform duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-dourado focus-visible:ring-offset-4 focus-visible:ring-offset-azul"
          >
            Conhecer nossa história
          </button>
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

      <SociasModal aberta={aberta} onClose={fechar} />
    </section>
  );
}