import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import {
  Trash2,
  ArrowLeft,
  ShoppingBag,
  CheckCircle,
  X
} from 'lucide-react';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems, checkout } = useCart();
  const { products } = useProducts();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [customerName, setCustomerName] = useState('John Doe');
  const [address, setAddress] = useState('123 Bangkok Road, Thailand 10110');
  const [checkoutCompleteOrder, setCheckoutCompleteOrder] = useState(null);

  // Recommendations matching Screen 3 "You might also like"
  const recommendations = products.slice(0, 4);

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    const order = checkout({
      fullName: customerName,
      address
    });
    setCheckoutCompleteOrder(order);
    setIsCheckoutModalOpen(false);
  };

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title & Subtitle (Matching Screen 3) */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Shopping Cart
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {totalItems} items in your cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-red-600 hover:text-red-700 font-medium hover:underline"
            >
              Clear Cart
            </button>
          )}
        </div>

        {/* Checkout Success Banner */}
        {checkoutCompleteOrder && (
          <div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold">Thank you for your order!</p>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Order ID: <span className="font-bold">{checkoutCompleteOrder.orderId}</span> (Total: ${checkoutCompleteOrder.total.toFixed(2)})
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/profile"
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium"
              >
                View in Profile
              </Link>
              <button
                onClick={() => setCheckoutCompleteOrder(null)}
                className="text-xs text-emerald-700 dark:text-emerald-300 hover:underline"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="py-16 text-center bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 mb-10">
            <ShoppingBag className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">ตะกร้าของคุณยังไม่มีสินค้า</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              เลือกซื้อสินค้าที่คุณสนใจและเพิ่มลงในตะกร้าได้ตลอดเวลา
            </p>
            <Link
              to="/products"
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>เริ่มช้อปปิ้ง</span>
            </Link>
          </div>
        ) : (
          /* Cart with Items: 2 Column Layout (Screen 3) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">

            {/* Left 65%: Cart Table */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                
                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-gray-50 dark:bg-gray-900/60 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                      <tr>
                        <th className="py-3 px-4 font-semibold">Product</th>
                        <th className="py-3 px-3 font-semibold text-center">Price</th>
                        <th className="py-3 px-3 font-semibold text-center">Quantity</th>
                        <th className="py-3 px-3 font-semibold text-right">Total</th>
                        <th className="py-3 px-3 font-semibold text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                      {cartItems.map((item) => {
                        const itemTotal = Number(item.price) * item.quantity;
                        return (
                          <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-750">
                            {/* Product info */}
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <Link
                                  to={`/products/${item.id}`}
                                  className="w-14 h-14 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 p-1 flex-shrink-0 flex items-center justify-center"
                                >
                                  <img
                                    src={item.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80'}
                                    alt={item.name || item.title}
                                    className="w-full h-full object-contain"
                                  />
                                </Link>
                                <div>
                                  <Link
                                    to={`/products/${item.id}`}
                                    className="font-medium text-gray-900 dark:text-white hover:text-orange-600 line-clamp-1"
                                  >
                                    {item.name || item.title}
                                  </Link>
                                  <span className="text-[11px] text-gray-400 mt-0.5 block">
                                    Color: Black
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Price */}
                            <td className="py-4 px-3 text-center text-gray-700 dark:text-gray-300 font-medium">
                              ${Number(item.price).toFixed(2)}
                            </td>

                            {/* Quantity */}
                            <td className="py-4 px-3 text-center">
                              <div className="inline-flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
                                >
                                  -
                                </button>
                                <span className="px-2.5 py-1 text-xs font-semibold text-gray-900 dark:text-white min-w-[24px]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="px-2 py-1 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs"
                                >
                                  +
                                </button>
                              </div>
                            </td>

                            {/* Total */}
                            <td className="py-4 px-3 text-right font-bold text-gray-900 dark:text-white">
                              ${itemTotal.toFixed(2)}
                            </td>

                            {/* Action (Red trash) */}
                            <td className="py-4 px-3 text-center">
                              <button
                                type="button"
                                onClick={() => removeFromCart(item.id)}
                                className="p-1.5 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                                title="Remove item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View */}
                <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700/60">
                  {cartItems.map((item) => {
                    const itemTotal = Number(item.price) * item.quantity;
                    return (
                      <div key={item.id} className="p-4 flex gap-3 items-center">
                        <img
                          src={item.image}
                          alt={item.name || item.title}
                          className="w-16 h-16 object-contain rounded-lg border border-gray-200 dark:border-gray-700 p-1"
                        />
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
                            {item.name || item.title}
                          </p>
                          <p className="text-xs font-bold text-orange-600 mt-1">
                            ${Number(item.price).toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="inline-flex items-center border border-gray-300 dark:border-gray-600 rounded">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs"
                              >
                                +
                              </button>
                            </div>
                            <span className="text-xs font-bold">${itemTotal.toFixed(2)}</span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Continue Shopping button (Matching Screen 3) */}
              <div className="mt-4">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-medium transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Right 35%: Order Summary (Matching Screen 3) */}
            <div className="lg:col-span-4">
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm sticky top-24">
                <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h2>

                <div className="space-y-2.5 text-xs text-gray-600 dark:text-gray-300 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900 dark:text-white">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-gray-900 dark:text-white">$0.00</span>
                  </div>
                </div>

                <div className="py-4 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(true)}
                  className="w-full py-2.5 px-4 rounded-lg bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-semibold text-xs shadow-sm transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

          </div>
        )}

        {/* You might also like (Matching Screen 3) */}
        {recommendations.length > 0 && (
          <section className="pt-8 border-t border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              You might also like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {recommendations.map(item => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        >
          <div
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white">
                ยืนยันการสั่งซื้อสินค้า (Checkout)
              </h2>
              <button
                type="button"
                onClick={() => setIsCheckoutModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCheckoutSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ชื่อ-นามสกุล ผู้รับ
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  ที่อยู่จัดส่ง
                </label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-xs text-orange-900 dark:text-orange-200 flex justify-between items-center">
                <span>ยอดชำระสุทธิ:</span>
                <span className="font-bold text-orange-600 dark:text-orange-400 text-sm">${subtotal.toFixed(2)}</span>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold"
                >
                  ยืนยันสั่งซื้อ (${subtotal.toFixed(2)})
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </main>
  );
}
