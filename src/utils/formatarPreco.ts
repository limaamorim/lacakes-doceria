// Formata 10 para "R$ 10,00"; sem preço, exibe "Sob consulta".
export function formatarPreco(preco: number | null): string {
  if (preco === null) return "Sob consulta";
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
