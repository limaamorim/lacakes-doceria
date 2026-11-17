import { Search } from "lucide-react";
import type { Categoria } from "../types/produto";

type Props = {
  categorias: Categoria[];
  categoria: string;
  busca: string;
  aoMudarCategoria: (valor: string) => void;
  aoMudarBusca: (valor: string) => void;
};

export function Filtros({ categorias, categoria, busca, aoMudarCategoria, aoMudarBusca }: Props) {
  return (
    <div className="filtros">
      <nav className="categorias" aria-label="Categorias de produtos">
        <button className={categoria === "Todos" ? "ativo" : ""} onClick={() => aoMudarCategoria("Todos")}>Todos</button>
        {categorias.map((item) => (
          <button key={item.id} className={categoria === item.nome ? "ativo" : ""}
            onClick={() => aoMudarCategoria(item.nome)}>{item.nome}</button>
        ))}
      </nav>
      <label className="campo-busca">
        <Search size={21} aria-hidden="true" />
        <input value={busca} onChange={e => aoMudarBusca(e.target.value)}
          placeholder="Buscar um doce pelo nome..." aria-label="Buscar produtos" />
      </label>
    </div>
  );
}
