

import { useState } from 'react';
import { MapPin, MagnifyingGlass } from '@phosphor-icons/react';
import Mapa from '../components/Mapa/Mapa.jsx';

// Coordenadas iniciais de São Paulo
const LAT_INICIAL = -23.55;
const LNG_INICIAL = -46.63;

export default function DadosPostais() {
  const [formData, setFormData] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: ''
  });
  
  const [posicao, setPosicao] = useState([LAT_INICIAL, LNG_INICIAL]);
  const [popupEndereco, setPopupEndereco] = useState('São Paulo - ponto inicial');
  const [mensagem, setMensagem] = useState('Digite o CEP para buscar o endereço.');
  const [msgType, setMsgType] = useState('secondary');

  // Atualiza os campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Máscara de CEP
  const formatarCep = (valor) => {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 5) {
      valor = valor.slice(0, 5) + "-" + valor.slice(5, 8);
    }
    return valor;
  };

  const handleCepChange = (e) => {
    const cepFormatado = formatarCep(e.target.value);
    setFormData(prev => ({ ...prev, cep: cepFormatado }));
  };

  const buscarCep = async (e) => {
    if (e) e.preventDefault();
    const cepLimpo = formData.cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8) return;

    setMensagem('Buscando CEP...');
    setMsgType('secondary');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await response.json();

      if (dados.erro) throw new Error("CEP não encontrado");

      // Atualiza o estado do formulário com os dados do ViaCEP
      setFormData(prev => ({
        ...prev,
        logradouro: dados.logradouro || '',
        bairro: dados.bairro || '',
        cidade: dados.localidade || '',
        estado: dados.uf || ''
      }));

      // Monta o endereço e busca as coordenadas
      const enderecoCompleto = `${dados.logradouro || ''}, ${dados.bairro || ''}, ${dados.localidade || ''}, ${dados.uf || ''}, Brasil`;
      buscarCoordenadas(enderecoCompleto);

    } catch (error) {
      setMensagem('CEP não encontrado ou inválido.');
      setMsgType('danger');
    }
  };

  const buscarCoordenadas = async (endereco) => {
    setMensagem('Buscando localização no mapa...');
    setMsgType('secondary');

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(endereco)}`;
      const response = await fetch(url, { headers: { "Accept-Language": "pt-BR" } });
      const dados = await response.json();

      if (!dados || dados.length === 0) throw new Error("Endereço não encontrado");

      const lat = parseFloat(dados[0].lat);
      const lng = parseFloat(dados[0].lon);
      const nome = dados[0].display_name;

      setPosicao([lat, lng]);
      setPopupEndereco(nome);
      setMensagem('Localização atualizada no mapa.');
      setMsgType('success');

    } catch (error) {
      setMensagem('Não foi possível localizar este endereço no mapa.');
      setMsgType('danger');
    }
  };

  const handleAtualizarMapa = () => {
    const { logradouro, numero, bairro, cidade, estado } = formData;
    const partes = [];
    if (logradouro) partes.push(logradouro + (numero ? `, ${numero}` : ''));
    if (bairro) partes.push(bairro);
    if (cidade) partes.push(cidade);
    if (estado) partes.push(estado);
    partes.push("Brasil");

    const enderecoMontado = partes.join(", ");
    
    if (enderecoMontado && enderecoMontado !== "Brasil") {
      buscarCoordenadas(enderecoMontado);
    } else {
      setMensagem('Preencha pelo menos logradouro e cidade.');
      setMsgType('danger');
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <MapPin size={40} weight="duotone" color="var(--natal-red)" />
        <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Endereço de Entrega</h1>
      </div>

      <div className="row g-4">
        {/* Formulário */}
        <div className="col-12 col-lg-5">
          <form onSubmit={buscarCep} className="bg-white p-4 rounded shadow-sm border">
            <div className="mb-3">
              <label className="form-label fw-bold">CEP</label>
              <input 
                type="text" 
                name="cep"
                className="form-control" 
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleCepChange}
                onBlur={buscarCep}
                maxLength={9}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Logradouro</label>
              <input type="text" name="logradouro" className="form-control" value={formData.logradouro} onChange={handleChange} />
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <label className="form-label">Número</label>
                <input type="text" name="numero" className="form-control" value={formData.numero} onChange={handleChange} />
              </div>
              <div className="col-md-8 mb-3">
                <label className="form-label">Bairro</label>
                <input type="text" name="bairro" className="form-control" value={formData.bairro} onChange={handleChange} />
              </div>
            </div>
            <div className="row">
              <div className="col-md-8 mb-3">
                <label className="form-label">Cidade</label>
                <input type="text" name="cidade" className="form-control" value={formData.cidade} onChange={handleChange} />
              </div>
              <div className="col-md-4 mb-3">
                <label className="form-label">Estado</label>
                <input type="text" name="estado" className="form-control" value={formData.estado} onChange={handleChange} maxLength={2} />
              </div>
            </div>
            
            <button 
              type="button" 
              onClick={handleAtualizarMapa}
              className="btn w-100 text-white d-flex justify-content-center align-items-center gap-2 fw-bold"
              style={{ backgroundColor: 'var(--natal-red)' }}
            >
              <MagnifyingGlass size={20} weight="bold" />
              Atualizar Mapa pelo Endereço
            </button>
          </form>
        </div>

        {/* Mapa e Mensagem */}
        <div className="col-12 col-lg-7">
          <p className={`fw-bold text-${msgType} mb-2`}>{mensagem}</p>
          <Mapa posicao={posicao} endereco={popupEndereco} />
        </div>
      </div>
    </div>
  );
}