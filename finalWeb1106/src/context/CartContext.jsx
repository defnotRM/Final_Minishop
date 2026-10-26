import React, { createContext, useContext, useState, useEffect } from 'react';
import { useProducts } from './ProductContext';

const CartContext = createContext();

export function CartProvider({ children }) {
  const { showToast } = useProducts();

  // ตะกร้าสินค้า เก็บใน localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('minishop_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // ประวัติคำสั่งซื้อ สำหรับหน้า Profile & Admin
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('minishop_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // ตัวอย่างออเดอร์เริ่มต้นตามแบบ UI Design Board
    return [
      {
        orderId: '#000124',
        date: '12 Apr 2026',
        customer: 'John Doe',
        total: 109.95,
        itemsCount: 1,
        status: 'Delivered',
        items: [{ title: 'Fjallraven - Foldsack No.1', quantity: 1, price: 109.95 }]
      },
      {
        orderId: '#000123',
        date: '5 Apr 2026',
        customer: 'Jane Smith',
        total: 79.99,
        itemsCount: 1,
        status: 'Processing',
        items: [{ title: 'Casio Men\'s Watch', quantity: 1, price: 79.99 }]
      },
      {
        orderId: '#000122',
        date: '28 Mar 2026',
        customer: 'Mike Johnson',
        total: 48.00,
        itemsCount: 1,
        status: 'Shipped',
        items: [{ title: 'Leather Wallet', quantity: 1, price: 48.00 }]
      },
      {
        orderId: '#000121',
        date: '15 Mar 2026',
        customer: 'Sarah Lee',
        total: 115.00,
        itemsCount: 1,
        status: 'Pending',
        items: [{ title: 'Nike Air Force 1 \'07', quantity: 1, price: 115.00 }]
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('minishop_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('minishop_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // เพิ่มสินค้าลงตะกร้า
  const addToCart = (product, quantity = 1) => {
    if (product.stock !== undefined && product.stock <= 0) {
      showToast('สินค้านี้หมดสต็อกแล้ว ไม่สามารถสั่งซื้อได้', 'error');
      return false;
    }

    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (product.stock !== undefined && nextQty > product.stock) {
          showToast(`ไม่สามารถเพิ่มเกินจำนวนคงเหลือ (${product.stock} ชิ้น)`, 'warning');
          return prev;
        }
        showToast(`เพิ่มจำนวน "${product.name || product.title}" ในตะกร้าแล้ว`, 'success');
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: nextQty } : item
        );
      } else {
        showToast(`เพิ่ม "${product.name || product.title}" ลงตะกร้าแล้ว!`, 'success');
        return [...prev, { ...product, quantity }];
      }
    });
    return true;
  };

  // ปรับจำนวนสินค้า
  const updateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          if (item.stock !== undefined && newQty > item.stock) {
            showToast(`สต็อกสูงสุดคือ ${item.stock} ชิ้น`, 'warning');
            return item;
          }
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // ลบสินค้าออกจากตะกร้า
  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast('ลบสินค้าออกจากตะกร้าแล้ว', 'info');
  };

  // ล้างตะกร้า
  const clearCart = () => {
    setCartItems([]);
  };

  // ทำการสั่งซื้อ (Checkout)
  const checkout = (customerInfo = {}) => {
    if (cartItems.length === 0) return false;

    const newOrder = {
      orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
      customer: customerInfo.fullName || 'John Doe',
      total: subtotal,
      itemsCount: totalItems,
      status: 'Processing',
      items: cartItems.map(item => ({
        title: item.name || item.title,
        quantity: item.quantity,
        price: item.price
      }))
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`สั่งซื้อสำเร็จ! รหัสคำสั่งซื้อ: ${newOrder.orderId}`, 'success');
    return newOrder;
  };

  // คำนวณยอดรวม
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        orders,
        totalItems,
        subtotal,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        checkout
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
