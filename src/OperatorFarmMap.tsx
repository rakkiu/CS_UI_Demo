import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X, Activity, Droplets, Thermometer } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

const mockBatches = [
  { id: 'BATCH-2026-11A', name: 'Lô Cua Lột 11A', totalBoxes: 125, ph: '7.5', temp: '28.5°C' },
  { id: 'BATCH-2026-10B', name: 'Lô Cua Gạch 10B', totalBoxes: 30, ph: '7.8', temp: '29.0°C' }
];

export default function OperatorFarmMap() {
  const [selectedBatch, setSelectedBatch] = useState(mockBatches[0].id);
  const [page, setPage] = useState(1);
  const [selectedBox, setSelectedBox] = useState<any>(null);
  const BOXES_PER_PAGE = 50;

  const currentBatch = mockBatches.find(b => b.id === selectedBatch)!;
  const totalPages = Math.ceil(currentBatch.totalBoxes / BOXES_PER_PAGE);

  const generateBoxes = (batchId: string, count: number) => {
    return Array.from({length: count}, (_, i) => {
      let status = 'occupied';
      if (batchId === 'BATCH-2026-11A' && (i % 12 === 0 || i === 44)) status = 'alert';
      if (batchId === 'BATCH-2026-11A' && i % 25 === 0) status = 'empty';
      if (batchId === 'BATCH-2026-10B' && i % 8 === 0) status = 'alert';
      return {
        id: `S-${i+1}`,
        status,
        weight: status === 'empty' ? '-' : `${200 + (i % 5)*5}g`
      };
    });
  };

  const allBoxes = generateBoxes(selectedBatch, currentBatch.totalBoxes);
  const displayedBoxes = allBoxes.slice((page - 1) * BOXES_PER_PAGE, page * BOXES_PER_PAGE);

  const stats = {
    total: currentBatch.totalBoxes,
    occupied: allBoxes.filter(b => b.status === 'occupied').length,
    alert: allBoxes.filter(b => b.status === 'alert').length,
    empty: allBoxes.filter(b => b.status === 'empty').length,
  };

  return (
    <OperatorLayout activeTab="map">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Sơ đồ Trại (RAS)</h1>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm font-semibold text-gray-500">Đang chọn:</span>
            <select 
              className="border border-[#7d4b1a] bg-[#fff8ef] rounded p-1.5 text-sm font-extrabold text-[#7d4b1a] outline-none focus:ring-2 focus:ring-[#f4cf9c] shadow-sm cursor-pointer"
              value={selectedBatch}
              onChange={(e) => { setSelectedBatch(e.target.value); setPage(1); }}
            >
              {mockBatches.map(b => (
                <option key={b.id} value={b.id}>{b.id} - {b.name} ({b.totalBoxes} ô)</option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex gap-4 bg-white px-4 py-2.5 rounded border border-gray-200 shadow-sm">
          <span className="flex items-center gap-2 text-xs font-bold text-gray-600"><div className="w-3 h-3 rounded border border-gray-300 bg-[#f4cf9c]"></div> Đang nuôi</span>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-600"><div className="w-3 h-3 rounded border border-[#b42318] bg-[#fca5a5]"></div> Cảnh báo</span>
          <span className="flex items-center gap-2 text-xs font-bold text-gray-600"><div className="w-3 h-3 rounded border border-gray-300" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 2px, #e5e7eb 2px, #e5e7eb 4px)' }}></div> Trống</span>
        </div>
      </header>
      
      {/* Summary Box */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm col-span-2 flex items-center justify-between">
          <div><p className="text-xs font-bold text-gray-500 uppercase">Trạng thái chung</p><h3 className="font-extrabold text-lg mt-1 text-[#171717]">Tốt / Ổn định</h3></div>
          <Activity className="text-green-600 w-8 h-8 opacity-50" />
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Đang nuôi</p><h3 className="font-extrabold text-xl text-[#7d4b1a]">{stats.occupied}</h3>
        </div>
        <div className="bg-[#fef2f2] p-4 rounded-lg border border-[#fca5a5] shadow-sm text-center">
          <p className="text-[10px] font-bold text-[#b42318] uppercase">Cảnh báo</p><h3 className="font-extrabold text-xl text-[#b42318]">{stats.alert}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f9fafb, #f9fafb 5px, #f3f4f6 5px, #f3f4f6 10px)' }}>
          <p className="text-[10px] font-bold text-gray-500 uppercase">Ô trống</p><h3 className="font-extrabold text-xl text-gray-500">{stats.empty}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase">Môi trường</p>
          <div className="flex justify-center gap-2 mt-1 text-xs font-bold"><Droplets className="w-3 h-3 text-blue-500"/>{currentBatch.ph} <Thermometer className="w-3 h-3 text-red-500 ml-1"/>{currentBatch.temp}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-6">
          {displayedBoxes.map(slot => (
            <div key={slot.id} onClick={() => setSelectedBox(slot)} className={`aspect-square rounded flex flex-col items-center justify-center border-2 cursor-pointer transition-transform hover:scale-105 shadow-sm
              ${slot.status === 'alert' ? 'bg-[#fef2f2] border-[#b42318] text-[#b42318]' : 
                slot.status === 'empty' ? 'border-gray-300 text-gray-400 opacity-60' : 
                'bg-[#fff8ef] border-[#7d4b1a] text-[#7d4b1a]'}`}
              style={slot.status === 'empty' ? { backgroundImage: 'repeating-linear-gradient(45deg, #ffffff, #ffffff 4px, #e5e7eb 4px, #e5e7eb 8px)' } : {}}
            >
              <span className={`text-[12px] font-extrabold ${slot.status === 'empty' ? 'bg-white px-1' : ''}`}>{slot.id}</span>
              {slot.status !== 'empty' && <span className="text-[10px] font-bold opacity-90 mt-0.5">{slot.weight}</span>}
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-2">
            <span className="text-sm text-gray-500 font-medium">
              Đang hiển thị ô <strong className="text-[#171717]">{(page - 1) * BOXES_PER_PAGE + 1}</strong> đến <strong className="text-[#171717]">{Math.min(page * BOXES_PER_PAGE, currentBatch.totalBoxes)}</strong> / {currentBatch.totalBoxes}
            </span>
            <div className="flex items-center gap-3">
              <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="p-1.5 rounded border border-gray-300 text-gray-600 disabled:opacity-30 hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm font-extrabold text-[#7d4b1a] px-2">{page} <span className="text-gray-400">/</span> {totalPages}</span>
              <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)} className="p-1.5 rounded border border-gray-300 text-gray-600 disabled:opacity-30 hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Box History Modal */}
      {selectedBox && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="bg-[#171717] text-white p-4 flex justify-between items-center">
              <div>
                <h3 className="font-extrabold text-lg">Chi tiết Ô nuôi: {selectedBox.id}</h3>
                <p className="text-xs text-gray-400">Lô: {currentBatch.name}</p>
              </div>
              <button onClick={() => setSelectedBox(null)} className="text-gray-400 hover:text-white transition-colors"><X className="w-6 h-6" /></button>
            </div>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                <div className={`w-16 h-16 rounded-full flex flex-col items-center justify-center border-4 ${selectedBox.status === 'alert' ? 'border-[#b42318] bg-[#fef2f2] text-[#b42318]' : selectedBox.status === 'empty' ? 'border-gray-200 bg-gray-100 text-gray-400' : 'border-[#7d4b1a] bg-[#fff8ef] text-[#7d4b1a]'}`}>
                  <span className="font-extrabold text-lg">{selectedBox.weight || '-'}</span>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 text-lg">Trạng thái hiện tại</h4>
                  <p className={`text-sm font-bold ${selectedBox.status === 'alert' ? 'text-[#b42318]' : selectedBox.status === 'empty' ? 'text-gray-400' : 'text-[#15803d]'}`}>
                    {selectedBox.status === 'alert' ? 'Có cảnh báo bất thường' : selectedBox.status === 'empty' ? 'Ô trống chưa thả giống' : 'Phát triển bình thường'}
                  </p>
                </div>
              </div>
              
              <h4 className="font-bold text-sm text-gray-500 uppercase tracking-wider mb-4">Lịch sử Log (Gần nhất)</h4>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="text-xs text-gray-400 font-bold whitespace-nowrap pt-1">Hôm nay<br/>08:00</div>
                  <div className="border-l-2 border-[#f4cf9c] pl-4">
                    <p className="font-bold text-sm text-gray-800">Cập nhật môi trường & Hình ảnh</p>
                    <p className="text-xs text-gray-600 mt-1">pH: {currentBatch.ph} | Nước: {currentBatch.temp}</p>
                    {selectedBox.status !== 'empty' && <img src="https://images.unsplash.com/photo-1628198755051-789063de2d50?auto=format&fit=crop&q=80&w=150&h=150" alt="Crab" className="w-20 h-20 object-cover rounded mt-2 border border-gray-200" />}
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="text-xs text-gray-400 font-bold whitespace-nowrap pt-1">Hôm qua<br/>17:30</div>
                  <div className="border-l-2 border-gray-200 pl-4">
                    <p className="font-bold text-sm text-gray-800">Cho ăn cữ chiều</p>
                    <p className="text-xs text-gray-600 mt-1">Sử dụng cám viên sinh học (15g)</p>
                  </div>
                </div>
              </div>
              
              <button onClick={() => setSelectedBox(null)} className="w-full mt-8 py-3 bg-[#171717] hover:bg-[#333] text-white rounded font-bold text-sm transition-colors uppercase tracking-widest shadow-md">Đóng</button>
            </div>
          </div>
        </div>
      )}
    </OperatorLayout>
  );
}
