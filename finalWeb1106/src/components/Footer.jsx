import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="font-bold text-base text-gray-900 dark:text-white">
              Mini<span className="text-orange-600">Shop</span>
            </span>
          </Link>

          {/* Links (Matching Design Board) */}
          <nav aria-label="Footer Navigation" className="flex items-center gap-6 text-xs text-gray-500 dark:text-gray-400">
            <Link to="/" className="hover:text-orange-600 dark:hover:text-white transition-colors">Home</Link>
            <Link to="/products" className="hover:text-orange-600 dark:hover:text-white transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-orange-600 dark:hover:text-white transition-colors">About</Link>
            <Link to="/admin" className="hover:text-orange-600 dark:hover:text-white transition-colors">Admin</Link>
            <Link to="/profile" className="hover:text-orange-600 dark:hover:text-white transition-colors">Profile</Link>
          </nav>

          {/* Copyright */}
          <p className="text-xs text-gray-400">
            &copy; 2026 MiniShop. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
