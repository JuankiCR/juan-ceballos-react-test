import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import UserLayout from '../layouts/UserLayout';
import Image from '../components/Image';
import styles from '../styles/ProductDetail.module.scss';
import general from './AllPages.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductFromLocal = () => {
      try {
        const storedProducts = localStorage.getItem('products');
        
        if (!storedProducts || storedProducts === 'undefined' || storedProducts === 'null') {
          throw new Error('No products found in local storage');
        }

        const products: Product[] = JSON.parse(storedProducts);

        if (!Array.isArray(products) || products.length === 0) {
          throw new Error('Invalid product data in local storage');
        }

        const productFound = products.find((p) => p.id === parseInt(id ?? '', 10));

        if (!productFound) {
          navigate('/404');
          return;
        }

        setProduct(productFound);
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

    fetchProductFromLocal();
  }, [id]);

  const handleDelete = () => {
    if (!product) return;

    const storedProducts = localStorage.getItem('products');
    if (!storedProducts) return;

    const products: Product[] = JSON.parse(storedProducts);
    const updatedProducts = products.filter((p) => p.id !== product.id);

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    navigate('/products');
  };

  const handleEdit = () => {
    navigate(`/products/edit/${product?.id}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!product) {
    return <p>No se encontró el producto.</p>;
  }

  return (
    <UserLayout>
      <div className={styles['product-detail-container']}>
        <h1>{product.title}</h1>
        <Image
          src={product.image}
          alt={product.title}
          placeholderSrc={product.image}
          className={general['image-h-large']}
        />
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Descripción:</strong> {product.description}</p>

        <div className={styles['button-group']}>
          <button className={general['ok-button']} onClick={handleEdit}>Editar</button>
          <button className={general['cancel-button']} onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </UserLayout>
  );
};

export default ProductDetail;
