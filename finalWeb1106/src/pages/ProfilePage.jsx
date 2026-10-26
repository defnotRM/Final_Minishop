import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Settings,
  LogOut,
  Camera,
  CheckCircle,
  Clock,
  Truck
} from 'lucide-react';

export default function ProfilePage() {
  const { orders } = useCart();
  const { showToast } = useProducts();

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState(() => {
    try {
      const saved = localStorage.getItem('minishop_user_profile');
      return saved
        ? JSON.parse(saved)
        : {
            fullName: 'John Doe',
            email: 'john@example.com',
            phone: '081-234-5678',
            bio: 'Frontend Developer | Lover of Technology and Design',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'
          };
    } catch {
      return {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '081-234-5678',
        bio: 'Frontend Developer | Lover of Technology and Design',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80'
      };
    }
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    localStorage.setItem('minishop_user_profile', JSON.stringify(profileData));
    setSavedSuccess(true);
    showToast('บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว!', 'success');
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleChangePhoto = () => {
    const avatars = [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
      'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&q=80',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80'
    ];
    const next = avatars[(avatars.indexOf(profileData.avatar) + 1) % avatars.length];
    setProfileData(prev => ({ ...prev, avatar: next }));
    showToast('เปลี่ยนรูปโปรไฟล์เรียบร้อยแล้ว', 'info');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-green-100 text-green-700 dark:bg-green-950/60 dark:text-green-300">
            Delivered
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300">
            Processing
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
            Shipped
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Pending
          </span>
        );
    }
  };

  return (
    <main className="min-h-screen py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Profile
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            จัดการข้อมูลส่วนตัวและตรวจสอบประวัติการสั่งซื้อของคุณ
          </p>
        </div>

        {/* 2 Column Layout (Matching Screen 4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left Column: Sidebar Card (Screen 4) */}
          <aside className="lg:col-span-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="text-center pb-5 border-b border-gray-100 dark:border-gray-700">
                <div className="relative inline-block mx-auto mb-3">
                  <img
                    src={profileData.avatar}
                    alt={profileData.fullName}
                    className="w-20 h-20 rounded-full object-cover border-2 border-orange-500/30 mx-auto"
                  />
                  <button
                    type="button"
                    onClick={handleChangePhoto}
                    className="absolute bottom-0 right-0 p-1.5 rounded-full bg-orange-600 text-white hover:bg-orange-700 shadow-sm transition-transform active:scale-90"
                    title="Change avatar"
                  >
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">{profileData.fullName}</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">{profileData.email}</p>
              </div>

              {/* Sidebar Menu Items (Screen 4) */}
              <nav aria-label="Profile navigation" className="py-3 space-y-1">
                <button
                  type="button"
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'profile'
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'orders'
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Orders</span>
                  </div>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {orders.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('addresses')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'addresses'
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                  <span>Addresses</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'wishlist'
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === 'settings'
                      ? 'bg-orange-50 text-orange-600 dark:bg-orange-950/40 dark:text-orange-400 font-semibold'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </button>
              </nav>

              <div className="pt-3 border-t border-gray-100 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => showToast('Log out simulated', 'info')}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Profile Form & Orders Table (Screen 4) */}
          <div className="lg:col-span-8 space-y-6">

            {/* Profile Information Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-4">
                Profile Information
              </h2>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      value={profileData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label htmlFor="bio" className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={3}
                    value={profileData.bio}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 rounded-lg text-xs bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white outline-none focus:border-orange-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  {savedSuccess ? (
                    <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                      <CheckCircle className="w-3.5 h-3.5" /> บันทึกสำเร็จ
                    </span>
                  ) : <span />}

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Orders Table (Screen 4) */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900 dark:text-white">
                  Recent Orders
                </h2>
                <span className="text-xs font-semibold text-orange-600 hover:underline cursor-pointer">
                  View All &rarr;
                </span>
              </div>

              {orders.length === 0 ? (
                <div className="py-8 text-center text-gray-400 text-xs">
                  ยังไม่มีรายการคำสั่งซื้อ
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                        <th className="py-2.5 px-3 font-semibold">Order #</th>
                        <th className="py-2.5 px-3 font-semibold">Date</th>
                        <th className="py-2.5 px-3 font-semibold text-right">Total</th>
                        <th className="py-2.5 px-3 font-semibold text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700/60">
                      {orders.map((ord, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                          <td className="py-2.5 px-3 font-medium text-gray-900 dark:text-white">
                            {ord.orderId}
                          </td>
                          <td className="py-2.5 px-3 text-gray-500">
                            {ord.date}
                          </td>
                          <td className="py-2.5 px-3 text-right font-bold text-gray-900 dark:text-white">
                            ${Number(ord.total).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 text-center">
                            {getStatusBadge(ord.status)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
