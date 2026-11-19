import { supabase } from "../lib/supabase";

// Conteúdos padrão mantêm o site utilizável até o SQL de configuração ser executado.
export type ConfiguracaoSite = {
  titulo_principal: string;
  titulo_destaque: string;
  descricao_principal: string;
  imagem_principal: string;
  descricao_cardapio: string;
};

export const configuracaoPadrao: ConfiguracaoSite = {
  titulo_principal: "Um doce carinho em",
  titulo_destaque: "cada detalhe.",
  descricao_principal: "Escolha seus favoritos e transforme momentos simples em lembranças especiais.",
  imagem_principal: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85",
  descricao_cardapio: "Doces especiais para presentear ou aproveitar.",
};

export async function carregarConfiguracaoSite(): Promise<ConfiguracaoSite> {
  if (!supabase) return configuracaoPadrao;
  const { data, error } = await supabase
    .from("configuracao_site")
    .select("titulo_principal,titulo_destaque,descricao_principal,imagem_principal,descricao_cardapio")
    .eq("id", 1)
    .maybeSingle();
  if (error) throw error;
  return data ?? configuracaoPadrao;
}

export async function salvarConfiguracaoSite(dados: ConfiguracaoSite): Promise<void> {
  if (!supabase) throw new Error("Supabase não configurado.");
  const payload = {
    titulo_principal: dados.titulo_principal.trim(),
    titulo_destaque: dados.titulo_destaque.trim(),
    descricao_principal: dados.descricao_principal.trim(),
    imagem_principal: dados.imagem_principal.trim(),
    descricao_cardapio: dados.descricao_cardapio.trim(),
  };
  if (Object.values(payload).some(valor => !valor)) {
    throw new Error("Preencha todos os textos e selecione uma imagem.");
  }
  const { data, error } = await supabase
    .from("configuracao_site")
    .update(payload)
    .eq("id", 1)
    .select("id")
    .single();
  if (error) throw error;
  if (!data) throw new Error("Não foi possível atualizar as configurações.");
}
