import React, { useState } from 'react';
import UserLayout from '../layouts/UserLayout';
import styles from '../styles/ProductCreate.module.scss';

const ProductCreate: React.FC = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const generateUniqueId = (products: any[]) => {
    const ids = products.map(product => product.id);
    const maxId = Math.max(0, ...ids);
    return maxId + 1;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !price || !description || !category || !image) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          description,
          image,
          category,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al crear el producto.');
      }

      let newProduct = await response.json();

      const storedProducts = localStorage.getItem('products');
      let products = storedProducts ? JSON.parse(storedProducts) : [];

      const existingProduct = products.find((product: any) => product.id === newProduct.id);
      if (existingProduct) {
        newProduct.id = generateUniqueId(products);
      }

      products.push(newProduct);

      localStorage.setItem('products', JSON.stringify(products));

      setTitle('');
      setPrice('');
      setDescription('');
      setCategory('');
      setImage(null);
      setError(null);
      setSuccessMessage('Producto creado y almacenado exitosamente.');
    } catch (error) {
      setError('Hubo un error al crear el producto. Inténtalo de nuevo más tarde.');
    }
  };

  return (
    <UserLayout>
      <div className={styles['create-product-container']}>
        <h1>Crear nuevo producto</h1>
        {error && <p className= {styles['text-error']} >{error}</p>}
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
              required
            />
            {image && <img src={image} alt="Imagen del producto" />}
          </div>
          <button type="submit">Crear producto</button>
        </form>
      </div>
    </UserLayout>
  );
};

export default ProductCreate;
