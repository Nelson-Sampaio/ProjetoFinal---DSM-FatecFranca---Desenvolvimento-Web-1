
import { Link } from 'react-router-dom';
import { 
  PawPrint, 
  MapPin, 
  Phone, 
  EnvelopeSimple, 
  InstagramLogo, 
  FacebookLogo, 
  WhatsappLogo 
} from '@phosphor-icons/react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        
        {/* Coluna 1: Logo e Descrição */}
        <div className={styles.brandColumn}>
          <Link to="/" className={styles.brand}>
            <PawPrint size={32} weight="fill" className={styles.brandIcon} />
            <span>Fatec Pets</span>
          </Link>
          <p className={styles.brandDesc}>
            Cuidando do seu melhor amigo com o amor e o carinho que ele merece nesta data tão especial.
          </p>
          <div className={styles.socials}>
            <a href="#" aria-label="Instagram" className={styles.socialBtn}><InstagramLogo size={24} weight="fill" /></a>
            <a href="#" aria-label="Facebook" className={styles.socialBtn}><FacebookLogo size={24} weight="fill" /></a>
            <a href="#" aria-label="WhatsApp" className={styles.socialBtn}><WhatsappLogo size={24} weight="fill" /></a>
          </div>
        </div>

        {/* Coluna 2: Links Rápidos */}
        <div className={styles.linksColumn}>
          <h3 className={styles.columnTitle}>Navegação</h3>
          <ul className={styles.linkList}>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/livros">Biblioteca Pet</Link></li>
            <li><Link to="/pets">Espécies & Raças</Link></li>
            <li><Link to="/clima">Clima para Passear</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Serviços / Cadastros */}
        <div className={styles.linksColumn}>
          <h3 className={styles.columnTitle}>Cadastros</h3>
          <ul className={styles.linkList}>
            <li><Link to="/dadosPessoais">Cadastro de Tutor</Link></li>
            <li><Link to="/dadosEstudante">Estudante de Veterinária</Link></li>
            <li><Link to="/dadosPostais">Endereço de Entrega</Link></li>
          </ul>
        </div>

        {/* Coluna 4: Contato */}
        <div className={styles.contactColumn}>
          <h3 className={styles.columnTitle}>Contato</h3>
          <ul className={styles.contactList}>
            <li>
              <MapPin size={20} weight="duotone" className={styles.contactIcon} />
              <span>Av. Natal, 1225 - Jardim Noel<br/>São Paulo - SP</span>
            </li>
            <li>
              <Phone size={20} weight="duotone" className={styles.contactIcon} />
              <span>(11) 99999-1225</span>
            </li>
            <li>
              <EnvelopeSimple size={20} weight="duotone" className={styles.contactIcon} />
              <span>contato@fatecpets.com.br</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright / Créditos Acadêmicos */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>© {currentYear} Fatec Pets. Todos os direitos reservados.</p>
          <p className={styles.academicCredit}>
            Projeto Desenvolvimento Web I — Fetch API
          </p>
        </div>
      </div>
    </footer>
  );
}
