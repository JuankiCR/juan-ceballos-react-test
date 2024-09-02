import React from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Layout from '../layouts/FullLayout';
import Image from '../components/Image';

import general from './AllPages.module.scss';
import styles from '../styles/NotFound.module.scss';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    navigate('/');
  }

  const phrases = 
  [
    "¿Estás buscando fantasmas? Porque esta página ya no está entre los vivos.",
    "Oops... Parece que esta página se ha desvanecido como un fantasma.",
    "¡Buu! No te asustes, solo estamos perdidos en el ciberespacio.",
    "Esta página se ha ido al otro mundo digital.",
    "¿Buscando una página? Esta ha decidido tomarse unas vacaciones permanentes.",
    "¡Cuidado! Esta página parece estar embrujada."
  ]

  const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
  
  return (
    <Layout>
      <div className={ clsx(general['full-page-wrapper'], styles['not-found-wrapper']) }>
        
        <h1 className={ styles['not-found-title'] }> { randomPhrase } </h1>
      
        <Image
          src="/assets/decorative/notfound.png"
          alt="Imagen no encontrada"
          placeholderSrc="/assets/decorative/notfound.png"
          className={ clsx(general['image-h-large'], general['image-float']) }
        />

        <button className={ clsx(general['primary-button'], styles['not-found-button']) } onClick={ handleReturn }>
          Regresar
        </button>

      </div>
    </Layout>
  );
};

export default NotFound;
