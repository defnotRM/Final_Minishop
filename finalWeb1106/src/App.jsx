import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-900 dark:text-slate-100 transition-colors duration-200">
            {/* Semantic Header with Navigation */}
            <Header />

            {/* Main Application Routes */}
            <div className="flex-1">
              <Routes>
                {/* 1. Home / หน้าแรก */}
                <Route path="/" element={<HomePage />} />
                
                {/* 2. Products / หน้าแสดงรายการสินค้า */}
                <Route path="/products" element={<ProductsPage />} />
                
                {/* 3. Product Detail / หน้ารายละเอียดสินค้า */}
                <Route path="/products/:id" element={<ProductDetailPage />} />
                
                {/* 4. Cart / หน้าตะกร้าสินค้า */}
                <Route path="/cart" element={<CartPage />} />
                
                {/* 5. Profile / หน้าโปรไฟล์ผู้ใช้ */}
                <Route path="/profile" element={<ProfilePage />} />
                
                {/* 6. Admin Dashboard / หน้าจัดการสินค้า */}
                <Route path="/admin" element={<AdminDashboard />} />
                
                {/* 7. About / หน้าเกี่ยวกับเรา */}
                <Route path="/about" element={<AboutPage />} />

                {/* Fallback route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>

            {/* Semantic Footer */}
            <Footer />

            {/* Notification Toast */}
            <Toast />
          </div>
        </BrowserRouter>
      </CartProvider>
    </ProductProvider>
  );
}
