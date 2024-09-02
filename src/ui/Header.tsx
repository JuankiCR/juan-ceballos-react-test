import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img src="/assets/logos/logo192.png" alt="Logo" />
        </Link>
        <h1>jCeballos | React Test</h1>
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
        <button>Salir</button>
      </div>
    </header>
  );
};

export default Header;
