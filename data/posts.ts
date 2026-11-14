export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  category: string;
  date: string; // formato ISO, tipo "2026-03-10"
};

export const posts: Post[] = [
  {
    slug: "novo-prazo-das-mei-2026",
    title: "Novo prazo do DAS MEI: o que muda para o seu negócio",
    excerpt: "A Receita Federal atualizou o calendário de pagamento. Veja como isso afeta o MEI em Palmas.",
    coverImage: "/images/blog/das-mei.jpg",
    category: "MEI",
    date: "2026-03-10",
  },
  // demais posts
];