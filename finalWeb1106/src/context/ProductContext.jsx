import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_MOCK_PRODUCTS } from '../data/initialProducts';

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataSource, setDataSource] = useState('api'); // 'api' | 'mock'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // ดึงข้อมูลสินค้าจาก Public API
  const fetchProductsFromApi = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`API error: status ${response.status}`);
      }
      const data = await response.json();
      
      // แปลงข้อมูลและกำหนด stock ให้กับสินค้าจาก API
      const formatted = data.map((item, index) => {
        // กำหนด stock เพื่อให้มีทั้งสินค้าที่มีในสต็อก และหมดสต็อก (สำหรับทดสอบ Out of Stock)
        const isOutOfStock = index === 3 || index === 8;
        const stockQty = isOutOfStock ? 0 : ((item.id * 7) % 25 + 3);

        return {
          id: item.id,
          name: item.title,
          title: item.title,
          price: Number(item.price),
          description: item.description,
          category: item.category,
          image: item.image,
          stock: stockQty,
          rating: {
            rate: item.rating?.rate ?? 4.0,
            count: item.rating?.count ?? 20,
          }
        };
      });

      setProducts(formatted);
      setDataSource('api');
      showToast('โหลดข้อมูลสินค้าจาก FakeStore API สำเร็จ!', 'success');
    } catch (err) {
      console.warn('API fetch failed, falling back to mock data:', err);
      setError('ไม่สามารถเชื่อมต่อ FakeStore API ได้ ระบบสลับไปใช้ชุดข้อมูลตัวอย่างอัตโนมัติ');
      setProducts(INITIAL_MOCK_PRODUCTS);
      setDataSource('mock');
      showToast('กำลังใช้งานชุดข้อมูลสินค้าตัวอย่าง (Demo Catalog)', 'info');
    } finally {
      setLoading(false);
    }
  };

  // ดึงข้อมูลเมื่อ Component โหลด
  useEffect(() => {
    fetchProductsFromApi();
  }, []);

  // ฟังก์ชันสลับไปใช้ชุดข้อมูลสินค้าตัวอย่าง
  const switchToMockData = () => {
    setProducts(INITIAL_MOCK_PRODUCTS);
    setDataSource('mock');
    setError(null);
    showToast('สลับมาใช้ชุดข้อมูลตัวอย่างสำเร็จ', 'info');
  };

  // ฟังก์ชันเพิ่มสินค้าใหม่
  const addProduct = (productData) => {
    // Validation
    if (!productData.name || productData.name.trim() === '') {
      throw new Error('กรุณากรอกชื่อสินค้า');
    }
    const priceNum = parseFloat(productData.price);
    if (isNaN(priceNum) || priceNum <= 0) {
      throw new Error('กรุณากรอกราคาสินค้าที่ถูกต้อง (มากกว่า 0)');
    }
    const stockNum = parseInt(productData.stock, 10);
    if (isNaN(stockNum) || stockNum < 0) {
      throw new Error('กรุณากรอกจำนวนสต็อกที่ถูกต้อง (ตั้งแต่ 0 ขึ้นไป)');
    }

    const newId = products.length > 0 ? Math.max(...products.map(p => Number(p.id) || 0)) + 1 : 1;
    
    const newProduct = {
      id: newId,
      name: productData.name.trim(),
      title: productData.name.trim(),
      category: productData.category || 'General',
      price: priceNum,
      stock: stockNum,
      description: productData.description?.trim() || 'สินค้าคุณภาพดี คัดสรรพิเศษจาก MiniShop',
      image: productData.image?.trim() || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
      rating: {
        rate: 5.0,
        count: 1
      }
    };

    // อัปเดต state ทันที ไม่โหลดหน้าเว็บใหม่
    setProducts(prev => [newProduct, ...prev]);
    showToast(`เพิ่มสินค้า "${newProduct.name}" เรียบร้อยแล้ว!`, 'success');
    return newProduct;
  };

  // ฟังก์ชันลบสินค้า
  const deleteProduct = (id) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(`ลบสินค้า "${target ? target.name : id}" ออกจากระบบแล้ว`, 'warning');
  };

  // ฟังก์ชันอัปเดตสต็อกหรือแก้ไขสินค้า
  const updateProduct = (id, fields) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, ...fields };
      }
      return p;
    }));
    showToast('อัปเดตข้อมูลสินค้าสำเร็จ', 'success');
  };

  // คำนวณสรุปข้อมูลสินค้า
  // 1. จำนวนสินค้าทั้งหมด
  const totalProducts = products.length;

  // 2. มูลค่ารวมของสินค้าคงเหลือ price × stock
  const totalInventoryValue = products.reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (Number(item.stock) || 0);
  }, 0);

  // 3. จำนวนสินค้าที่หมดสต็อก
  const outOfStockCount = products.filter(item => Number(item.stock) === 0).length;
  const inStockCount = products.filter(item => Number(item.stock) > 0).length;

  // หมวดหมู่ที่มีทั้งหมด
  const categories = ['All Categories', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        dataSource,
        categories,
        totalProducts,
        totalInventoryValue,
        outOfStockCount,
        inStockCount,
        toastMessage,
        showToast,
        addProduct,
        deleteProduct,
        updateProduct,
        fetchProductsFromApi,
        switchToMockData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
