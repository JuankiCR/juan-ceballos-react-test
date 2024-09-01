import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      { /* ########## Public routes ########## */ }
      <Route path="/" element={ <Login /> } />
      <Route path="*" element={ <NotFound /> } />
      
      { /* ########## Protected routes ########## */ }
      <Route path="/users" element={ <Users /> } />
      <Route path="/products" element={ <Products /> } />
      <Route path="/products/:id" element={ <ProductDetail /> } />
      <Route path="/product/create" element={ <ProductCreate /> } />
    </Routes>
  );
}

export default App;
