# MiniShop Product Dashboard 🛍️
> A modern, responsive e-Commerce product management dashboard and store platform built with React, Vite, and Tailwind CSS.

---

## ✨ Features (ฟีเจอร์เด่นของระบบ)

- **Product Catalog & Showcase**:
  - Live product feed connected with RESTful API
  - Dual viewing modes: Responsive **Grid Cards** & **Management Table**
  - Instant live search by product name (Case-insensitive)
  - Category filtering and sorting options (Price, Rating, Alphabetical)
  - Real-time stock indicators (`In Stock` / `Out of Stock`)

- **Interactive Product Details**:
  - High-resolution image preview & thumbnail gallery
  - Star ratings, customer review breakdown
  - Color palette selection
  - Dynamic quantity selector with stock protection
  - "Add to Cart" and quick "Buy Now" workflows

- **Shopping Cart & Checkout**:
  - Quantity adjustments (`-` / `+`) and item deletion
  - Dynamic subtotal, tax, and free shipping calculations
  - Full checkout modal with shipping address input
  - LocalStorage persistence for user cart data

- **User Profile & History**:
  - Customizable profile information (Name, Email, Phone, Bio)
  - Avatar changer
  - Order tracking with status badges (`Delivered`, `Processing`, `Shipped`, `Pending`)

- **Admin Dashboard**:
  - Real-time metric cards (Total Products, Inventory Value, Out of Stock count)
  - Sales overview trend chart (Smooth SVG Line Chart)
  - Product management table with instant stock editing
  - Instant product deletion and creation modal with validation

- **Modern UI / UX**:
  - Dark Mode and Light Mode with instant toggle
  - Semantic HTML structure (`header`, `nav`, `main`, `footer`, `section`, `article`)
  - Smooth animations, micro-interactions, and responsive layout across mobile, tablet, and desktop

---

## 🚀 Quick Start (วิธีการรันโปรเจกต์)

### 1. ติดตั้ง Dependencies
```bash
npm install
```

### 2. รันโหมด Development Server
```bash
npm run dev
```
เปิดเบราว์เซอร์ไปที่: `http://localhost:3000`

### 3. Build สำหรับ Production
```bash
npm run build
npm run preview
```

---

## 📁 โครงสร้างโปรเจกต์ (Project Structure)

```
finalWeb1106/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # ส่วนหัว เมนูนำทาง ค้นหา ตะกร้าสินค้า และปุ่ม Dark Mode
│   │   ├── Footer.jsx          # ส่วนท้ายเว็บ นโยบาย และข้อมูลลิขสิทธิ์
│   │   ├── ProductCard.jsx     # การ์ดแสดงสินค้า รีวิว ราคา สต็อก และปุ่ม Add to Cart
│   │   ├── SummaryCards.jsx    # การ์ดสรุปสถิติคลังสินค้าแบบไดนามิก
│   │   ├── AddProductModal.jsx # แบบฟอร์มเพิ่มสินค้าใหม่พร้อมระบบตรวจสอบข้อมูล
│   │   └── Toast.jsx           # การแจ้งเตือนข้อความสถานะระบบ
│   ├── context/
│   │   ├── ProductContext.jsx  # จัดการ Global State สินค้า, API, CRUD, คำนวณสรุป
│   │   └── CartContext.jsx     # จัดการตะกร้าสินค้า ออเดอร์ และ LocalStorage
│   ├── pages/
│   │   ├── HomePage.jsx        # หน้าหลัก (Banner, หมวดหมู่, สินค้าแนะนำ)
│   │   ├── ProductsPage.jsx    # หน้ารวมสินค้า (ค้นหา, กรองหมวดหมู่, สลับ Card/Table)
│   │   ├── ProductDetailPage.jsx # หน้ารายละเอียดสินค้า รีวิว และตัวปรับจำนวน
│   │   ├── CartPage.jsx        # หน้าตะกร้าสินค้า สรุปยอด และสั่งซื้อ
│   │   ├── ProfilePage.jsx     # หน้าโปรไฟล์ผู้ใช้และประวัติคำสั่งซื้อ
│   │   ├── AdminDashboard.jsx  # หน้าแอดมิน กราฟยอดขาย ตารางสต็อก และการจัดการ
│   │   └── AboutPage.jsx       # หน้าเกี่ยวกับความเป็นมาและค่านิยมของ MiniShop
│   ├── data/
│   │   └── initialProducts.js  # ชุดข้อมูลสินค้าตัวอย่าง
│   ├── App.jsx                 # เส้นทาง Routing ทั้งหมด
│   ├── main.jsx
│   ├── App.css
│   └── index.css               # สไตล์ Tailwind CSS
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```
