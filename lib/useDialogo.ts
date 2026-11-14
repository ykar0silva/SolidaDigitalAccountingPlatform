"use client";

import { useEffect, useRef } from "react";

const FOCAVEIS = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

// Comportamento padrão de modal: fecha com Esc, trava o scroll da página,
// leva o foco para dentro, prende o Tab no modal e devolve o foco ao fechar.
export function useDialogo<T extends HTMLElement>(aberto: boolean, onClose: () => void) {
  const caixaRef = useRef<T>(null);
  const fecharRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!aberto) return;

    const focoAnterior = document.activeElement as HTMLElement | null;
    const overflowAnterior = document.body.style.overflow;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !caixaRef.current) return;

      const focaveis = caixaRef.current.querySelectorAll<HTMLElement>(FOCAVEIS);
      if (focaveis.length === 0) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];

      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);
    fecharRef.current?.focus();

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
      focoAnterior?.focus();
    };
  }, [aberto]);

  return { caixaRef, fecharRef };
}
