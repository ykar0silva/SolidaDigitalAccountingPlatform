"use client";

import { useId, useState } from "react";
import { newsletter } from "@/data/newsletter";

type Estado = "parado" | "enviando" | "ok" | "erro" | "inativo";

// Caixa de inscrição na newsletter. tom="claro" para fundo creme/branco,
// tom="escuro" para fundo azul.
export default function Newsletter({ tom = "claro" }: { tom?: "claro" | "escuro" }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [estado, setEstado] = useState<Estado>("parado");
  const escuro = tom === "escuro";

  const enviar = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    if (form.get("email_address_check")) return; // robô preencheu o campo escondido
    if (!newsletter.acaoBrevo) {
      setEstado("inativo");
      return;
    }
    setEstado("enviando");
    try {
      const dados = new FormData();
      dados.append("EMAIL", email);
      dados.append("email_address_check", "");
      dados.append("locale", "pt");
      // O Brevo não devolve resposta legível para outro site (no-cors):
      // se a requisição sair sem erro de rede, consideramos inscrito.
      await fetch(newsletter.acaoBrevo, { method: "POST", body: dados, mode: "no-cors" });
      setEstado("ok");
      setEmail("");
    } catch {
      setEstado("erro");
    }
  };

  const mensagens: Record<Exclude<Estado, "parado" | "enviando">, string> = {
    ok: "Inscrição feita! Confira seu e-mail para confirmar.",
    erro: "Não deu certo agora. Tente de novo em instantes.",
    inativo: "Obrigado! A newsletter está sendo ativada e abre as inscrições em breve.",
  };

  return (
    <div
      className={`rounded-3xl p-7 md:p-10 ${escuro ? "bg-azul text-white" : "border border-azul/10 bg-white text-azul shadow-sm shadow-azul/5"}`}
    >
      <p className={`font-sans text-xs font-semibold uppercase tracking-[0.2em] ${escuro ? "text-dourado" : "text-[#8C6239]"}`}>
        Newsletter
      </p>
      <h2 id={`${id}-titulo`} className="mt-3 font-display text-2xl leading-snug text-balance md:text-3xl">
        Mudanças em impostos e prazos, direto no seu e-mail
      </h2>
      <p className={`mt-2 font-sans text-sm leading-relaxed ${escuro ? "text-white/70" : "text-azul/65"}`}>
        Um e-mail curto quando algo mudar e afetar a sua empresa. Sem excesso.
      </p>

      <form onSubmit={enviar} aria-labelledby={`${id}-titulo`} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <label htmlFor={`${id}-email`} className="sr-only">
          Seu e-mail
        </label>
        <input
          id={`${id}-email`}
          type="email"
          name="EMAIL"
          required
          autoComplete="email"
          spellCheck={false}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seuemail@empresa.com.br"
          className={`min-h-12 w-full rounded-full border px-5 font-sans text-base outline-none transition-colors focus:ring-2 ${
            escuro
              ? "border-white/20 bg-white/5 text-white placeholder:text-white/40 focus:border-dourado focus:ring-dourado/30"
              : "border-azul/15 bg-white text-azul placeholder:text-azul/35 focus:border-[#8C6239] focus:ring-[#8C6239]/25"
          }`}
        />
        {/* Campo-armadilha para robôs (fica escondido para pessoas) */}
        <input type="text" name="email_address_check" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <button
          type="submit"
          disabled={estado === "enviando"}
          className={`min-h-12 shrink-0 rounded-full px-7 font-sans text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-60 ${
            escuro
              ? "bg-dourado text-azul hover:bg-white focus-visible:ring-dourado focus-visible:ring-offset-azul"
              : "bg-azul text-white hover:bg-[#8C6239] focus-visible:ring-[#8C6239]"
          }`}
        >
          {estado === "enviando" ? "Enviando…" : "Quero receber"}
        </button>
      </form>

      <p aria-live="polite" className="mt-3 min-h-5 font-sans text-sm font-semibold">
        {estado !== "parado" && estado !== "enviando" ? mensagens[estado] : ""}
      </p>
      <p className={`mt-1 font-sans text-xs leading-relaxed ${escuro ? "text-white/50" : "text-azul/50"}`}>
        Ao se inscrever, você concorda em receber e-mails da Sólida. Dá para cancelar quando quiser, pelo link no fim de
        cada e-mail.
      </p>
    </div>
  );
}
