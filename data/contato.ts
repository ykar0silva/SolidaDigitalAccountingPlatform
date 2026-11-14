// Número do WhatsApp da Sólida, só dígitos com DDI e DDD (ex.: 5563999999999).
// Enquanto estiver como NUMERO_AQUI, os links abrem o WhatsApp sem destino válido.
export const WHATSAPP_NUMERO = "NUMERO_AQUI";

export const linkWhatsApp = (mensagem: string) =>
  `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensagem)}`;
