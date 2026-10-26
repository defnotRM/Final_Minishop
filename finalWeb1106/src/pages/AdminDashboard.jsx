import React, { useState, useMemo } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import SummaryCards from '../components/SummaryCards';
import AddProductModal from '../components/AddProductModal';
import {
  Plus,
  Trash2,
  Search,
  RefreshCw,
  TrendingUp,
  Package,
  ShoppingCart,
  Users,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const {
    products,
    deleteProduct,
    updateProduct,
    dataSource,
    fetchProductsFromApi,
    switchToMockData,
    categories
  } = useProducts();

  const { orders } = useCart();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [tableCategory, setTableCategory] = useState('All');

  // Filtered products for management table
  const filteredTableProducts = useMemo(() => {
    return products.filter((p) => {
      const nameMatch = (p.name || p.title || '').toLowerCase().includes(tableSearch.toLowerCase());
      const catMatch = tableCategory === 'All' || (p.category && p.category.toLowerCase() === tableCategory.toLowerCase());
      return nameMatch && catMatch;
    });
  }, [products, tableSearch, tableCategory]);

  const handleInlineStockUpdate = (id, newStock) => {
    const val = parseInt(newStock, 10);
    if (!isNaN(val) && val >= 0) {
      updateProduct(id, { stock: val });
    }
  };

  return (
    <main className="min-h-screen py-6 bg-gray-50/50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Dashboard Top Header (Matching Screen 5) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Mode switch */}
            <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-0.5 text-xs">
              <button
                type="button"
                onClick={fetchProductsFromApi}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  dataSource === 'api'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-orange-600'
                }`}
              >
                API
              </button>
              <button
                type="button"
                onClick={switchToMockData}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                  dataSource === 'mock'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:text-orange-600'
                }`}
              >
                Mock
              </button>
            </div>

            {/* Add Product Button */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Top 4 Stat Cards (Matching Screen 5) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Total Products</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{products.length}</span>
              <span className="text-[11px] font-medium text-emerald-600">+2 new</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Total Orders</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length + 18}</span>
              <span className="text-[11px] font-medium text-emerald-600">+3 today</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Total Revenue</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${(1254 + orders.reduce((s, o) => s + (Number(o.total) || 0), 0)).toFixed(2)}
              </span>
              <span className="text-[11px] font-medium text-emerald-600">+12%</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 block">Total Users</span>
            <div className="mt-2 flex items-baseline justify-between">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">8</span>
              <span className="text-[11px] font-medium text-emerald-600">+1 new</span>
            </div>
          </div>
        </div>

        {/* Inventory Summary (3 Metrics Required for Assignment) */}
        <div className="mb-6">
          <SummaryCards />
        </div>

        {/* Middle Section: Sales Overview Line Chart & Recent Orders (Matching Screen 5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">

          {/* Sales Overview Chart (60%) */}
          <div className="lg:col-span-7 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Sales Overview
              </h2>
              <span className="text-xs text-gray-500 border border-gray-200 dark:border-gray-700 rounded-md px-2 py-1">
                This Week ▾
              </span>
            </div>

            {/* SVG Line Chart */}
            <div className="relative h-56 w-full pt-2">
              <svg className="w-full h-full" viewBox="0 0 500 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ea580c" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#ea580c" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid Lines */}
                <line x1="30" y1="20" x2="490" y2="20" stroke="#e5e7eb" strokeDasharray="3 3" />
                <line x1="30" y1="65" x2="490" y2="65" stroke="#e5e7eb" strokeDasharray="3 3" />
                <line x1="30" y1="110" x2="490" y2="110" stroke="#e5e7eb" strokeDasharray="3 3" />
                <line x1="30" y1="155" x2="490" y2="155" stroke="#e5e7eb" strokeDasharray="3 3" />

                {/* Y-axis Labels */}
                <text x="5" y="24" fontSize="10" fill="#9ca3af">800</text>
                <text x="5" y="69" fontSize="10" fill="#9ca3af">600</text>
                <text x="5" y="114" fontSize="10" fill="#9ca3af">400</text>
                <text x="5" y="159" fontSize="10" fill="#9ca3af">200</text>

                {/* Gradient Area */}
                <polygon
                  fill="url(#chartFill)"
                  points="50,140 115,120 180,135 250,95 320,110 390,75 460,40 460,170 50,170"
                />

                {/* Line Path */}
                <polyline
                  fill="none"
                  stroke="#ea580c"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  points="50,140 115,120 180,135 250,95 320,110 390,75 460,40"
                />

                {/* Dots */}
                {[[50,140],[115,120],[180,135],[250,95],[320,110],[390,75],[460,40]].map(([cx, cy], i) => (
                  <circle
                    key={i}
                    cx={cx}
                    cy={cy}
                    r="4"
                    fill="#ea580c"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}

                {/* X-axis Labels */}
                <text x="40" y="188" fontSize="10" fill="#9ca3af">Mon</text>
                <text x="105" y="188" fontSize="10" fill="#9ca3af">Tue</text>
                <text x="170" y="188" fontSize="10" fill="#9ca3af">Wed</text>
                <text x="240" y="188" fontSize="10" fill="#9ca3af">Thu</text>
                <text x="310" y="188" fontSize="10" fill="#9ca3af">Fri</text>
                <text x="380" y="188" fontSize="10" fill="#9ca3af">Sat</text>
                <text x="450" y="188" fontSize="10" fill="#9ca3af">Sun</text>
              </svg>
            </div>
          </div>

          {/* Recent Orders Table (40%) (Matching Screen 5) */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <Link to="/profile" className="text-xs font-medium text-orange-600 hover:underline">
                View All &rarr;
              </Link>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 text-gray-400">
                    <th className="py-2 px-2 font-medium">Order #</th>
                    <th className="py-2 px-2 font-medium">Customer</th>
                    <th className="py-2 px-2 font-medium text-right">Total</th>
                    <th className="py-2 px-2 font-medium text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                  {[
                    { id: '#000124', customer: 'John Doe', total: '$109.95', status: 'Delivered', color: 'bg-green-100 text-green-700' },
                    { id: '#000123', customer: 'Jane Smith', total: '$79.99', status: 'Processing', color: 'bg-amber-100 text-amber-700' },
                    { id: '#000122', customer: 'Mike Johnson', total: '$48.00', status: 'Shipped', color: 'bg-blue-100 text-blue-700' },
                    { id: '#000121', customer: 'Sarah Lee', total: '$115.00', status: 'Pending', color: 'bg-gray-100 text-gray-700' },
                    { id: '#000120', customer: 'David Kim', total: '$69.99', status: 'Delivered', color: 'bg-green-100 text-green-700' },
                  ].map((row) => (
                    <tr key={row.id}>
                      <td className="py-2.5 px-2 font-medium text-gray-900 dark:text-white">{row.id}</td>
                      <td className="py-2.5 px-2 text-gray-600 dark:text-gray-300">{row.customer}</td>
                      <td className="py-2.5 px-2 text-right font-medium text-gray-900 dark:text-white">{row.total}</td>
                      <td className="py-2.5 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${row.color}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Top Products Row (Matching Screen 5) */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm mb-6">
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-4">
            Top Products
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {products.slice(0, 4).map((p, index) => (
              <div key={p.id} className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 dark:bg-gray-900/40 border border-gray-100 dark:border-gray-800">
                <img
                  src={p.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'}
                  alt={p.name || p.title}
                  className="w-12 h-12 object-contain rounded-md bg-white p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                    {p.name || p.title}
                  </p>
                  <p className="text-xs font-bold text-orange-600">
                    ${Number(p.price).toFixed(2)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {120 - index * 22} sold
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Management Table (Requirement: View, Add, Edit Stock, Delete) */}
        <section className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          {/* Table Header Controls */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                ตารางจัดการสินค้าคงคลัง (Product Management)
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                จัดการรายการสินค้า อัปเดตสต็อกคงเหลือ และลบสินค้าออกจากระบบ
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  placeholder="ค้นหาในตาราง..."
                  className="pl-8 pr-3 py-1.5 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>

              <select
                value={tableCategory}
                onChange={(e) => setTableCategory(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 capitalize"
              >
                <option value="All">All Categories</option>
                {categories.filter(c => c !== 'All Categories').map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                <tr>
                  <th className="py-3 px-4 font-semibold">ID</th>
                  <th className="py-3 px-4 font-semibold">Product</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Stock</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                {filteredTableProducts.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="py-8 text-center text-gray-400">
                      ไม่พบข้อมูลสินค้า
                    </td>
                  </tr>
                ) : (
                  filteredTableProducts.map((product) => {
                    const isOutOfStock = Number(product.stock) <= 0;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50/60 dark:hover:bg-gray-750">
                        <td className="py-3 px-4 font-mono font-medium text-gray-400">
                          #{product.id}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'}
                              alt={product.name || product.title}
                              className="w-9 h-9 rounded-md bg-white object-contain p-1 border border-gray-200 dark:border-gray-700 flex-shrink-0"
                            />
                            <div className="max-w-xs">
                              <Link
                                to={`/products/${product.id}`}
                                className="font-medium text-gray-900 dark:text-white hover:text-orange-600 line-clamp-1"
                              >
                                {product.name || product.title}
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-gray-600 dark:text-gray-300">
                          {product.category || 'General'}
                        </td>
                        <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                          ${Number(product.price).toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <input
                            type="number"
                            min="0"
                            value={product.stock}
                            onChange={(e) => handleInlineStockUpdate(product.id, e.target.value)}
                            className="w-16 px-2 py-1 text-xs rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                          />
                        </td>
                        <td className="py-3 px-4">
                          {isOutOfStock ? (
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`ต้องการลบสินค้า "${product.name || product.title}" หรือไม่?`)) {
                                deleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded transition-colors"
                            title="Delete product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="p-3 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-200 dark:border-gray-700 text-[11px] text-gray-500 flex justify-between items-center">
            <span>แสดง {filteredTableProducts.length} จาก {products.length} รายการ</span>
            <span>* ยอดสรุปด้านบนจะคำนวณใหม่ทันทีเมื่อมีการเพิ่มหรือลบสินค้า</span>
          </div>
        </section>

      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </main>
  );
}
