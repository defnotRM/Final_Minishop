import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { X, Plus, AlertCircle, Image as ImageIcon } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose }) {
  const { addProduct, categories } = useProducts();

  const [formData, setFormData] = useState({
    name: '',
    category: 'Accessories',
    price: '',
    stock: '',
    image: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'กรุณาระบุชื่อสินค้า';
    }

    if (!formData.price || formData.price.trim() === '') {
      errors.price = 'กรุณาระบุราคาสินค้า';
    } else {
      const priceVal = parseFloat(formData.price);
      if (isNaN(priceVal) || priceVal <= 0) {
        errors.price = 'ราคาสินค้าต้องมากกว่า 0';
      }
    }

    if (!formData.stock || formData.stock.trim() === '') {
      errors.stock = 'กรุณาระบุจำนวนสต็อก';
    } else {
      const stockVal = parseInt(formData.stock, 10);
      if (isNaN(stockVal) || stockVal < 0) {
        errors.stock = 'จำนวนสินค้าต้องเป็น 0 หรือมากกว่า';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      addProduct({
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10),
        image: formData.image || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
        description: formData.description
      });

      setFormData({
        name: '',
        category: 'Accessories',
        price: '',
        stock: '',
        image: '',
        description: ''
      });
      setFormErrors({});
      onClose();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <div
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <h2 className="text-base font-bold text-gray-900 dark:text-white">
              เพิ่มสินค้าใหม่ (Add Product)
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              ชื่อสินค้า <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Wireless Noise Canceling Headphones"
              className={`w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border ${
                formErrors.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
              } text-gray-900 dark:text-white outline-none focus:border-orange-500`}
            />
            {formErrors.name && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> {formErrors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              หมวดหมู่สินค้า <span className="text-red-500">*</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500 capitalize"
            >
              {categories
                .filter(cat => cat !== 'All Categories')
                .concat(['Accessories', 'Display', 'Camera', 'electronics', 'jewelery', "men's clothing", "women's clothing"])
                .filter((v, i, a) => a.indexOf(v) === i)
                .map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                ราคา ($ Price) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="49.99"
                className={`w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border ${
                  formErrors.price ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } text-gray-900 dark:text-white outline-none focus:border-orange-500`}
              />
              {formErrors.price && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.price}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                จำนวนคงเหลือ (Stock) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                placeholder="10"
                className={`w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border ${
                  formErrors.stock ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                } text-gray-900 dark:text-white outline-none focus:border-orange-500`}
              />
              {formErrors.stock && (
                <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {formErrors.stock}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              URL รูปภาพสินค้า (Image URL)
            </label>
            <div className="relative">
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
              />
              <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-200 dark:border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-orange-600 hover:bg-orange-700 text-white shadow-sm flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{submitting ? 'กำลังเพิ่ม...' : 'Add Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
