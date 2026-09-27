
import { DollarSign, CheckCircle, PieChart, TrendingUp, ArrowLeft, ArrowRight, FileCheck } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorSettlement() {
  const params = new URLSearchParams(window.location.search);
  const batchId = params.get('batchId');

  // MÀN HÌNH 1: DANH SÁCH LÔ CHỜ QUYẾT TOÁN
  if (!batchId) {
    const settlementBatches = [
      { id: 'BATCH-2026-09A', name: 'Lô Cua Lột 09A', totalRev: '125.500.000', cost: '50.000.000', profit: '75.500.000', status: 'Chờ Bạn Xác Nhận', action: true },
      { id: 'BATCH-2026-08B', name: 'Lô Cua Gạch 08B', totalRev: '90.200.000', cost: '40.000.000', profit: '50.200.000', status: 'Đã Nhận Tiền', action: false },
    ];

    return (
      <OperatorLayout activeTab="settlement">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Đối soát & Quyết toán Doanh thu</h1>
          <p className="text-sm text-gray-500 mt-1">Chọn các lô cua đã xuất bán hoàn tất để tiến hành đối soát và nhận tiền.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settlementBatches.map(b => (
            <div key={b.id} onClick={() => window.location.href=`/operator/settlement?batchId=${b.id}`} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#7d4b1a] shadow-sm cursor-pointer transition-all hover:shadow-md relative overflow-hidden">
              {b.action && (
                <div className="absolute top-0 right-0 bg-[#b42318] text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">CẦN XỬ LÝ</div>
              )}
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#7d4b1a]">{b.id}</h2>
                  <p className="text-sm font-bold text-gray-500">{b.name}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${b.action ? 'bg-[#fff8ef] text-[#7d4b1a] border-[#f4cf9c]' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {b.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng Doanh Thu</p>
                  <p className="font-extrabold text-[#15803d] text-lg">{b.totalRev} <span className="text-xs font-medium">₫</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Chi phí / Vốn ứng</p>
                  <p className="font-extrabold text-[#b42318] text-lg">-{b.cost} <span className="text-xs font-medium">₫</span></p>
                </div>
                <div className="col-span-2 bg-gray-50 p-2 rounded flex justify-between items-center border border-gray-100">
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">Lợi nhuận gộp</p>
                  <p className="font-extrabold text-[#171717]">{b.profit} <span className="text-xs font-medium">₫</span></p>
                </div>
              </div>

              <button className={`w-full mt-5 py-2.5 rounded font-bold text-sm flex items-center justify-center gap-2 transition-colors ${b.action ? 'bg-[#171717] text-white hover:bg-[#333]' : 'bg-white border border-gray-200 text-gray-500'}`}>
                <FileCheck className="w-4 h-4" /> Xem Bảng Đối Soát <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </OperatorLayout>
    );
  }

  // MÀN HÌNH 2: BẢNG ĐỐI SOÁT CHI TIẾT
  return (
    <OperatorLayout activeTab="settlement">
      <header className="mb-6">
        <button onClick={() => window.location.href='/operator/settlement'} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7d4b1a] transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Lô
        </button>
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Chi tiết Đối soát Doanh thu</h1>
        <p className="text-sm text-gray-500 mt-1">Lô {batchId} (Trạng thái: Đã tất toán)</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Tổng Doanh thu Bán ra</p>
            <h3 className="text-2xl font-extrabold text-[#15803d]">125.500.000 ₫</h3>
          </div>
          <div className="w-12 h-12 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full flex items-center justify-center text-[#15803d]">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#b42318] uppercase tracking-wider mb-1">Chi phí Sản xuất (Đã ứng)</p>
            <h3 className="text-2xl font-extrabold text-[#b42318]">- 50.000.000 ₫</h3>
          </div>
          <div className="w-12 h-12 bg-[#fef2f2] border border-[#fca5a5] rounded-full flex items-center justify-center text-[#b42318]">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-[#fff8ef] p-6 rounded-lg border border-[#f4cf9c] shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-[#7d4b1a] uppercase tracking-wider mb-1">Lợi nhuận gộp</p>
            <h3 className="text-2xl font-extrabold text-[#7d4b1a]">75.500.000 ₫</h3>
          </div>
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#7d4b1a] shadow-sm">
            <PieChart className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
          <h2 className="text-base font-extrabold text-[#171717] mb-6 border-b border-gray-100 pb-3">Bảng phân bổ Doanh thu (Hợp đồng 60/40)</h2>
          <div className="space-y-5 text-sm">
            <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-gray-100">
              <span className="text-gray-600 font-medium">Nhà Đầu Tư & Nền tảng (40%)</span>
              <span className="font-bold text-[#171717]">30.200.000 ₫</span>
            </div>
            <div className="flex justify-between items-center py-4 border-y border-dashed border-gray-300">
              <span className="text-[#7d4b1a] font-extrabold text-base">Thực nhận của Trại vận hành (60%)</span>
              <span className="font-extrabold text-xl text-[#15803d]">45.300.000 ₫</span>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500 pt-2 bg-[#f0f9ff] p-3 rounded border border-[#bae6fd]">
              <span className="font-medium text-[#0369a1]">Tài khoản thụ hưởng (Auto-Payout):</span>
              <strong className="text-[#0369a1]">Vietcombank • 0123456789 • NGUYEN VAN A</strong>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-center">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#f0fdf4] border border-[#bbf7d0] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-[#15803d]" />
            </div>
            <h3 className="font-extrabold text-[#171717] text-xl">Lô Cua Đã Bán Xong Toàn Bộ!</h3>
            <p className="text-sm font-medium text-gray-500 mt-3 leading-relaxed">Nền tảng đã thu tiền từ người mua lẻ và đối tác sỉ thành công. Bạn vui lòng xác nhận báo cáo để hệ thống tự động chuyển khoản doanh thu vào thẻ.</p>
          </div>
          <button onClick={() => { window.alert('Xác nhận thành công! Tiền sẽ được chuyển về tài khoản trong 2H.'); window.location.href='/operator/settlement'; }} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-4 py-3.5 rounded font-bold text-sm transition-colors uppercase tracking-widest shadow-md">
            Xác Nhận Đối Soát & Rút Tiền
          </button>
        </div>
      </div>
    </OperatorLayout>
  );
}
