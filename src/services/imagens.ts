import { supabase } from "../lib/supabase";

// O bucket público entrega as imagens aos clientes; a policy RLS restringe o upload ao admin.
const BUCKET = "produtos";

export async function enviarImagem(arquivo: File): Promise<string> {
  if (!supabase) throw new Error("Supabase não configurado.");

  const formatos = ["image/jpeg", "image/png", "image/webp"];
  if (!formatos.includes(arquivo.type)) {
    throw new Error("Selecione uma imagem JPG, PNG ou WEBP.");
  }
  if (arquivo.size > 5 * 1024 * 1024) {
    throw new Error("A imagem deve ter no máximo 5 MB.");
  }

  // UUID impede que duas fotos recebam o mesmo nome. Não sobrescrevemos arquivos.
  const extensao = arquivo.type === "image/png" ? "png" : arquivo.type === "image/webp" ? "webp" : "jpg";
  const caminho = crypto.randomUUID() + "." + extensao;
  const { error } = await supabase.storage.from(BUCKET).upload(caminho, arquivo, {
    cacheControl: "3600",
    contentType: arquivo.type,
    upsert: false,
  });
  if (error) throw error;
  return supabase.storage.from(BUCKET).getPublicUrl(caminho).data.publicUrl;
}
