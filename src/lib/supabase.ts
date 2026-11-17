import { createClient } from "@supabase/supabase-js";

// A chave PUBLISHABLE pode ficar no frontend. Nunca use a secret/service_role aqui.
// As políticas RLS do banco são responsáveis pela segurança dos dados.
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
export const configurado = Boolean(url && key && !url.includes("SEU-PROJETO"));
export const supabase = configurado ? createClient(url, key) : null;
