import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import styles from '../styles/ProductCreate.module.scss';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const products: Product[] = JSON.parse(storedProducts);
      const product = products.find((p) => p.id === parseInt(id ?? '', 10));

      if (product) {
        setTitle(product.title);
        setPrice(product.price.toString());
        setDescription(product.description);
        setCategory(product.category);
        setImage(product.image);
      } else {
        setError('Producto no encontrado');
      }
    }
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !category || !image) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      let products: Product[] = JSON.parse(storedProducts);
      const productIndex = products.findIndex((p) => p.id === parseInt(id ?? '', 10));

      if (productIndex !== -1) {
        products[productIndex] = {
          id: parseInt(id ?? '', 10),
          title,
          price: parseFloat(price),
          description,
          category,
          image,
        };

        localStorage.setItem('products', JSON.stringify(products));
        setSuccessMessage('Producto actualizado exitosamente.');
        setError(null);
        navigate('/products');
      } else {
        setError('Producto no encontrado para actualizar.');
      }
    }
  };

  return (
    <UserLayout>
      <div className={styles['create-product-container']}>
        <h1>Editar producto</h1>
        {error && <p className={styles['text-error']}>{error}</p>}
        {successMessage && <p className={styles['text-success']}>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label>Título:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Precio:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Descripción:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <label>Categoría:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && <img src={image} alt="Imagen del producto" />}
          </div>
          <button type="submit">Actualizar producto</button>
        </form>
      </div>
    </UserLayout>
  );
};

export default ProductEdit;
