export type Socia = {
  slug: string;
  name: string;
  role: string;
  descricao: string;
  qualificacoes: string[];
};

// A ordem importa: a primeira fica à esquerda da foto, a segunda à direita.
export const socias: Socia[] = [
  {
    slug: "cleia",
    name: "Cleia Fernandes",
    role: "Sócia-fundadora",
    descricao:
      "Com visão estratégica e dedicação, transforma desafios contábeis em oportunidades de crescimento para os clientes.",
    qualificacoes: [
      "Graduada em Ciências Contábeis",
      "Graduada em Direito",
      "Especialização em Direito Tributário",
      "MBA em Legislação Trabalhista e Direito Previdenciário",
      "MBA em Holding",
      "Pós-graduação em Gerência Contábil, Auditoria e Controladoria",
    ],
  },
  {
    slug: "nubia",
    name: "Núbia Fernandes",
    role: "Sócia-fundadora",
    descricao:
      "Alia conhecimento técnico e sensibilidade para oferecer um atendimento próximo e humanizado.",
    qualificacoes: [
      "Graduada em Ciências Contábeis",
      "Pós-graduação em Gerência Contábil, Auditoria e Controladoria",
      "Especialização em Direito Tributário",
      "MBA em Auditoria Digital",
      "MBA em Holding",
      "Conselheira do CRC/TO",
    ],
  },
];

export const historiaSolida =
  "A Sólida nasceu do sonho de duas irmãs, Cleia e Núbia, durante a graduação em Ciências Contábeis. Elas idealizavam um escritório em que o contador fosse além do registro de notas. Em 2008, fundaram oficialmente a empresa. O nome Sólida foi escolhido para transmitir solidez, confiança e segurança.";

export const missaoSolida =
  "Apoiar o crescimento sustentável dos nossos clientes, oferecendo assessoria estratégica e serviços personalizados que garantem solidez e confiança nos negócios.";

export const valoresSolida = [
  { titulo: "Ética", texto: "Atuação pautada em princípios sólidos." },
  { titulo: "Transparência", texto: "Comunicação clara e honesta." },
  { titulo: "Inovação", texto: "Sempre atualizados com as mudanças." },
  { titulo: "Compromisso", texto: "Dedicação total aos nossos clientes." },
];