import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import {
  Search,
  LayoutGrid,
  List,
  AlertCircle,
  Plus,
  RefreshCw,
  X,
  PackageX
} from 'lucide-react';

export default function ProductsPage() {
  const { products, loading, error, categories, fetchProductsFromApi, switchToMockData, deleteProduct } = useProducts();
  const [searchParams, setSearchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const query = searchParams.get('search');
    if (query !== null) {
      setSearchQuery(query);
    }
    const cat = searchParams.get('category');
    if (cat !== null) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter & sort
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const productName = (product.name || product.title || '').toLowerCase();
      const matchSearch = searchQuery.trim() === '' || productName.includes(searchQuery.trim().toLowerCase());

      const matchCategory =
        selectedCategory === 'All Categories' ||
        (product.category && product.category.toLowerCase() === selectedCategory.toLowerCase());

      return matchSearch && matchCategory;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return Number(a.price) - Number(b.price);
      if (sortBy === 'price-desc') return Number(b.price) - Number(a.price);
      if (sortBy === 'rating') return (Number(b.rating?.rate) || 0) - (Number(a.rating?.rate) || 0);
      if (sortBy === 'name') return (a.name || a.title).localeCompare(b.name || b.title);
      return 0;
    });
  }, [products, searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All Categories');
    setSearchParams({});
  };

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              All Products
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              ค้นหาสินค้า เลือกตามหมวดหมู่ หรือสลับรูปแบบการแสดงผล
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        </div>

        {/* API Error Notification */}
        {error && (
          <div className="mb-6 p-3.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-amber-600" />
              <span>{error}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchProductsFromApi}
                className="px-2.5 py-1 rounded bg-amber-600 text-white text-xs font-medium hover:bg-amber-700 flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" /> Retry
              </button>
              <button
                onClick={switchToMockData}
                className="px-2.5 py-1 rounded border border-amber-300 dark:border-amber-700 text-xs font-medium hover:bg-amber-100"
              >
                Use Mock
              </button>
            </div>
          </div>
        )}

        {/* Filter Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 shadow-sm mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">

            {/* Search Input */}
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-9 pr-8 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-xs outline-none focus:border-orange-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="sm:col-span-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-xs outline-none focus:border-orange-500 capitalize"
              >
                <option value="All Categories">All Categories</option>
                <option value="Accessories">Accessories</option>
                <option value="Display">Display</option>
                <option value="Camera">Camera</option>
                {categories
                  .filter(cat => !['All Categories', 'Accessories', 'Display', 'Camera'].includes(cat))
                  .map(cat => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="sm:col-span-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white text-xs outline-none focus:border-orange-500"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="sm:col-span-2 flex items-center justify-end gap-1">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg text-xs ${
                  viewMode === 'grid'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg text-xs ${
                  viewMode === 'table'
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Active Filter Badges */}
          {(searchQuery || selectedCategory !== 'All Categories') && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 text-xs">
              <span className="text-gray-400">Filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300">
                  "{searchQuery}"
                  <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
                </span>
              )}
              {selectedCategory !== 'All Categories' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-orange-50 text-orange-700 dark:bg-orange-950/40 dark:text-orange-300 capitalize">
                  {selectedCategory}
                  <button onClick={() => setSelectedCategory('All Categories')}><X className="w-3 h-3" /></button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-orange-600 hover:underline ml-1 font-medium"
              >
                Reset
              </button>
            </div>
          )}
        </div>

        {/* Product Grid / Table */}
        {loading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-3 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs text-gray-500">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
            <PackageX className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">
              No products found
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              ลองค้นหาด้วยคำอื่น หรือเลือกหมวดหมู่อื่น
            </p>
            <button
              onClick={clearFilters}
              className="mt-3 px-3 py-1.5 rounded-lg bg-orange-600 text-white text-xs font-medium"
            >
              Reset filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div>
            <div className="flex justify-between items-center mb-3 text-xs text-gray-400">
              <span>Showing {filteredProducts.length} items</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Product</th>
                    <th className="py-3 px-4 font-semibold">Category</th>
                    <th className="py-3 px-4 font-semibold">Price</th>
                    <th className="py-3 px-4 font-semibold">Stock</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                  {filteredProducts.map((product) => {
                    const isOut = Number(product.stock) <= 0;
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'}
                              alt={product.name || product.title}
                              className="w-10 h-10 object-contain rounded-md bg-white p-1 border border-gray-200 dark:border-gray-700"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white line-clamp-1">
                                {product.name || product.title}
                              </p>
                              <span className="text-[11px] text-gray-400">ID: #{product.id}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize text-gray-600 dark:text-gray-300">
                          {product.category}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-900 dark:text-white">
                          ${Number(product.price).toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                          {product.stock} items
                        </td>
                        <td className="py-3 px-4">
                          {isOut ? (
                            <span className="px-2 py-0.5 text-[10px] font-medium bg-red-100 text-red-700 rounded">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="px-2 py-0.5 text-[10px] font-medium bg-green-100 text-green-700 rounded">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => deleteProduct(product.id)}
                            className="text-xs font-medium text-red-600 hover:text-red-700"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      <AddProductModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </main>
  );
}
