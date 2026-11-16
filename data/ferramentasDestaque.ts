export type FerramentaDestaque = {
  slug: string;
  title: string;
  description: string;
  images: string[]; // 2 imagens, alternam em loop
  href: string;
};

export const ferramentasDestaque: FerramentaDestaque[] = [
  {
    slug: "calculadoras",
    title: "Calculadoras",
    description: "Simule impostos, pró-labore e margem de lucro em poucos cliques.",
    images: ["/images/ferramentas/calculadoras-1.jpg", "/images/ferramentas/calculadoras-2.jpg"],
    href: "/ferramentas",
  },
  {
    slug: "biblioteca",
    title: "Biblioteca de Arquivos",
    description: "Modelos de contratos, planilhas e documentos prontos para baixar.",
    images: ["/images/ferramentas/biblioteca-1.jpg", "/images/ferramentas/biblioteca-2.jpg"],
    href: "/biblioteca",
  },
  {
    slug: "diagnostico",
    title: "Diagnóstico Empresarial",
    description: "Um questionário rápido revela a saúde financeira do seu negócio.",
    images: ["/images/ferramentas/diagnostico-1.jpg", "/images/ferramentas/diagnostico-2.jpg"],
    href: "/diagnostico",
  },
  {
    slug: "blog",
    title: "Blog",
    description: "Análises sobre tributação, gestão e finanças para empresas.",
    images: ["/images/ferramentas/blog-1.jpg", "/images/ferramentas/blog-2.jpg"],
    href: "/blog",
  },
  {
    slug: "glossario",
    title: "Glossário",
    description: "Termos contábeis e tributários explicados em linguagem simples.",
    images: ["/images/ferramentas/glossario-1.jpg", "/images/ferramentas/glossario-2.jpg"],
    href: "/glossario",
  },
];