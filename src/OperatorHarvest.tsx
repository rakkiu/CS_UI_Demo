
import { QrCode, PlusCircle, Box, PackageCheck, UploadCloud, ArrowLeft, ArrowRight, Package } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorHarvest() {
  const params = new URLSearchParams(window.location.search);
  const batchId = params.get('batchId');

  // MÀN HÌNH 1: DANH SÁCH CÁC LÔ SẴN SÀNG THU HOẠCH
  if (!batchId) {
    const readyBatches = [
      { id: 'BATCH-2026-10B', type: 'Cua Gạch', total: 800, sold: 150, frozen: 50, remaining: 600, status: 'Đang thu hoạch mạnh' },
      { id: 'BATCH-2026-11A', type: 'Cua Lột', total: 1500, sold: 10, frozen: 0, remaining: 1490, status: 'Bắt đầu lột tẻ tẻ' },
    ];

    return (
      <OperatorLayout activeTab="harvest">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Quản lý Xuất Bán & Thu Hoạch</h1>
          <p className="text-sm text-gray-500 mt-1">Chọn lô cua đã đạt tiêu chuẩn để tiến hành gắn QR và Đóng gói</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {readyBatches.map(b => (
            <div key={b.id} onClick={() => window.location.href=`/operator/harvest?batchId=${b.id}`} className="bg-white p-6 rounded-lg border border-gray-200 hover:border-[#7d4b1a] shadow-sm cursor-pointer transition-all hover:shadow-md">
              <div className="flex justify-between items-start mb-4 border-b border-gray-100 pb-4">
                <div>
                  <h2 className="text-lg font-extrabold text-[#7d4b1a]">{b.id}</h2>
                  <p className="text-sm font-bold text-gray-500">{b.type}</p>
                </div>
                <span className="bg-[#f0fdf4] text-[#15803d] border border-[#bbf7d0] px-3 py-1 rounded-full text-xs font-bold">
                  {b.status}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Tổng sản lượng</p>
                  <p className="font-extrabold text-[#171717] text-lg">{b.total} <span className="text-xs font-medium text-gray-500">con</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-[#b45309] uppercase tracking-wider mb-1">Tồn kho thực tế (Sẵn sàng)</p>
                  <p className="font-extrabold text-[#b45309] text-lg">{b.remaining} <span className="text-xs font-medium opacity-80">con</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Đã Bán & Đóng gói</p>
                  <p className="font-extrabold text-[#171717]">{b.sold} <span className="text-xs font-medium text-gray-500">con</span></p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Trữ đông / Pre-order</p>
                  <p className="font-extrabold text-[#0369a1]">{b.frozen} <span className="text-xs font-medium opacity-80">con</span></p>
                </div>
              </div>

              <button className="w-full mt-6 bg-[#fff8ef] text-[#7d4b1a] border border-[#f4cf9c] py-2.5 rounded font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#ffedd5] transition-colors">
                <Package className="w-4 h-4" /> Vào Khu Vực Thu Hoạch <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </OperatorLayout>
    );
  }

  // MÀN HÌNH 2: CHI TIẾT THU HOẠCH 1 LÔ (UI CŨ ĐÃ LÀM)
  const harvestedItems = [
    { id: 'CRAB-7392-L1', weight: '210g', type: 'Cua lột chuẩn', status: 'Đã gắn mã QR' },
    { id: 'CRAB-7393-L1', weight: '225g', type: 'Cua lột loại 1', status: 'Đã gắn mã QR' },
  ];

  return (
    <OperatorLayout activeTab="harvest">
      <header className="mb-6">
        <button onClick={() => window.location.href='/operator/harvest'} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#7d4b1a] transition-colors mb-2">
          <ArrowLeft className="w-4 h-4" /> Quay lại danh sách Lô
        </button>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Khu vực Thu Hoạch & Đóng Gói</h1>
            <p className="text-sm text-gray-500 mt-1">Lô {batchId} • Khả dụng: 600 con</p>
          </div>
        </div>
      </header>

      {/* TÍNH NĂNG MỚI: ĐỊNH GIÁ BÁN THEO BR-56 */}
      <div className="bg-[#fff8ef] p-6 rounded-lg border border-[#f4cf9c] shadow-sm mb-6">
        <div className="flex justify-between items-center mb-4 border-b border-[#f4cf9c] pb-3">
          <h2 className="text-base font-extrabold text-[#7d4b1a]">Thiết lập Giá Bán & Yêu cầu lên Cửa hàng (Storefront)</h2>
          <span className="text-xs font-bold bg-[#ffedd5] text-[#7d4b1a] px-2 py-1 rounded">BR-56: Operator tự định giá</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-bold text-[#171717] mb-2">Cua Lột Loại 1 (200g+)</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={850000} className="w-full p-2 border border-[#f4cf9c] bg-white rounded font-mono font-bold text-[#7d4b1a] focus:outline-none focus:border-[#7d4b1a]" />
              <span className="text-sm font-bold text-gray-500">VND/kg</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#171717] mb-2">Cua Lột Loại 2 (150g+)</label>
            <div className="flex items-center gap-2">
              <input type="number" defaultValue={650000} className="w-full p-2 border border-[#f4cf9c] bg-white rounded font-mono font-bold text-[#7d4b1a] focus:outline-none focus:border-[#7d4b1a]" />
              <span className="text-sm font-bold text-gray-500">VND/kg</span>
            </div>
          </div>
          <div className="flex items-end">
            <button onClick={() => alert('Đã lưu giá và gửi yêu cầu đến Admin. Chờ Admin duyệt lên Storefront!')} className="w-full bg-[#7d4b1a] hover:bg-[#6b3f15] text-white py-2.5 rounded font-bold text-sm shadow-md transition-colors flex justify-center items-center gap-2">
              <PackageCheck className="w-4 h-4" /> Yêu cầu Admin Duyệt Lên Kệ
            </button>
          </div>
        </div>
        <p className="text-xs text-[#7d4b1a] mt-3 italic">* Hệ thống cảnh báo: Giá Cua Loại 1 của bạn đang cao hơn 10% so với mặt bằng chung (Đây chỉ là cảnh báo, Nền tảng không áp giá theo quy định BR-56).</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Cột 1: Form Sinh QR */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <h2 className="text-base font-extrabold text-[#7d4b1a] mb-5 border-b border-gray-100 pb-3">1. Khai báo & Gắn tem QR</h2>
          <p className="text-xs text-gray-500 mb-4">Sinh tem truy xuất nguồn gốc từng con cua lúc bắt ra khỏi hộp.</p>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Trọng lượng (gram)</label>
              <input type="number" placeholder="VD: 250" className="w-full p-2 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm font-medium" />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Phân loại chất lượng</label>
              <select className="w-full p-2 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm font-medium bg-white">
                <option>Loại 1 (Tuyệt hảo - 200g+)</option>
                <option>Loại 2 (Tiêu chuẩn - 150g+)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Vị trí Lồng (Slot ID)</label>
              <input type="text" placeholder="S-25" className="w-full p-2 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm font-medium" />
            </div>
            <button className="w-full flex items-center justify-center gap-2 bg-[#fff8ef] text-[#7d4b1a] border border-[#f4cf9c] px-4 py-2.5 rounded font-bold text-sm hover:bg-[#ffedd5] transition-colors mt-2 shadow-sm">
              <PlusCircle className="w-4 h-4" /> In Tem QR Mới
            </button>
          </div>
        </div>

        {/* Cột 2: Đóng hàng giao khách */}
        <div className="bg-white p-6 rounded-lg border border-[#7d4b1a] shadow-sm flex flex-col ring-1 ring-[#fff8ef]">
          <h2 className="text-base font-extrabold text-[#171717] mb-5 border-b border-gray-100 pb-3">2. Đóng Hàng Giao Khách</h2>
          <p className="text-xs text-gray-500 mb-4">Xử lý đơn bán lẻ từ nền tảng. Khách mua cua, Trại đóng gói gửi Ship.</p>
          <div className="space-y-4 flex-1">
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Mã Đơn / Tên Khách</label>
              <input type="text" defaultValue="ORD-9982 (Anh Tuấn)" readOnly className="w-full p-2 border border-gray-200 bg-gray-50 rounded outline-none text-sm font-bold text-[#7d4b1a]" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold text-[#171717] mb-2">Số lượng (con)</label>
                <input type="number" placeholder="VD: 2" className="w-full p-2 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm font-medium" />
              </div>
              <div>
                <label className="block text-sm font-bold text-[#171717] mb-2">Tổng ký (gram)</label>
                <input type="number" placeholder="VD: 550" className="w-full p-2 border border-gray-300 rounded focus:border-[#7d4b1a] outline-none text-sm font-medium" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-2">Hình ảnh đóng thùng (Tình trạng cua)</label>
              <div className="border border-dashed border-gray-300 bg-gray-50 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer transition-colors">
                <UploadCloud className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-bold">Chụp & Tải ảnh lên</span>
              </div>
            </div>
          </div>
          <button onClick={() => alert('Đã báo đóng hàng xong! Khách hàng sẽ nhận được thông báo trạng thái đơn hàng.')} className="w-full flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-4 py-3 rounded font-bold text-sm transition-colors mt-6 shadow-md">
            <PackageCheck className="w-4 h-4" /> Báo Hoàn Tất Đóng Hàng
          </button>
        </div>

        {/* Cột 3: Danh sách QR */}
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-5 border-b border-gray-100 pb-3">
            <h2 className="text-base font-extrabold text-[#171717]">Danh sách mã QR đã sinh</h2>
            <span className="text-sm font-bold text-[#15803d]">{harvestedItems.length} mã</span>
          </div>
          <div className="space-y-3 flex-1">
            {harvestedItems.map((item, idx) => (
              <div key={idx} className="flex flex-col p-3 border border-gray-100 rounded bg-gray-50 hover:border-gray-300 transition-colors">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-1.5 bg-white rounded border border-gray-200 text-[#171717] shadow-sm">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-extrabold text-[#7d4b1a] tracking-wider text-xs">{item.id}</p>
                    <p className="text-[10px] font-medium text-gray-500">{item.type} • <strong className="text-black">{item.weight}</strong></p>
                  </div>
                </div>
              </div>
            ))}
            <div className="mt-4 flex justify-center border-2 border-dashed border-gray-200 p-4 rounded-lg bg-gray-50">
              <div className="text-center">
                <Box className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                <p className="text-[10px] font-bold text-gray-400">Scan QR để đối chiếu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OperatorLayout>
  );
}
