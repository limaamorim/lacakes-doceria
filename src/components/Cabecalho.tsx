import { Instagram, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { loja } from "../data/loja";

export function Cabecalho() {
  return (
    <>
      <header className="topo">
        <div className="topo-interno">
          <img className="logo" src="/logo.jpg" alt="Lacakes Doceria" />
          <p className="topo-slogan">Doçuras feitas com carinho, para momentos especiais.</p>

          {/* Localização em destaque*/}
          <div className="informacoes">
            <span><MapPin size={17} /> {loja.local}</span>
          </div>

          {/* Links externos: os dados são configurados no arquivo data/loja.ts. */}
          <div className="redes">
            <a href={"https://www.instagram.com/" + loja.instagram + "/"} target="_blank" rel="noopener noreferrer">
              <Instagram size={20} /> @{loja.instagram}
            </a>
            <a href={"https://wa.me/" + loja.whatsapp} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </header>
      <div className="faixa">
        <div className="faixa-interna">
          <span><ShoppingBag size={18} /> Feito especialmente para você</span>
          <strong>Encomendas com carinho ♡</strong>
        </div>
      </div>
    </>
  );
}
