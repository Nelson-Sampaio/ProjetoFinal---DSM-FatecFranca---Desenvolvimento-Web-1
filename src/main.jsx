import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Importando Componentes Globais
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';

// Importando as Páginas Reais
import Home from './pages/Home.jsx';
import Livros from './pages/Livros.jsx';
import Pets from './pages/Pets.jsx';
import Clima from './pages/Clima.jsx';
import DadosPessoais from './pages/DadosPessoais.jsx';
import DadosPostais from './pages/DadosPostais.jsx';
import DadosEstudante from './pages/DadosEstudante.jsx';

// Placeholder apenas para as páginas que ainda vamos migrar (Cadastros e Mapa)
const Placeholder = ({ title }) => (
  <div className="container py-5 text-center" style={{ minHeight: '50vh' }}>
    <h1 className="mt-5 fw-bold" style={{ color: 'var(--natal-red)' }}>{title}</h1>
    <p className="text-muted">Esta página está em construção no novo formato React.</p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        
        <Header />
        
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* Páginas Migradas */}
            <Route path="/livros" element={<Livros />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/clima" element={<Clima />} />
            <Route path="/dadosPessoais" element={<DadosPessoais />} />
            <Route path="/dadosEstudante" element={<DadosEstudante />} />
            <Route path="/dadosPostais" element={<DadosPostais />} />  
            <Route path="*" element={<Placeholder title="Página não encontrada" />} />
          </Routes>
        </main>
        
        <Footer />
        
      </div>
    </BrowserRouter>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);