
import { Package, DollarSign, Users, Bell } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorBatchStatus() {
  const batches = [
    { id: 'BATCH-2026-11A', type: 'Cua Lột (SoftShell)', status: 'Đang sản xuất', step: 3, total: 1500, cap: '75.000.000 ₫', color: 'text-[#0369a1]', bg: 'bg-[#f0f9ff]', border: 'border-[#bae6fd]', investor: '12 NĐT (Góp 100%)', alerts: 2 },
    { id: 'BATCH-2026-12C', type: 'Cua Thịt (Fattening)', status: 'Đang gọi vốn', step: 1, total: 2000, cap: '100.000.000 ₫', color: 'text-[#b45309]', bg: 'bg-[#fffbeb]', border: 'border-[#fde68a]', investor: 'Đang mở bán (45%)', alerts: 0 },
    { id: 'BATCH-2026-10B', type: 'Cua Gạch (RoeCrab)', status: 'Đang thu hoạch', step: 4, total: 800, cap: '40.000.000 ₫', color: 'text-[#15803d]', bg: 'bg-[#f0fdf4]', border: 'border-[#bbf7d0]', investor: 'Hải Sản Biển Đông (Bao tiêu)', alerts: 0 },
    { id: 'BATCH-2026-09A', type: 'Cua Lột (SoftShell)', status: 'Đã tất toán', step: 5, total: 1000, cap: '50.000.000 ₫', color: 'text-gray-600', bg: 'bg-gray-100', border: 'border-gray-200', investor: '8 NĐT (Hoàn tất)', alerts: 0 },
  ];

  return (
    <OperatorLayout activeTab="batch">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Quản lý Lô Nuôi</h1>
          <p className="text-sm text-gray-500 mt-1">Danh sách các lô đang vận hành & gọi vốn</p>
        </div>
        <button onClick={() => window.location.href='/operator/create-batch'} className="bg-[#171717] hover:bg-[#333] text-white px-5 py-2.5 rounded text-sm font-bold shadow-md transition-colors cursor-pointer">
          + Mở Lô Nuôi Mới
        </button>
      </header>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {batches.map(b => (
          <div key={b.id} onClick={() => window.location.href='/operator/batch/detail'} className="relative bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between hover:border-[#7d4b1a] hover:shadow-md transition-all cursor-pointer mt-2">
            
            {/* ALERT BADGE */}
            {b.alerts > 0 && (
              <div className="absolute -top-3 -right-3 bg-[#b42318] text-white text-xs font-extrabold w-8 h-8 flex items-center justify-center rounded-full shadow-lg border-2 border-white animate-pulse">
                <Bell className="w-4 h-4 absolute opacity-20" />
                {b.alerts}
              </div>
            )}

            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-lg font-extrabold text-[#7d4b1a]">{b.id}</h2>
                <p className="text-sm font-medium text-gray-500">{b.type}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold border ${b.bg} ${b.color} ${b.border}`}>
                {b.status}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2"><Package className="w-4 h-4 text-gray-400"/> <span className="font-semibold text-gray-700">{b.total} con giống</span></div>
              <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-gray-400"/> <span className="font-semibold text-gray-700">{b.cap}</span></div>
            </div>

            <div className="flex items-center justify-between bg-[#fff8ef] px-3 py-2 rounded mb-6">
              <div className="flex items-center gap-2 text-[#7d4b1a]">
                <Users className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-wide">Nguồn vốn / Đối tác</span>
              </div>
              <span className="text-sm font-extrabold text-[#171717]">{b.investor}</span>
            </div>

            <div className="relative">
              <div className="overflow-hidden h-1.5 mb-3 text-xs flex rounded-full bg-gray-100">
                <div style={{ width: `${(b.step/5)*100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#7d4b1a] transition-all duration-500"></div>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <span className={b.step >= 1 ? 'text-[#7d4b1a]' : ''}>Gọi vốn</span>
                <span className={b.step >= 2 ? 'text-[#7d4b1a]' : ''}>Thả giống</span>
                <span className={b.step >= 3 ? 'text-[#7d4b1a]' : ''}>Đang nuôi</span>
                <span className={b.step >= 4 ? 'text-[#7d4b1a]' : ''}>Thu hoạch</span>
                <span className={b.step >= 5 ? 'text-[#7d4b1a]' : ''}>Tất toán</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OperatorLayout>
  );
}
