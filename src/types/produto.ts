// Categorias não são fixas: podem ser criadas e renomeadas no painel.
export type Categoria = { id: number; nome: string };
export type Produto = {
  id: number;
  nome: string;
  categoria: string;
  categoriaId: number;
  descricao: string;
  preco: number | null;
  imagem: string;
  destaque?: boolean;
};
export type ProdutoForm = Omit<Produto, "id" | "categoria">;
