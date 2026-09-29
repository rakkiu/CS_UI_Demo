import { AlertTriangle, Clock, CheckCircle2, Droplets, ArrowRight } from 'lucide-react'
import OperatorLayout from './OperatorLayout'
import { OpBadge, OpBtn, OpHeading } from './operatorUi'

export default function OperatorAlerts() {
  const alerts = [
    { id: 1, batch: 'BATCH-2026-11A', box: 'S-54', title: 'Độ pH tăng đột biến', time: '10 phút trước', severity: 'high', desc: 'pH đạt 8.5 (ngưỡng an toàn 7.5–8.0).' },
    { id: 2, batch: 'BATCH-2026-11A', box: 'S-102', title: 'Mực nước thấp', time: '1 giờ trước', severity: 'medium', desc: 'Cảm biến siêu âm báo mực nước dưới 5cm.' },
  ]

  return (
    <OperatorLayout activeTab="alerts">
      <OpHeading
        eyebrow="UC-06 · IoT"
        title="Trung tâm cảnh báo"
        description="Cảm biến nhiệt độ, độ mặn và pH gửi về từ các hộp RAS."
      />

      <div className="space-y-4 max-w-4xl">
        {alerts.map((a) => (
          <article key={a.id} className="op-panel flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-[#b42318] transition-colors">
            <div className="flex gap-4 items-start">
              <div className={`p-3 rounded-full ${a.severity === 'high' ? 'bg-[#fef2f2] text-[#b42318]' : 'bg-[#fffbeb] text-[#b45309]'}`}>
                {a.severity === 'high' ? <AlertTriangle className="w-6 h-6" /> : <Droplets className="w-6 h-6" />}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-2">
                  <OpBadge tone="mute">{a.batch}</OpBadge>
                  <OpBadge tone="gold">Ô {a.box}</OpBadge>
                  <OpBadge tone={a.severity === 'high' ? 'danger' : 'warn'}>{a.severity === 'high' ? 'Nghiêm trọng' : 'Trung bình'}</OpBadge>
                </div>
                <h3 className="font-extrabold text-lg">{a.title}</h3>
                <p className="text-sm text-[#6f675e] mt-1">{a.desc}</p>
                <p className="flex items-center gap-1 text-xs text-[#9a8f84] mt-2"><Clock className="w-3 h-3" /> {a.time}</p>
              </div>
            </div>
            <div className="w-full sm:w-auto flex flex-col gap-2 shrink-0">
              <OpBtn variant="ink" onClick={() => { window.location.href = `/operator/log?action=resolve&batch=${a.batch}&box=${a.box}` }}>
                Ghi log xử lý <ArrowRight className="w-4 h-4" />
              </OpBtn>
              <button type="button" className="text-xs font-bold text-[#9a8f84] hover:text-[#171717] py-1">Bỏ qua (báo cáo sai)</button>
            </div>
          </article>
        ))}

        {alerts.length === 0 && (
          <div className="op-panel text-center py-16">
            <CheckCircle2 className="w-12 h-12 text-[#15803d] mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-lg">Mọi thứ đều ổn</h3>
            <p className="text-sm text-[#6f675e] mt-1">Không có cảnh báo cảm biến lúc này.</p>
          </div>
        )}
      </div>
    </OperatorLayout>
  )
}
