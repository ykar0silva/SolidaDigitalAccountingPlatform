"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { ferramentasDestaque, type FerramentaDestaque } from "@/data/ferramentasDestaque";
import { posts } from "@/data/posts";
import s from "./FerramentasDestaque.module.css";

type Css = CSSProperties & Record<`--${string}`, string | number>;

const cx = (...classes: (string | false | undefined)[]) => classes.filter(Boolean).join(" ");

/* ---------------- Textos de cada card ---------------- */

const chamadas: Record<string, { titulo: string; acao: string }> = {
  calculadoras: { titulo: "Faça as contas antes de decidir.", acao: "Abrir calculadoras" },
  biblioteca: { titulo: "Modelos prontos para baixar e usar.", acao: "Ver modelos" },
  diagnostico: { titulo: "Veja como está a saúde do seu negócio.", acao: "Fazer o diagnóstico" },
  blog: { titulo: "Impostos e gestão explicados sem complicação.", acao: "Ler o blog" },
  glossario: { titulo: "Entenda cada sigla da sua contabilidade.", acao: "Abrir o glossário" },
};

/* ---------------- Janelas animadas ---------------- */

function Janela({
  titulo,
  chips,
  rodape,
  children,
}: {
  titulo: string;
  chips?: string[];
  rodape?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className={s.janela}>
      <div className={s.janelaTopo}>
        <span>{titulo}</span>
        {chips && (
          <span className={s.janelaChips}>
            {chips.map((c) => (
              <span key={c} className={s.janelaChip}>
                {c}
              </span>
            ))}
          </span>
        )}
      </div>
      <div className={s.janelaCorpo}>{children}</div>
      {rodape && <div className={s.janelaRodape}>{rodape}</div>}
    </div>
  );
}

function Digitado({ texto, classe }: { texto: string; classe: string }) {
  const estilo: Css = { "--chars": `${texto.length}ch`, "--passos": texto.length };
  return (
    <span className={cx(s.digitando, s.anim, classe)} style={estilo}>
      {texto}
    </span>
  );
}

function JanelaCalculadora() {
  return (
    <Janela
      titulo="margem-de-lucro"
      chips={["mensal"]}
      rodape={
        <>
          <span>Lucro no mês</span>
          <span className={cx(s.selo, s.seloOk, s.tabular, s.anim, s.aparecerEm62)}>
            R$ 6.000,00
          </span>
        </>
      }
    >
      <div className={s.linha}>
        <span className={s.rotulo}>Receita</span>
        <span className={cx(s.mono, s.tabular)}>
          <Digitado texto="R$ 20.000,00" classe={s.digitar1} />
        </span>
      </div>
      <div className={s.linha}>
        <span className={s.rotulo}>Custos e despesas</span>
        <span className={cx(s.mono, s.tabular)}>
          <Digitado texto="R$ 14.000,00" classe={s.digitar2} />
        </span>
      </div>
      <div className={cx(s.anim, s.aparecerEm45)} style={{ paddingTop: 14 }}>
        <div className={s.linha} style={{ borderBottom: 0, paddingBottom: 8 }}>
          <span className={s.rotulo}>Margem de lucro</span>
          <span className={s.tabular} style={{ fontSize: 26, fontWeight: 700 }}>
            30%
          </span>
        </div>
        <div className={s.barraTrilho}>
          <div style={{ width: "30%", height: "100%" }}>
            <div className={cx(s.barra, s.anim, s.encher)} />
          </div>
        </div>
      </div>
    </Janela>
  );
}

const arquivos = [
  { nome: "Contrato de prestação de serviços", tipo: "DOCX" },
  { nome: "Planilha de fluxo de caixa", tipo: "XLSX" },
  { nome: "Modelo de recibo de pagamento", tipo: "PDF" },
];

function JanelaBiblioteca() {
  return (
    <Janela titulo="biblioteca" chips={["modelos"]}>
      <div className={s.campo} style={{ position: "relative", overflow: "hidden" }}>
        <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <Digitado texto="contrato" classe={s.digitar1} />
        <span className={cx(s.progresso, s.anim)} />
      </div>
      <div style={{ marginTop: 10 }}>
        {arquivos.map((a, i) => (
          <div
            key={a.nome}
            className={cx(s.linha, s.anim, s[`linha${i}`], i === 0 && s.selecionar)}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
              <span className={cx(s.selo, s.seloArquivo)}>{a.tipo}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {a.nome}
              </span>
            </span>
            {i === 0 && <span className={cx(s.botaoMini, s.anim, s.pressionar)}>Baixar</span>}
          </div>
        ))}
      </div>
    </Janela>
  );
}

const perguntas = [
  { texto: "Fluxo de caixa registrado", ok: true },
  { texto: "Impostos pagos em dia", ok: true },
  { texto: "Pró-labore definido", ok: true },
  { texto: "Reserva para 3 meses", ok: false },
  { texto: "Notas fiscais emitidas", ok: true },
];

function JanelaDiagnostico() {
  return (
    <Janela
      titulo="diagnostico"
      chips={["5 perguntas"]}
      rodape={
        <>
          <span>Resultado</span>
          <span className={cx(s.tabular, s.anim, s.aparecerEm62)} style={{ color: "#1f7a4d" }}>
            4 de 5 em dia
          </span>
        </>
      }
    >
      {perguntas.map((p, i) => {
        return (
          <div key={p.texto} className={s.linha}>
            <span className={cx(p.ok && s[`risco${i}`], p.ok && s.anim, s.rotulo)}>
              {p.texto}
            </span>
            <span className={cx(s.selo, p.ok ? s.seloOk : s.seloAtencao, s.anim, s[`selo${i}`])}>
              {p.ok ? "✓ Em dia" : "! Atenção"}
            </span>
          </div>
        );
      })}
    </Janela>
  );
}

const dataPost = (iso: string) =>
  new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T12:00:00Z`)
  );

function JanelaBlog() {
  const post = posts[0];
  return (
    <Janela titulo={`blog/${post?.slug ?? "artigo"}`}>
      <div className={s.barraTrilho} style={{ height: 3, marginBottom: 16 }}>
        <div className={cx(s.barra, s.anim, s.ler)} />
      </div>
      {post && (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <span className={cx(s.selo, s.seloAtencao)}>{post.category}</span>
            <span className={s.rotulo}>{dataPost(post.date)}</span>
          </div>
          <p style={{ marginTop: 10, fontSize: 17, fontWeight: 700, lineHeight: 1.3, textWrap: "balance" }}>
            {post.title}
          </p>
        </>
      )}
      <div style={{ display: "grid", gap: 9, marginTop: 16 }}>
        {[100, 94, 98, 62, 0, 100, 88, 45].map((w, i) =>
          w === 0 ? (
            <div key={i} style={{ height: 4 }} />
          ) : (
            <div
              key={i}
              className={cx(s.esqueleto, s.anim, s.desenhar)}
              style={{ width: `${w}%`, animationDelay: `${0.3 + i * 0.18}s` }}
            />
          )
        )}
      </div>
    </Janela>
  );
}

const termos = [
  {
    termo: "DAS",
    definicao: "Documento de Arrecadação do Simples Nacional: a guia mensal que reúne os impostos do Simples.",
  },
  {
    termo: "Pró-labore",
    definicao: "A remuneração dos sócios pelo trabalho na empresa, com contribuição ao INSS.",
  },
  {
    termo: "CNAE",
    definicao: "Classificação Nacional de Atividades Econômicas: o código que diz o que a empresa faz.",
  },
];

function JanelaGlossario() {
  const classes = [s.termo1, s.termo2, s.termo3];
  return (
    <Janela titulo="glossario" chips={["A–Z"]}>
      <div className={s.abas}>
        <span className={cx(s.abaMarcador, s.anim)} />
        {termos.map((t) => (
          <span key={t.termo} className={s.aba}>
            {t.termo}
          </span>
        ))}
      </div>
      <div className={s.termos}>
        {termos.map((t, i) => (
          <div key={t.termo} className={cx(s.termo, s.anim, classes[i])}>
            <p style={{ fontSize: 24, fontWeight: 700, letterSpacing: "-0.01em" }}>{t.termo}</p>
            <p className={s.rotulo} style={{ marginTop: 8, fontSize: 14, lineHeight: 1.55 }}>
              {t.definicao}
            </p>
          </div>
        ))}
      </div>
    </Janela>
  );
}

const janelas: Record<string, { Componente: () => ReactNode; ciclo: string }> = {
  calculadoras: { Componente: JanelaCalculadora, ciclo: "7s" },
  biblioteca: { Componente: JanelaBiblioteca, ciclo: "7s" },
  diagnostico: { Componente: JanelaDiagnostico, ciclo: "8s" },
  blog: { Componente: JanelaBlog, ciclo: "7s" },
  glossario: { Componente: JanelaGlossario, ciclo: "10.5s" },
};

/* ---------------- Painel: só anima quando está na tela ---------------- */

function Painel({ ferramenta, tom }: { ferramenta: FerramentaDestaque; tom: "claro" | "escuro" }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [rodada, setRodada] = useState(0);
  const janela = janelas[ferramenta.slug];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisivel(e.isIntersecting), { threshold: 0.25 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const estilo: Css = { "--ciclo": janela?.ciclo ?? "7s" };

  return (
    <div
      ref={ref}
      className={s.painel}
      data-tom={tom}
      data-visivel={visivel ? "" : undefined}
      style={estilo}
      aria-hidden="true"
      // Passar o mouse recomeça a animação do início
      onMouseEnter={() => setRodada((r) => r + 1)}
    >
      <div className={s.guias}>
        <span className={s.arco} />
        <span className={s.cruz} style={{ left: 28, top: 28 }} />
        <span className={s.cruz} style={{ left: "calc(100% - 28px)", top: 28 }} />
        <span className={s.cruz} style={{ left: 28, top: "calc(100% - 28px)" }} />
        <span className={s.cruz} style={{ left: "calc(100% - 28px)", top: "calc(100% - 28px)" }} />
      </div>
      {janela && <janela.Componente key={rodada} />}
    </div>
  );
}

/* ---------------- Seção ---------------- */

export default function FerramentasDestaque() {
  const [pausado, setPausado] = useState(false);

  return (
    <section
      id="ferramentas"
      className={cx(s.secao, "bg-creme px-4 py-24 md:px-6 md:py-32")}
      data-pausado={pausado ? "" : undefined}
      aria-labelledby="ferramentas-titulo"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-12 flex flex-col items-start gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6239]">
              Ferramentas gratuitas
            </p>
            <h2
              id="ferramentas-titulo"
              className="mt-3 max-w-xl font-sans text-3xl font-bold leading-tight tracking-tight text-azul text-balance md:text-5xl"
            >
              Recursos para cuidar da sua empresa
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPausado((p) => !p)}
            aria-pressed={pausado}
            className={cx(
              s.pausa,
              "min-h-11 shrink-0 rounded-full border border-azul/20 px-5 font-sans text-sm font-semibold text-azul/75 transition-colors hover:border-[#8C6239] hover:text-azul focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8C6239]"
            )}
          >
            {pausado ? "Retomar animações" : "Pausar animações"}
          </button>
        </div>

        <ul className="flex flex-col gap-6 md:gap-8">
          {ferramentasDestaque.map((f, i) => {
            const chamada = chamadas[f.slug] ?? { titulo: f.title, acao: `Abrir ${f.title.toLowerCase()}` };
            return (
              <li key={f.slug} className={s.card} data-lado={i % 2 === 0 ? "esquerda" : "direita"}>
                <div className={s.texto}>
                  <p className={s.eyebrow}>{f.title}</p>
                  <h3 className={s.titulo}>{chamada.titulo}</h3>
                  <p className={s.descricao}>{f.description}</p>
                  <Link href={f.href} className={s.chip}>
                    {chamada.acao}
                    <span className={s.chipSeta} aria-hidden="true">
                      →
                    </span>
                  </Link>
                </div>
                <Painel ferramenta={f} tom={i % 2 === 0 ? "claro" : "escuro"} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
