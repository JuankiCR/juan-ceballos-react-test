import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product details');
        }
        const data = await response.json();
        setProduct(data);
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

    fetchProduct();
  }, [id]);

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
          src= { product.image }
          alt= { product.title }
          placeholderSrc= { product.image }
          className= { general['image-h-large'] }
        />
        <p><strong>Precio:</strong> ${product.price}</p>
        <p><strong>Categoría:</strong> {product.category}</p>
        <p><strong>Descripción:</strong> {product.description}</p>
      </div>
    </UserLayout>
  );
};

export default ProductDetail;
