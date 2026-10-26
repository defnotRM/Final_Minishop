import React from 'react';
import { useProducts } from '../context/ProductContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useProducts();

  if (!toastMessage) return null;

  const bgColors = {
    success: 'bg-emerald-600 text-white shadow-emerald-500/20',
    error: 'bg-rose-600 text-white shadow-rose-500/20',
    warning: 'bg-amber-500 text-white shadow-amber-500/20',
    info: 'bg-orange-600 text-white shadow-orange-500/20'
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 flex-shrink-0" />,
    error: <AlertCircle className="w-5 h-5 flex-shrink-0" />,
    warning: <AlertTriangle className="w-5 h-5 flex-shrink-0" />,
    info: <Info className="w-5 h-5 flex-shrink-0" />
  };

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-in"
    >
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg font-medium text-sm transition-all duration-300 ${
          bgColors[toastMessage.type] || bgColors.info
        }`}
      >
        {icons[toastMessage.type] || icons.info}
        <span>{toastMessage.message}</span>
      </div>
    </aside>
  );
}
