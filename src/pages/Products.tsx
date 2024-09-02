import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import styles from '../styles/Products.module.scss';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
      localStorage.setItem('products', JSON.stringify(data)); 
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

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  const handleReloadProducts = () => {
    setLoading(true);
    fetchProducts();
  };

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
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

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

  const handleProductsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProductsPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <UserLayout>
      <div className={styles['products-container']}>
        <div className={styles['title-wrapper']}>
          <h1>Productos</h1>

          <button onClick={handleReloadProducts}>
            Actualizar productos desde la API
          </button>

        </div>

        <input
          type="text"
          placeholder="Buscar productos"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className={styles['items-per-page']}>
          <label htmlFor="productsPerPage">Productos por página:</label>
          <select
            id="productsPerPage"
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
          >
            <option value={2}>2</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

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

        <div className={styles['pagination-controls']}>
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
              className={number === currentPage ? styles['active'] : ''}
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
      </div>
    </UserLayout>
  );
};

export default Products;
