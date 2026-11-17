// Contas das calculadoras. Funções puras (sem React), fáceis de testar.
// Os valores de tabela ficam em ./tabelas2026.ts.

import {
  FATOR_R_MINIMO,
  INSS_EMPREGADO,
  INSS_PATRONAL,
  INSS_PRO_LABORE,
  IRRF_DEPENDENTE,
  IRRF_DESCONTO_SIMPLIFICADO,
  IRRF_REDUCAO,
  IRRF_TABELA,
  LIMITE_SIMPLES,
  MEI,
  PRESUMIDO,
  SALARIO_MINIMO,
  SIMPLES,
  TETO_INSS,
} from "./tabelas2026";

// Arredonda para centavos (corrige o erro de ponto flutuante: 121,575 → 121,58)
export const arred = (n: number) => Math.round(Number((n * 100).toFixed(6))) / 100;
const positivo = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

/* ---------------- INSS ---------------- */

// INSS do empregado: cada alíquota só sobre a parte do salário dentro da faixa
export function inssEmpregado(salario: number) {
  const base = Math.min(positivo(salario), TETO_INSS);
  let total = 0;
  let anterior = 0;
  for (const faixa of INSS_EMPREGADO) {
    if (base <= anterior) break;
    total += (Math.min(base, faixa.ate) - anterior) * faixa.aliquota;
    anterior = faixa.ate;
  }
  return arred(total);
}

/* ---------------- IRRF ---------------- */

type EntradaIrrf = {
  rendimento: number; // rendimento tributável bruto do mês (ou do 13º)
  inss: number; // INSS descontado
  dependentes?: number;
};

// IRRF mensal com a redução da Lei 15.270/2025.
// Usa o que for melhor: deduções legais (INSS + dependentes) ou o desconto simplificado.
export function irrf({ rendimento, inss, dependentes = 0 }: EntradaIrrf) {
  const bruto = positivo(rendimento);
  const deducoesLegais = positivo(inss) + Math.max(0, Math.floor(dependentes)) * IRRF_DEPENDENTE;
  const simplificado = deducoesLegais < IRRF_DESCONTO_SIMPLIFICADO;
  const deducao = simplificado ? IRRF_DESCONTO_SIMPLIFICADO : deducoesLegais;
  const base = Math.max(0, bruto - deducao);

  const faixa = IRRF_TABELA.find((f) => base <= f.ate) ?? IRRF_TABELA[IRRF_TABELA.length - 1];
  const impostoTabela = Math.max(0, base * faixa.aliquota - faixa.deduzir);

  let reducao = 0;
  if (bruto <= IRRF_REDUCAO.isentoAte) {
    reducao = Math.min(IRRF_REDUCAO.reducaoMaxima, impostoTabela);
  } else if (bruto <= IRRF_REDUCAO.transicaoAte) {
    reducao = Math.min(Math.max(0, IRRF_REDUCAO.constante - IRRF_REDUCAO.fator * bruto), impostoTabela);
  }

  return {
    base: arred(base),
    deducao: arred(deducao),
    simplificado,
    aliquota: faixa.aliquota,
    impostoTabela: arred(impostoTabela),
    reducao: arred(reducao),
    imposto: arred(impostoTabela - reducao),
  };
}

/* ---------------- DAS MEI ---------------- */

export type AtividadeMei = "comercio" | "servicos" | "ambos";

export function dasMei(atividade: AtividadeMei, caminhoneiro = false) {
  const inss = arred(SALARIO_MINIMO * (caminhoneiro ? MEI.inssCaminhoneiro : MEI.inss));
  const icms = atividade === "comercio" || atividade === "ambos" || caminhoneiro ? MEI.icms : 0;
  const iss = atividade === "servicos" || atividade === "ambos" ? MEI.iss : 0;
  const mensal = arred(inss + icms + iss);
  return {
    inss,
    icms,
    iss,
    mensal,
    anual: arred(mensal * 12),
    limiteAnual: caminhoneiro ? MEI.limiteAnualCaminhoneiro : MEI.limiteAnual,
  };
}

/* ---------------- Pró-labore ---------------- */

export function proLabore(valor: number, dependentes = 0, empresaNoSimples = true) {
  const bruto = positivo(valor);
  const inss = arred(Math.min(bruto, TETO_INSS) * INSS_PRO_LABORE);
  const ir = irrf({ rendimento: bruto, inss, dependentes });
  const inssEmpresa = empresaNoSimples ? 0 : arred(bruto * INSS_PATRONAL);
  return {
    bruto: arred(bruto),
    inss,
    irrf: ir.imposto,
    detalheIr: ir,
    liquido: arred(bruto - inss - ir.imposto),
    inssEmpresa,
    custoEmpresa: arred(bruto + inssEmpresa),
  };
}

/* ---------------- 13º salário ---------------- */

export function decimoTerceiro(salario: number, meses: number, medias = 0, dependentes = 0) {
  const m = Math.min(12, Math.max(0, Math.floor(meses)));
  const bruto = arred(((positivo(salario) + positivo(medias)) * m) / 12);
  const primeira = arred(bruto / 2);
  const inss = inssEmpregado(bruto);
  const ir = irrf({ rendimento: bruto, inss, dependentes });
  return {
    meses: m,
    bruto,
    primeira,
    inss,
    irrf: ir.imposto,
    segunda: arred(bruto - primeira - inss - ir.imposto),
    liquidoTotal: arred(bruto - inss - ir.imposto),
  };
}

/* ---------------- Margem de lucro ---------------- */

export function margemLucro(receita: number, custos: number, despesas: number, impostosPct: number) {
  const r = positivo(receita);
  const impostos = arred(r * (positivo(impostosPct) / 100));
  const contribuicao = arred(r - positivo(custos) - impostos);
  const lucro = arred(contribuicao - positivo(despesas));
  return {
    impostos,
    contribuicao,
    lucro,
    margemContribuicao: r > 0 ? contribuicao / r : 0,
    margemLiquida: r > 0 ? lucro / r : 0,
  };
}

/* ---------------- Ponto de equilíbrio ---------------- */

export function pontoEquilibrio(custosFixos: number, preco: number, custoVariavel: number) {
  const p = positivo(preco);
  const contribuicaoUnit = p - positivo(custoVariavel);
  if (p <= 0 || contribuicaoUnit <= 0) return null;
  const unidadesExatas = positivo(custosFixos) / contribuicaoUnit;
  return {
    contribuicaoUnit: arred(contribuicaoUnit),
    margemContribuicao: contribuicaoUnit / p,
    unidades: Math.ceil(unidadesExatas - 1e-9),
    faturamento: arred(unidadesExatas * p),
  };
}

/* ---------------- Regime tributário ---------------- */

export type AtividadeRegime = "comercio" | "industria" | "servicos3" | "servicosFatorR" | "servicos4";

// Alíquota efetiva do Simples: (RBT12 × nominal − dedução) ÷ RBT12
export function aliquotaSimples(anexo: keyof typeof SIMPLES, rbt12: number) {
  const faixas = SIMPLES[anexo];
  const faixa = faixas.find((f) => rbt12 <= f.ate) ?? faixas[faixas.length - 1];
  if (rbt12 <= 0) return faixa.nominal;
  return Math.max(0, (rbt12 * faixa.nominal - faixa.deduzir) / rbt12);
}

export function compararRegimes(
  atividade: AtividadeRegime,
  faturamentoMensal: number,
  folhaMensal: number,
  issPct: number,
) {
  const fat = positivo(faturamentoMensal);
  const folha = positivo(folhaMensal);
  const rbt12 = fat * 12;
  const servico = atividade.startsWith("servicos");

  // --- Simples Nacional
  const fatorR = fat > 0 ? folha / fat : 0;
  const anexo: keyof typeof SIMPLES =
    atividade === "comercio"
      ? "I"
      : atividade === "industria"
        ? "II"
        : atividade === "servicos3"
          ? "III"
          : atividade === "servicos4"
            ? "IV"
            : fatorR >= FATOR_R_MINIMO
              ? "III"
              : "V";
  const aliquota = aliquotaSimples(anexo, rbt12);
  const das = arred(fat * aliquota);
  const cppSimples = anexo === "IV" ? arred(folha * INSS_PATRONAL) : 0;
  const simples =
    rbt12 > LIMITE_SIMPLES
      ? null
      : { anexo, aliquota, das, cpp: cppSimples, total: arred(das + cppSimples) };

  // --- Lucro Presumido
  const tipo = servico ? "servicos" : atividade === "industria" ? "industria" : "comercio";
  const baseIrpj = fat * PRESUMIDO.presuncaoIrpj[tipo];
  const irpj = arred(
    baseIrpj * PRESUMIDO.irpj + Math.max(0, baseIrpj - PRESUMIDO.limiteAdicionalMensal) * PRESUMIDO.adicionalIrpj,
  );
  const csll = arred(fat * PRESUMIDO.presuncaoCsll[tipo] * PRESUMIDO.csll);
  const pis = arred(fat * PRESUMIDO.pis);
  const cofins = arred(fat * PRESUMIDO.cofins);
  const iss = servico ? arred(fat * (positivo(issPct) / 100)) : 0;
  const cpp = arred(folha * INSS_PATRONAL);
  const totalPresumido = arred(irpj + csll + pis + cofins + iss + cpp);

  return {
    rbt12,
    fatorR,
    servico,
    simples,
    presumido: { irpj, csll, pis, cofins, iss, cpp, total: totalPresumido, aliquota: fat > 0 ? totalPresumido / fat : 0 },
  };
}
