-- Execute uma vez no SQL Editor do MESMO projeto Supabase.
-- Um bucket público permite mostrar fotos no cardápio; o upload continua protegido por RLS.
-- Não é necessário criar uma nova tabela do catálogo.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('produtos', 'produtos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

-- A função lacakes_admin() já foi criada em supabase/schema.sql e deve conter o UID correto.
drop policy if exists "lacakes_admin_upload_fotos" on storage.objects;
create policy "lacakes_admin_upload_fotos" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'produtos' and (select public.lacakes_admin()));

-- Não habilitamos exclusão pública. As imagens antigas permanecem armazenadas
-- mesmo quando um produto é editado ou excluído; limpe-as pelo painel Storage quando necessário.
