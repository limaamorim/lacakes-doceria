import { useCallback, useEffect, useState } from "react";
import { produtos as exemplos } from "../data/produtos";
import { configurado } from "../lib/supabase";
import { carregarCatalogo } from "../services/catalogo";
import type { Categoria, Produto } from "../types/produto";

// Um único hook carrega os dados e permite atualizar a lista depois de salvar.
export function useCatalogo() {
  const [produtos, setProdutos] = useState<Produto[]>(configurado ? [] : exemplos);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [carregando, setCarregando] = useState(configurado);
  const [erro, setErro] = useState("");

  const atualizar = useCallback(async () => {
    if (!configurado) return;
    setCarregando(true);
    setErro("");
    try {
      const dados = await carregarCatalogo();
      setProdutos(dados.produtos);
      setCategorias(dados.categorias);
    } catch (e) {
      setErro(e instanceof Error ? e.message : "Não foi possível carregar o cardápio.");
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => { void atualizar(); }, [atualizar]);

  // Sem credenciais, os dados de exemplo continuam visíveis para testes locais.
  const categoriasExibidas = configurado ? categorias :
    [...new Set(exemplos.map(p => p.categoria))].map((nome, i) => ({ id: i + 1, nome }));
  return { produtos, categorias: categoriasExibidas, carregando, erro, atualizar };
}
