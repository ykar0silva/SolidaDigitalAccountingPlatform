"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "Início", href: "/" },
  { label: "Sobre", href: "/sobre" },
  { label: "Serviços", href: "/servicos" },
  { label: "Blog", href: "/blog" },
  { label: "Ferramentas", href: "/ferramentas" },
  { label: "Contato", href: "/contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          className="md:hidden flex flex-col gap-1.5 z-50"
          aria-label="Abrir menu"
        >
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
          <span className="w-6 h-0.5 bg-white" />
        </button>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 bg-azul flex flex-col items-center justify-center gap-8 z-50">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
            aria-label="Fechar menu"
          >
            ×
          </button>
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="font-display text-dourado text-3xl"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}