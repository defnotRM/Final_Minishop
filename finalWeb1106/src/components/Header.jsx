import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag,
  ShoppingCart,
  User,
  LayoutDashboard,
  Sun,
  Moon,
  Menu,
  X,
  Search
} from 'lucide-react';

export default function Header() {
  const { totalItems } = useCart();
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('minishop_theme') === 'dark';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('minishop_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('minishop_theme', 'light');
    }
  }, [isDark]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(quickSearch.trim())}`);
      setQuickSearch('');
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'text-orange-600 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
        : 'text-gray-600 hover:text-orange-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
    }`;

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Mini<span className="text-orange-600">Shop</span>
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="ค้นหาสินค้า เช่น เสื้อผ้า, หูฟัง, นาฬิกา..."
              aria-label="Search products"
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 outline-none focus:border-orange-500 focus:bg-white dark:focus:bg-gray-900 transition-colors"
            />
          </form>

          {/* Desktop Nav */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-1">
            <NavLink to="/" className={navLinkClass} end>
              หน้าแรก
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              สินค้าทั้งหมด
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              เกี่ยวกับเรา
            </NavLink>
            <NavLink to="/admin" className={navLinkClass}>
              <span className="flex items-center gap-1.5">
                <LayoutDashboard className="w-4 h-4" />
                จัดการสินค้า
              </span>
            </NavLink>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              type="button"
              onClick={() => setIsDark(!isDark)}
              title={isDark ? 'เปิดโหมดสว่าง' : 'เปิดโหมดมืด'}
              aria-label="Toggle Theme"
              className="p-2 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Cart Icon */}
            <Link
              to="/cart"
              aria-label={`ตะกร้าสินค้า ${totalItems} ชิ้น`}
              className="relative p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-orange-600 text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Profile Link */}
            <Link
              to="/profile"
              title="โปรไฟล์ผู้ใช้"
              aria-label="User Profile"
              className="p-2 rounded-lg text-gray-700 hover:text-orange-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800 transition-colors"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 space-y-1">
          <form onSubmit={handleSearchSubmit} className="mb-3 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              placeholder="ค้นหาสินค้า..."
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 placeholder-gray-400"
            />
          </form>

          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-200'
              }`
            }
            end
          >
            หน้าแรก
          </NavLink>
          <NavLink
            to="/products"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-200'
              }`
            }
          >
            สินค้าทั้งหมด
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-200'
              }`
            }
          >
            เกี่ยวกับเรา
          </NavLink>
          <NavLink
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-200'
              }`
            }
          >
            <span>ตะกร้าสินค้า</span>
            {totalItems > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs bg-orange-600 text-white font-bold">
                {totalItems}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/profile"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-gray-700 dark:text-gray-200'
              }`
            }
          >
            โปรไฟล์
          </NavLink>
          <NavLink
            to="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium ${
                isActive ? 'text-orange-600 bg-orange-50 dark:bg-gray-800 font-semibold' : 'text-orange-600 dark:text-orange-400'
              }`
            }
          >
            <LayoutDashboard className="w-4 h-4" />
            หน้าจัดการสินค้า
          </NavLink>
        </div>
      )}
    </header>
  );
}
