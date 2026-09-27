import React from 'react';
import { ArrowLeft, Briefcase, FileText, Users, DollarSign, ExternalLink, AlertTriangle, ArrowRight } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorBatchDetail() {
  const investors = [
    { name: 'Trần Trọng A', role: 'Nhà đầu tư cá nhân', amount: '22.500.000 ₫', percent: '30%', status: 'Đã giải ngân' },
    { name: 'Lê Thị B', role: 'Nhà đầu tư cá nhân', amount: '37.500.000 ₫', percent: '50%', status: 'Đã giải ngân' },
    { name: 'Phạm Văn C', role: 'Nhà đầu tư cá nhân', amount: '15.000.000 ₫', percent: '20%', status: 'Đã giải ngân' },
  ];

  return (
    <OperatorLayout activeTab="batch">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <button onClick={() => window.location.href='/operator/batch'} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7d4b1a] transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Lô
          </button>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Chi tiết Nguồn vốn & Bao tiêu</h1>
          <p className="text-sm text-gray-500 mt-1">Lô BATCH-2026-11A (Cua Lột 11A)</p>
        </div>
      </header>

      {/* WARNING BLOCK IF ALERTS EXIST */}
      <div className="mb-6 bg-[#fef2f2] border border-[#fca5a5] p-5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#b42318] text-white rounded-full flex items-center justify-center flex-shrink-0 animate-pulse shadow-md">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-[#b42318] text-base">Lô này đang có 2 cảnh báo IoT cần xử lý gấp!</h4>
            <p className="text-sm text-[#b42318] font-medium mt-0.5">Phát hiện bất thường tại ô <strong className="font-extrabold underline">S-54</strong> và <strong className="font-extrabold underline">S-102</strong> (Độ pH tăng cao).</p>
          </div>
        </div>
        <button onClick={() => window.location.href='/operator/alerts'} className="w-full sm:w-auto bg-[#b42318] hover:bg-[#991b1b] text-white px-5 py-2.5 rounded text-sm font-bold shadow-md transition-colors whitespace-nowrap flex items-center justify-center gap-2">
          Xử lý Cảnh Báo <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-[#7d4b1a] shadow-sm ring-1 ring-[#fff8ef]">
            <div className="flex items-center gap-3 mb-4 border-b border-gray-100 pb-3">
              <div className="w-8 h-8 rounded-full bg-[#fff8ef] text-[#7d4b1a] flex items-center justify-center border border-[#f4cf9c]">
                <Briefcase className="w-4 h-4" />
              </div>
              <h2 className="text-lg font-extrabold text-[#171717]">Đối tác Bao tiêu (Offtake Agreement)</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1 text-xs font-bold uppercase">Đơn vị mua</p>
                <p className="font-extrabold text-[#171717]">Chuỗi Nhà Hàng Biển Đông</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs font-bold uppercase">Deal Giá chốt</p>
                <p className="font-extrabold text-[#15803d]">350,000 ₫ / kg</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs font-bold uppercase">Cam kết thu mua</p>
                <p className="font-extrabold text-[#171717]">100% Sản lượng</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs font-bold uppercase">Trạng thái</p>
                <span className="bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] px-2 py-0.5 rounded text-xs font-bold">Đã ký kết HĐ</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-50 text-gray-600 flex items-center justify-center border border-gray-200">
                  <Users className="w-4 h-4" />
                </div>
                <h2 className="text-lg font-extrabold text-[#171717]">Danh sách Nhà Đầu Tư (Investors)</h2>
              </div>
              <span className="text-sm font-bold text-gray-500">Tổng huy động: <strong className="text-[#171717]">75.000.000 ₫</strong></span>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-500">
                    <th className="p-3 font-bold border-b border-gray-200 rounded-tl">Tên Nhà Đầu Tư</th>
                    <th className="p-3 font-bold border-b border-gray-200">Phân loại</th>
                    <th className="p-3 font-bold border-b border-gray-200 text-right">Số tiền góp</th>
                    <th className="p-3 font-bold border-b border-gray-200 text-right">Tỷ lệ</th>
                    <th className="p-3 font-bold border-b border-gray-200 rounded-tr">Trạng thái</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {investors.map((inv, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 font-extrabold text-[#7d4b1a]">{inv.name}</td>
                      <td className="p-3 text-gray-600 font-medium">{inv.role}</td>
                      <td className="p-3 font-bold text-right text-[#171717]">{inv.amount}</td>
                      <td className="p-3 font-bold text-right text-[#171717]">{inv.percent}</td>
                      <td className="p-3">
                        <span className="bg-[#f0fdf4] text-[#15803d] px-2 py-1 rounded text-[10px] font-bold tracking-wide uppercase">{inv.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h3 className="font-extrabold text-[#171717] mb-4 border-b border-gray-100 pb-2">Hồ sơ Pháp lý Lô Nuôi</h3>
            <div className="space-y-3">
              <button onClick={() => window.location.href='/operator/contract'} className="w-full flex items-center justify-between p-3 border border-gray-200 rounded hover:border-[#7d4b1a] hover:bg-[#fff8ef] transition-all group">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-[#7d4b1a]" />
                  <div className="text-left">
                    <p className="text-sm font-bold text-[#171717]">Hợp đồng Sản xuất (Platform)</p>
                    <p className="text-[10px] text-gray-500">Ký giữa Trại và CrabShare</p>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-gray-300 group-hover:text-[#7d4b1a]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
