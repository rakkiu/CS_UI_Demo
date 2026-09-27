export type InvestorKind = 'financial' | 'offtake'
export type Batch = { id: string; name: string; location: string; operator: string; phase: string; raised: number; target: number; minimum: number; cap: number; days: number; date: string; color: string; owned: number; cost: number }
export const batches: Batch[] = [
  { id: 'CR-0926', name: 'Cua gạch son Cà Mau', location: 'Năm Căn, Cà Mau', operator: 'RAS Nam Căn', phase: 'Đang gọi vốn', raised: 375000000, target: 500000000, minimum: 2500000, cap: 50000000, days: 60, date: '15/10/2026', color: 'sand', owned: 0, cost: 500000000 },
  { id: 'CR-0826', name: 'Cua thịt chuẩn RAS', location: 'Cần Giờ, TP. Hồ Chí Minh', operator: 'Cần Giờ Aquafarm', phase: 'Đang nuôi', raised: 400000000, target: 400000000, minimum: 2500000, cap: 40000000, days: 60, date: '18/10/2026', color: 'sage', owned: 25000000, cost: 400000000 },
  { id: 'CR-0726', name: 'Cua yếm vuông tuyển chọn', location: 'Đầm Dơi, Cà Mau', operator: 'Đầm Dơi RAS', phase: 'Thu hoạch', raised: 600000000, target: 600000000, minimum: 5000000, cap: 60000000, days: 65, date: '30/09/2026', color: 'clay', owned: 30000000, cost: 600000000 },
  { id: 'CR-0526', name: 'Cua thịt vụ đầu mùa', location: 'Năm Căn, Cà Mau', operator: 'RAS Nam Căn', phase: 'Quyết toán', raised: 600000000, target: 600000000, minimum: 5000000, cap: 60000000, days: 60, date: '05/10/2026', color: 'sand', owned: 30000000, cost: 600000000 },
  { id: 'CR-0626', name: 'Cua gạch mùa hạ', location: 'Năm Căn, Cà Mau', operator: 'RAS Nam Căn', phase: 'Đã đóng', raised: 400000000, target: 400000000, minimum: 2500000, cap: 40000000, days: 60, date: '20/09/2026', color: 'stone', owned: 20000000, cost: 400000000 },
]
export const money = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n)
export const shortMoney = (n: number) => `${new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 2 }).format(n / 1000000)} triệu`
export const currentBatch = () => batches.find(b => b.id === new URLSearchParams(location.search).get('batch')) ?? batches[0]
export const batchUrl = (page: string, id: string) => `/investor/${page}?batch=${id}`
export const demoAccounts = { financial: { email: 'financial@demo.crabshare.vn', password: 'CrabShareDemo2026' }, offtake: { email: 'offtake@demo.crabshare.vn', password: 'CrabShareDemo2026' } }
export type Reservation = { id: string; batch: string; amount: number; expires: number; status: 'pending' | 'confirmed' | 'failed' | 'expired'; created: string }
export type Commitment = { id: string; batch: string; quantity: number; status: string }
export type Delivery = { id: string; batch: string; quantity: number; status: string; date: string }
export type InvestorState = {
  reservations: Reservation[]; signed: string[]; read: string[]; kyc: 'verified' | 'pending' | 'unverified';
  name: string; phone: string; bank: string; account: string; holder: string; offtakeApplied: boolean;
  commitments: Commitment[]; claimed: number; deliveries: Delivery[]; responses: { batch: string; text: string }[]
}
export const initialState: InvestorState = {
  reservations: [], signed: [], read: [], kyc: 'verified', name: 'Nguyễn Minh Anh', phone: '090 000 2026', bank: 'Ngân hàng demo', account: '0000123456', holder: 'NGUYEN MINH ANH', offtakeApplied: false,
  commitments: [], claimed: 0, deliveries: [{ id: 'GN-2609-018', batch: 'CR-0726', quantity: 20, status: 'Đang giao', date: '27/09/2026' }], responses: [],
}
export const notifications = [
  { id: 'n1', title: 'Hợp đồng đã sẵn sàng để bạn ký', text: 'Operator đã ký hồ sơ CR-0826. Xem lại điều khoản trước khi xác nhận.', time: 'Hôm nay, 09:20', url: '/investor/contracts', action: 'Xem hợp đồng', icon: 'file' },
  { id: 'n2', title: 'Quyết toán CR-0526 đang chờ phản hồi', text: 'Bản đề xuất đã được công bố. Bạn có thể kiểm tra và gửi câu hỏi trước 05/10/2026.', time: 'Hôm nay, 08:00', url: '/investor/settlement?batch=CR-0526', action: 'Kiểm tra quyết toán', icon: 'chart' },
  { id: 'n3', title: 'Nhật ký nuôi vừa được cập nhật', text: 'CR-0826 · Đã bổ sung chỉ số môi trường và bằng chứng mốc tăng trưởng.', time: '26/09/2026, 17:30', url: '/investor/production?batch=CR-0826', action: 'Xem nhật ký', icon: 'leaf' },
  { id: 'n4', title: 'Đã đối soát khoản chi trả CR-0626', text: '21.600.000 ₫ đã được ghi nhận chi trả tới tài khoản nhận tiền mẫu.', time: '20/09/2026, 14:05', url: '/investor/settlements?tab=payouts', action: 'Xem chi trả', icon: 'bank' },
]
export function downloadFile(name: string, content: string, type = 'text/plain;charset=utf-8') {
  const url = URL.createObjectURL(new Blob(['\uFEFF', content], { type })); const a = document.createElement('a'); a.href = url; a.download = name; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000)
}
