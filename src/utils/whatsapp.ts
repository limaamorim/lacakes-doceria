import type { Produto } from "../types/produto";

// Monta um link com uma mensagem pronta para o WhatsApp da doceria.
export function criarLinkWhatsApp(numero: string, produto: Produto): string {
  const mensagem = "Olá! Gostaria de encomendar: " + produto.nome + ". Poderia me passar mais informações?";
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
}
