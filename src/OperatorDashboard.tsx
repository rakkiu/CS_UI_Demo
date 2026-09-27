import React from 'react';
import { PlusCircle, Activity, Droplets, AlertCircle, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import OperatorLayout from './OperatorLayout';

const mockChartData = [
  { time: '08:00', ph: 7.2, temp: 28 },
  { time: '10:00', ph: 7.3, temp: 28.5 },
  { time: '12:00', ph: 7.4, temp: 29 },
  { time: '14:00', ph: 7.3, temp: 29.2 },
  { time: '16:00', ph: 7.2, temp: 28.8 },
  { time: '18:00', ph: 7.1, temp: 28.2 },
];

const recentLogs = [
  { id: 1, time: '10:30 AM', action: 'Cho ăn (Cám viên)', user: 'Nguyễn Văn A' },
  { id: 2, time: '09:15 AM', action: 'Kiểm tra độ mặn (15ppt)', user: 'Trần Thị B' },
  { id: 3, time: '08:00 AM', action: 'Xả cặn hồ sinh học', user: 'Nguyễn Văn A' },
];

export default function OperatorDashboard() {
  const handleLogClick = () => {
    window.location.href = '/operator/log';
  };

  return (
    <OperatorLayout activeTab="dashboard">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>Operator</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-[#7d4b1a]">Trại Cần Giờ 01</span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Tổng quan Trại</h1>
          <p className="text-sm text-gray-500 mt-1">Lô đang nuôi: BATCH-2026-11A</p>
        </div>
        <button onClick={handleLogClick} className="flex items-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-5 py-2.5 rounded text-sm font-medium transition-colors shadow-md">
          <PlusCircle className="w-4 h-4" />
          <span>Ghi Log Hàng Ngày</span>
        </button>
      </header>

      {/* Summary Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Cua đang nuôi</p>
            <h3 className="text-3xl font-extrabold text-[#171717]">1,240 <span className="text-sm font-medium text-gray-500">con</span></h3>
          </div>
          <div className="w-12 h-12 bg-[#fff8ef] rounded-full flex items-center justify-center text-[#7d4b1a] border border-[#f4cf9c]">
            <Activity className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-[#fca5a5] shadow-sm flex items-center justify-between ring-1 ring-[#fef2f2]">
          <div>
            <p className="text-xs font-bold text-[#b42318] uppercase tracking-wider mb-1">Cảnh báo hệ thống</p>
            <h3 className="text-3xl font-extrabold text-[#b42318]">2 <span className="text-sm font-medium text-[#fca5a5]">cần xử lý</span></h3>
          </div>
          <div className="w-12 h-12 bg-[#fef2f2] rounded-full flex items-center justify-center text-[#b42318]">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Dự kiến thu hoạch</p>
            <h3 className="text-3xl font-extrabold text-[#171717]">450 <span className="text-sm font-medium text-gray-500">kg</span></h3>
          </div>
          <div className="w-12 h-12 bg-[#f0f9ff] rounded-full flex items-center justify-center text-[#0369a1]">
            <Droplets className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Chart & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-extrabold text-[#171717]">Chỉ số Môi trường (Hôm nay)</h2>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-gray-600"><div className="w-2.5 h-2.5 rounded-full bg-[#0369a1]"></div> pH (7.0-8.5)</span>
              <span className="flex items-center gap-1.5 text-gray-600"><div className="w-2.5 h-2.5 rounded-full bg-[#7d4b1a]"></div> Temp (°C)</span>
            </div>
          </div>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockChartData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 500}} dy={10} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 500}} domain={[6, 9]} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 11, fontWeight: 500}} domain={[25, 35]} />
                <Tooltip contentStyle={{ borderRadius: '4px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} />
                <Line yAxisId="left" type="monotone" dataKey="ph" stroke="#0369a1" strokeWidth={2.5} dot={{r: 3, strokeWidth: 2}} activeDot={{r: 5}} />
                <Line yAxisId="right" type="monotone" dataKey="temp" stroke="#7d4b1a" strokeWidth={2.5} dot={{r: 3, strokeWidth: 2}} activeDot={{r: 5}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
          <h2 className="text-base font-extrabold text-[#171717] mb-6">Nhật ký gần nhất</h2>
          <div className="space-y-6">
            {recentLogs.map((log, i) => (
              <div key={log.id} className="relative flex gap-4">
                {i !== recentLogs.length - 1 && <div className="absolute left-2 top-6 w-px h-12 bg-gray-200"></div>}
                <div className="relative z-10 w-4 h-4 rounded-full bg-[#fff8ef] border-2 border-[#7d4b1a] flex-shrink-0 mt-0.5"></div>
                <div>
                  <p className="text-sm font-semibold text-[#171717]">{log.action}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs font-medium text-[#7d4b1a]">{log.time}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-500">{log.user}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href='/operator/log'} className="w-full mt-6 py-2 border border-gray-200 text-xs font-bold text-gray-600 rounded hover:bg-gray-50 transition-colors uppercase tracking-wider cursor-pointer">
            Ghi log mới
          </button>
        </div>
      </div>
    </OperatorLayout>
  );
}
