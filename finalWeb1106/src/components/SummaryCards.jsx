import React from 'react';
import { useProducts } from '../context/ProductContext';
import { Package, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

export default function SummaryCards() {
  const { totalProducts, totalInventoryValue, outOfStockCount, inStockCount } = useProducts();

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(totalInventoryValue);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {/* 1. Total Products */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              จำนวนสินค้าทั้งหมด (Total Products)
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {totalProducts} <span className="text-sm font-normal text-gray-500">รายการ</span>
            </h3>
            <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              พร้อมจำหน่าย {inStockCount} รายการ
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400">
            <Package className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Total Inventory Value */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              มูลค่ารวมสินค้าคงคลัง (Inventory Value)
            </p>
            <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
              {formattedValue}
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              คำนวณจาก Price × Stock ทุกรายการ
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 3. Out of Stock */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm sm:col-span-2 lg:col-span-1">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              สินค้าหมดสต็อก (Out of Stock)
            </p>
            <h3 className={`mt-2 text-2xl font-bold ${outOfStockCount > 0 ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
              {outOfStockCount} <span className="text-sm font-normal text-gray-500">รายการ</span>
            </h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {outOfStockCount > 0 ? 'สินค้าที่ต้องเติมสต็อกเร่งด่วน' : 'สินค้าทุกรายการมีของพร้อมส่ง'}
            </p>
          </div>
          <div className={`p-2.5 rounded-lg ${
            outOfStockCount > 0
              ? 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
          }`}>
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}
