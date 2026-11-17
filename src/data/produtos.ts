import type { Produto } from "../types/produto";

// Dados de demonstração usados SOMENTE enquanto não há conexão configurada.
// Quando configurar o Supabase, o site passa a carregar os produtos do banco.
export const produtos: Produto[] = [
  { id: 1, nome: "Cartão natalino", categoria: "Natal", categoriaId: 1, descricao: "Um mimo delicado para presentear.", preco: 5,
    imagem: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=85", destaque: true },
  { id: 2, nome: "Caixinha natalina", categoria: "Natal", categoriaId: 1, descricao: "Lembrança com biscoitos e embalagem de Natal.", preco: 10,
    imagem: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?auto=format&fit=crop&w=900&q=85", destaque: true },
  { id: 3, nome: "Latinha natalina", categoria: "Natal", categoriaId: 1, descricao: "Uma latinha especial para presentear.", preco: 15,
    imagem: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=900&q=85", destaque: true },
  { id: 4, nome: "Copo da felicidade", categoria: "Copos da Felicidade", categoriaId: 2, descricao: "Sobremesa em camadas. Exemplo ilustrativo.", preco: null,
    imagem: "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=85" },
  { id: 5, nome: "Cookies artesanais", categoria: "Cookies", categoriaId: 3, descricao: "Cookies para acompanhar seu café. Exemplo ilustrativo.", preco: null,
    imagem: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85" },
  { id: 6, nome: "Bolo artesanal", categoria: "Outros doces", categoriaId: 4, descricao: "Para momentos especiais. Exemplo ilustrativo.", preco: null,
    imagem: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85" },
];
