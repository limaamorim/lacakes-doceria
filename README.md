# Lacakes Doceria — React + TypeScript + Supabase

Catálogo público e painel administrativo simples, com **apenas duas tabelas**:
`produtos` e `categorias`. Sem backend Node/Express.

## Configurar o Supabase (passo a passo)

1. Entre em https://supabase.com/dashboard e crie um projeto no plano Free.
2. Aguarde o projeto ficar pronto.
3. Em **Authentication > Users**, crie um usuário administrador com e-mail e senha (Add user). Copie o **User UID (UUID)**. Evite deixar cadastro público habilitado sem necessidade.
4. Abra `supabase/schema.sql` no repositório. Copie tudo para **SQL Editor** no painel do Supabase. **Antes de executar**, substitua o UUID `00000000-0000-0000-0000-000000000000` pelo UID copiado na etapa 3. Execute o SQL. Ele cria as duas tabelas com políticas de segurança RLS.
5. Opcionalmente, execute `supabase/exemplos.sql` para inserir quatro categorias. Os produtos serão cadastrados pelo painel.
6. Em **Project Settings > API Keys** (ou **Connect**), copie a **Project URL** e a **publishable key** (`sb_publishable_...`). A chave antiga `anon` também funciona. **NUNCA use `service_role` ou secret key no frontend.**
7. Na raiz do projeto, crie `.env.local` (você pode copiar `.env.example`) e preencha:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_sua_chave
```

8. Rode `npm install` e `npm run dev`. Abra `http://localhost:5173/admin`, faça login com o usuário do passo 3, cadastre categorias e produtos.
9. Abra `http://localhost:5173/` e veja os produtos que você cadastrou. Recarregue a página após alterar o banco.

**Importante:** sem as variáveis do Supabase, a loja mostra dados ilustrativos locais e a área /admin avisa que falta configurar. Com variáveis preenchidas, o site usa exclusivamente os dados do banco — não usa mais os produtos de exemplo.

## Funcionalidades

- Loja: listagem, busca e filtro por categorias.
- Admin: login, cadastro, edição e exclusão de produtos.
- Admin: criar, renomear e excluir categorias.
- Fotos: no admin, **Escolher foto** ou **Tirar foto** no celular. Arquivos JPG, PNG ou WEBP até 5 MB vão para o Supabase Storage.
- A exclusão de categoria com produtos vinculados é bloqueada no banco.
- O WhatsApp configurado é **(81) 99968-9159** e o link inclui uma mensagem pronta com o produto.
- O endereço do cabeçalho abre uma busca no Google Maps: Rua 146, nº 26, Caetés 1, Abreu e Lima - PE.

## Estrutura

```text
src/
  components/   Cabecalho, Filtros e CardProduto
  data/         Configurações da loja e dados ilustrativos locais
  hooks/        useCatalogo — busca e atualização do catálogo
  lib/          supabase.ts — cliente Supabase
  pages/        Admin.tsx — formulário e gerenciamento
  services/     catalogo.ts — operações no banco; imagens.ts — upload de fotos
  types/        produto.ts — tipos TypeScript
  utils/        Formatação de preço e link WhatsApp
  App.tsx       Página pública ou admin
  styles.css    Layout e responsividade
supabase/
  schema.sql    Duas tabelas e regras RLS
  exemplos.sql  Categorias iniciais (opcional)\n  storage.sql   Bucket de fotos e política de upload seguro
```

## Entendendo o fluxo

1. `lib/supabase.ts` cria a conexão usando as variáveis VITE_.
2. `services/catalogo.ts` consulta duas tabelas e faz INSERT / UPDATE / DELETE.
3. `hooks/useCatalogo.ts` usa `useEffect` para carregar os dados e `useState` para guardá-los.
4. `App.tsx` filtra o array de produtos por texto e categoria e monta cards com `map`.
5. `pages/Admin.tsx` guarda campos do formulário em `useState`, chama o serviço e recarrega os produtos após salvar.
6. O banco verifica se o usuário logado possui o UUID autorizado em `public.lacakes_admin()`. Não basta apenas saber a rota `/admin`.

## Segurança

Nunca coloque chaves secretas nem senha no GitHub. O navegador usa somente a chave pública e as políticas RLS impedem alterações de usuários não autorizados. Mantenha `.env.local` fora do Git.

O usuário do Auth não é uma terceira tabela do catálogo: a infraestrutura de login é gerenciada pelo Supabase.

## Habilitar envio de fotos — etapa obrigatória

1. Abra `supabase/storage.sql` e copie seu conteúdo para **SQL Editor** no Supabase.
2. Execute o script uma única vez. Ele cria o bucket público `produtos` com imagens limitadas a 5 MB e libera **upload somente ao administrador** definido em `public.lacakes_admin()`.
3. Faça login em `/admin`, selecione **Escolher foto** ou **Tirar foto** no celular e salve o produto.
4. O serviço `src/services/imagens.ts` envia o arquivo ao Storage e recebe a URL pública. A tabela `produtos` guarda essa URL na coluna `imagem`. Não precisa alterar tabelas existentes.

**Observações:** Câmera depende do aparelho, navegador e suas permissões. Em computador o controle pode abrir o seletor de arquivos. Algumas fotos HEIC do iPhone não são aceitas: use JPG/PNG/WEBP. Quando uma foto é substituída ou um produto é excluído, o arquivo anterior não é apagado automaticamente do Storage. Uma falha ao salvar o registro após o upload também pode deixar uma foto não utilizada; esses arquivos podem ser removidos manualmente pelo painel Storage.

## Alterações de contato

O endereço e o telefone estão em `src/data/loja.ts`. O endereço abre **Google Maps** usando busca textual (confirme o marcador retornado pelo Maps antes de compartilhar com clientes). O cabeçalho abre WhatsApp com mensagem genérica e cada produto abre uma mensagem específica.
