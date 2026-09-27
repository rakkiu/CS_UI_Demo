import React from 'react';
import { PenTool, Download } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorContract() {
  return (
    <OperatorLayout activeTab="batch">
      <header className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Ký kết Hợp đồng Hợp tác</h1>
          <p className="text-sm text-gray-500 mt-1">Lô BATCH-2026-11A (Cua Lột 11A)</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded text-sm font-bold transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Tải bản PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-8 rounded-lg border border-gray-200 shadow-sm h-[600px] overflow-y-auto">
          {/* Mock Document */}
          <div className="max-w-xl mx-auto space-y-6 text-sm text-gray-800 leading-relaxed font-serif">
            <h2 className="text-xl font-bold text-center text-black">HỢP ĐỒNG HỢP TÁC SẢN XUẤT<br/><span className="text-sm font-normal">Số: BATCH-2026-11A/HTSX</span></h2>
            <p>Hôm nay, ngày 01 tháng 10 năm 2026, tại nền tảng CrabShare, chúng tôi gồm:</p>
            <div>
              <strong>BÊN A (NỀN TẢNG CRABSHARE):</strong>
              <p>Công ty CP Công nghệ CrabShare Vietnam</p>
              <p>MST: 0318928419</p>
            </div>
            <div>
              <strong>BÊN B (ĐỐI TÁC VẬN HÀNH / OPERATOR):</strong>
              <p>Trại Cần Giờ 01 (Ông Nguyễn Văn A)</p>
              <p>MST/CCCD: 079200123456</p>
            </div>
            <h3 className="font-bold text-black mt-4">ĐIỀU 1: NỘI DUNG HỢP TÁC</h3>
            <p>Bên B đồng ý tiếp nhận số vốn giải ngân là <strong>75.000.000 VNĐ</strong> để triển khai nuôi 1.500 con giống Cua Lột theo tiêu chuẩn RAS.</p>
            
            <h3 className="font-bold text-black mt-4">ĐIỀU 2: ĐỊNH MỨC CHI PHÍ VÀ LỢI NHUẬN</h3>
            <p>Tỷ lệ ăn chia doanh thu ròng: Bên B nhận <strong>60%</strong>, Nhà đầu tư và Nền tảng nhận 40%.</p>

            <h3 className="font-bold text-black mt-4">ĐIỀU 3: DANH SÁCH NHÀ ĐẦU TƯ GÓP VỐN (THỰC TẾ)</h3>
            <p className="italic text-xs text-gray-500 mb-2">Đính kèm theo nền tảng, số liệu đã chốt khi đóng gọi vốn.</p>
            <table className="w-full text-left border-collapse mt-2 text-sm border border-gray-300">
              <thead className="bg-gray-100">
                <tr><th className="p-2 border border-gray-300">Nhà đầu tư</th><th className="p-2 border border-gray-300">Tỷ lệ</th><th className="p-2 border border-gray-300">Số tiền góp</th></tr>
              </thead>
              <tbody>
                <tr><td className="p-2 border border-gray-300">Trần Trọng A</td><td className="p-2 border border-gray-300 font-bold">30%</td><td className="p-2 border border-gray-300">22.500.000 ₫</td></tr>
                <tr><td className="p-2 border border-gray-300">Lê Thị B</td><td className="p-2 border border-gray-300 font-bold">50%</td><td className="p-2 border border-gray-300">37.500.000 ₫</td></tr>
                <tr><td className="p-2 border border-gray-300">Phạm Văn C</td><td className="p-2 border border-gray-300 font-bold">20%</td><td className="p-2 border border-gray-300">15.000.000 ₫</td></tr>
                <tr className="bg-gray-50 font-bold"><td className="p-2 border border-gray-300">Tổng cộng (100%)</td><td className="p-2 border border-gray-300">100%</td><td className="p-2 border border-gray-300">75.000.000 ₫</td></tr>
              </tbody>
            </table>

            <div className="pt-16 pb-10 flex justify-between">
              <div className="text-center">
                <strong>ĐẠI DIỆN BÊN A</strong>
                <p className="italic text-gray-500 mt-2">(Đã ký số bằng hệ thống)</p>
                <p className="mt-8 font-bold">CRABSHARE VIETNAM</p>
              </div>
              <div className="text-center">
                <strong>ĐẠI DIỆN BÊN B</strong>
                <div className="w-32 h-16 border-2 border-dashed border-red-300 bg-red-50 mt-2 mx-auto flex items-center justify-center text-red-500 text-xs font-bold">
                  Khu vực ký
                </div>
                <p className="mt-2 font-bold">NGUYỄN VĂN A</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff8ef] p-6 rounded-lg border border-[#f4cf9c] shadow-sm self-start sticky top-6">
          <h3 className="font-extrabold text-[#7d4b1a] mb-4">Trạng thái Ký kết</h3>
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between border-b border-[#f4cf9c] pb-2">
              <span className="text-gray-600">Đại diện Platform</span>
              <span className="font-bold text-[#15803d]">Đã ký</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600">Operator (Bạn)</span>
              <span className="font-bold text-[#b42318]">Chờ ký</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="flex items-start gap-2 text-xs text-gray-700">
              <input type="checkbox" className="mt-0.5 accent-[#7d4b1a]" />
              <span>Tôi đã đọc, hiểu và đồng ý với toàn bộ các điều khoản trong hợp đồng hợp tác BATCH-2026-11A.</span>
            </label>
            <button onClick={() => { window.alert('Ký số thành công! Hợp đồng đã có hiệu lực.'); window.location.href='/operator/batch'; }} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-4 py-3 rounded font-bold text-sm transition-colors shadow-md mt-4">
              <PenTool className="w-4 h-4" /> Ký Hợp Đồng Ngay
            </button>
            <p className="text-[10px] text-gray-500 text-center mt-2">Sử dụng chữ ký số nội bộ CrabShare. OTP sẽ được gửi về SĐT đăng ký.</p>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
