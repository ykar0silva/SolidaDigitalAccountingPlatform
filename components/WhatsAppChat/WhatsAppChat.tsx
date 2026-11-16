"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { contato, linkWhatsApp } from "@/data/contato";

/* ------------------------------------------------------------------
   Chat flutuante do WhatsApp.
   Simula uma conversa curta (nome, serviço, empresa, detalhes) e monta
   a mensagem que vai pronta no link do WhatsApp. Nada é salvo no site.
------------------------------------------------------------------- */

type Autor = "bot" | "pessoa";
type Mensagem = { id: number; de: Autor; texto: string };
type Etapa = "nome" | "servico" | "empresa" | "detalhe" | "pronto";

const SERVICOS = [
  "Abrir uma empresa",
  "Contabilidade do dia a dia",
  "Folha de pagamento",
  "Planejamento tributário",
  "Reforma Tributária",
  "Outro assunto",
];

const EMPRESA = ["Sim, já tenho CNPJ", "Sou MEI", "Ainda não tenho empresa"];

const LIMITE_NOME = 60;
const LIMITE_DETALHE = 500;

function IconeWhatsApp({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function WhatsAppChat() {
  const [aberto, setAberto] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);
  const [etapa, setEtapa] = useState<Etapa>("nome");
  const [digitando, setDigitando] = useState(false);
  const [texto, setTexto] = useState("");
  const [erro, setErro] = useState("");
  const [respostas, setRespostas] = useState({ nome: "", servico: "", empresa: "", detalhe: "" });

  const idRef = useRef(0);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const campoRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);
  const listaRef = useRef<HTMLDivElement>(null);
  const iniciou = useRef(false);
  const timers = useRef<number[]>([]);

  const menosMovimento = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // A "Sólida" responde: indicador de digitação e depois as mensagens
  const falar = useCallback((textos: string[]) => {
    const pausa = menosMovimento() ? 0 : 650;
    setDigitando(true);
    textos.forEach((t, i) => {
      const id = window.setTimeout(() => {
        setMensagens((m) => [...m, { id: ++idRef.current, de: "bot", texto: t }]);
        if (i === textos.length - 1) setDigitando(false);
      }, pausa * (i + 1));
      timers.current.push(id);
    });
  }, []);

  // Primeira abertura: saudação
  useEffect(() => {
    if (!aberto || iniciou.current) return;
    iniciou.current = true;
    falar(["Olá! Aqui é da Sólida Assessoria Contábil.", "Para começar, qual é o seu nome?"]);
  }, [aberto, falar]);

  // Limpa timers ao desmontar
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // Rola para a última mensagem
  useEffect(() => {
    listaRef.current?.scrollTo({ top: listaRef.current.scrollHeight, behavior: menosMovimento() ? "auto" : "smooth" });
  }, [mensagens, digitando]);

  // Foco no campo quando é a vez da pessoa escrever
  useEffect(() => {
    if (aberto && !digitando && (etapa === "nome" || etapa === "detalhe")) campoRef.current?.focus();
  }, [aberto, digitando, etapa]);

  // Esc fecha e devolve o foco ao botão
  useEffect(() => {
    if (!aberto) return;
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setAberto(false);
        botaoRef.current?.focus();
      }
    };
    window.addEventListener("keydown", aoTeclar);
    return () => window.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  const responder = (valor: string) => setMensagens((m) => [...m, { id: ++idRef.current, de: "pessoa", texto: valor }]);

  const enviarTexto = (e: React.FormEvent) => {
    e.preventDefault();
    const valor = texto.trim();

    if (etapa === "nome") {
      if (!valor) {
        setErro("Escreva seu nome para continuar.");
        return;
      }
      const nome = valor.slice(0, LIMITE_NOME);
      setErro("");
      setTexto("");
      responder(nome);
      setRespostas((r) => ({ ...r, nome }));
      const primeiro = nome.split(/\s+/)[0];
      falar([`Prazer, ${primeiro}!`, "Em que a Sólida pode te ajudar?"]);
      setEtapa("servico");
      return;
    }

    if (etapa === "detalhe") {
      const detalhe = valor.slice(0, LIMITE_DETALHE);
      setTexto("");
      responder(detalhe || "Prefiro explicar no WhatsApp.");
      setRespostas((r) => ({ ...r, detalhe }));
      finalizar();
    }
  };

  const escolherServico = (servico: string) => {
    responder(servico);
    if (servico === "Abrir uma empresa") {
      // Quem vai abrir empresa ainda não tem CNPJ: pula a pergunta
      setRespostas((r) => ({ ...r, servico, empresa: "Ainda não tenho empresa" }));
      falar(["Ótimo, a gente cuida de tudo na abertura.", "Quer contar algum detalhe? Por exemplo, o ramo do negócio."]);
      setEtapa("detalhe");
    } else {
      setRespostas((r) => ({ ...r, servico }));
      falar(["Certo! Você já tem empresa aberta?"]);
      setEtapa("empresa");
    }
  };

  const escolherEmpresa = (empresa: string) => {
    responder(empresa);
    setRespostas((r) => ({ ...r, empresa }));
    falar(["Anotado.", "Quer contar algum detalhe para a nossa equipe já chegar preparada?"]);
    setEtapa("detalhe");
  };

  const finalizar = () => {
    falar(["Perfeito! Montei a sua mensagem.", "É só tocar em enviar que ela abre no WhatsApp da Sólida."]);
    setEtapa("pronto");
  };

  const mensagemFinal = () => {
    const { nome, servico, empresa, detalhe } = respostas;
    const linhas = [
      `Olá! Meu nome é ${nome}.`,
      servico && `Vim pelo site e preciso de ajuda com: ${servico}.`,
      empresa && `Situação da empresa: ${empresa}.`,
      detalhe && `Detalhes: ${detalhe}`,
    ];
    return linhas.filter(Boolean).join("\n");
  };

  const recomecar = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setMensagens([]);
    setRespostas({ nome: "", servico: "", empresa: "", detalhe: "" });
    setTexto("");
    setErro("");
    setEtapa("nome");
    setDigitando(false);
    falar(["Vamos de novo!", "Qual é o seu nome?"]);
  };

  if (!contato.whatsapp) return null;

  const podeEscolher = !digitando;

  return (
    <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end gap-3 md:bottom-6 md:right-6">
      {aberto && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby="chat-titulo"
          className="flex h-[min(560px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden overscroll-contain rounded-3xl border border-black/5 bg-[#EFEAE2] shadow-2xl shadow-black/30 motion-safe:animate-[chatEntrar_0.25s_ease-out]"
        >
          {/* Cabeçalho */}
          <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-azul font-display text-lg text-dourado">
              S
            </span>
            <div className="min-w-0 flex-1">
              <p id="chat-titulo" className="truncate font-sans text-sm font-semibold">
                Sólida Assessoria Contábil
              </p>
              <p className="font-sans text-xs text-white/75" aria-live="polite">
                {digitando ? "digitando…" : "online agora"}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setAberto(false);
                botaoRef.current?.focus();
              }}
              aria-label="Fechar conversa"
              className="flex h-10 w-10 items-center justify-center rounded-full text-xl text-white/85 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          {/* Mensagens */}
          <div
            ref={listaRef}
            className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-4"
            aria-live="polite"
            aria-relevant="additions"
          >
            {mensagens.map((m) => (
              <div key={m.id} className={`flex ${m.de === "pessoa" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[82%] whitespace-pre-line break-words rounded-2xl px-3.5 py-2 font-sans text-sm leading-snug text-[#111B21] shadow-sm ${
                    m.de === "pessoa" ? "rounded-tr-md bg-[#D9FDD3]" : "rounded-tl-md bg-white"
                  }`}
                >
                  <span className="sr-only">{m.de === "pessoa" ? "Você: " : "Sólida: "}</span>
                  {m.texto}
                </p>
              </div>
            ))}

            {digitando && (
              <div className="flex justify-start" aria-hidden="true">
                <span className="flex gap-1 rounded-2xl rounded-tl-md bg-white px-4 py-3 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[#8696A0] motion-safe:animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              </div>
            )}

            {/* Prévia da mensagem final */}
            {etapa === "pronto" && !digitando && (
              <div className="mt-3 rounded-2xl border border-[#075E54]/15 bg-white/70 p-3">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-wider text-[#075E54]">
                  Mensagem que vai para o WhatsApp
                </p>
                <p className="mt-1.5 whitespace-pre-line break-words font-sans text-sm text-[#111B21]">{mensagemFinal()}</p>
              </div>
            )}
          </div>

          {/* Área de resposta */}
          <div className="border-t border-black/5 bg-[#F0F2F5] p-3">
            {(etapa === "nome" || etapa === "detalhe") && (
              <form onSubmit={enviarTexto} className="flex items-end gap-2" noValidate>
                <label htmlFor="chat-campo" className="sr-only">
                  {etapa === "nome" ? "Seu nome" : "Detalhes (opcional)"}
                </label>
                {etapa === "nome" ? (
                  <input
                    id="chat-campo"
                    ref={campoRef}
                    name="nome"
                    autoComplete="name"
                    maxLength={LIMITE_NOME}
                    value={texto}
                    onChange={(e) => {
                      setTexto(e.target.value);
                      if (erro) setErro("");
                    }}
                    disabled={digitando}
                    placeholder="Digite seu nome…"
                    aria-invalid={Boolean(erro)}
                    aria-describedby={erro ? "chat-erro" : undefined}
                    className="min-h-11 flex-1 rounded-full border-0 bg-white px-4 font-sans text-[16px] text-[#111B21] outline-none ring-[#075E54] placeholder:text-[#8696A0] focus-visible:ring-2 disabled:opacity-60"
                  />
                ) : (
                  <textarea
                    id="chat-campo"
                    ref={campoRef}
                    name="detalhe"
                    autoComplete="off"
                    rows={1}
                    maxLength={LIMITE_DETALHE}
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        e.currentTarget.form?.requestSubmit();
                      }
                    }}
                    disabled={digitando}
                    placeholder="Escreva aqui ou toque em enviar…"
                    className="max-h-28 min-h-11 flex-1 resize-none rounded-3xl border-0 bg-white px-4 py-2.5 font-sans text-[16px] leading-snug text-[#111B21] outline-none ring-[#075E54] placeholder:text-[#8696A0] focus-visible:ring-2 disabled:opacity-60"
                  />
                )}
                <button
                  type="submit"
                  disabled={digitando}
                  aria-label={etapa === "detalhe" && !texto.trim() ? "Pular detalhes" : "Enviar resposta"}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#00A884] text-white transition-colors hover:bg-[#008F6F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2 disabled:opacity-50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                    <path d="M3.4 20.4 21 12 3.4 3.6 3.4 10l12.6 2-12.6 2z" />
                  </svg>
                </button>
              </form>
            )}
            {erro && (
              <p id="chat-erro" role="alert" className="mt-2 px-2 font-sans text-xs text-[#B42318]">
                {erro}
              </p>
            )}

            {(etapa === "servico" || etapa === "empresa") && (
              <div className="flex flex-wrap gap-2" role="group" aria-label={etapa === "servico" ? "Escolha o serviço" : "Situação da empresa"}>
                {(etapa === "servico" ? SERVICOS : EMPRESA).map((op) => (
                  <button
                    key={op}
                    type="button"
                    disabled={!podeEscolher}
                    onClick={() => (etapa === "servico" ? escolherServico(op) : escolherEmpresa(op))}
                    className="min-h-10 rounded-full border border-[#00A884]/40 bg-white px-3.5 font-sans text-sm font-medium text-[#075E54] transition-colors hover:border-[#00A884] hover:bg-[#E7FCE3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] disabled:opacity-50"
                  >
                    {op}
                  </button>
                ))}
              </div>
            )}

            {etapa === "pronto" && (
              <div className="flex flex-col gap-2">
                <a
                  href={linkWhatsApp(mensagemFinal())}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={digitando}
                  className={`flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#00A884] px-5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#008F6F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54] focus-visible:ring-offset-2 ${
                    digitando ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <IconeWhatsApp className="h-5 w-5" />
                  Enviar no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={recomecar}
                  className="min-h-10 rounded-full font-sans text-sm font-medium text-[#54656F] transition-colors hover:bg-black/5 hover:text-[#111B21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075E54]"
                >
                  Recomeçar conversa
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Botão flutuante */}
      <button
        ref={botaoRef}
        type="button"
        onClick={() => setAberto((a) => !a)}
        aria-expanded={aberto}
        aria-label={aberto ? "Fechar conversa no WhatsApp" : "Conversar no WhatsApp"}
        className="group flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/25 transition-transform duration-200 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#25D366] motion-reduce:hover:scale-100 md:h-16 md:w-16"
      >
        {aberto ? (
          <span aria-hidden="true" className="text-3xl leading-none">×</span>
        ) : (
          <IconeWhatsApp className="h-8 w-8 md:h-9 md:w-9" />
        )}
      </button>
    </div>
  );
}
