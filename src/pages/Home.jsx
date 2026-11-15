import Hero from '../components/Hero/Hero.jsx';
import BannerCarousel from '../components/BannerCarousel/BannerCarousel.jsx';
import ServiceCards from '../components/ServiceCards/ServiceCards.jsx';


export default function Home() {
  return (
    <>
      <Hero />
      <BannerCarousel />
      <ServiceCards />

    </>
  );
}