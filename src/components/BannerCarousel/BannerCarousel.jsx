import { useRef } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import styles from './BannerCarousel.module.css';

import banner1 from '../../assets/carrossel/banner1.png';
import banner2 from '../../assets/carrossel/banner2.png';
import banner3 from '../../assets/carrossel/banner3.png';

const originalBanners = [
  { id: 1, image: banner1, alt: 'Promoção de Banho e Tosa' },
  { id: 2, image: banner2, alt: 'Descontos em Ração de Natal' },
  { id: 3, image: banner3, alt: 'Brinquedos e Presentes' }
];

// Duplicamos a lista para dar a ilusão de infinito
const banners = [...originalBanners, ...originalBanners];

export default function BannerCarousel() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      const scrollAmount = clientWidth;

      if (direction === 'right') {
        // Se estiver no último item da primeira metade, volta pro início suavemente
        if (scrollLeft >= scrollWidth - clientWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      } else {
        // Se estiver no início, vai pro final
        if (scrollLeft <= 10) {
          scrollRef.current.scrollTo({ left: scrollWidth - clientWidth, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <section className={styles.carouselSection}>
      <div className={styles.navControls}>
        <button onClick={() => scroll('left')} className={styles.arrowBtn} aria-label="Anterior">
          <CaretLeft size={32} weight="bold" />
        </button>
        <button onClick={() => scroll('right')} className={styles.arrowBtn} aria-label="Próximo">
          <CaretRight size={32} weight="bold" />
        </button>
      </div>

      <div className={styles.carouselWrapper}>
        <div className={styles.carouselTrack} ref={scrollRef}>
          {banners.map((banner, index) => (
            <div key={`${banner.id}-${index}`} className={styles.bannerCard}>
              <img src={banner.image} alt={banner.alt} className={styles.bannerImage} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}