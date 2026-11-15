
import { useState } from 'react';
import { UserPlus } from '@phosphor-icons/react';

export default function DadosPessoais() {
  // Estado para armazenar todos os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    rg: '',
    emissor: '',
    data_emissao: '',
    nome_mae: '',
    nome_pai: '',
    sexo: '',
    estado_civil: '',
    trabalha_atualmente: '',
    profissao: ''
  });

  // Atualiza o estado conforme o usuário digita ou seleciona
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede recarregar a página

    // Simulação de envio
    console.log("Dados Pessoais:", formData);
    alert(`Cadastro de ${formData.nome} ${formData.sobrenome} realizado com sucesso!`);
    
    // Limpa o formulário
    setFormData({
      nome: '', sobrenome: '', email: '', cpf: '', rg: '', emissor: '',
      data_emissao: '', nome_mae: '', nome_pai: '', sexo: '',
      estado_civil: '', trabalha_atualmente: '', profissao: ''
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <UserPlus size={40} weight="duotone" color="var(--natal-red)" />
        <div>
          <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Cadastro de Tutor</h1>
          <p className="text-muted mb-0">Preencha os campos abaixo com suas informações pessoais.</p>
        </div>
      </div>

      <div className="card border-0 shadow-sm rounded">
        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit}>
            
            {/* Linha 1: Nome + Sobrenome */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nome</label>
                <input type="text" className="form-control" name="nome" placeholder="Digite seu nome" required value={formData.nome} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Sobrenome</label>
                <input type="text" className="form-control" name="sobrenome" placeholder="Digite seu sobrenome" required value={formData.sobrenome} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 2: E-mail */}
            <div className="row g-3 mb-3">
              <div className="col-12">
                <label className="form-label fw-semibold">E-mail</label>
                <input type="email" className="form-control" name="email" placeholder="Digite seu e-mail" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 3: CPF + RG */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">CPF</label>
                <input type="text" className="form-control" name="cpf" placeholder="000.000.000-00" required value={formData.cpf} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">RG</label>
                <input type="text" className="form-control" name="rg" placeholder="Digite seu RG" required value={formData.rg} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 4: Órgão Emissor + Data de Emissão */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Órgão Emissor</label>
                <input type="text" className="form-control" name="emissor" placeholder="Ex: SSP/SP" required value={formData.emissor} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Data de Emissão</label>
                <input type="date" className="form-control" name="data_emissao" required value={formData.data_emissao} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 5: Nome da Mãe + Nome do Pai */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nome da Mãe</label>
                <input type="text" className="form-control" name="nome_mae" placeholder="Digite o nome da mãe" required value={formData.nome_mae} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nome do Pai</label>
                <input type="text" className="form-control" name="nome_pai" placeholder="Digite o nome do pai" required value={formData.nome_pai} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 6: Sexo + Estado Civil + Trabalha atualmente */}
            <div className="row g-3 mb-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Sexo</label>
                <select className="form-select" name="sexo" required value={formData.sexo} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Estado Civil</label>
                <select className="form-select" name="estado_civil" required value={formData.estado_civil} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label fw-semibold">Trabalha atualmente?</label>
                <select className="form-select" name="trabalha_atualmente" required value={formData.trabalha_atualmente} onChange={handleChange}>
                  <option value="">Selecione</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </select>
              </div>
            </div>

            {/* Linha 7: Profissão */}
            <div className="row g-3 mb-4">
              <div className="col-12">
                <label className="form-label fw-semibold">Profissão</label>
                <input type="text" className="form-control" name="profissao" placeholder="Digite sua profissão" required value={formData.profissao} onChange={handleChange} />
              </div>
            </div>

            {/* Botão */}
            <div className="d-grid d-md-flex justify-content-md-end">
              <button type="submit" className="btn text-white px-5 py-2 fw-semibold" style={{ backgroundColor: 'var(--natal-red)' }}>
                Enviar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}