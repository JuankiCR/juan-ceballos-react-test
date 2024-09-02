import { Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import ProtectedRoute from './ui/ProtectedRoute';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import ProductCreate from './pages/ProductCreate';
import ProductEdit from './pages/ProductEdit';
import Users from './pages/Users';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      { /* ########## Public routes ########## */ }
      <Route path="/" element={ <Login /> } />
      <Route path="*" element={ <NotFound /> } />

      { /* ########## Protected routes ########## */ }
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/:id"
        element={
          <ProtectedRoute>
            <ProductDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products/edit/:id"
        element={
          <ProtectedRoute>
            <ProductEdit />
          </ProtectedRoute>
        }
      />
      <Route
        path="/product/create"
        element={
          <ProtectedRoute>
            <ProductCreate />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
