import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShoppingBag,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Award,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  const companyValues = [
    {
      icon: <Award className="w-5 h-5 text-orange-600" />,
      title: 'Premium Quality',
      description: 'คัดสรรเฉพาะสินค้าคุณภาพสูงที่ผ่านการรับรองมาตรฐาน พร้อมการรับประกันสินค้าจากผู้ผลิตอย่างแท้จริง'
    },
    {
      icon: <Truck className="w-5 h-5 text-emerald-600" />,
      title: 'Fast Delivery',
      description: 'ระบบจัดส่งสินค้าที่รวดเร็วและปลอดภัย พร้อมบริการติดตามสถานะสินค้าได้ตลอด 24 ชั่วโมง'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      title: 'Secure Shopping',
      description: 'มาตรฐานความปลอดภัยในการสั่งซื้อและชำระเงิน พร้อมนโยบายคุ้มครองผู้บริโภค 100%'
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-rose-600" />,
      title: 'Customer First',
      description: 'ทีมงานฝ่ายสนับสนุนลูกค้าพร้อมให้คำปรึกษาและแก้ไขปัญหาเพื่อให้คุณได้รับประสบการณ์ที่ดีที่สุด'
    }
  ];

  return (
    <main className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white p-8 sm:p-12 mb-10 shadow-sm">
          <div className="max-w-2xl">
            <span className="text-xs uppercase font-semibold tracking-wider text-orange-100 block mb-2">
              About MiniShop
            </span>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight mb-3">
              ร้านค้าออนไลน์เพื่อทุกคน
            </h1>
            <p className="text-sm sm:text-base text-orange-50 leading-relaxed mb-6">
              MiniShop มุ่งมั่นพัฒนาแพลตฟอร์มการช้อปปิ้งออนไลน์ที่ใช้งานง่าย รวดเร็ว และตอบโจทย์ทุกความต้องการ พร้อมระบบจัดการสินค้าที่ทันสมัย
            </p>
            <div className="flex gap-3">
              <Link
                to="/products"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-orange-600 font-semibold text-xs hover:bg-orange-50 shadow-sm"
              >
                <span>สำรวจสินค้า</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-orange-600/30 hover:bg-orange-600/50 text-white font-medium text-xs border border-white/30"
              >
                <span>หน้าหลัก</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Values Grid */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            จุดเด่นและบริการของเรา
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {companyValues.map((val, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <div className="w-10 h-10 rounded-lg bg-gray-50 dark:bg-gray-900/60 flex items-center justify-center mb-3">
                  {val.icon}
                </div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
                  {val.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Box */}
        <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-center">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            เทคโนโลยีที่ใช้งาน (Modern Web Stack)
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            พัฒนาด้วยเครื่องมือและเทคโนโลยี Frontend มาตรฐาน
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {['React 19', 'Tailwind CSS', 'React Router v7', 'Lucide Icons', 'FakeStore API'].map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}
