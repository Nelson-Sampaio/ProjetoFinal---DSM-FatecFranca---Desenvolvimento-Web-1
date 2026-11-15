
import { useState, useEffect } from 'react';
import { PawPrint } from '@phosphor-icons/react';
import tabelaStyles from '../components/Tabela.module.css';

export default function Pets() {
  const [pets, setPets] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/data/pets.json')
      .then((res) => {
        if (!res.ok) throw new Error('Falha na requisição: ' + res.status);
        return res.json();
      })
      .then((dados) => {
        setPets(dados);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Filtro baseado no seu código antigo (tipo e raça)
  const petsFiltrados = pets.filter((pet) => {
    const termo = filtro.toLowerCase();
    return (
      (pet.tipo || '').toLowerCase().includes(termo) ||
      (pet.raca || '').toLowerCase().includes(termo)
    );
  });

  if (loading) return <div className="container py-5 text-center"><h2>Carregando pets...</h2></div>;
  if (error) return <div className="container py-5 text-center text-danger"><h2>Erro: {error}</h2></div>;

  const chaves = pets.length > 0 ? Object.keys(pets[0]) : [];

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <PawPrint size={40} weight="duotone" color="var(--natal-green)" />
        <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Espécies & Raças</h1>
      </div>
      
      <div className="mb-4">
        <input 
          type="text" 
          className="form-control form-control-lg shadow-sm" 
          placeholder="Filtrar por tipo ou raça..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <small className="text-muted mt-2 d-block">{petsFiltrados.length} pet(s) encontrado(s).</small>
      </div>

      <div className="table-responsive shadow-sm rounded bg-white">
        <table className={`table table-hover mb-0 ${tabelaStyles.tabelaNatal}`}>
          <thead style={{ backgroundColor: 'var(--natal-green)', color: 'white' }}>
            <tr>
              {chaves.map((chave) => (
                <th key={chave} className="text-capitalize">
                  {chave.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {petsFiltrados.map((pet) => (
              <tr key={pet.id}>
                {chaves.map((chave) => (
                  <td key={chave}>{pet[chave]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}