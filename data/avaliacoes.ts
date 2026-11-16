export type Avaliacao = {
  nome: string;
  detalhe: string;
  texto: string;
  nota: number;
  foto?: string; // em public/
};

// Avaliações mais relevantes do perfil da Sólida no Google Maps
// (coletadas em 16/11/2026). Fotos: as de perfil dos próprios autores no Google.
export const avaliacoes: Avaliacao[] = [
  {
    nome: "Marlon Nicolak",
    detalhe: "Avaliação no Google",
    texto:
      "Sou cliente desde 2011. Serviço sério e muito profissional, como toda contabilidade deveria ser. Sem dúvida a Sólida é a melhor Contabilidade do estado do Tocantins. Nós da Harufo Café não trocamos por nenhuma outra. Atendimento é um grande diferêncial!",
    nota: 5,
    foto: "/images/avaliacoes/marlon-nicolak.png",
  },
  {
    nome: "Whyllyan Goetten",
    detalhe: "Avaliação no Google",
    texto:
      "Estou há 12 anos sendo muito bem atendido e extremamente satisfeito. Excelência e prontidão. Organização e clareza nos trabalhos. Recomendo a todos!",
    nota: 5,
    foto: "/images/avaliacoes/whyllyan-goetten.png",
  },
  {
    nome: "Claudiane Cavichio",
    detalhe: "Avaliação no Google",
    texto:
      "Empresa sensacional, admiro e confio plenamente no trabalho e no profissionalismo de toda equipe!! Vocês são nota mil",
    nota: 5,
    foto: "/images/avaliacoes/claudiane-cavichio.png",
  },
  {
    nome: "Andréa Dezotti Gabriel",
    detalhe: "Avaliação no Google",
    texto:
      "Profissionais competentes e dedicadas, sempre entregando o melhor serviço para os clientes. Parabéns!",
    nota: 5,
    foto: "/images/avaliacoes/andrea-dezotti-gabriel.png",
  },
  {
    nome: "Luciana Aguiar",
    detalhe: "Avaliação no Google",
    texto:
      "Local de bons profissionais sempre mantendo a organização nos serviços prestados com dedicação e excelência.",
    nota: 5,
    foto: "/images/avaliacoes/luciana-aguiar.png",
  },
];

// Números reais do perfil no Google. Enquanto for null, a linha de nota não aparece.
export const resumo: { nota: number | null; total: number | null } = {
  nota: 5.0,
  total: 23,
};

// Perfil da Sólida no Google Maps (lá fica o botão de avaliar).
export const linkAvaliar = "https://www.google.com/maps?cid=12368661335113497994";
