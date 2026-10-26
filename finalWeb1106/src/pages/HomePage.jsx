import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import SummaryCards from '../components/SummaryCards';

// High-resolution local hero assets (1000px - 1600px Ultra HD)
import heroSneaker from '../assets/hero-sneaker.jpg';
import heroHeadphones from '../assets/hero-headphones.jpg';
import heroCamera from '../assets/hero-camera.jpg';

import {
  ArrowRight,
  Tv,
  Shirt,
  Gem,
  Headphones,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';

export default function HomePage() {
  const { products, loading } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);
  const navigate = useNavigate();

  // Curated Ultra-Clear High-Resolution Featured Hero Products
  const heroShowcases = [
    {
      id: 'sneaker',
      name: "Nike Air Max Sport '07",
      category: "Special Edition",
      tag: "Trending • 35% OFF",
      price: 115.00,
      origPrice: 165.00,
      image: heroSneaker,
    },
    {
      id: 'headphones',
      name: "Sony Pro Noise-Cancelling",
      category: "Wireless Audio",
      tag: "Best Seller • Hot Deal",
      price: 199.99,
      origPrice: 249.00,
      image: heroHeadphones,
    },
    {
      id: 'camera',
      name: "Polaroid OneStep 2 Instant",
      category: "Classic Photo",
      tag: "New Arrival",
      price: 129.50,
      origPrice: 149.00,
      image: heroCamera,
    },
  ];

  const currentHero = heroShowcases[activeHeroIdx];

  // Highlight categories matching Design Board Screen 1
  const categoryTiles = [
    {
      id: 'electronics',
      label: 'Electronics',
      icon: <Tv className="w-6 h-6" />,
      colorClass: 'bg-blue-50 hover:bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-900',
    },
    {
      id: 'jewelery',
      label: 'Jewelery',
      icon: <Gem className="w-6 h-6" />,
      colorClass: 'bg-amber-50 hover:bg-amber-100 text-amber-600 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900',
    },
    {
      id: "men's clothing",
      label: "Men's Clothing",
      icon: <Shirt className="w-6 h-6" />,
      colorClass: 'bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-950/40 dark:text-cyan-300 dark:border-cyan-900',
    },
    {
      id: "women's clothing",
      label: "Women's Clothing",
      icon: <Shirt className="w-6 h-6" />,
      colorClass: 'bg-pink-50 hover:bg-pink-100 text-pink-600 border-pink-200 dark:bg-pink-950/40 dark:text-pink-300 dark:border-pink-900',
    },
    {
      id: 'Accessories',
      label: 'Accessories',
      icon: <Headphones className="w-6 h-6" />,
      colorClass: 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900',
    },
  ];

  const handleCategoryClick = (catId) => {
    navigate(`/products?category=${encodeURIComponent(catId)}`);
  };

  const featured = products.slice(0, 8);

  return (
    <main className="min-h-screen pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Hero Banner (Ultra-Clear High-Resolution Showcase) */}
        <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-6 sm:p-10 mb-10 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6 z-10">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4 leading-tight">
                Welcome to MiniShop
              </h1>
              <p className="text-base sm:text-lg text-orange-50 mb-6 max-w-md">
                Discover the best products with great prices and fast delivery.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-orange-600 font-semibold text-sm hover:bg-orange-50 shadow-sm transition-colors"
                >
                  <span>Shop Now</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600/30 hover:bg-orange-600/50 text-white font-medium text-sm border border-white/30 transition-colors"
                >
                  <span>View Catalog</span>
                </Link>
              </div>
            </div>

            {/* Right Showcase: Ultra-Sharp HD Product Card */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-sm sm:max-w-md bg-white dark:bg-gray-800 rounded-2xl p-3 sm:p-3.5 shadow-2xl border border-white/40 dark:border-gray-700 text-gray-900 dark:text-white">
                
                {/* Product Image Display */}
                <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
                  <img
                    src={currentHero.image}
                    alt={currentHero.name}
                    loading="eager"
                    className="w-full h-full object-cover object-center transition-all duration-300 hover:scale-105"
                  />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-600 text-white shadow-md">
                    {currentHero.tag}
                  </span>
                </div>

                {/* Product Info Bar */}
                <div className="mt-3 px-1 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-gray-400 font-medium block">{currentHero.category}</span>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white">{currentHero.name}</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-gray-400 line-through mr-1.5">${currentHero.origPrice.toFixed(2)}</span>
                    <span className="text-base font-extrabold text-orange-600 dark:text-orange-400">${currentHero.price.toFixed(2)}</span>
                  </div>
                </div>

                {/* Thumbnails Switcher */}
                <div className="mt-3 pt-2.5 border-t border-gray-100 dark:border-gray-700/60 flex items-center justify-center gap-2">
                  {heroShowcases.map((item, idx) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveHeroIdx(idx)}
                      className={`w-11 h-11 rounded-lg overflow-hidden border-2 transition-all ${
                        activeHeroIdx === idx
                          ? 'border-orange-600 scale-105 shadow-sm'
                          : 'border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100'
                      }`}
                      title={item.name}
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* Featured Products Section (Matching Screen 1) */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Featured Products
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                สินค้ายอดนิยมที่คัดสรรมาเพื่อคุณโดยเฉพาะ
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700 dark:text-orange-400"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="py-16 text-center">
              <div className="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-gray-500">กำลังโหลดรายการสินค้า...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* Category Tiles (Matching Screen 1 5-Col Grid) */}
        <section className="mb-12">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            หมวดหมู่สินค้า (Categories)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {categoryTiles.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`flex flex-col items-center justify-center p-5 rounded-xl border text-center transition-all duration-150 cursor-pointer ${cat.colorClass}`}
              >
                <div className="mb-2">
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold">
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Dashboard Summary Section */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                สรุปข้อมูลคลังสินค้า (Dashboard Summary)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ข้อมูลสถานะสินค้าและมูลค่าคลังสินค้าปัจจุบัน
              </p>
            </div>
            <Link
              to="/admin"
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
            >
              เปิดระบบจัดการสินค้า <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <SummaryCards />
        </section>

      </div>
    </main>
  );
}
