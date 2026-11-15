
import { useState, useEffect } from 'react';
import { Books } from '@phosphor-icons/react';
import tabelaStyles from '../components/Tabela.module.css';

export default function Livros() {
  const [livros, setLivros] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/livros.json')
      .then((res) => {
        if (!res.ok) throw new Error('Falha na requisição: ' + res.status);
        return res.json();
      })
      .then((dados) => {
        setLivros(dados);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Lógica de filtro igual ao seu js antigo
  const livrosFiltrados = livros.filter((livro) => {
    const termo = filtro.toLowerCase();
    return (
      (livro.titulo || '').toLowerCase().includes(termo) ||
      (livro.autor || '').toLowerCase().includes(termo) ||
      (livro.genero || '').toLowerCase().includes(termo)
    );
  });

  if (loading) return <div className="container py-5 text-center"><h2>Carregando acervo...</h2></div>;
  if (error) return <div className="container py-5 text-center text-danger"><h2>Erro: {error}</h2></div>;

  // Pega as chaves do primeiro objeto para montar o cabeçalho
  const chaves = livros.length > 0 ? Object.keys(livros[0]) : [];

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <Books size={40} weight="duotone" color="var(--natal-red)" />
        <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Biblioteca Pet</h1>
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control form-control-lg shadow-sm" 
          placeholder="Filtrar por título, autor ou gênero..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <small className="text-muted mt-2 d-block">{livrosFiltrados.length} livro(s) encontrado(s).</small>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className={`table table-hover mb-0 ${tabelaStyles.tabelaNatal}`}>
          <thead style={{ backgroundColor: 'var(--natal-red)', color: 'white' }}>
            <tr>
              {chaves.map((chave) => (
                <th key={chave} className="text-capitalize">
                  {chave.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {livrosFiltrados.map((livro) => (
              <tr key={livro.id}>
                {chaves.map((chave) => (
                  <td key={chave}>{livro[chave]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}