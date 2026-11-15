

import { useState } from 'react';
import { CloudSun, MagnifyingGlass } from '@phosphor-icons/react';
import tabelaStyles from '../components/Tabela.module.css';

export default function Clima() {
  const [cidade, setCidade] = useState('');
  const [dadosClima, setDadosClima] = useState([]);
  const [nomeCidade, setNomeCidade] = useState('');
  const [mensagem, setMensagem] = useState('Digite o nome de uma cidade.');
  const [loading, setLoading] = useState(false);

  const carregarClima = async (e) => {
    e.preventDefault();
    if (cidade.trim() === '') {
      setMensagem('Digite o nome de uma cidade.');
      return;
    }

    setLoading(true);
    setMensagem('Buscando cidade...');

    try {
      // 1 - Buscar Cidade
      const URL_CIDADE = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
      const respostaCidade = await fetch(URL_CIDADE);
      const dadosCidade = await respostaCidade.json();

      if (!dadosCidade.results || dadosCidade.results.length === 0) {
        setMensagem('Cidade não encontrada.');
        setDadosClima([]);
        setLoading(false);
        return;
      }

      const cidadeEncontrada = dadosCidade.results[0];
      setNomeCidade(`${cidadeEncontrada.name} - ${cidadeEncontrada.country}`);
      
      setMensagem('Buscando previsão do tempo...');

      // 2 - Buscar Clima
      const URL_CLIMA = `https://api.open-meteo.com/v1/forecast?latitude=${cidadeEncontrada.latitude}&longitude=${cidadeEncontrada.longitude}&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m&forecast_hours=10`;
      const respostaClima = await fetch(URL_CLIMA);
      const dadosClima = await respostaClima.json();

      // 3 - Formatar dados para a tabela
      const previsoes = dadosClima.hourly.time.map((time, index) => {
        const dataFormatada = new Date(time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        return {
          horario: dataFormatada,
          temperatura: dadosClima.hourly.temperature_2m[index] + ' °C',
          umidade: dadosClima.hourly.relative_humidity_2m[index] + '%',
          vento: dadosClima.hourly.wind_speed_10m[index] + ' km/h'
        };
      });

      setDadosClima(previsoes);
      setMensagem(`Previsão para ${cidadeEncontrada.name} - ${cidadeEncontrada.country}`);

    } catch (error) {
      console.error(error);
      setMensagem('Não foi possível carregar os dados do clima.');
      setDadosClima([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <CloudSun size={40} weight="duotone" color="var(--natal-gold)" />
        <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Clima para Passear</h1>
      </div>

      <form onSubmit={carregarClima} className="mb-4 d-flex gap-2">
        <input 
          type="text" 
          className="form-control form-control-lg shadow-sm" 
          placeholder="Digite uma cidade (ex: São Paulo)"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button type="submit" className="btn text-white shadow-sm d-flex align-items-center gap-2" style={{ backgroundColor: 'var(--natal-red)' }} disabled={loading}>
          <MagnifyingGlass size={20} weight="bold" />
          {loading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>

      <p className="text-center fw-bold text-muted mb-4">{mensagem}</p>

      {dadosClima.length > 0 && (
        <div className="table-responsive shadow-sm rounded bg-white">
          <table className={`table table-hover mb-0 ${tabelaStyles.tabelaNatal}`}>
            <thead style={{ backgroundColor: 'var(--natal-red)', color: 'white' }}>
              <tr>
                <th>Horário</th>
                <th>Temperatura</th>
                <th>Umidade</th>
                <th>Vento</th>
              </tr>
            </thead>
            <tbody>
              {dadosClima.map((prev, index) => (
                <tr key={index}>
                  <td>{prev.horario}</td>
                  <td>{prev.temperatura}</td>
                  <td>{prev.umidade}</td>
                  <td>{prev.vento}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}