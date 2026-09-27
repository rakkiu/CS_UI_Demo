
import { UploadCloud, Save } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorDailyLog() {
  return (
    <OperatorLayout activeTab="dashboard">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Ghi Log Hàng Ngày</h1>
        <p className="text-sm text-gray-500 mt-1">Cập nhật thông số môi trường & hình ảnh (BATCH-2026-11A)</p>
      </header>
      <div className="max-w-2xl bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Độ pH</label>
              <input type="number" step="0.1" defaultValue="7.5" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] focus:ring-1 focus:ring-[#7d4b1a] outline-none font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Nhiệt độ (°C)</label>
              <input type="number" step="0.5" defaultValue="28.5" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] focus:ring-1 focus:ring-[#7d4b1a] outline-none font-medium" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#171717] mb-2">Ghi chú thức ăn / Hoạt động</label>
            <textarea rows={3} placeholder="VD: Cho ăn cám viên, tôm nhỏ..." className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] focus:ring-1 focus:ring-[#7d4b1a] outline-none"></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#171717] mb-2">Tải ảnh/Video minh chứng</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-10 flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
              <UploadCloud className="w-8 h-8 mb-2" />
              <span className="text-sm font-medium">Nhấn hoặc Kéo thả ảnh vào đây</span>
            </div>
          </div>
          <button type="button" onClick={() => { alert('Đã lưu nhật ký!'); window.location.href='/operator'; }} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-6 py-4 rounded font-bold text-sm transition-colors uppercase tracking-widest shadow-md">
            <Save className="w-4 h-4" /> Lưu Nhật Ký
          </button>
        </form>
      </div>
    </OperatorLayout>
  );
}
