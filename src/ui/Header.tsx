import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.scss';
import general from '../pages/AllPages.module.scss';

const Header: React.FC = () => {
  return (
    <header className={ styles.navbar }>
      <div>
        <Link to="/">
          <img src="/assets/logos/logo192.png" alt="Logo" />
        </Link>
        <h1>React Test | jceballos</h1>
      </div>
      
      <nav>
        <ul>
          <li>
            <Link to="/products">Productos</Link>
          </li>
          <li>
            <Link to="/product/create">Agregar productos</Link>
          </li>
        </ul>
      </nav>
      
      <div>
        <button className={ general['cancel-button'] }>Salir</button>
      </div>
    </header>
  );
};

export default Header;
