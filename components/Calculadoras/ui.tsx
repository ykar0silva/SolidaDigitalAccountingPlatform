"use client";

import { useId, useState, type ReactNode } from "react";

/* ---------------- Formatação ---------------- */

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
const numero = new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat("pt-BR", { style: "percent", minimumFractionDigits: 1, maximumFractionDigits: 2 });

export const formatarMoeda = (n: number) => moeda.format(Number.isFinite(n) ? n : 0);
export const formatarPct = (n: number) => pct.format(Number.isFinite(n) ? n : 0);

// "1.234,56" / "1234,56" / "1234.56" / "R$ 1.234" → número
export function lerValor(texto: string): number {
  let t = texto.replace(/[^\d,.-]/g, "");
  if (t.includes(",")) t = t.replace(/\./g, "").replace(",", ".");
  else if ((t.match(/\./g) ?? []).length > 1 || /\.\d{3}$/.test(t)) t = t.replace(/\./g, "");
  const n = parseFloat(t);
  return Number.isFinite(n) ? n : 0;
}

/* ---------------- Campos ---------------- */

const rotuloCls = "block font-sans text-sm font-semibold text-azul";
const ajudaCls = "mt-1 block font-sans text-xs leading-relaxed text-azul/55";
const caixaCls =
  "flex min-h-12 items-center rounded-xl border border-azul/15 bg-white px-4 transition-colors focus-within:border-[#8C6239] focus-within:ring-2 focus-within:ring-[#8C6239]/25";

type CampoProps = {
  rotulo: string;
  ajuda?: string;
  valor: number;
  aoMudar: (n: number) => void;
};

// Campo em reais: aceita digitar com ou sem pontos e vírgula; formata ao sair
export function CampoMoeda({ rotulo, ajuda, valor, aoMudar }: CampoProps) {
  const id = useId();
  const [texto, setTexto] = useState(valor ? numero.format(valor) : "");
  return (
    <div>
      <label htmlFor={id} className={rotuloCls}>
        {rotulo}
      </label>
      <div className={`mt-2 ${caixaCls}`}>
        <span aria-hidden="true" className="mr-2 font-sans text-sm text-azul/50">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={texto}
          placeholder="0,00"
          aria-describedby={ajuda ? `${id}-ajuda` : undefined}
          onChange={(e) => {
            setTexto(e.target.value);
            aoMudar(lerValor(e.target.value));
          }}
          onBlur={() => setTexto(valor ? numero.format(valor) : "")}
          className="w-full bg-transparent py-3 font-sans text-base tabular-nums text-azul outline-none placeholder:text-azul/30"
        />
      </div>
      {ajuda && (
        <span id={`${id}-ajuda`} className={ajudaCls}>
          {ajuda}
        </span>
      )}
    </div>
  );
}

// Campo numérico simples (meses, dependentes, %)
export function CampoNumero({
  rotulo,
  ajuda,
  valor,
  aoMudar,
  min = 0,
  max,
  passo = 1,
  sufixo,
}: CampoProps & { min?: number; max?: number; passo?: number; sufixo?: string }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className={rotuloCls}>
        {rotulo}
      </label>
      <div className={`mt-2 ${caixaCls}`}>
        <input
          id={id}
          type="number"
          inputMode="decimal"
          min={min}
          max={max}
          step={passo}
          value={Number.isFinite(valor) ? valor : ""}
          aria-describedby={ajuda ? `${id}-ajuda` : undefined}
          onChange={(e) => {
            const n = e.target.value === "" ? 0 : Number(e.target.value);
            const limitado = Math.max(min, max !== undefined ? Math.min(max, n) : n);
            aoMudar(Number.isFinite(limitado) ? limitado : 0);
          }}
          className="w-full bg-transparent py-3 font-sans text-base tabular-nums text-azul outline-none"
        />
        {sufixo && (
          <span aria-hidden="true" className="ml-2 font-sans text-sm text-azul/50">
            {sufixo}
          </span>
        )}
      </div>
      {ajuda && (
        <span id={`${id}-ajuda`} className={ajudaCls}>
          {ajuda}
        </span>
      )}
    </div>
  );
}

// Escolha entre poucas opções (botões de rádio com cara de pílula)
export function Opcoes<T extends string>({
  rotulo,
  ajuda,
  opcoes,
  valor,
  aoMudar,
}: {
  rotulo: string;
  ajuda?: string;
  opcoes: { valor: T; rotulo: string; detalhe?: string }[];
  valor: T;
  aoMudar: (v: T) => void;
}) {
  const nome = useId();
  return (
    <fieldset>
      <legend className={rotuloCls}>{rotulo}</legend>
      {ajuda && <span className={ajudaCls}>{ajuda}</span>}
      <div className="mt-2 flex flex-col gap-2">
        {opcoes.map((o) => {
          const ativo = o.valor === valor;
          return (
            <label
              key={o.valor}
              className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#8C6239] ${
                ativo ? "border-[#8C6239] bg-[#F6EFE4]" : "border-azul/15 bg-white hover:border-azul/30"
              }`}
            >
              <input
                type="radio"
                name={nome}
                value={o.valor}
                checked={ativo}
                onChange={() => aoMudar(o.valor)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                  ativo ? "border-[#8C6239]" : "border-azul/30"
                }`}
              >
                {ativo && <span className="h-2.5 w-2.5 rounded-full bg-[#8C6239]" />}
              </span>
              <span className="min-w-0">
                <span className="block font-sans text-sm font-semibold text-azul">{o.rotulo}</span>
                {o.detalhe && <span className="mt-0.5 block font-sans text-xs text-azul/55">{o.detalhe}</span>}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

/* ---------------- Resultado ---------------- */

// Moldura padrão: campos à esquerda, resultado à direita (embaixo no celular)
export function Calculadora({ campos, resultado }: { campos: ReactNode; resultado: ReactNode }) {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div className="flex flex-col gap-6 rounded-3xl border border-azul/10 bg-white p-6 shadow-sm shadow-azul/5 md:p-8">
        {campos}
      </div>
      <div className="lg:sticky lg:top-28 lg:self-start">{resultado}</div>
    </div>
  );
}

export function PainelResultado({
  rotulo,
  valor,
  detalhe,
  children,
}: {
  rotulo: string;
  valor: string;
  detalhe?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section aria-label="Resultado" className="rounded-3xl bg-azul p-6 text-white md:p-8">
      <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-dourado">{rotulo}</p>
      <p aria-live="polite" className="mt-2 font-display text-4xl tabular-nums text-white md:text-5xl">
        {valor}
      </p>
      {detalhe && <div className="mt-2 font-sans text-sm leading-relaxed text-white/70">{detalhe}</div>}
      {children && <dl className="mt-6 border-t border-white/10">{children}</dl>}
    </section>
  );
}

export function Linha({
  rotulo,
  valor,
  destaque = false,
  negativo = false,
}: {
  rotulo: string;
  valor: string;
  destaque?: boolean;
  negativo?: boolean;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-white/10 py-3 last:border-b-0">
      <dt className={`font-sans text-sm ${destaque ? "font-semibold text-white" : "text-white/70"}`}>{rotulo}</dt>
      <dd
        className={`whitespace-nowrap font-sans text-sm tabular-nums ${
          destaque ? "font-semibold text-dourado" : negativo ? "text-white/80" : "text-white"
        }`}
      >
        {negativo ? `− ${valor}` : valor}
      </dd>
    </div>
  );
}

export function Observacao({ children }: { children: ReactNode }) {
  return (
    <p className="mt-4 rounded-2xl border border-[#8C6239]/25 bg-[#F6EFE4] px-5 py-4 font-sans text-sm leading-relaxed text-azul/80">
      {children}
    </p>
  );
}
