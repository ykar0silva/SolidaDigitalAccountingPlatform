"use client";

import { useState } from "react";
import { decimoTerceiro } from "@/lib/calculos/calculos";
import { Calculadora, CampoMoeda, CampoNumero, Linha, PainelResultado, formatarMoeda } from "./ui";

export default function DecimoTerceiro() {
  const [salario, setSalario] = useState(3000);
  const [meses, setMeses] = useState(12);
  const [medias, setMedias] = useState(0);
  const [dependentes, setDependentes] = useState(0);
  const r = decimoTerceiro(salario, meses, medias, dependentes);

  return (
    <Calculadora
      campos={
        <>
          <CampoMoeda rotulo="Salário bruto" valor={salario} aoMudar={setSalario} />
          <CampoNumero
            rotulo="Meses trabalhados no ano"
            ajuda="Conta o mês em que trabalhou 15 dias ou mais."
            valor={meses}
            aoMudar={setMeses}
            min={0}
            max={12}
          />
          <CampoMoeda
            rotulo="Média de horas extras e adicionais (opcional)"
            ajuda="Média mensal do que recebe além do salário: horas extras, adicional noturno, comissões."
            valor={medias}
            aoMudar={setMedias}
          />
          <CampoNumero rotulo="Dependentes no Imposto de Renda" valor={dependentes} aoMudar={setDependentes} max={20} />
        </>
      }
      resultado={
        <PainelResultado
          rotulo="13º líquido no total"
          valor={formatarMoeda(r.liquidoTotal)}
          detalhe={`1ª parcela até 30/11: ${formatarMoeda(r.primeira)}. 2ª parcela até 20/12: ${formatarMoeda(r.segunda)}.`}
        >
          <Linha rotulo={`13º bruto (${r.meses}/12)`} valor={formatarMoeda(r.bruto)} />
          <Linha rotulo="1ª parcela (sem descontos)" valor={formatarMoeda(r.primeira)} destaque />
          <Linha rotulo="INSS sobre o 13º" valor={formatarMoeda(r.inss)} negativo />
          <Linha rotulo="Imposto de Renda sobre o 13º" valor={formatarMoeda(r.irrf)} negativo />
          <Linha rotulo="2ª parcela" valor={formatarMoeda(r.segunda)} destaque />
        </PainelResultado>
      }
    />
  );
}
