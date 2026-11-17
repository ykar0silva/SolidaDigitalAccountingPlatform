// Leitura dos posts do blog: cada post é um arquivo .md em content/blog/.
// Só roda no servidor (na hora do build), por isso usa o sistema de arquivos.
//
// Formato de um post:
// ---
// titulo: Título do post
// resumo: Uma ou duas frases que aparecem na lista e no Google
// data: 2026-11-10
// categoria: Imposto de Renda
// autor: Equipe Sólida
// rascunho: false            (opcional; true esconde o post)
// ---
// Texto em Markdown (## para subtítulos, **negrito**, listas com -, links...)

import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";

const PASTA = path.join(process.cwd(), "content", "blog");

export type PostResumo = {
  slug: string;
  titulo: string;
  resumo: string;
  data: string; // AAAA-MM-DD
  categoria: string;
  autor: string;
  minutos: number; // tempo de leitura
};

export type Post = PostResumo & { html: string };

// Cabeçalho simples "chave: valor" entre as linhas ---
function lerCabecalho(texto: string) {
  const m = texto.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { dados: {} as Record<string, string>, corpo: texto };
  const dados: Record<string, string> = {};
  for (const linha of m[1].split(/\r?\n/)) {
    const i = linha.indexOf(":");
    if (i < 1) continue;
    const chave = linha.slice(0, i).trim();
    const valor = linha
      .slice(i + 1)
      .trim()
      .replace(/^["'](.*)["']$/, "$1");
    dados[chave] = valor;
  }
  return { dados, corpo: m[2] };
}

function lerArquivo(arquivo: string): Post | null {
  const slug = arquivo.replace(/\.md$/, "");
  const { dados, corpo } = lerCabecalho(fs.readFileSync(path.join(PASTA, arquivo), "utf8"));
  if (dados.rascunho === "true") return null;
  const palavras = corpo.split(/\s+/).filter(Boolean).length;
  return {
    slug,
    titulo: dados.titulo ?? slug,
    resumo: dados.resumo ?? "",
    data: dados.data ?? "",
    categoria: dados.categoria ?? "Geral",
    autor: dados.autor ?? "Equipe Sólida",
    minutos: Math.max(1, Math.round(palavras / 200)),
    html: marked.parse(corpo, { async: false }) as string,
  };
}

// Todos os posts publicados, do mais novo para o mais antigo
export function listarPosts(): PostResumo[] {
  if (!fs.existsSync(PASTA)) return [];
  return fs
    .readdirSync(PASTA)
    .filter((a) => a.endsWith(".md"))
    .map(lerArquivo)
    .filter((p): p is Post => p !== null)
    .sort((a, b) => b.data.localeCompare(a.data))
    .map((p) => ({
      slug: p.slug,
      titulo: p.titulo,
      resumo: p.resumo,
      data: p.data,
      categoria: p.categoria,
      autor: p.autor,
      minutos: p.minutos,
    }));
}

export function buscarPost(slug: string): Post | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const arquivo = `${slug}.md`;
  if (!fs.existsSync(path.join(PASTA, arquivo))) return null;
  return lerArquivo(arquivo);
}

export const formatarData = (iso: string) =>
  iso
    ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
        new Date(`${iso}T00:00:00Z`),
      )
    : "";
