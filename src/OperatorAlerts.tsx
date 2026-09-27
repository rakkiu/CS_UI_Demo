
import { AlertTriangle, Clock, CheckCircle2, Droplets, ArrowRight } from 'lucide-react';
import OperatorLayout from './OperatorLayout';

export default function OperatorAlerts() {
  const alerts = [
    { id: 1, batch: 'BATCH-2026-11A', box: 'S-54', title: 'Độ pH tăng đột biến', time: '10 phút trước', severity: 'high', desc: 'Chỉ số pH đạt 8.5 (Vượt ngưỡng an toàn 7.5 - 8.0).' },
    { id: 2, batch: 'BATCH-2026-11A', box: 'S-102', title: 'Mực nước thấp', time: '1 giờ trước', severity: 'medium', desc: 'Cảm biến siêu âm báo mực nước dưới 5cm.' },
  ];

  return (
    <OperatorLayout activeTab="alerts">
      <header className="mb-8">
        <h1 className="text-2xl font-extrabold text-[#171717] tracking-tight">Trung tâm Cảnh báo (IoT)</h1>
        <p className="text-sm text-gray-500 mt-1">Hệ thống giám sát tự động 24/7 từ các hộp nuôi RAS.</p>
      </header>
      
      <div className="space-y-4 max-w-4xl">
        {alerts.map(a => (
          <div key={a.id} className="bg-[#faf6f0] border border-[#e8dccb] rounded-lg p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#b42318] transition-colors group">
            <div className="flex gap-4 items-start">
              <div className={`p-3 rounded-full mt-1 ${a.severity === 'high' ? 'bg-[#fef2f2] text-[#b42318]' : 'bg-[#fffbeb] text-[#b45309]'}`}>
                {a.severity === 'high' ? <AlertTriangle className="w-6 h-6" /> : <Droplets className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">{a.batch}</span>
                  <span className="bg-[#fff8ef] text-[#7d4b1a] border border-[#f4cf9c] px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Ô: {a.box}</span>
                </div>
                <h3 className="font-extrabold text-lg text-[#171717]">{a.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{a.desc}</p>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-2 font-medium">
                  <Clock className="w-3 h-3" /> {a.time}
                </div>
              </div>
            </div>
            
            <div className="w-full sm:w-auto flex flex-col gap-2 shrink-0">
              {/* Nút Xử lý sẽ chuyển hướng qua trang Nhật Ký (Log) để ghi chép hành động khắc phục */}
              <button onClick={() => window.location.href=`/operator/log?action=resolve&batch=${a.batch}&box=${a.box}`} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#171717] hover:bg-[#333] text-white px-5 py-2.5 rounded text-sm font-bold shadow-md transition-colors">
                Ghi Log Xử lý <ArrowRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto text-center text-xs font-bold text-gray-400 hover:text-[#171717] py-2 transition-colors">
                Bỏ qua (Báo cáo sai)
              </button>
            </div>
          </div>
        ))}

        {alerts.length === 0 && (
          <div className="text-center py-16 bg-[#faf6f0] border border-[#e8dccb] rounded-lg shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-[#15803d] mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-lg text-gray-800">Mọi thứ đều ổn!</h3>
            <p className="text-sm text-gray-500 mt-1">Không có cảnh báo nào từ hệ thống cảm biến lúc này.</p>
          </div>
        )}
      </div>
    </OperatorLayout>
  );
}
