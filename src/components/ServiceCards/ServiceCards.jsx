import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Books, 
  PawPrint, 
  CloudSun, 
  UserPlus, 
  GraduationCap, 
  MapPin,
  CaretLeft,
  CaretRight
} from '@phosphor-icons/react';
import styles from './ServiceCards.module.css';

// Recontextualização dos cards originais do projeto
const services = [
  { 
    id: 'livros', 
    title: 'Biblioteca Pet', 
    desc: 'Histórias e guias para tutores. Consulte nosso acervo via API.', 
    icon: <Books size={32} weight="duotone" />, 
    path: '/livros',
    color: '#e84c3d' // Vermelho
  },
  { 
    id: 'pets', 
    title: 'Espécies & Raças', 
    desc: 'Conheça os pets que cuidamos. Dados dinâmicos via Fetch API.', 
    icon: <PawPrint size={32} weight="duotone" />, 
    path: '/pets',
    color: '#1e5631' // Verde
  },
  { 
    id: 'clima', 
    title: 'Clima para Passear', 
    desc: 'Confira o tempo ideal para levar seu cão ao parque hoje.', 
    icon: <CloudSun size={32} weight="duotone" />, 
    path: '/clima',
    color: '#d4af37' // Dourado
  },
  { 
    id: 'tutor', 
    title: 'Cadastro de Tutor', 
    desc: 'Registre-se para agendar banho, tosa e consultas.', 
    icon: <UserPlus size={32} weight="duotone" />, 
    path: '/dadosPessoais',
    color: '#e84c3d'
  },
  { 
    id: 'estudante', 
    title: 'Estudante de Veterinária', 
    desc: 'Cadastro de estagiários e residentes do nosso petshop.', 
    icon: <GraduationCap size={32} weight="duotone" />, 
    path: '/dadosEstudante',
    color: '#1e5631'
  },
  { 
    id: 'endereco', 
    title: 'Endereço de Entrega', 
    desc: 'Cadastre seu CEP para receber produtos natalinos em casa.', 
    icon: <MapPin size={32} weight="duotone" />, 
    path: '/dadosPostais',
    color: '#d4af37'
  },
];

export default function ServiceCards() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      // Pega a largura de um card baseado no gap e nas 3 colunas
      const cardWidth = scrollRef.current.firstChild.clientWidth + 24; // 24 é o gap
      
      // No mobile, rola 1 card. No desktop, rola 3 de uma vez.
      const isMobile = window.innerWidth < 768;
      const scrollAmount = isMobile ? cardWidth : cardWidth * 3;

      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.cardsSection}>
      <div className={`container ${styles.header}`}>
        <div>
          <h2 className={styles.title}>Nossos Serviços</h2>
          <p className={styles.subtitle}>Acesse as funcionalidades do nosso portal acadêmico.</p>
        </div>
        
        {/* Botões de navegação (Desktop) */}
        <div className={styles.navControls}>
          <button onClick={() => scroll('left')} className={styles.arrowBtn} aria-label="Anterior">
            <CaretLeft size={24} weight="bold" />
          </button>
          <button onClick={() => scroll('right')} className={styles.arrowBtn} aria-label="Próximo">
            <CaretRight size={24} weight="bold" />
          </button>
        </div>
      </div>

      <div className={`container ${styles.carouselWrapper}`}>
        <div className={styles.carouselTrack} ref={scrollRef}>
          {services.map((service) => (
            <Link to={service.path} key={service.id} className={styles.card}>
              <div className={styles.iconWrapper} style={{ color: service.color }}>
                {service.icon}
              </div>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDesc}>{service.desc}</p>
              <span className={styles.cardLink}>Acessar &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}