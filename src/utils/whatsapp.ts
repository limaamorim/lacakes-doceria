import type { Produto } from "../types/produto";

// encodeURIComponent transforma a mensagem em texto seguro para uma URL.
function linkComMensagem(numero: string, mensagem: string): string {
  return "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
}

// Contato genérico: usado no ícone do cabeçalho.
export function criarLinkContato(numero: string): string {
  return linkComMensagem(numero, "Olá! Vim pelo site da Lacakes Doceria e gostaria de saber mais sobre os doces e encomendas. 😊");
}

// Pedido de produto: a mensagem já contém o nome e o preço mostrado no catálogo.
export function criarLinkWhatsApp(numero: string, produto: Produto): string {
  const preco = produto.preco === null
    ? "valor sob consulta"
    : produto.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  return linkComMensagem(numero,
    "Olá! Vi no site da Lacakes Doceria o produto *" + produto.nome +
    "* (" + preco + "). Gostaria de fazer uma encomenda. Poderia me informar a disponibilidade? 😊");
}
