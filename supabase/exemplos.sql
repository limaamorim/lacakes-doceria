-- OPCIONAL: rode APÓS schema.sql para adicionar exemplos.
-- NÃO rode se já tiver cadastrado suas categorias.
insert into public.categorias (nome) values
('Natal'), ('Copos da Felicidade'), ('Cookies'), ('Outros doces')
on conflict (nome) do nothing;
-- Cadastre os produtos reais pelo painel /admin.
