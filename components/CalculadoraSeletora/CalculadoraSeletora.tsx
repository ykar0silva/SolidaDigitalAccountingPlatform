"use client";

import { useState } from "react";
import { ferramentas, Ferramenta } from "@/data/ferramentas";
import FerramentaModal from "./FerramentaModal";

export default function CalculadoraSeletora() {
  const [selecionada, setSelecionada] = useState<Ferramenta | null>(null);
  const [aberta, setAberta] = useState<Ferramenta | null>(null);

  const visorTexto = selecionada
    ? `${selecionada.key}. ${selecionada.name.toUpperCase()}`
    : "SELECIONE 1-6";

  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-10 justify-center">
      <div className="flex flex-col items-center gap-4">
        <p className="font-sans text-white/70 text-sm text-center max-w-xs">
          Escolha uma ferramenta pelo número e aperte Selecionar
        </p>

        {/* Corpo da calculadora */}
        <div
          className="w-72 rounded-[28px] p-5 shadow-2xl"
          style={{
            background: "linear-gradient(145deg, #1a2b3d, #0a1420)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.1)",
          }}
        >
          {/* Visor LCD */}
          <div
            className="w-full rounded-lg px-4 py-6 mb-5 text-right overflow-hidden"
            style={{
              background: "linear-gradient(180deg, #0D1B2A, #060d15)",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.6)",
            }}
          >
            <span
              className="text-dourado text-sm tracking-wider"
              style={{
                fontFamily: "'Courier New', monospace",
                textShadow: "0 0 8px rgba(209,168,117,0.5)",
              }}
            >
              {visorTexto}
            </span>
          </div>

          {/* Teclado 1-6 */}
          <div className="grid grid-cols-3 gap-3 mb-3">
            {ferramentas.map((f) => (
              <button
                key={f.key}
                onClick={() => setSelecionada(f)}
                className="aspect-square rounded-xl font-display text-2xl transition-all duration-100 active:translate-y-0.5"
                style={{
                  background:
                    selecionada?.key === f.key
                      ? "linear-gradient(145deg, #D1A875, #b8875a)"
                      : "linear-gradient(145deg, #2a3b4d, #1c2b3a)",
                  color: selecionada?.key === f.key ? "#0D1B2A" : "#ffffff",
                  boxShadow:
                    selecionada?.key === f.key
                      ? "0 2px 4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,0.3)"
                      : "0 4px 8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.1)",
                }}
              >
                {f.key}
              </button>
            ))}
          </div>

          {/* Selecionar */}
          <button
            onClick={() => selecionada && setAberta(selecionada)}
            disabled={!selecionada}
            className="w-full rounded-xl font-sans font-semibold py-3.5 transition-all duration-100 active:translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(145deg, #D1A875, #b8875a)",
              color: "#0D1B2A",
              boxShadow: "0 4px 8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.3)",
            }}
          >
            SELECIONAR
          </button>
        </div>
      </div>

      {/* Legenda */}
      <ul className="flex flex-col gap-2">
        {ferramentas.map((f) => (
          <li key={f.key} className="font-sans text-white/80 text-sm">
            <span className="text-dourado font-semibold">{f.key}</span> · {f.name}
          </li>
        ))}
      </ul>

      <FerramentaModal ferramenta={aberta} onClose={() => setAberta(null)} />
    </div>
  );
}