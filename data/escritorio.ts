// Fotos do escritório (seção "Nosso escritório" da home).
// Coloque os arquivos em public/images/escritorio/ e liste aqui, na ordem
// em que devem aparecer. Fotos na VERTICAL (retrato, de preferência 9:16,
// com pelo menos 1080 px de altura).
// Enquanto a lista estiver vazia, a seção mostra molduras de exemplo
// (ver MOSTRAR_EXEMPLOS em components/Escritorio/Escritorio.tsx).
export type FotoEscritorio = {
  src: string;
  alt: string; // descrição da foto para leitores de tela
  legenda: string; // texto curto que aparece embaixo, ex.: "Recepção"
};

export const fotosEscritorio: FotoEscritorio[] = [
  // { src: "/images/escritorio/recepcao.webp", alt: "Recepção do escritório da Sólida", legenda: "Recepção" },
];
