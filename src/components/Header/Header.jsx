
import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
  House,
  Books,
  PawPrint,
  CloudSun,
  UserPlus,
  GraduationCap,
  MapPin,
  List,
  X,
} from '@phosphor-icons/react';
import logo from '../../assets/logotipo/logo-natal.png';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: '/',               label: 'Início',           Icon: House },
  { to: '/livros',         label: 'Livros',           Icon: Books },
  { to: '/pets',           label: 'Tipos de Pets',    Icon: PawPrint },
  { to: '/clima',          label: 'Clima / Tempo',    Icon: CloudSun },
  { to: '/dadosPessoais',  label: 'Dados Pessoais',   Icon: UserPlus },
  { to: '/dadosEstudante', label: 'Dados Estudante',  Icon: GraduationCap },
  { to: '/dadosPostais',   label: 'Dados Postais',    Icon: MapPin },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.brand} aria-label="Ir para a página inicial">
          <img src={logo} alt="Petshop Natalino — Projeto Web I" className={styles.logo} />
          <span className={styles.brandText}></span>
        </Link>

        <button
          type="button"
          className={styles.toggle}
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="primary-nav"
          onClick={() => setOpen(v => !v)}
        >
          {open ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
        </button>

        <nav
          id="primary-nav"
          className={`${styles.nav} ${open ? styles.navOpen : ''}`}
          aria-label="Navegação principal"
        >
          <ul className={styles.navList}>
            {NAV_ITEMS.map(({ to, label, Icon }) => (
              <li key={to} className={styles.navItem}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <Icon size={18} weight="duotone" className={styles.navIcon} aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} aria-hidden="true" />
      )}
    </header>
  );
}
