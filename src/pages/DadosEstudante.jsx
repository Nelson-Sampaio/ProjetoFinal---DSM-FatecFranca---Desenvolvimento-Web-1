import { useState } from 'react';
import { GraduationCap } from '@phosphor-icons/react';

export default function DadosEstudante() {
  // Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    sobrenome: '',
    email: '',
    password: '',
    confirm_password: '',
    data_nascimento: '',
    carteirinha_estudante: '',
    instituicao: '',
    curso: '',
    matricula: ''
  });

  // Atualiza o estado conforme o usuário digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Lida com o envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Validação simples de senha
    if (formData.password !== formData.confirm_password) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    // Simulação de envio bem-sucedido
    console.log("Dados do Estudante:", formData);
    alert(`Cadastro do estudante ${formData.nome} ${formData.sobrenome} realizado com sucesso!`);
    
    // Limpar o formulário após o envio
    setFormData({
      nome: '', sobrenome: '', email: '', password: '', confirm_password: '',
      data_nascimento: '', carteirinha_estudante: '', instituicao: '', curso: '', matricula: ''
    });
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <GraduationCap size={40} weight="duotone" color="var(--natal-red)" />
        <div>
          <h1 className="fw-bold m-0" style={{ color: 'var(--natal-red)' }}>Cadastro de Estudante</h1>
          <p className="text-muted mb-0">Preencha os campos abaixo com seus dados acadêmicos.</p>
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

            {/* Linha 2: Email */}
            <div className="row g-3 mb-3">
              <div className="col-12">
                <label className="form-label fw-semibold">E-mail</label>
                <input type="email" className="form-control" name="email" placeholder="Digite seu e-mail" required value={formData.email} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 3: Senha + Confirmar Senha */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Senha</label>
                <input type="password" className="form-control" name="password" placeholder="Digite sua senha" required value={formData.password} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Confirmar Senha</label>
                <input type="password" className="form-control" name="confirm_password" placeholder="Confirme sua senha" required value={formData.confirm_password} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 4: Data de Nascimento + Carteirinha */}
            <div className="row g-3 mb-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Data de Nascimento</label>
                <input type="date" className="form-control" name="data_nascimento" required value={formData.data_nascimento} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Nº da Carteirinha de Estudante</label>
                <input type="number" className="form-control" name="carteirinha_estudante" placeholder="Digite o número da carteirinha" required value={formData.carteirinha_estudante} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 5: Instituição */}
            <div className="row g-3 mb-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Instituição de Ensino</label>
                <input type="text" className="form-control" name="instituicao" placeholder="Digite o nome da instituição de ensino" required value={formData.instituicao} onChange={handleChange} />
              </div>
            </div>

            {/* Linha 6: Curso + Matrícula */}
            <div className="row g-3 mb-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Curso</label>
                <input type="text" className="form-control" name="curso" placeholder="Digite o nome do curso" required value={formData.curso} onChange={handleChange} />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Matrícula</label>
                <input type="number" className="form-control" name="matricula" placeholder="Digite o nº da matrícula" required value={formData.matricula} onChange={handleChange} />
              </div>
            </div>

            {/* Botão */}
            <div className="d-grid d-md-flex justify-content-md-end">
              <button type="submit" className="btn text-white px-5 py-2 fw-semibold" style={{ backgroundColor: 'var(--natal-red)' }}>
                Cadastrar
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}