import type { ComponentType } from "react";
import DasMei from "./DasMei";
import ProLabore from "./ProLabore";
import RegimeTributario from "./RegimeTributario";
import MargemLucro from "./MargemLucro";
import PontoEquilibrio from "./PontoEquilibrio";
import DecimoTerceiro from "./DecimoTerceiro";

// Liga cada slug de data/ferramentas.ts ao componente da calculadora
export const calculadoras: Record<string, ComponentType> = {
  "das-mei": DasMei,
  "pro-labore": ProLabore,
  "regime-tributario": RegimeTributario,
  "margem-lucro": MargemLucro,
  "ponto-equilibrio": PontoEquilibrio,
  "decimo-terceiro": DecimoTerceiro,
};
