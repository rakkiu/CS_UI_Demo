
import { Send, DollarSign, Package, Calendar } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorCreateBatch() {
  return (
    <OperatorLayout activeTab="batch">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Đề xuất Lô Nuôi Mới</h1>
        <p className="text-sm text-gray-500 mt-1">Đệ trình kế hoạch gọi vốn và sản xuất lên Admin</p>
      </header>
      
      <div className="max-w-3xl bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
        <form className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Tên Lô (Tiêu đề gọi vốn)</label>
              <input type="text" placeholder="VD: Lô Cua Lột Tháng 11" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] focus:ring-1 focus:ring-[#7d4b1a] outline-none font-medium text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Loại Cua</label>
              <select className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none font-medium text-sm bg-white">
                <option>Cua Lột (SoftShell Crab)</option>
                <option>Cua Gạch (Roe Crab)</option>
                <option>Cua Thịt (Fattening Mud Crab)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2 flex items-center gap-1.5"><Package className="w-4 h-4 text-[#7d4b1a]"/> Số lượng con giống</label>
              <input type="number" placeholder="VD: 1500" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none font-medium text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2 flex items-center gap-1.5"><Calendar className="w-4 h-4 text-[#7d4b1a]"/> Chu kỳ nuôi (Ngày)</label>
              <input type="number" placeholder="VD: 45" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none font-medium text-sm" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2 flex items-center gap-1.5"><DollarSign className="w-4 h-4 text-[#7d4b1a]"/> Vốn mục tiêu (VNĐ)</label>
              <input type="number" placeholder="75,000,000" className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none font-medium text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-[#171717] mb-2">Mô tả kế hoạch / Định mức chi phí sơ bộ</label>
            <textarea rows={4} placeholder="Nhập tóm tắt chi phí giống, thức ăn, điện nước, nhân công..." className="w-full p-3 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm"></textarea>
          </div>

          <div className="bg-[#fff8ef] border border-[#f4cf9c] p-4 rounded-md text-sm text-[#7d4b1a]">
            <strong>Lưu ý:</strong> Sau khi gửi đề xuất, đội ngũ Admin Platform sẽ xem xét và chốt bảng Standard Cost (Chi phí định mức) cùng Hợp đồng trước khi mở gọi vốn công khai.
          </div>

          <button type="button" onClick={() => { window.alert('Đã gửi đề xuất mở Lô Nuôi mới!'); window.location.href='/operator/batch'; }} className="w-full flex items-center justify-center gap-2 bg-[#7d4b1a] hover:bg-[#633912] text-white px-6 py-4 rounded font-bold text-sm transition-colors uppercase tracking-widest shadow-md">
            <Send className="w-4 h-4" /> Gửi Đề Xuất Lên Platform
          </button>
        </form>
      </div>
    </OperatorLayout>
  );
}
