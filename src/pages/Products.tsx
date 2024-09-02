import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(2);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según el término de búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortConfig !== null) {
      const sortKey = sortConfig.key as keyof typeof a;
      if (a[sortKey] < b[sortKey]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortKey] > b[sortKey]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Generar el rango de páginas a mostrar
  const pageNumbers = [];
  const maxPageNumbersToShow = 5;
  const halfRange = Math.floor(maxPageNumbersToShow / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  if (currentPage <= halfRange) {
    endPage = Math.min(totalPages, maxPageNumbersToShow);
  } else if (currentPage + halfRange >= totalPages) {
    startPage = Math.max(1, totalPages - maxPageNumbersToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <UserLayout>
      <h1>Productos</h1>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar productos"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <table>
        <thead>
          <tr>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort('id')}
                className={getClassNamesFor('id')}
              >
                ID
              </button>
            </th>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort('title')}
                className={getClassNamesFor('title')}
              >
                Título
              </button>
            </th>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort('price')}
                className={getClassNamesFor('price')}
              >
                Precio
              </button>
            </th>
            <th>
              <button 
                type="button" 
                onClick={() => requestSort('category')}
                className={getClassNamesFor('category')}
              >
                Categoría
              </button>
            </th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <button onClick={() => navigate(`/products/${product.id}`)}>
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Controles de paginación */}
      <div>
        <button 
          onClick={() => setCurrentPage(1)} 
          disabled={currentPage === 1}
        >
          Primero
        </button>
        <button 
          onClick={() => setCurrentPage(currentPage - 1)} 
          disabled={currentPage === 1}
        >
          Anterior
        </button>
        {startPage > 1 && <span>…</span>}
        {pageNumbers.map(number => (
          <button 
            key={number} 
            onClick={() => setCurrentPage(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        {endPage < totalPages && <span>…</span>}
        <button 
          onClick={() => setCurrentPage(currentPage + 1)} 
          disabled={currentPage === totalPages}
        >
          Siguiente
        </button>
        <button 
          onClick={() => setCurrentPage(totalPages)} 
          disabled={currentPage === totalPages}
        >
          Último
        </button>
      </div>
    </UserLayout>
  );
};

export default Products;
