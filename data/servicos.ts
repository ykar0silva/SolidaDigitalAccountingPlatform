export type Servico = {
  titulo: string;
  descricao: string;
  destaque?: boolean;
};

export const servicos: Servico[] = [
  {
    titulo: "Legalização e Paralegal",
    descricao: "Constituição, alteração e encerramento de empresas.",
  },
  {
    titulo: "Escrituração Fiscal",
    descricao: "Apuração de impostos e obrigações acessórias.",
  },
  {
    titulo: "Escrituração Contábil",
    descricao: "Demonstrativos financeiros e análises.",
  },
  {
    titulo: "Gestão de Pessoal",
    descricao: "Folha de pagamento e rotinas trabalhistas.",
  },
  {
    titulo: "Assessoria Contábil e Tributária",
    descricao: "Suporte contínuo para decisões estratégicas.",
  },
  {
    titulo: "Planejamento Tributário",
    descricao: "Otimização da carga tributária.",
  },
  {
    titulo: "Reforma Tributária",
    descricao: "Consultoria e implementação da reforma na sua empresa.",
    destaque: true,
  },
  {
    titulo: "Importação e Exportação",
    descricao: "Assessoria em comércio exterior.",
  },
  {
    titulo: "Estruturação de Holdings",
    descricao: "Organização patrimonial e tributária.",
  },
];