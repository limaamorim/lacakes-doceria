-- EXECUTE NO SQL EDITOR DO SUPABASE.
-- Antes de rodar: crie o usuário administrador em Authentication > Users
-- e substitua 00000000-0000-0000-0000-000000000000 pelo UUID dele.
-- Sem isso, ninguém poderá editar produtos ou categorias.

create table if not exists public.categorias (
  id bigint generated always as identity primary key,
  nome text not null unique check (length(trim(nome)) between 1 and 80)
);
create table if not exists public.produtos (
  id bigint generated always as identity primary key,
  nome text not null check (length(trim(nome)) between 1 and 120),
  descricao text not null default '' check (length(descricao) <= 500),
  preco numeric(10,2) check (preco >= 0),
  imagem text not null check (length(trim(imagem)) > 0),
  destaque boolean not null default false,
  categoria_id bigint not null references public.categorias(id) on delete restrict
);
create index if not exists produtos_categoria_idx on public.produtos(categoria_id);

-- Acesso público APENAS para leitura.
alter table public.categorias enable row level security;
alter table public.produtos enable row level security;
grant usage on schema public to anon, authenticated;
grant select on public.categorias, public.produtos to anon, authenticated;
grant insert, update, delete on public.categorias, public.produtos to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Apenas o UUID do administrador criado no Supabase Auth tem permissão de escrita.
create or replace function public.lacakes_admin()
returns boolean language sql stable security invoker
set search_path = ''
as $$
  select (select auth.uid()) = '00000000-0000-0000-0000-000000000000'::uuid;
$$;
grant execute on function public.lacakes_admin() to authenticated;

drop policy if exists "catalogo_publico_categorias" on public.categorias;
create policy "catalogo_publico_categorias" on public.categorias
  for select to anon, authenticated using (true);
drop policy if exists "catalogo_publico_produtos" on public.produtos;
create policy "catalogo_publico_produtos" on public.produtos
  for select to anon, authenticated using (true);

drop policy if exists "admin_insere_categorias" on public.categorias;
create policy "admin_insere_categorias" on public.categorias
  for insert to authenticated with check ((select public.lacakes_admin()));
drop policy if exists "admin_altera_categorias" on public.categorias;
create policy "admin_altera_categorias" on public.categorias
  for update to authenticated using ((select public.lacakes_admin())) with check ((select public.lacakes_admin()));
drop policy if exists "admin_exclui_categorias" on public.categorias;
create policy "admin_exclui_categorias" on public.categorias
  for delete to authenticated using ((select public.lacakes_admin()));

drop policy if exists "admin_insere_produtos" on public.produtos;
create policy "admin_insere_produtos" on public.produtos
  for insert to authenticated with check ((select public.lacakes_admin()));
drop policy if exists "admin_altera_produtos" on public.produtos;
create policy "admin_altera_produtos" on public.produtos
  for update to authenticated using ((select public.lacakes_admin())) with check ((select public.lacakes_admin()));
drop policy if exists "admin_exclui_produtos" on public.produtos;
create policy "admin_exclui_produtos" on public.produtos
  for delete to authenticated using ((select public.lacakes_admin()));
