
import { useState } from 'react';
import { PenTool, Download, ShieldCheck, Key, FileCheck, CheckCircle2, Loader2, X } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorContract() {
  const [agreed, setAgreed] = useState(false);
  const [showViettelCA, setShowViettelCA] = useState(false);
  const [signStep, setSignStep] = useState(0); // 0: Login, 1: Loading, 2: Success
  const [isSigned, setIsSigned] = useState(false);

  const handleSignClick = () => {
    if (!agreed) return alert('Vui lòng đồng ý với các điều khoản trước khi ký!');
    setShowViettelCA(true);
    setSignStep(0);
  };

  const handleViettelAuth = () => {
    setSignStep(1);
    // Giả lập quá trình gọi API Viettel CA
    setTimeout(() => {
      setSignStep(2);
      setIsSigned(true);
      setTimeout(() => {
        setShowViettelCA(false);
      }, 2000);
    }, 2500);
  };

  return (
    <OperatorLayout activeTab="batch">
      <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Ký kết Hợp đồng Hợp tác</h1>
          <p className="text-sm text-gray-500 mt-1">Lô BATCH-2026-11A (Cua Lột 11A)</p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2.5 rounded text-sm font-bold transition-colors shadow-sm">
          <Download className="w-4 h-4" /> Tải bản PDF
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-4 sm:p-8 rounded-lg border border-gray-200 shadow-sm h-[600px] overflow-y-auto">
          {/* Mock Document */}
          <div className="max-w-xl mx-auto space-y-6 text-sm text-gray-800 leading-relaxed font-serif relative">
            
            {/* Watermark nếu đã ký */}
            {isSigned && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <ShieldCheck className="w-64 h-64 text-[#15803d]" />
              </div>
            )}

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
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse mt-2 text-sm border border-gray-300">
                <thead className="bg-gray-100">
                  <tr><th className="p-2 border border-gray-300 whitespace-nowrap">Nhà đầu tư</th><th className="p-2 border border-gray-300">Tỷ lệ</th><th className="p-2 border border-gray-300 whitespace-nowrap">Số tiền góp</th></tr>
                </thead>
                <tbody>
                  <tr><td className="p-2 border border-gray-300">Trần Trọng A</td><td className="p-2 border border-gray-300 font-bold">30%</td><td className="p-2 border border-gray-300">22.500.000 ₫</td></tr>
                  <tr><td className="p-2 border border-gray-300">Lê Thị B</td><td className="p-2 border border-gray-300 font-bold">50%</td><td className="p-2 border border-gray-300">37.500.000 ₫</td></tr>
                  <tr><td className="p-2 border border-gray-300">Phạm Văn C</td><td className="p-2 border border-gray-300 font-bold">20%</td><td className="p-2 border border-gray-300">15.000.000 ₫</td></tr>
                  <tr className="bg-gray-50 font-bold"><td className="p-2 border border-gray-300">Tổng cộng (100%)</td><td className="p-2 border border-gray-300">100%</td><td className="p-2 border border-gray-300">75.000.000 ₫</td></tr>
                </tbody>
              </table>
            </div>

            <div className="pt-16 pb-10 flex flex-col sm:flex-row justify-between gap-10">
              <div className="text-center">
                <strong>ĐẠI DIỆN BÊN A</strong>
                <div className="w-48 border-2 border-green-600 bg-green-50 mt-2 mx-auto p-2 flex flex-col items-center justify-center text-green-700 text-[10px] font-bold rounded shadow-sm opacity-90 transform -rotate-2">
                  <span className="text-xs">Ký bởi: CRABSHARE VN</span>
                  <span>Thời gian: 01/10/2026 08:30:12</span>
                  <span>Chứng thư: Viettel-CA Cloud</span>
                </div>
                <p className="mt-4 font-bold">CRABSHARE VIETNAM</p>
              </div>
              <div className="text-center">
                <strong>ĐẠI DIỆN BÊN B</strong>
                {!isSigned ? (
                  <div className="w-32 h-16 border-2 border-dashed border-red-300 bg-red-50 mt-2 mx-auto flex items-center justify-center text-red-500 text-xs font-bold">
                    Khu vực ký
                  </div>
                ) : (
                  <div className="w-48 border-2 border-red-600 bg-red-50 mt-2 mx-auto p-2 flex flex-col items-center justify-center text-red-700 text-[10px] font-bold rounded shadow-sm opacity-90 transform rotate-1">
                    <span className="text-xs uppercase">Ký bởi: Nguyễn Văn A</span>
                    <span>Thời gian: Vừa xong</span>
                    <span>Chứng thư: Viettel-CA Cloud</span>
                  </div>
                )}
                <p className="mt-4 font-bold uppercase">Nguyễn Văn A</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#fff8ef] p-6 rounded-lg border border-[#f4cf9c] shadow-sm self-start sticky top-6">
          <h3 className="font-extrabold text-[#7d4b1a] mb-4">Trạng thái Ký kết</h3>
          <div className="space-y-4 mb-8 text-sm">
            <div className="flex justify-between border-b border-[#f4cf9c] pb-2">
              <span className="text-gray-600">Đại diện Platform</span>
              <span className="font-bold text-[#15803d] flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Đã ký</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-gray-600">Operator (Bạn)</span>
              <span className={`font-bold flex items-center gap-1 ${isSigned ? 'text-[#15803d]' : 'text-[#b42318]'}`}>
                {isSigned ? <><CheckCircle2 className="w-4 h-4"/> Đã ký</> : 'Chờ ký'}
              </span>
            </div>
          </div>

          {!isSigned ? (
            <div className="space-y-3">
              <label className="flex items-start gap-2 text-xs text-gray-700 cursor-pointer">
                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-0.5 accent-[#7d4b1a] w-4 h-4" />
                <span className="leading-tight">Tôi đã đọc, hiểu và đồng ý với toàn bộ các điều khoản trong hợp đồng hợp tác BATCH-2026-11A.</span>
              </label>
              <button onClick={handleSignClick} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-4 py-3 rounded font-bold text-sm transition-colors shadow-md mt-4">
                <PenTool className="w-4 h-4" /> Ký Hợp Đồng Ngay
              </button>
              <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-[#f4cf9c]">
                <ShieldCheck className="w-5 h-5 text-red-600" />
                <span className="text-[11px] font-bold text-gray-600 uppercase tracking-wide">Tích hợp Viettel-CA Cloud</span>
              </div>
            </div>
          ) : (
            <div className="text-center p-4 bg-[#f0fdf4] border border-[#bbf7d0] rounded-lg">
              <ShieldCheck className="w-10 h-10 text-[#15803d] mx-auto mb-2" />
              <p className="font-bold text-[#15803d]">Hợp đồng đã có hiệu lực</p>
              <p className="text-xs text-gray-600 mt-1">Văn bản đã được ký số hợp lệ và lưu trữ trên hệ thống Blockchain.</p>
              <button onClick={() => window.location.href='/operator/batch'} className="w-full mt-4 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-bold shadow-sm hover:bg-gray-50 transition-colors">
                Trở về Danh sách Lô
              </button>
            </div>
          )}
        </div>
      </div>

      {/* VIETTEL CA MODAL */}
      {showViettelCA && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="bg-red-600 p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-white" />
                <div>
                  <h3 className="font-bold text-base leading-tight tracking-wide">Cổng Ký Số Điện Tử</h3>
                  <p className="text-[10px] font-medium opacity-90 uppercase">Được cung cấp bởi Viettel-CA</p>
                </div>
              </div>
              <button onClick={() => setShowViettelCA(false)} className="text-red-200 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {signStep === 0 && (
                <div className="space-y-4">
                  <div className="bg-red-50 text-red-700 p-3 rounded-lg flex items-start gap-3 border border-red-100 mb-6">
                    <FileCheck className="w-5 h-5 mt-0.5 shrink-0" />
                    <p className="text-xs font-medium">Bạn đang thực hiện ký số văn bản <strong>BATCH-2026-11A/HTSX</strong>. Vui lòng xác thực tài khoản Viettel-CA Cloud.</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Tài khoản Viettel-CA (CCCD)</label>
                    <input type="text" defaultValue="079200123456" className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1 uppercase tracking-wide">Mã PIN</label>
                    <input type="password" defaultValue="123456" className="w-full border border-gray-300 rounded px-3 py-2.5 text-sm font-semibold text-gray-800 outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" />
                  </div>
                  
                  <button onClick={handleViettelAuth} className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded mt-2 flex items-center justify-center gap-2 transition-colors">
                    <Key className="w-4 h-4" /> Xác thực & Ký ngay
                  </button>
                </div>
              )}

              {signStep === 1 && (
                <div className="py-12 flex flex-col items-center justify-center text-center">
                  <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
                  <h4 className="font-bold text-gray-800 text-lg">Đang xác thực chứng thư...</h4>
                  <p className="text-sm text-gray-500 mt-2">Hệ thống đang mã hóa văn bản và chèn chữ ký số Viettel-CA. Vui lòng không đóng cửa sổ này.</p>
                </div>
              )}

              {signStep === 2 && (
                <div className="py-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-10 h-10 text-green-600" />
                  </div>
                  <h4 className="font-bold text-green-700 text-lg">Ký Số Thành Công!</h4>
                  <p className="text-sm text-gray-600 mt-2 px-4">Văn bản đã được ký đóng dấu pháp lý hợp lệ bởi chứng thư số <strong>Nguyễn Văn A</strong>.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </OperatorLayout>
  );
}
