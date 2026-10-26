import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import {
  Star,
  ChevronRight,
  ArrowLeft,
  Check,
  AlertCircle
} from 'lucide-react';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [activeTab, setActiveTab] = useState('description');

  const product = products.find(p => String(p.id) === String(id));

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">ไม่พบข้อมูลสินค้า</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            สินค้านี้อาจถูกลบหรือไม่มีอยู่ในระบบ
          </p>
          <Link
            to="/products"
            className="mt-5 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 text-white text-xs font-medium hover:bg-orange-700 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            กลับไปหน้าร้านค้า
          </Link>
        </div>
      </main>
    );
  }

  const isOutOfStock = Number(product.stock) <= 0;
  const ratingRate = product.rating?.rate !== undefined ? Number(product.rating.rate) : 4.5;
  const ratingCount = product.rating?.count !== undefined ? Number(product.rating.count) : 0;

  // 4 Related products in the same category
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
    }
  };

  const handleBuyNow = () => {
    if (!isOutOfStock) {
      addToCart(product, quantity);
      navigate('/cart');
    }
  };

  const colors = [
    { name: 'Black', bg: 'bg-gray-900' },
    { name: 'Blue', bg: 'bg-blue-600' },
    { name: 'Red', bg: 'bg-rose-600' },
    { name: 'Green', bg: 'bg-emerald-600' },
  ];

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Navigation (Matching Screen 2) */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <Link to="/products" className="hover:text-orange-600">Products</Link>
          <ChevronRight className="w-3 h-3 text-gray-400" />
          <span className="text-gray-800 dark:text-gray-200 font-medium truncate max-w-sm">
            {product.name || product.title}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 sm:p-8 shadow-sm mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left: Thumbnails + Main Image (Screen 2 structure) */}
            <div className="lg:col-span-6 flex flex-col-reverse sm:flex-row gap-4 items-start">
              {/* Vertical thumbnail list */}
              <div className="flex sm:flex-col gap-2.5">
                {[0, 1, 2, 3].map((idx) => (
                  <div
                    key={idx}
                    className="w-14 h-14 rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 hover:border-orange-500 cursor-pointer"
                  >
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'}
                      alt={`Thumb ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 w-full aspect-square rounded-xl bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-700 p-8 flex items-center justify-center">
                <img
                  src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80'}
                  alt={product.name || product.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </div>

            {/* Right: Info & Purchase Controls */}
            <div className="lg:col-span-6 flex flex-col justify-start">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white leading-snug">
                {product.name || product.title}
              </h1>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-orange-600 dark:text-orange-400">
                  ${Number(product.price).toFixed(2)}
                </span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="ml-1 font-semibold text-gray-800 dark:text-gray-200">
                    {ratingRate.toFixed(1)}
                  </span>
                </div>
                <span>({ratingCount} reviews)</span>
              </div>

              {/* Short description */}
              <p className="mt-4 text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description || 'A classic, durable product designed for everyday comfort, utility, and modern lifestyle.'}
              </p>

              {/* Category */}
              <div className="mt-5 text-xs text-gray-500 dark:text-gray-400">
                <span>Category: </span>
                <span className="font-medium text-orange-600 dark:text-orange-400 capitalize">
                  {product.category}
                </span>
              </div>

              {/* Color Selector */}
              <div className="mt-5">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Color:
                </span>
                <div className="flex items-center gap-2">
                  {colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-6 h-6 rounded-full ${c.bg} flex items-center justify-center transition-transform ${
                        selectedColor === c.name ? 'ring-2 ring-offset-2 ring-orange-500 scale-110' : 'hover:scale-105'
                      }`}
                      title={c.name}
                    >
                      {selectedColor === c.name && <Check className="w-3 h-3 text-white" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper */}
              <div className="mt-6">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300 block mb-2">
                  Quantity:
                </span>
                <div className="inline-flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                  <button
                    type="button"
                    disabled={quantity <= 1 || isOutOfStock}
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm disabled:opacity-30"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold text-gray-900 dark:text-white min-w-[36px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    disabled={isOutOfStock || quantity >= product.stock}
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm disabled:opacity-30"
                  >
                    +
                  </button>
                </div>
                <span className="ml-3 text-xs text-gray-400">
                  {isOutOfStock ? '(หมดสต็อก)' : `(คงเหลือ ${product.stock} ชิ้น)`}
                </span>
              </div>

              {/* Action Buttons: Add to Cart & Buy Now (Matching Screen 2) */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-2.5 px-5 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
                    isOutOfStock
                      ? 'bg-gray-200 text-gray-400 dark:bg-gray-700 cursor-not-allowed'
                      : 'bg-orange-600 hover:bg-orange-700 text-white shadow-sm'
                  }`}
                >
                  {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="flex-1 py-2.5 px-5 rounded-lg text-xs sm:text-sm font-semibold border border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950/30 transition-colors disabled:opacity-50"
                >
                  Buy Now
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Tabbed Info Box (Matching Screen 2) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 mb-12 shadow-sm">
          <div className="flex border-b border-gray-200 dark:border-gray-700 gap-6 mb-6">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'description'
                  ? 'border-orange-600 text-orange-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab('specifications')}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'specifications'
                  ? 'border-orange-600 text-orange-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-xs sm:text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'reviews'
                  ? 'border-orange-600 text-orange-600 font-semibold'
                  : 'border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
            >
              Reviews
            </button>
          </div>

          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            {activeTab === 'description' && (
              <ul className="space-y-2 list-disc list-inside">
                <li>Made from durable high-quality materials built to last.</li>
                <li>Large storage compartment with dedicated padded sleeve.</li>
                <li>Adjustable ergonomic shoulder straps for all-day comfort.</li>
                <li>Modern styling combined with practical functional design.</li>
              </ul>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-400 block">Product ID</span>
                  <span className="font-medium text-gray-900 dark:text-white mt-0.5 block">MINI-{product.id}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-400 block">Category</span>
                  <span className="font-medium text-gray-900 dark:text-white mt-0.5 block capitalize">{product.category}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-400 block">Available Stock</span>
                  <span className="font-medium text-gray-900 dark:text-white mt-0.5 block">{product.stock} units</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                  <span className="text-gray-400 block">Warranty</span>
                  <span className="font-medium text-gray-900 dark:text-white mt-0.5 block">1 Year Official Warranty</span>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900 dark:text-white">{ratingRate.toFixed(1)} / 5.0</span>
                  <span className="text-gray-400">({ratingCount} verified buyer reviews)</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-xs">
                  <p className="font-medium text-gray-900 dark:text-white">Alex M. - ★★★★★</p>
                  <p className="text-gray-500 mt-1">ได้รับสินค้าตรงตามรูป แพ็คเกจดี จัดส่งรวดเร็วมากครับ</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* You may also like (Matching Screen 2) */}
        {relatedProducts.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              You may also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map(rel => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
