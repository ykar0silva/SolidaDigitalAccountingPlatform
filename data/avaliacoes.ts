export type Avaliacao = {
  nome: string;
  detalhe: string;
  texto: string;
  nota: number;
};

// Preencha com avaliações reais (Google ou depoimentos autorizados).
export const avaliacoes: Avaliacao[] = [
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
  { nome: "Nome do cliente", detalhe: "Empresa ou cidade", texto: "Texto da avaliação real entra aqui.", nota: 5 },
];
// Preencha com os números reais do Google. Enquanto for null, a linha de nota não aparece.
export const resumo: { nota: number | null; total: number | null } = {
  nota: 5.0,
  total: null,
};

// Link para o cliente deixar avaliação (perfil da Sólida no Google).
export const linkAvaliar = "https://g.page/r/COLE_AQUI/review";