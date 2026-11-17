# Lacakes Doceria 🍰

Catálogo simples de doces, inspirado na organização visual da Sweet Olivia, com as cores e o logo da Lacakes.

## O que o site faz?

- Mostra o logo, informações da loja e cards de produtos.
- Filtra produtos por categoria.
- Pesquisa pelo nome do produto.
- Exibe preço ou "Sob consulta".
- Abre uma mensagem pronta no WhatsApp **quando o número da loja estiver configurado**.
- Funciona em celulares e computadores.

Não há login, banco de dados, painel administrativo ou carrinho nesta versão.

## Como executar

1. Instale o Node.js.
2. Abra o terminal na pasta do projeto.
3. Execute:

~~~bash
npm install
npm run dev
~~~

Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

Para testar a compilação:

~~~bash
npm run build
~~~

## Estrutura do projeto

~~~text
public/
  logo.jpg                 Logo original da Lacakes
src/
  components/
    Cabecalho.tsx          Logo, informações e faixa superior
    Filtros.tsx            Botões de categoria e campo de busca
    CardProduto.tsx        Visual de cada produto e botão de pedido
  data/
    loja.ts                Configurações da loja e WhatsApp
    produtos.ts            Lista de produtos (dados de exemplo)
  types/
    produto.ts             Tipos do TypeScript
  utils/
    formatarPreco.ts       Converte números em reais
    whatsapp.ts            Cria o link do WhatsApp
  App.tsx                  Liga busca, filtros e a tela
  main.tsx                 Inicializa o React
  styles.css               Estilo visual e responsividade
~~~

## Primeiro, personalize estes arquivos

**1. src/data/loja.ts:** preencha o número REAL de WhatsApp com código do país e DDD, apenas números (55 + DDD + número). O botão de pedido só aparece depois disso. Preencha o Instagram caso exista.

**2. src/data/produtos.ts:** substitua as imagens de exemplo por fotos reais e confira preços, categorias e descrições. Os produtos de Natal usam valores exibidos na referência; os outros são **apenas exemplos ilustrativos**, não um cardápio confirmado. O preço pode ser null para exibir "Sob consulta".

**3. public/logo.jpg:** logo enviado com o repositório.

**4. src/styles.css:** altere as variáveis --azul, --azul-escuro e --creme para mudar a paleta.

## Entendendo a lógica: por onde estudar?

1. **data/produtos.ts:** veja que os itens estão em um array de objetos.
2. **types/produto.ts:** entenda o formato de cada objeto.
3. **App.tsx:** acompanhe o useState da categoria e da busca.
4. **App.tsx:** observe o filter: ele só mantém itens que correspondem à categoria **e** ao nome digitado.
5. **Filtros.tsx:** ao clicar numa categoria ou digitar, o componente chama funções recebidas por props; elas atualizam os estados no App.
6. **CardProduto.tsx:** map cria um card para cada produto filtrado.
7. **utils/whatsapp.ts:** encodeURIComponent prepara a mensagem para o link wa.me.

### Exemplo de filtro

~~~tsx
const [busca, setBusca] = useState("");

const encontrados = produtos.filter((produto) =>
  produto.nome.toLowerCase().includes(busca.toLowerCase())
);
~~~

Quando setBusca recebe um novo texto, o React renderiza a tela novamente e calcula a lista filtrada.

## Observações

- Os links de imagens são externos e temporários; use fotos próprias da doceria antes de publicar.
- A campanha de Natal é uma referência visual, não uma confirmação de disponibilidade.
- Para publicar, configure uma hospedagem estática como Vercel ou Netlify.
