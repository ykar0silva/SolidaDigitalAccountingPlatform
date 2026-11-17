// Valores oficiais usados nas calculadoras (ano-base 2026).
// Quando mudarem (normalmente em janeiro), atualize só este arquivo.
//
// Fontes (conferidas em 16/11/2026):
// - Salário mínimo: Decreto nº 12.797/2025 (R$ 1.621,00 desde 01/01/2026)
// - INSS: Portaria Interministerial MPS/MF nº 13, de 09/01/2026 (gov.br/inss)
// - IRRF: tabela progressiva mensal vigente + redução da Lei nº 15.270/2025
//   (orientação da Receita Federal de dezembro/2025; vale também para o 13º)
// - Simples Nacional: Anexos I a V da LC nº 123/2006 (redação da LC nº 155/2016)

export const ANO_BASE = 2026;

export const SALARIO_MINIMO = 1621.0;

/* ---------------- INSS ---------------- */

// Empregado: alíquota progressiva por faixa
export const INSS_EMPREGADO = [
  { ate: 1621.0, aliquota: 0.075 },
  { ate: 2902.84, aliquota: 0.09 },
  { ate: 4354.27, aliquota: 0.12 },
  { ate: 8475.55, aliquota: 0.14 },
];

export const TETO_INSS = 8475.55;

// Sócio (contribuinte individual) sobre o pró-labore
export const INSS_PRO_LABORE = 0.11;

// INSS patronal (CPP) fora do Simples / no Anexo IV
export const INSS_PATRONAL = 0.2;

/* ---------------- IRRF ---------------- */

export const IRRF_TABELA = [
  { ate: 2428.8, aliquota: 0, deduzir: 0 },
  { ate: 2826.65, aliquota: 0.075, deduzir: 182.16 },
  { ate: 3751.05, aliquota: 0.15, deduzir: 394.16 },
  { ate: 4664.68, aliquota: 0.225, deduzir: 675.49 },
  { ate: Infinity, aliquota: 0.275, deduzir: 908.73 },
];

export const IRRF_DEPENDENTE = 189.59;
export const IRRF_DESCONTO_SIMPLIFICADO = 607.2;

// Redução da Lei 15.270/2025 (sobre o rendimento tributável bruto do mês)
export const IRRF_REDUCAO = {
  isentoAte: 5000.0,
  reducaoMaxima: 312.89,
  transicaoAte: 7350.0,
  constante: 978.62,
  fator: 0.133145,
};

/* ---------------- MEI ---------------- */

export const MEI = {
  inss: 0.05, // sobre o salário mínimo
  inssCaminhoneiro: 0.12,
  icms: 1.0, // comércio e indústria
  iss: 5.0, // serviços
  limiteAnual: 81000,
  limiteAnualCaminhoneiro: 251600,
};

/* ---------------- Simples Nacional ---------------- */

export type FaixaSimples = { ate: number; nominal: number; deduzir: number };

export const SIMPLES: Record<"I" | "II" | "III" | "IV" | "V", FaixaSimples[]> = {
  I: [
    { ate: 180000, nominal: 0.04, deduzir: 0 },
    { ate: 360000, nominal: 0.073, deduzir: 5940 },
    { ate: 720000, nominal: 0.095, deduzir: 13860 },
    { ate: 1800000, nominal: 0.107, deduzir: 22500 },
    { ate: 3600000, nominal: 0.143, deduzir: 87300 },
    { ate: 4800000, nominal: 0.19, deduzir: 378000 },
  ],
  II: [
    { ate: 180000, nominal: 0.045, deduzir: 0 },
    { ate: 360000, nominal: 0.078, deduzir: 5940 },
    { ate: 720000, nominal: 0.1, deduzir: 13860 },
    { ate: 1800000, nominal: 0.112, deduzir: 22500 },
    { ate: 3600000, nominal: 0.147, deduzir: 85500 },
    { ate: 4800000, nominal: 0.3, deduzir: 720000 },
  ],
  III: [
    { ate: 180000, nominal: 0.06, deduzir: 0 },
    { ate: 360000, nominal: 0.112, deduzir: 9360 },
    { ate: 720000, nominal: 0.135, deduzir: 17640 },
    { ate: 1800000, nominal: 0.16, deduzir: 35640 },
    { ate: 3600000, nominal: 0.21, deduzir: 125640 },
    { ate: 4800000, nominal: 0.33, deduzir: 648000 },
  ],
  IV: [
    { ate: 180000, nominal: 0.045, deduzir: 0 },
    { ate: 360000, nominal: 0.09, deduzir: 8100 },
    { ate: 720000, nominal: 0.102, deduzir: 12420 },
    { ate: 1800000, nominal: 0.14, deduzir: 39780 },
    { ate: 3600000, nominal: 0.22, deduzir: 183780 },
    { ate: 4800000, nominal: 0.33, deduzir: 828000 },
  ],
  V: [
    { ate: 180000, nominal: 0.155, deduzir: 0 },
    { ate: 360000, nominal: 0.18, deduzir: 4500 },
    { ate: 720000, nominal: 0.195, deduzir: 9900 },
    { ate: 1800000, nominal: 0.205, deduzir: 17100 },
    { ate: 3600000, nominal: 0.23, deduzir: 62100 },
    { ate: 4800000, nominal: 0.305, deduzir: 540000 },
  ],
};

export const LIMITE_SIMPLES = 4800000;
export const FATOR_R_MINIMO = 0.28;

/* ---------------- Lucro Presumido ---------------- */

export const PRESUMIDO = {
  presuncaoIrpj: { comercio: 0.08, industria: 0.08, servicos: 0.32 },
  presuncaoCsll: { comercio: 0.12, industria: 0.12, servicos: 0.32 },
  irpj: 0.15,
  adicionalIrpj: 0.1,
  limiteAdicionalMensal: 20000, // sobre o lucro presumido
  csll: 0.09,
  pis: 0.0065,
  cofins: 0.03,
};
