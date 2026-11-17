"use client";

import { useState } from "react";
import { compararRegimes, type AtividadeRegime } from "@/lib/calculos/calculos";
import { Calculadora, CampoMoeda, CampoNumero, Linha, Observacao, Opcoes, PainelResultado, formatarMoeda, formatarPct } from "./ui";

export default function RegimeTributario() {
  const [atividade, setAtividade] = useState<AtividadeRegime>("servicosFatorR");
  const [faturamento, setFaturamento] = useState(30000);
  const [folha, setFolha] = useState(6000);
  const [iss, setIss] = useState(5);
  const r = compararRegimes(atividade, faturamento, folha, iss);
  const s = r.simples;
  const p = r.presumido;

  // Comércio/indústria: o ICMS do Presumido não entra na conta (depende dos créditos).
  // Mostramos até quanto ele pode ser para o Presumido ainda compensar.
  const icmsLimite = !r.servico && s && faturamento > 0 ? (s.total - p.total) / faturamento : null;

  // Título do resultado: no comércio/indústria, sem o ICMS não dá para cravar o Presumido
  const titulo = !s
    ? "Presumido"
    : r.servico
      ? s.total <= p.total
        ? "Simples"
        : "Presumido"
      : icmsLimite !== null && icmsLimite > 0
        ? "Depende do ICMS"
        : "Simples";

  let veredito: string;
  if (!s) veredito = "Pelo faturamento informado (mais de R$ 4,8 milhões por ano), a empresa não pode ficar no Simples.";
  else if (r.servico) {
    const dif = Math.abs(s.total - p.total);
    veredito =
      s.total <= p.total
        ? `O Simples sai ${formatarMoeda(dif)} mais barato por mês.`
        : `O Lucro Presumido sai ${formatarMoeda(dif)} mais barato por mês.`;
  } else {
    veredito =
      icmsLimite !== null && icmsLimite > 0
        ? `O Presumido só compensa se o ICMS a pagar (já descontados os créditos) ficar abaixo de ${formatarPct(icmsLimite)} do faturamento.`
        : "Mesmo sem contar o ICMS, o Presumido já sai mais caro: o Simples tende a compensar.";
  }

  return (
    <Calculadora
      campos={
        <>
          <Opcoes
            rotulo="Atividade principal"
            valor={atividade}
            aoMudar={setAtividade}
            opcoes={[
              { valor: "comercio", rotulo: "Comércio", detalhe: "Loja, distribuidora, e-commerce" },
              { valor: "industria", rotulo: "Indústria", detalhe: "Fabricação e transformação" },
              { valor: "servicos3", rotulo: "Serviços em geral", detalhe: "Manutenção, academias, agências de viagem, escolas" },
              {
                valor: "servicosFatorR",
                rotulo: "Serviços intelectuais e técnicos",
                detalhe: "Consultoria, TI, engenharia, saúde, publicidade (dependem do Fator R)",
              },
              { valor: "servicos4", rotulo: "Limpeza, vigilância, obras e advocacia", detalhe: "Anexo IV do Simples" },
            ]}
          />
          <CampoMoeda
            rotulo="Faturamento médio por mês"
            ajuda="Média dos últimos 12 meses (ou o que você espera faturar)."
            valor={faturamento}
            aoMudar={setFaturamento}
          />
          <CampoMoeda
            rotulo="Folha de pagamento por mês"
            ajuda="Salários e pró-labore, com encargos. Entra no Fator R e no INSS patronal."
            valor={folha}
            aoMudar={setFolha}
          />
          {r.servico && (
            <CampoNumero
              rotulo="Alíquota de ISS do município"
              ajuda="Entre 2% e 5%, conforme o serviço e a cidade."
              valor={iss}
              aoMudar={setIss}
              min={0}
              max={5}
              passo={0.5}
              sufixo="%"
            />
          )}
        </>
      }
      resultado={
        <>
          <PainelResultado rotulo="Resultado da comparação" valor={titulo} detalhe={veredito}>
            {s && (
              <>
                <Linha
                  rotulo={`Simples, Anexo ${s.anexo} (${formatarPct(s.aliquota)})`}
                  valor={formatarMoeda(s.das)}
                />
                {s.cpp > 0 && <Linha rotulo="INSS patronal (Anexo IV)" valor={formatarMoeda(s.cpp)} />}
                <Linha rotulo="Total no Simples" valor={formatarMoeda(s.total)} destaque />
              </>
            )}
            <Linha rotulo="IRPJ" valor={formatarMoeda(p.irpj)} />
            <Linha rotulo="CSLL" valor={formatarMoeda(p.csll)} />
            <Linha rotulo="PIS e COFINS" valor={formatarMoeda(p.pis + p.cofins)} />
            {r.servico && <Linha rotulo="ISS" valor={formatarMoeda(p.iss)} />}
            <Linha rotulo="INSS patronal (20% da folha)" valor={formatarMoeda(p.cpp)} />
            <Linha
              rotulo={r.servico ? "Total no Presumido" : "Total no Presumido (sem ICMS)"}
              valor={formatarMoeda(p.total)}
              destaque
            />
          </PainelResultado>
          {atividade === "servicosFatorR" && faturamento > 0 && (
            <Observacao>
              Fator R da empresa: <strong>{formatarPct(r.fatorR)}</strong>.{" "}
              {r.fatorR >= 0.28
                ? "Como está acima de 28%, a empresa fica no Anexo III, com alíquota menor."
                : `Abaixo de 28%, a empresa cai no Anexo V. Com folha de ${formatarMoeda(faturamento * 0.28)} por mês, ela iria para o Anexo III.`}
            </Observacao>
          )}
        </>
      }
    />
  );
}
