import { Search } from "lucide-react";
import type { Categoria } from "../types/produto";

type Props = {
  categoria: string;
  busca: string;
  aoMudarCategoria: (valor: string) => void;
  aoMudarBusca: (valor: string) => void;
};

const categorias: Categoria[] = ["Natal", "Copos da Felicidade", "Cookies", "Outros doces"];

export function Filtros({ categoria, busca, aoMudarCategoria, aoMudarBusca }: Props) {
  return (
    <div className="filtros">
      <nav className="categorias" aria-label="Categorias de produtos">
        <button className={categoria === "Todos" ? "ativo" : ""} onClick={() => aoMudarCategoria("Todos")}>Todos</button>
        {categorias.map((item) => (
          <button
            key={item}
            className={categoria === item ? "ativo" : ""}
            onClick={() => aoMudarCategoria(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <label className="campo-busca">
        <Search size={21} aria-hidden="true" />
        <input
          value={busca}
          onChange={(evento) => aoMudarBusca(evento.target.value)}
          placeholder="Buscar um doce pelo nome..."
          aria-label="Buscar produtos"
        />
      </label>
    </div>
  );
}
