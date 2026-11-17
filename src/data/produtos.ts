import type { Produto } from "../types/produto";

// Catálogo inicial. Produtos e preços de Natal vêm da referência enviada.
// As demais opções são ILUSTRATIVAS: substitua por itens e fotos reais da Lacakes.
export const produtos: Produto[] = [
  {
    id: 1,
    nome: "Cartão natalino",
    categoria: "Natal",
    descricao: "Um mimo delicado para presentear. Acompanha uma unidade de biscoito.",
    preco: 5,
    imagem: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85",
    destaque: true,
  },
  {
    id: 2,
    nome: "Caixinha natalina",
    categoria: "Natal",
    descricao: "Uma lembrança especial com biscoitos e embalagem de Natal.",
    preco: 10,
    imagem: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=900&q=85",
    destaque: true,
  },
  {
    id: 3,
    nome: "Latinha natalina",
    categoria: "Natal",
    descricao: "Uma latinha cheia de carinho, ideal para presentear.",
    preco: 15,
    imagem: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=900&q=85",
    destaque: true,
  },
  {
    id: 4,
    nome: "Copo da felicidade",
    categoria: "Copos da Felicidade",
    descricao: "Sobremesa em camadas. Sabores e valores sob consulta.",
    preco: null,
    imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    nome: "Cookies artesanais",
    categoria: "Cookies",
    descricao: "Uma opção deliciosa para acompanhar seu café. Valores sob consulta.",
    preco: null,
    imagem: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    nome: "Bolo artesanal",
    categoria: "Outros doces",
    descricao: "Para tornar qualquer comemoração ainda mais doce. Valores sob consulta.",
    preco: null,
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
  },
];
