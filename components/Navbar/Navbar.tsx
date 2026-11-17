"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { navegacao as menuItems } from "@/data/navegacao";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Menu mobile aberto: trava o scroll da página e fecha com Esc
  useEffect(() => {
    if (!menuOpen) return;

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const overflowAnterior = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", aoTeclar);

    return () => {
      document.body.style.overflow = overflowAnterior;
      window.removeEventListener("keydown", aoTeclar);
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled ? "bg-azul shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-12 py-4">
        <Link href="/">
          <Image
            src="/images/logo-principal-sem-fundo.png"
            alt="Sólida Assessoria Contábil"
            width={200}
            height={60}
            className="h-14 w-auto md:h-20"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-sans text-sm text-white">
          {menuItems.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-dourado transition-colors">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(true)}
          className="group md:hidden flex flex-col gap-1.5 z-50 p-2 -m-2"
          aria-label="Abrir menu"
          aria-expanded={menuOpen}
          aria-controls="menu-mobile"
        >
          <span aria-hidden="true" className="w-6 h-0.5 bg-white transition-colors group-hover:bg-dourado" />
          <span aria-hidden="true" className="w-6 h-0.5 bg-white transition-colors group-hover:bg-dourado" />
          <span aria-hidden="true" className="w-6 h-0.5 bg-white transition-colors group-hover:bg-dourado" />
        </button>
      </nav>

      {menuOpen && (
        <div
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 bg-azul flex flex-col items-center justify-center gap-8 z-50 overscroll-contain"
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl transition-colors hover:text-dourado"
            aria-label="Fechar menu"
            autoFocus
          >
            <span aria-hidden="true">×</span>
          </button>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-dourado text-3xl transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}