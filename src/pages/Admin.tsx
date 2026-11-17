import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { ArrowLeft, LogOut, Pencil, Plus, Trash2 } from "lucide-react";
import { configurado, supabase } from "../lib/supabase";
import { carregarCatalogo, excluirCategoria, excluirProduto, salvarCategoria, salvarProduto } from "../services/catalogo";
import type { Categoria, Produto, ProdutoForm } from "../types/produto";
import { formatarPreco } from "../utils/formatarPreco";

const vazio: ProdutoForm = { nome: "", descricao: "", imagem: "", preco: null, categoriaId: 0, destaque: false };

export function Admin() {
  const [sessao, setSessao] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [form, setForm] = useState<ProdutoForm>({ ...vazio });
  const [editando, setEditando] = useState<number | null>(null);
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [categoriaEditando, setCategoriaEditando] = useState<number | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [ocupado, setOcupado] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    const db = supabase;
    void db.auth.getSession().then(({ data }) => setSessao(data.session));
    const { data: listener } = db.auth.onAuthStateChange((_evento, session) => setSessao(session));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Carrega novamente após cada alteração, mantendo a tela sincronizada com o banco.
  async function recarregar() {
    const dados = await carregarCatalogo();
    setProdutos(dados.produtos);
    setCategorias(dados.categorias);
  }
  useEffect(() => {
    if (!sessao) return;
    void recarregar().catch(e => setMensagem(String(e.message ?? e)));
  }, [sessao]);

  async function executar(acao: () => Promise<void>, sucesso: string) {
    setOcupado(true); setMensagem("");
    try {
      await acao();
      await recarregar();
      setMensagem(sucesso);
    } catch (e) {
      // O Supabase devolve erros como objetos (PostgrestError), nem sempre Error do JavaScript.
      // Exibir a propriedade message ajuda a identificar RLS, permissões ou campos inválidos.
      const motivo = e && typeof e === "object" && "message" in e && typeof e.message === "string"
        ? e.message
        : "Não foi possível concluir a operação.";
      setMensagem("Erro ao salvar: " + motivo);
    } finally { setOcupado(false); }
  }

  if (!configurado || !supabase) return (
    <main className="admin"><h1>Configuração pendente</h1>
      <p>Configure VITE_SUPABASE_URL e VITE_SUPABASE_PUBLISHABLE_KEY em .env.local e execute o SQL do README.</p>
      <a href="/">Voltar ao cardápio</a>
    </main>
  );

  async function entrar(evento: React.FormEvent) {
    evento.preventDefault();
    setOcupado(true); setMensagem("");
    const { error } = await supabase!.auth.signInWithPassword({ email, password: senha });
    if (error) setMensagem(error.message);
    setOcupado(false);
  }

  if (!sessao) return (
    <main className="admin">
      <a href="/" className="link-voltar"><ArrowLeft size={17} /> Voltar ao cardápio</a>
      <h1>Acesso administrativo</h1>
      <p>Entre com o usuário cadastrado no Supabase Auth.</p>
      <form onSubmit={entrar} className="admin-form admin-login">
        <label>E-mail<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label>
        <label>Senha<input type="password" required value={senha} onChange={e => setSenha(e.target.value)} /></label>
        <button disabled={ocupado}>Entrar</button>
      </form>
      {mensagem && <p role="status">{mensagem}</p>}
    </main>
  );

  return (
    <main className="admin">
      <div className="admin-topo">
        <div><a href="/" className="link-voltar"><ArrowLeft size={17} /> Ver cardápio</a><h1>Painel da Lacakes</h1></div>
        <button type="button" className="botao-secundario" onClick={() => void supabase!.auth.signOut()}>
          <LogOut size={16} /> Sair
        </button>
      </div>
      <p>Edite os produtos e categorias aqui. As alterações são salvas no Supabase.</p>
      {mensagem && <p role="status" className="admin-mensagem">{mensagem}</p>}

      <section className="admin-secao">
        <h2>{editando ? "Editar produto" : "Novo produto"}</h2>
        <form className="admin-form" onSubmit={e => {
          e.preventDefault();
          void executar(async () => {
            await salvarProduto(form, editando ?? undefined);
            setEditando(null); setForm({ ...vazio });
          }, "Produto salvo com sucesso!");
        }}>
          <label>Nome<input required maxLength={120} value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></label>
          <label>Categoria<select required value={form.categoriaId || ""} onChange={e => setForm({ ...form, categoriaId: Number(e.target.value) })}>
            <option value="">Selecione</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
          </select></label>
          <label>Preço (R$) — deixe em branco para "Sob consulta"
            <input type="number" min="0" step="0.01" value={form.preco ?? ""} onChange={e => setForm({ ...form, preco: e.target.value === "" ? null : Number(e.target.value) })} />
          </label>
          <label>URL da imagem<input type="url" required placeholder="https://..." value={form.imagem} onChange={e => setForm({ ...form, imagem: e.target.value })} /></label>
          <label className="admin-largo">Descrição<textarea rows={3} maxLength={500} value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></label>
          <label className="admin-check"><input type="checkbox" checked={Boolean(form.destaque)} onChange={e => setForm({ ...form, destaque: e.target.checked })} /> Marcar como destaque</label>
          <div className="admin-acoes">
            <button type="submit" disabled={ocupado || categorias.length === 0}><Plus size={16} /> {editando ? "Salvar alterações" : "Cadastrar produto"}</button>
            {editando && <button className="botao-secundario" type="button" onClick={() => { setEditando(null); setForm({ ...vazio }); }}>Cancelar</button>}
          </div>
        </form>

        <h2>Produtos cadastrados ({produtos.length})</h2>
        <div className="admin-lista">
          {produtos.map(p => <div className="admin-item" key={p.id}>
            <div><strong>{p.nome}</strong><small>{p.categoria} · {formatarPreco(p.preco)}</small></div>
            <div className="admin-acoes">
              <button type="button" className="botao-secundario" onClick={() => {
                setEditando(p.id);
                setForm({ nome: p.nome, descricao: p.descricao, preco: p.preco, imagem: p.imagem, categoriaId: p.categoriaId, destaque: Boolean(p.destaque) });
              }}><Pencil size={16} /> Editar</button>
              <button type="button" className="botao-perigo" disabled={ocupado} onClick={() => {
                if (window.confirm("Excluir o produto " + p.nome + "?")) void executar(() => excluirProduto(p.id), "Produto excluído.");
              }}><Trash2 size={16} /> Excluir</button>
            </div>
          </div>)}
        </div>
      </section>

      <section className="admin-secao">
        <h2>{categoriaEditando ? "Renomear categoria" : "Nova categoria"}</h2>
        <form className="admin-form" onSubmit={e => {
          e.preventDefault();
          void executar(async () => {
            await salvarCategoria(nomeCategoria, categoriaEditando ?? undefined);
            setNomeCategoria(""); setCategoriaEditando(null);
          }, "Categoria salva!");
        }}>
          <label>Nome da categoria<input required maxLength={80} value={nomeCategoria} onChange={e => setNomeCategoria(e.target.value)} /></label>
          <div className="admin-acoes"><button disabled={ocupado}><Plus size={16} /> Salvar categoria</button>
            {categoriaEditando && <button type="button" className="botao-secundario" onClick={() => { setCategoriaEditando(null); setNomeCategoria(""); }}>Cancelar</button>}
          </div>
        </form>
        <div className="admin-lista">
          {categorias.map(c => <div className="admin-item" key={c.id}>
            <strong>{c.nome}</strong>
            <div className="admin-acoes">
              <button className="botao-secundario" type="button" onClick={() => { setCategoriaEditando(c.id); setNomeCategoria(c.nome); }}><Pencil size={16} /> Renomear</button>
              <button className="botao-perigo" type="button" disabled={ocupado} onClick={() => {
                if (window.confirm("Excluir a categoria " + c.nome + "?")) void executar(() => excluirCategoria(c.id), "Categoria excluída.");
              }}><Trash2 size={16} /> Excluir</button>
            </div>
          </div>)}
        </div>
        <small>Para excluir uma categoria, primeiro mova ou exclua os produtos associados.</small>
      </section>
    </main>
  );
}
