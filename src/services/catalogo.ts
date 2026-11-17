import { supabase } from "../lib/supabase";
import type { Categoria, Produto, ProdutoForm } from "../types/produto";

function cliente() {
  if (!supabase) throw new Error("Configure as variáveis do Supabase no arquivo .env.local.");
  return supabase;
}

// O banco usa nomes simples (snake_case). Aqui convertemos o registro para o tipo do site.
type RegistroProduto = {
  id: number; nome: string; descricao: string; preco: number | null;
  imagem: string; destaque: boolean; categoria_id: number;
};
export async function carregarCatalogo(): Promise<{ produtos: Produto[]; categorias: Categoria[] }> {
  const db = cliente();
  const [resCategorias, resProdutos] = await Promise.all([
    db.from("categorias").select("id,nome").order("nome"),
    db.from("produtos").select("id,nome,descricao,preco,imagem,destaque,categoria_id").order("id"),
  ]);
  if (resCategorias.error) throw resCategorias.error;
  if (resProdutos.error) throw resProdutos.error;
  const categorias = (resCategorias.data ?? []) as Categoria[];
  const produtos: Produto[] = ((resProdutos.data ?? []) as RegistroProduto[]).map(item => ({
    id: item.id, nome: item.nome, descricao: item.descricao, preco: item.preco,
    imagem: item.imagem, destaque: item.destaque, categoriaId: item.categoria_id,
    categoria: categorias.find(cat => cat.id === item.categoria_id)?.nome ?? "Sem categoria",
  }));
  return { produtos, categorias };
}

// Só o administrador autorizado consegue fazer estas operações (RLS no banco).
export async function salvarProduto(dados: ProdutoForm, id?: number) {
  const db = cliente();
  const payload = {
    nome: dados.nome.trim(), descricao: dados.descricao.trim(), preco: dados.preco,
    imagem: dados.imagem.trim(), destaque: Boolean(dados.destaque),
    categoria_id: dados.categoriaId,
  };
  const resultado = id
    ? await db.from("produtos").update(payload).eq("id", id).select("id").single()
    : await db.from("produtos").insert(payload).select("id").single();
  if (resultado.error) throw resultado.error;
}
export async function excluirProduto(id: number) {
  const { error } = await cliente().from("produtos").delete().eq("id", id).select("id").single();
  if (error) throw error;
}
export async function salvarCategoria(nome: string, id?: number) {
  const db = cliente();
  const resultado = id
    ? await db.from("categorias").update({ nome: nome.trim() }).eq("id", id).select("id").single()
    : await db.from("categorias").insert({ nome: nome.trim() }).select("id").single();
  if (resultado.error) throw resultado.error;
}
export async function excluirCategoria(id: number) {
  const { error } = await cliente().from("categorias").delete().eq("id", id).select("id").single();
  if (error) throw error;
}
