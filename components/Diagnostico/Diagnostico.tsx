"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { areas, classificar, perguntas } from "@/data/diagnostico";
import { ferramentas } from "@/data/ferramentas";
import { propsWhatsApp } from "@/data/contato";

/* ------------------------------------------------------------------
   Diagnóstico empresarial: uma pergunta por tela.
   Nada é enviado nem salvo: a conta é feita no navegador. No fim, a
   pessoa pode mandar o resultado para a Sólida pelo WhatsApp.
------------------------------------------------------------------- */

type Respostas = Record<string, number>; // id da pergunta → índice da opção

const total = perguntas.length;

export default function Diagnostico() {
  const [passo, setPasso] = useState(0); // 0..total-1 = perguntas; total = resultado
  const [respostas, setRespostas] = useState<Respostas>({});
  const tituloRef = useRef<HTMLHeadingElement>(null);
  const primeiraVez = useRef(true);

  // A cada troca de tela, leva o foco ao título (leitores de tela e teclado)
  useEffect(() => {
    if (primeiraVez.current) {
      primeiraVez.current = false;
      return;
    }
    tituloRef.current?.focus();
  }, [passo]);

  const responder = (id: string, indice: number) => {
    setRespostas((r) => ({ ...r, [id]: indice }));
    setPasso((p) => Math.min(p + 1, total));
  };

  const recomecar = () => {
    setRespostas({});
    setPasso(0);
  };

  if (passo >= total) return <Resultado respostas={respostas} tituloRef={tituloRef} recomecar={recomecar} />;

  const p = perguntas[passo];
  const escolhida = respostas[p.id];

  return (
    <div className="mx-auto max-w-2xl">
      {/* Progresso */}
      <div className="flex items-center justify-between font-sans text-xs font-semibold uppercase tracking-[0.15em]">
        <span className="text-[#8C6239]">{p.area}</span>
        <span className="text-azul/50">
          {passo + 1} de {total}
        </span>
      </div>
      <div
        role="progressbar"
        aria-label="Progresso do diagnóstico"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={passo}
        className="mt-3 h-1.5 overflow-hidden rounded-full bg-azul/10"
      >
        <div
          className="h-full rounded-full bg-[#8C6239] transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${(passo / total) * 100}%` }}
        />
      </div>

      {/* Pergunta */}
      <div className="mt-8 rounded-3xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 md:p-10">
        <h2
          ref={tituloRef}
          tabIndex={-1}
          className="font-display text-2xl leading-snug text-azul text-balance outline-none md:text-3xl"
        >
          {p.texto}
        </h2>
        <ul className="mt-8 flex flex-col gap-3">
          {p.opcoes.map((o, i) => {
            const ativa = escolhida === i;
            return (
              <li key={o.rotulo}>
                <button
                  type="button"
                  onClick={() => responder(p.id, i)}
                  aria-pressed={ativa}
                  className={`flex min-h-14 w-full items-center gap-4 rounded-2xl border px-5 text-left font-sans text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] ${
                    ativa
                      ? "border-[#8C6239] bg-[#F6EFE4] font-semibold text-azul"
                      : "border-azul/15 text-azul hover:border-[#8C6239] hover:bg-[#FBF8F3]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-sans text-xs font-semibold ${
                      ativa ? "border-[#8C6239] bg-[#8C6239] text-white" : "border-azul/20 text-azul/50"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}
                  </span>
                  {o.rotulo}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {passo > 0 && (
        <button
          type="button"
          onClick={() => setPasso((s) => s - 1)}
          className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full px-2 font-sans text-sm font-semibold text-azul/60 transition-colors hover:text-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
        >
          <span aria-hidden="true">←</span> Voltar
        </button>
      )}
    </div>
  );
}

/* ---------------- Resultado ---------------- */

function Resultado({
  respostas,
  tituloRef,
  recomecar,
}: {
  respostas: Respostas;
  tituloRef: React.RefObject<HTMLHeadingElement | null>;
  recomecar: () => void;
}) {
  const pontosDe = (id: string) => {
    const p = perguntas.find((q) => q.id === id);
    const i = respostas[id];
    return p && i !== undefined ? p.opcoes[i].pontos : 0;
  };

  const soma = perguntas.reduce((s, p) => s + pontosDe(p.id), 0);
  const nota = Math.round((soma / (total * 2)) * 100);
  const faixa = classificar(nota);

  const porArea = areas.map((a) => {
    const ps = perguntas.filter((p) => p.area === a);
    const s = ps.reduce((acc, p) => acc + pontosDe(p.id), 0);
    return { area: a, nota: Math.round((s / (ps.length * 2)) * 100) };
  });

  // Pontos de atenção: piores primeiro
  const atencao = perguntas
    .filter((p) => pontosDe(p.id) < 2)
    .sort((a, b) => pontosDe(a.id) - pontosDe(b.id));

  const mensagem =
    `Olá! Fiz o diagnóstico empresarial no site da Sólida e minha nota foi ${nota}/100 (${faixa.titulo}).` +
    (atencao.length
      ? ` Pontos de atenção: ${atencao
          .slice(0, 5)
          .map((p) => p.tema)
          .join(", ")}. Quero ajuda com isso.`
      : " Quero conversar sobre os próximos passos.");

  return (
    <div className="mx-auto max-w-4xl">
      {/* Nota */}
      <section className="rounded-3xl bg-azul p-8 text-white md:p-10" aria-labelledby="resultado-titulo">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">Resultado do diagnóstico</p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-center md:gap-10">
          <p className="font-display text-7xl tabular-nums text-white md:text-8xl">
            {nota}
            <span className="font-sans text-2xl text-white/50">/100</span>
          </p>
          <div>
            <h2 id="resultado-titulo" ref={tituloRef} tabIndex={-1} className="font-display text-3xl text-dourado outline-none md:text-4xl">
              {faixa.titulo}
            </h2>
            <p className="mt-2 max-w-md font-sans text-base leading-relaxed text-white/75">{faixa.texto}</p>
          </div>
        </div>

        {/* Notas por área */}
        <dl className="mt-8 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
          {porArea.map((a) => (
            <div key={a.area}>
              <div className="flex items-baseline justify-between font-sans text-sm">
                <dt className="text-white/80">{a.area}</dt>
                <dd className="font-semibold tabular-nums text-white">{a.nota}</dd>
              </div>
              <div aria-hidden="true" className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-dourado" style={{ width: `${a.nota}%` }} />
              </div>
            </div>
          ))}
        </dl>
      </section>

      {/* Pontos de atenção */}
      {atencao.length > 0 && (
        <section className="mt-10" aria-labelledby="atencao-titulo">
          <h3 id="atencao-titulo" className="font-display text-3xl text-azul">
            O que melhorar
          </h3>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {atencao.map((p) => {
              const calc = p.ferramenta ? ferramentas.find((f) => f.slug === p.ferramenta) : undefined;
              const critico = pontosDe(p.id) === 0;
              return (
                <li key={p.id} className="rounded-2xl border border-azul/10 bg-white p-6">
                  <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.15em]">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${critico ? "bg-[#B4532A]" : "bg-dourado"}`}
                    />
                    <span className={critico ? "text-[#B4532A]" : "text-[#8C6239]"}>
                      {critico ? "Prioridade" : "Atenção"} · {p.area}
                    </span>
                  </p>
                  <p className="mt-3 font-sans text-base font-semibold text-azul">{p.tema}</p>
                  <p className="mt-2 font-sans text-sm leading-relaxed text-azul/70">{p.dica}</p>
                  {calc && (
                    <Link
                      href={`/ferramentas/${calc.slug}`}
                      className="mt-3 inline-flex font-sans text-xs font-semibold text-[#8C6239] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                    >
                      Usar a calculadora de {calc.nome.toLowerCase()} →
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Chamada */}
      <section className="mt-10 flex flex-col items-start gap-6 rounded-3xl border border-azul/10 bg-white p-8 md:flex-row md:items-center md:justify-between md:p-10">
        <div>
          <p className="font-display text-2xl leading-snug text-azul text-balance md:text-3xl">
            Quer um plano para resolver esses pontos?
          </p>
          <p className="mt-2 font-sans text-sm text-azul/65">
            Mande o resultado para a gente pelo WhatsApp. A mensagem já vai pronta.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            {...propsWhatsApp(mensagem)}
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-azul px-7 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#8C6239] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] focus-visible:ring-offset-2"
          >
            Enviar resultado
          </a>
          <button
            type="button"
            onClick={recomecar}
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-azul/20 px-7 font-sans text-sm font-semibold text-azul transition-colors hover:border-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
          >
            Refazer
          </button>
        </div>
      </section>
    </div>
  );
}
