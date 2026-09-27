
import { UploadCloud, CheckCircle, ShieldCheck, FileText } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorKyc() {
  return (
    <OperatorLayout activeTab="kyc">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Hồ sơ pháp lý & eKYC</h1>
        <p className="text-sm text-gray-500 mt-1">Xác thực danh tính và cung cấp giấy phép trang trại</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cột 1: CCCD / Chụp mặt */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#f0fdf4] text-[#15803d] flex items-center justify-center border border-[#bbf7d0]">
              <CheckCircle className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-[#171717]">1. Xác thực Danh tính (Đã duyệt)</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="w-1/2 aspect-[1.6] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center relative overflow-hidden">
                <img src="/assets/imgQuestionCardSection.png" className="opacity-40 object-cover w-full h-full absolute" alt="CCCD" />
                <span className="text-xs font-bold text-gray-600 relative z-10 bg-white/80 px-2 py-1 rounded">Mặt trước CCCD</span>
              </div>
              <div className="w-1/2 aspect-[1.6] bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center">
                <span className="text-xs font-bold text-gray-400">Mặt sau CCCD</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 rounded text-sm text-gray-600 border border-gray-100">
              <p><strong>Họ và tên:</strong> NGUYỄN VĂN A</p>
              <p><strong>Số CCCD:</strong> 079200123456</p>
              <p><strong>Liveness (Face):</strong> <span className="text-[#15803d] font-bold">Khớp 99.8%</span></p>
            </div>
          </div>
        </div>

        {/* Cột 2: Giấy phép kinh doanh / Farm */}
        <div className="bg-white p-6 rounded-lg border border-[#f4cf9c] shadow-sm ring-1 ring-[#fff8ef]">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-[#fff8ef] text-[#b45309] flex items-center justify-center border border-[#f4cf9c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h2 className="text-base font-extrabold text-[#7d4b1a]">2. Giấy phép Trại & Hợp đồng (Cần bổ sung)</h2>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Giấy phép đăng ký kinh doanh (PDF/JPG)</label>
              <div className="border-2 border-dashed border-[#f4cf9c] bg-[#fff8ef] rounded-lg p-6 flex flex-col items-center justify-center text-[#7d4b1a] hover:bg-[#ffedd5] cursor-pointer transition-colors">
                <UploadCloud className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold">Tải lên Giấy phép KD</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Chứng nhận VietGAP / Cở sở đủ điều kiện</label>
              <div className="border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">
                <UploadCloud className="w-6 h-6 mb-2" />
                <span className="text-xs font-bold">Tải lên Chứng nhận</span>
              </div>
            </div>

            <button onClick={() => { window.alert('Đã gửi hồ sơ cho Admin xét duyệt!'); }} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-6 py-3 rounded font-bold text-sm transition-colors uppercase tracking-widest shadow-md">
              <FileText className="w-4 h-4" /> Gửi Xét Duyệt
            </button>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
