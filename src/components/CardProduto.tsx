import { ArrowUpRight } from "lucide-react";
import { loja } from "../data/loja";
import type { Produto } from "../types/produto";
import { formatarPreco } from "../utils/formatarPreco";
import { criarLinkWhatsApp } from "../utils/whatsapp";

type Props = { produto: Produto };

export function CardProduto({ produto }: Props) {
  return (
    <article className="produto">
      <div className="produto-imagem">
        <img src={produto.imagem} alt={produto.nome} loading="lazy" />
        {produto.destaque && <span className="etiqueta">Especial de Natal</span>}
      </div>
      <div className="produto-conteudo">
        <span className="produto-categoria">{produto.categoria}</span>
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <div className="produto-rodape">
          <strong>{formatarPreco(produto.preco)}</strong>
          {loja.whatsapp ? (
            <a className="botao-pedir" href={criarLinkWhatsApp(loja.whatsapp, produto)} target="_blank" rel="noreferrer">
              Pedir <ArrowUpRight size={17} />
            </a>
          ) : (
            <span className="botao-pedir desativado" title="Cadastre o número no arquivo src/data/loja.ts">Em breve</span>
          )}
        </div>
      </div>
    </article>
  );
}
