"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { glossario, slugTermo, type Categoria, type Termo } from "@/data/glossario";
import { ferramentas } from "@/data/ferramentas";

// Busca sem acento, sem diferença entre maiúsculas e minúsculas e tratando
// hífen e pontuação como espaço ("pro labore" acha "pró-labore")
const normalizar = (t: string) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const letraDe = (t: Termo) => normalizar(t.termo).charAt(0).toUpperCase();

const ordenados = [...glossario].sort((a, b) => a.termo.localeCompare(b.termo, "pt-BR"));
const categorias = Array.from(new Set(glossario.map((t) => t.categoria))) as Categoria[];
const ALFABETO = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function GlossarioLista() {
  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState<Categoria | "Todos">("Todos");

  const filtrados = useMemo(() => {
    const q = normalizar(busca.trim());
    return ordenados.filter(
      (t) =>
        (categoria === "Todos" || t.categoria === categoria) &&
        (!q || normalizar(`${t.termo} ${t.nome ?? ""} ${t.definicao}`).includes(q)),
    );
  }, [busca, categoria]);

  // Agrupa por letra inicial
  const grupos = useMemo(() => {
    const mapa = new Map<string, Termo[]>();
    for (const t of filtrados) {
      const l = letraDe(t);
      mapa.set(l, [...(mapa.get(l) ?? []), t]);
    }
    return Array.from(mapa.entries());
  }, [filtrados]);

  const letrasComTermo = new Set(grupos.map(([l]) => l));

  return (
    <div>
      {/* Busca + filtros */}
      <div className="rounded-3xl border border-azul/10 bg-white p-5 shadow-sm shadow-azul/5 md:p-6">
        <label htmlFor="busca-glossario" className="sr-only">
          Buscar no glossário
        </label>
        <div className="flex min-h-12 items-center gap-3 rounded-xl border border-azul/15 px-4 focus-within:border-[#8C6239] focus-within:ring-2 focus-within:ring-[#8C6239]/25">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className="h-5 w-5 shrink-0 text-azul/40">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            id="busca-glossario"
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar termo, sigla ou palavra (ex.: Fator R, DAS, pró-labore)"
            autoComplete="off"
            className="w-full bg-transparent py-3 font-sans text-base text-azul outline-none placeholder:text-azul/40"
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filtrar por tema">
          {(["Todos", ...categorias] as const).map((c) => {
            const ativo = c === categoria;
            return (
              <button
                key={c}
                type="button"
                onClick={() => setCategoria(c)}
                aria-pressed={ativo}
                className={`min-h-9 rounded-full border px-4 font-sans text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239] ${
                  ativo ? "border-azul bg-azul text-white" : "border-azul/15 text-azul/70 hover:border-azul/40 hover:text-azul"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>
      </div>

      {/* Índice A–Z */}
      <nav aria-label="Ir para a letra" className="mt-6">
        <ul className="flex flex-wrap gap-1">
          {ALFABETO.map((l) =>
            letrasComTermo.has(l) ? (
              <li key={l}>
                <a
                  href={`#letra-${l}`}
                  className="flex h-9 w-9 items-center justify-center rounded-lg font-sans text-sm font-semibold text-azul transition-colors hover:bg-azul hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                >
                  {l}
                </a>
              </li>
            ) : (
              <li key={l} aria-hidden="true" className="flex h-9 w-9 items-center justify-center font-sans text-sm text-azul/20">
                {l}
              </li>
            ),
          )}
        </ul>
      </nav>

      <p aria-live="polite" className="mt-4 font-sans text-sm text-azul/55">
        {filtrados.length === glossario.length
          ? `${glossario.length} termos`
          : `${filtrados.length} de ${glossario.length} termos`}
      </p>

      {/* Termos */}
      {grupos.length === 0 ? (
        <p className="mt-10 rounded-2xl bg-white px-6 py-8 text-center font-sans text-base text-azul/70">
          Nenhum termo encontrado. Tente outra palavra ou fale com a gente pelo WhatsApp.
        </p>
      ) : (
        <div className="mt-6 flex flex-col gap-10">
          {grupos.map(([letra, termos]) => (
            <section key={letra} id={`letra-${letra}`} aria-labelledby={`titulo-${letra}`} className="scroll-mt-32">
              <h2 id={`titulo-${letra}`} className="font-display text-4xl text-[#8C6239]">
                {letra}
              </h2>
              <dl className="mt-4 grid gap-4 md:grid-cols-2">
                {termos.map((t) => {
                  const calc = t.ferramenta ? ferramentas.find((f) => f.slug === t.ferramenta) : undefined;
                  return (
                    <div
                      key={t.termo}
                      id={slugTermo(t.termo)}
                      className="scroll-mt-32 rounded-2xl border border-azul/10 bg-white p-6 target:border-[#8C6239] target:ring-2 target:ring-[#8C6239]/25"
                    >
                      <dt>
                        <span className="font-sans text-lg font-semibold text-azul">{t.termo}</span>
                        {t.nome && <span className="mt-0.5 block font-sans text-sm text-azul/55">{t.nome}</span>}
                      </dt>
                      <dd className="mt-3 font-sans text-sm leading-relaxed text-azul/75">{t.definicao}</dd>
                      <dd className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.15em] text-azul/40">
                          {t.categoria}
                        </span>
                        {calc && (
                          <Link
                            href={`/ferramentas/${calc.slug}`}
                            className="inline-flex items-center gap-1 font-sans text-xs font-semibold text-[#8C6239] underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
                          >
                            Calcular {calc.nome.toLowerCase()} →
                          </Link>
                        )}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
