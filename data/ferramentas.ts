// Calculadoras da página /ferramentas. Cada uma vira /ferramentas/<slug>.
// A ordem aqui é a ordem em que aparecem na página.

export type Ferramenta = {
  slug: string;
  nome: string; // nome curto (cards e menus)
  titulo: string; // título da página (h1)
  descricao: string; // frase curta do card e da busca do Google
  intro: string; // texto abaixo do título
  comoFunciona: string[]; // passos do cálculo, em linguagem simples
  publico: "MEI" | "Empresa" | "Pessoal";
};

export const ferramentas: Ferramenta[] = [
  {
    slug: "das-mei",
    nome: "DAS MEI",
    titulo: "Calculadora do DAS MEI 2026",
    descricao: "Veja quanto o MEI paga por mês em 2026 conforme a atividade.",
    intro:
      "O DAS é a guia mensal do MEI. Ele junta o INSS (5% do salário mínimo) com um valor fixo de ICMS e/ou ISS, conforme o que você vende.",
    comoFunciona: [
      "INSS: 5% do salário mínimo de 2026 (R$ 1.621,00), ou 12% para o MEI caminhoneiro.",
      "ICMS: R$ 1,00 fixo para quem vende produtos (comércio ou indústria).",
      "ISS: R$ 5,00 fixo para quem presta serviços.",
      "O DAS vence todo dia 20 do mês seguinte, mesmo sem faturamento no mês.",
    ],
    publico: "MEI",
  },
  {
    slug: "pro-labore",
    nome: "Pró-labore",
    titulo: "Calculadora de pró-labore 2026",
    descricao: "Descubra o valor líquido do pró-labore depois do INSS e do IR.",
    intro:
      "Pró-labore é a remuneração do sócio pelo trabalho na empresa. Sobre ele há desconto de INSS e, conforme o valor, de Imposto de Renda.",
    comoFunciona: [
      "INSS do sócio: 11% do pró-labore, até o teto de R$ 8.475,55 (desconto máximo de R$ 932,31).",
      "Imposto de Renda: tabela progressiva mensal com a redução de 2026. Até R$ 5.000,00 de rendimento, o IR fica zerado.",
      "A conta usa o que for melhor para você: as deduções legais (INSS e dependentes) ou o desconto simplificado de R$ 607,20.",
      "Fora do Simples (e no Anexo IV), a empresa ainda paga 20% de INSS patronal sobre o pró-labore.",
    ],
    publico: "Empresa",
  },
  {
    slug: "regime-tributario",
    nome: "Regime tributário",
    titulo: "Simples Nacional ou Lucro Presumido?",
    descricao: "Compare quanto sua empresa pagaria no Simples e no Lucro Presumido.",
    intro:
      "Uma estimativa rápida para comparar os dois regimes mais usados por pequenas e médias empresas, com base no faturamento e na folha de pagamento.",
    comoFunciona: [
      "Simples Nacional: alíquota efetiva do anexo da sua atividade, calculada sobre o faturamento dos últimos 12 meses.",
      "Fator R: serviços intelectuais com folha de pelo menos 28% do faturamento ficam no Anexo III; abaixo disso, no Anexo V.",
      "Lucro Presumido: IRPJ, CSLL, PIS e COFINS sobre o faturamento, ISS para serviços e 20% de INSS patronal sobre a folha.",
      "Para comércio e indústria, o ICMS do Presumido depende dos créditos de cada empresa e não entra na conta; mostramos até quanto ele pode chegar para o Presumido compensar.",
    ],
    publico: "Empresa",
  },
  {
    slug: "margem-lucro",
    nome: "Margem de lucro",
    titulo: "Calculadora de margem de lucro",
    descricao: "Descubra quanto sobra de cada real vendido depois de custos e impostos.",
    intro:
      "A margem de lucro mostra quanto da receita realmente vira resultado. Informe os números de um mês e veja a margem de contribuição e a margem líquida.",
    comoFunciona: [
      "Margem de contribuição: receita menos custos diretos (produtos, insumos, comissões) e impostos sobre a venda.",
      "Lucro: margem de contribuição menos as despesas fixas (aluguel, salários, contador, sistemas).",
      "Margem líquida: lucro dividido pela receita.",
    ],
    publico: "Empresa",
  },
  {
    slug: "ponto-equilibrio",
    nome: "Ponto de equilíbrio",
    titulo: "Calculadora de ponto de equilíbrio",
    descricao: "Saiba quanto precisa vender por mês para cobrir todos os custos.",
    intro:
      "O ponto de equilíbrio é o volume de vendas em que a empresa não tem lucro nem prejuízo. Acima dele, cada venda passa a gerar lucro.",
    comoFunciona: [
      "Margem de contribuição por unidade: preço de venda menos o custo variável dessa unidade.",
      "Ponto de equilíbrio em unidades: custos fixos do mês divididos pela margem de contribuição por unidade.",
      "Ponto de equilíbrio em reais: unidades multiplicadas pelo preço de venda.",
    ],
    publico: "Empresa",
  },
  {
    slug: "decimo-terceiro",
    nome: "13º salário",
    titulo: "Calculadora de 13º salário 2026",
    descricao: "Calcule as duas parcelas do 13º com os descontos de INSS e IR.",
    intro:
      "Serve para o funcionário conferir o que vai receber e para a empresa saber quanto separar. A primeira parcela é paga até 30 de novembro e a segunda até 20 de dezembro.",
    comoFunciona: [
      "Valor bruto: salário (mais a média de horas extras e adicionais) dividido por 12 e multiplicado pelos meses trabalhados. Conta o mês com 15 dias ou mais.",
      "Primeira parcela: metade do valor bruto, sem descontos.",
      "Segunda parcela: o restante, já com o desconto de INSS e de IR sobre o 13º inteiro.",
      "O IR do 13º é calculado separado do salário e também tem a redução de 2026 (zerado até R$ 5.000,00).",
    ],
    publico: "Pessoal",
  },
];

export const buscarFerramenta = (slug: string) => ferramentas.find((f) => f.slug === slug);
