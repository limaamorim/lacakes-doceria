// Define o formato que todos os produtos precisam seguir.
export type Categoria = "Natal" | "Copos da Felicidade" | "Cookies" | "Outros doces";

export type Produto = {
  id: number;
  nome: string;
  categoria: Categoria;
  descricao: string;
  preco: number | null; // null = preço ainda não informado
  imagem: string;
  destaque?: boolean;
};
