import { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint } from "@phosphor-icons/react";
import styles from "./Hero.module.css";

import caoNatal from "../../assets/cachorroCurioso.png";
import gatoCurioso from "../../assets/gatoCurioso.png";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const pets = [
    { id: "cao", image: caoNatal, label: "Cães" },
    { id: "gato", image: gatoCurioso, label: "Gatos" },
  ];

  const currentPet = pets[activeIndex];
  const isCat = currentPet.id === "gato";

  const handleToggle = () => setActiveIndex((prev) => (prev === 0 ? 1 : 0));

  return (
    <section className={styles.hero}>
      {/* A classe catActive fica na section inteira para podermos inverter os controles via CSS se precisarmos */}
      <div className={`${styles.wrapper} ${isCat ? styles.catActive : ""}`}>
        
        {/* METADE 1: TEXTO */}
        <div className={styles.textSide}>
          <div className={styles.textContent}>
            <h1 className={styles.title}>
              Seu novo amigo
              <br />
              <span className={styles.highlight}>com amor de Natal</span>
            </h1>
            <p className={styles.description}>
              Um petshop feito para cuidar do seu melhor amigo nesta data tão
              especial. Consulte nossos serviços, agende banhos e veja a
              previsão do tempo para um passeio perfeito.
            </p>

            {/* Agrupamento dos botões */}
            <div className={styles.actionButtons}>
              <Link to="/pets" className={styles.btnPrimary}>
                <PawPrint size={24} weight="fill" />
                Conhecer Pets
              </Link>
              
              {/* Botão da Patinha */}
              <button
                onClick={handleToggle}
                className={styles.pawBtn}
                aria-label="Trocar Pet"
              >
                <PawPrint size={24} weight="bold" />
              </button>
            </div>
          </div>
        </div>

        {/* METADE 2: IMAGEM */}
        <div className={styles.imageSide}>
          <div className={styles.imageContainer}>
            <div className={styles.bgCircle}></div>
            <img
              key={currentPet.id}
              src={currentPet.image}
              alt={currentPet.label}
              className={styles.mainImage}
            />
          </div>
        </div>
        
      </div>
    </section>
  );
}