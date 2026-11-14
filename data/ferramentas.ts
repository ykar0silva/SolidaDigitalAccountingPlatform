export type Ferramenta = {
  key: number;
  slug: string;
  name: string;
  description: string;
};

export const ferramentas: Ferramenta[] = [
  { key: 1, slug: "pro-labore", name: "Pró-labore", description: "Calcule o valor ideal de retirada mensal." },
  { key: 2, slug: "regime-tributario", name: "Regime Tributário", description: "Simples, Presumido ou Real: qual compensa mais." },
  { key: 3, slug: "margem-lucro", name: "Margem de Lucro", description: "Descubra sua margem real de lucro." },
  { key: 4, slug: "ponto-equilibrio", name: "Ponto de Equilíbrio", description: "Quanto vender para cobrir os custos." },
  { key: 5, slug: "das-mei", name: "DAS MEI", description: "Simule seu próximo pagamento." },
  { key: 6, slug: "decimo-terceiro", name: "13º Salário", description: "Calcule o valor a receber ou pagar." },
];