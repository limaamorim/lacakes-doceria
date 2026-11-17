import { Clock3, Instagram, MapPin, MessageCircle, ShoppingBag } from "lucide-react";
import { loja } from "../data/loja";

export function Cabecalho() {
  return (
    <>
      <header className="topo">
        <div className="topo-interno">
          <img className="logo" src="/logo.jpg" alt="Lacakes Doceria" />
          <p className="topo-slogan">Doçuras feitas com carinho, para momentos especiais.</p>
          <div className="informacoes">
            <span><Clock3 size={17} /> {loja.horario}</span>
            <span><MapPin size={17} /> {loja.local}</span>
          </div>
          <div className="redes">
            {loja.instagram && (
              <a href={"https://instagram.com/" + loja.instagram} target="_blank" rel="noreferrer">
                <Instagram size={19} /> Instagram
              </a>
            )}
            {loja.whatsapp && (
              <a href={"https://wa.me/" + loja.whatsapp} target="_blank" rel="noreferrer">
                <MessageCircle size={19} /> WhatsApp
              </a>
            )}
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
