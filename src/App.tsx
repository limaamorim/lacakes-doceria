import { useEffect, useState } from "react";
import { carregarConfiguracaoSite, configuracaoPadrao } from "./services/configuracaoSite";
import type { ConfiguracaoSite } from "./services/configuracaoSite";
import { Heart, Sparkles } from "lucide-react";
import { Cabecalho } from "./components/Cabecalho";
import { Filtros } from "./components/Filtros";
import { CardProduto } from "./components/CardProduto";
import { useCatalogo } from "./hooks/useCatalogo";
import { Admin } from "./pages/Admin";
import { loja } from "./data/loja";

export default function App() {
  if (window.location.pathname.replace(/\/$/, "") === "/admin") return <Admin />;
  return <Loja />;
}

function Loja() {
  const { produtos, categorias, carregando, erro } = useCatalogo();
  // useState guarda o filtro selecionado e o texto digitado na busca.
  const [categoria, setCategoria] = useState("Todos");
  const [busca, setBusca] = useState("");
  const [configuracao, setConfiguracao] = useState<ConfiguracaoSite>(configuracaoPadrao);

  useEffect(() => {
    let ativo = true;
    void carregarConfiguracaoSite()
      .then(dados => { if (ativo) setConfiguracao(dados); })
      .catch(erro => console.error("Não foi possível carregar a personalização:", erro));
    return () => { ativo = false; };
  }, []);

  // filter retorna somente os produtos que atendem às duas condições.
  const produtosFiltrados = produtos.filter((produto) => {
    const correspondeCategoria = categoria === "Todos" || produto.categoria === categoria;
    const correspondeBusca = produto.nome.toLowerCase().includes(busca.trim().toLowerCase());
    return correspondeCategoria && correspondeBusca;
  });

  return (
    <>
      <Cabecalho />
      <main className="container">
        <section className="apresentacao" aria-label="Boas-vindas">
          <div>
            <span className="sobretitulo"><Sparkles size={17} /> Nosso cardápio artesanal</span>
            <h1>{configuracao.titulo_principal} <em>{configuracao.titulo_destaque}</em></h1>
            <p>{configuracao.descricao_principal}</p>
            <a href="#cardapio" className="botao-principal">Explorar cardápio <span aria-hidden="true">→</span></a>
          </div>
          <div className="apresentacao-foto">
            <img
              src={configuracao.imagem_principal}
              alt="Bolo artesanal decorado"
            />
            <span className="foto-selo">Feito com ♡</span>
          </div>
        </section>

        <section className="cardapio" id="cardapio">
          <div className="titulo-secao">
            <span className="sobretitulo">Escolha sua delícia</span>
            <h2>Nosso cardápio</h2>
            <p>{configuracao.descricao_cardapio}</p>
          </div>

          <Filtros
            categorias={categorias}
            categoria={categoria}
            busca={busca}
            aoMudarCategoria={setCategoria}
            aoMudarBusca={setBusca}
          />

          {carregando && <p role="status">Carregando cardápio...</p>}
          {erro && <p role="alert">Erro ao carregar: {erro}</p>}
          {!carregando && !erro && <div className="resultado">{produtosFiltrados.length} produto(s) encontrado(s)</div>}
          {!carregando && !erro && (produtosFiltrados.length > 0 ? (
            <div className="grade-produtos">
              {produtosFiltrados.map((produto) => <CardProduto key={produto.id} produto={produto} />)}
            </div>
          ) : (
            <div className="sem-resultados">Não encontramos esse doce. Experimente outra busca ou categoria.</div>
          ))}
        </section>
      </main>

      <footer className="rodape">
        <img src="/logo.jpg" alt="" />
        <p>Doces feitos para adoçar seus melhores momentos.</p>
        <span><Heart size={15} /> {loja.nome}</span>
      </footer>
    </>
  );
}
