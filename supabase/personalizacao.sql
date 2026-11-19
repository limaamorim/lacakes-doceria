-- Execute no SQL Editor do Supabase já configurado para a Lacakes.
-- Requer a função public.lacakes_admin() existente no schema.sql, com o UID correto.
create table if not exists public.configuracao_site (
  id integer primary key default 1 check (id = 1),
  titulo_principal text not null default 'Um doce carinho em',
  titulo_destaque text not null default 'cada detalhe.',
  descricao_principal text not null default 'Escolha seus favoritos e transforme momentos simples em lembranças especiais.',
  imagem_principal text not null default 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85',
  descricao_cardapio text not null default 'Doces especiais para presentear ou aproveitar.',
  constraint configuracao_titulo_limite check (char_length(titulo_principal) between 1 and 120),
  constraint configuracao_destaque_limite check (char_length(titulo_destaque) between 1 and 120),
  constraint configuracao_descricao_limite check (char_length(descricao_principal) between 1 and 400),
  constraint configuracao_imagem_limite check (char_length(imagem_principal) between 1 and 2048),
  constraint configuracao_cardapio_limite check (char_length(descricao_cardapio) between 1 and 250)
);
insert into public.configuracao_site (id) values (1) on conflict (id) do nothing;
alter table public.configuracao_site enable row level security;
grant select on public.configuracao_site to anon, authenticated;
grant insert, update on public.configuracao_site to authenticated;
drop policy if exists "site_config_leitura" on public.configuracao_site;
create policy "site_config_leitura" on public.configuracao_site for select to anon, authenticated using (true);
drop policy if exists "site_config_edicao" on public.configuracao_site;
create policy "site_config_edicao" on public.configuracao_site for update to authenticated using ((select public.lacakes_admin())) with check ((select public.lacakes_admin()));
drop policy if exists "site_config_insercao" on public.configuracao_site;
create policy "site_config_insercao" on public.configuracao_site for insert to authenticated with check (id = 1 and (select public.lacakes_admin()));
