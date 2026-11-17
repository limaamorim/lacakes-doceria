// Dados usados pelo cabeçalho e pelos pedidos.
export const loja = {
  nome: "Lacakes Doceria",
  instagram: "lacakkes",
  whatsapp: "5581999689159", // 55 (Brasil) + 81 (DDD) + 999689159
  local: "Rua 146, nº 26, Caetés I, Abreu e Lima - PE",
  // O Google Maps faz a busca pelo endereço informado.
  maps: "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("Rua 146, número 26, Caetés 1, Abreu e Lima, Pernambuco, Brasil"),
};
