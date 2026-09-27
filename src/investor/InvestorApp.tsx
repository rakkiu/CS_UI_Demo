import { useEffect, useState } from 'react'
import { useDemoSession } from '../DemoSession'
import { InvestorProvider, useInvestor } from './state'
import { Badge, Heading, Icon, Panel, Progress, Stat } from './ui'
import { batches, batchUrl, money, shortMoney, notifications } from './data'
import { BatchList, BatchDetail, Contribute, Portfolio, Production } from './Investments'
import { Contracts, Profile, Notifications } from './Account'
import { Settlements, SettlementDetail } from './Settlements'
import { Offtake, CommitmentForm, Claim, Deliveries } from './Offtake'
import './investor.css'

const primary = [
  { href: '/investor', label: 'Tổng quan', icon: 'grid' }, { href: '/investor/batches', label: 'Khám phá Batch', icon: 'leaf' },
  { href: '/investor/portfolio', label: 'Danh mục đầu tư', icon: 'bag' }, { href: '/investor/contracts', label: 'Hợp đồng', icon: 'file' },
  { href: '/investor/settlements', label: 'Quyết toán & chi trả', icon: 'chart' },
]
const extra = [{ href: '/investor/offtake', label: 'Bao tiêu', icon: 'box' }, { href: '/investor/deliveries', label: 'Giao nhận', icon: 'truck' }]
const secondary = [{ href: '/investor/notifications', label: 'Thông báo', icon: 'bell' }, { href: '/investor/profile', label: 'Hồ sơ & xác minh', icon: 'user' }]

function Overview() {
  const { state, kind } = useInvestor()
  const newCapital = state.reservations.filter(r => r.status === 'confirmed').reduce((sum, r) => sum + r.amount, 0)
  const held = batches.filter(b => b.owned > 0)
  const needSign = !state.signed.includes('CR-0826')
  return <>
    <Heading eyebrow="KHÔNG GIAN NHÀ ĐẦU TƯ" title={`Chào ${state.name.split(' ').slice(-2).join(' ')},`} description="Mỗi khoản góp vốn, một hành trình tăng trưởng minh bạch." action={<a href="/investor/batches" className="iv-button"><Icon name="plus" size={17}/>Khám phá Batch</a>}/>
    <div className="iv-overview-banner"><div><span className="iv-live-dot"/> Hành trình của bạn đang tiếp tục <p>3 Batch chưa đóng · Cập nhật mẫu ngày 27 tháng 9, 2026</p></div><a href="/investor/portfolio">Xem danh mục <Icon name="arrow" size={18}/></a></div>
    <div className="iv-stats"><Stat dark label="Vốn đang tham gia" value={shortMoney(85000000 + newCapital)} note="Đã xác nhận · chưa quyết toán" icon="bag"/><Stat label="Batch trong danh mục" value={String(held.length + (newCapital > 0 ? 1 : 0))} note="3 chưa đóng · 1 đã hoàn tất" icon="leaf"/><Stat label="Lãi đã quyết toán" value="+1,6 triệu" note="CR-0626 · đã đối soát chi trả" icon="chart"/><Stat label="Dự kiến nhận theo đề xuất" value="33,36 triệu" note="CR-0526 · chưa duyệt chi trả" icon="bank"/></div>
    <div className="iv-dashboard-grid">
      <div className="iv-stack"><Panel title="Danh mục của bạn" subtitle="Theo dõi vốn theo từng giai đoạn" action={<a className="iv-text-link" href="/investor/portfolio">Xem tất cả <Icon name="arrow" size={15}/></a>}>
        <div className="iv-allocation"><div className="iv-donut" role="img" aria-label="Vốn chưa đóng: đang nuôi 25 triệu, thu hoạch 30 triệu, quyết toán 30 triệu"><div><small>Vốn chưa đóng</small><strong>85 triệu</strong><span>3 Batch</span></div></div><div className="iv-allocation-legend"><div><i className="sage"/><span>Đang nuôi<small>CR-0826</small></span><strong>25 triệu</strong></div><div><i className="bronze"/><span>Thu hoạch<small>CR-0726</small></span><strong>30 triệu</strong></div><div><i className="stone"/><span>Quyết toán<small>CR-0526</small></span><strong>30 triệu</strong></div><p>Vốn tại các Batch chưa đóng; khoản góp mới đang gọi vốn được ghi riêng trong danh mục.</p></div></div>
        <div className="iv-table-wrap"><table className="iv-table"><thead><tr><th>Batch</th><th>Vốn của bạn</th><th>Trạng thái</th><th><span className="sr-only">Hành động</span></th></tr></thead><tbody>{held.slice(0, 2).map(b => <tr key={b.id}><td><a className="iv-row-title" href={batchUrl('production', b.id)}>{b.name}</a><small>{b.id} · {b.operator}</small></td><td className="iv-numeric">{money(b.owned)}</td><td><Badge tone={b.color}>{b.phase}</Badge></td><td><a className="iv-icon-link" aria-label={`Theo dõi ${b.id}`} href={batchUrl('production', b.id)}><Icon name="arrow" size={18}/></a></td></tr>)}</tbody></table></div>
      </Panel><Panel title="Hoạt động gần đây" action={<a className="iv-text-link" href="/investor/notifications">Tất cả thông báo</a>}><div className="iv-activity">{notifications.slice(2).map(n => <a key={n.id} href={n.url}><span className="iv-soft-icon"><Icon name={n.icon}/></span><div><strong>{n.title}</strong><p>{n.text}</p><small>{n.time}</small></div><Icon name="arrow" size={16}/></a>)}</div></Panel></div>
      <div className="iv-stack"><Panel title="Cần bạn xử lý" action={<Badge tone="sand">{needSign ? '2 việc' : '1 việc'}</Badge>}>
        <div className="iv-tasks">{needSign && <a href="/investor/contracts"><span className="iv-task-icon"><Icon name="file"/></span><div><strong>Ký hợp đồng đầu tư</strong><p>CR-0826 · Operator đã ký</p><span>Xem và ký hợp đồng <Icon name="arrow" size={14}/></span></div></a>}<a href="/investor/settlement?batch=CR-0526"><span className="iv-task-icon"><Icon name="clock"/></span><div><strong>Kiểm tra đề xuất quyết toán</strong><p>Phản hồi trước 05/10/2026</p><span>Xem bảng quyết toán <Icon name="arrow" size={14}/></span></div></a></div>
      </Panel>{kind === 'offtake' ? <div className="iv-opportunity"><Badge tone="sand">QUYỀN BAO TIÊU</Badge><h2>Đợt nhận hàng ưu tiên đang mở</h2><p>CR-0726 · Còn {Math.max(0, 80 - state.claimed)} kg trong hạn mức của bạn.</p><a href="/investor/offtake/claim" className="iv-button">Xem quyền nhận hàng <Icon name="arrow" size={16}/></a><small>Kết thúc 05/10/2026 · Dữ liệu mẫu</small></div> : <div className="iv-opportunity"><Badge tone="sand">ĐANG GỌI VỐN</Badge><h2>Một hành trình mới tại Cà Mau</h2><p>Cua gạch son · CR-0926<br/>Chi phí chuẩn đã được khóa và công bố.</p><Progress value={75}/><div className="iv-between"><small>375 / 500 triệu</small><strong>75%</strong></div><a href="/investor/batch?batch=CR-0926" className="iv-button">Tìm hiểu Batch <Icon name="arrow" size={16}/></a></div>}<div className="iv-help"><Icon name="shield"/><strong>Minh bạch từ đầu đến cuối</strong><p>Tra cứu hợp đồng, bằng chứng sản xuất và căn cứ quyết toán ngay trong danh mục.</p><a href="/investor/contracts">Mở hồ sơ đầu tư →</a></div></div>
    </div>
  </>
}

function Workspace() {
  const { state, kind } = useInvestor(); const { signOut } = useDemoSession()
  const [open, setOpen] = useState(false)
  const path = location.pathname.replace(/\/$/, '')
  useEffect(() => { document.title = 'Không gian nhà đầu tư | CrabShare' }, [])
  useEffect(() => { const close = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  const activeHref = path.startsWith('/investor/offtake') ? '/investor/offtake' : ['/investor/batch', '/investor/contribute'].includes(path) ? '/investor/batches' : path === '/investor/production' ? '/investor/portfolio' : path === '/investor/settlement' ? '/investor/settlements' : path
  const items = [...primary, ...extra, ...secondary]
  const nav = (list: typeof primary) => list.map(item => <a href={item.href} key={item.href} className={activeHref === item.href ? 'active' : ''} aria-current={activeHref === item.href ? 'page' : undefined}><Icon name={item.icon} size={19}/><span>{item.label}</span>{item.href === '/investor/notifications' && <small>{notifications.filter(n => !state.read.includes(n.id)).length}</small>}</a>)
  const pages: Record<string, React.ReactNode> = { '/investor': <Overview/>, '/investor/batches': <BatchList/>, '/investor/batch': <BatchDetail/>, '/investor/contribute': <Contribute/>, '/investor/portfolio': <Portfolio/>, '/investor/production': <Production/>, '/investor/contracts': <Contracts/>, '/investor/settlements': <Settlements/>, '/investor/settlement': <SettlementDetail/>, '/investor/notifications': <Notifications/>, '/investor/profile': <Profile/>, '/investor/offtake': <Offtake/>, '/investor/offtake/commit': <CommitmentForm/>, '/investor/offtake/claim': <Claim/>, '/investor/deliveries': <Deliveries/> }
  const restricted = (path.startsWith('/investor/offtake') || path === '/investor/deliveries') && kind !== 'offtake'
  return <div className="iv-app"><a className="iv-skip" href="#investor-content">Đến nội dung</a>{open && <button className="iv-scrim" onClick={() => setOpen(false)} aria-label="Đóng điều hướng"/>}<aside className={`iv-sidebar ${open ? 'open' : ''}`}>
    <a href="/" className="iv-brand"><span><img src="/assets/loginCrabIcon.svg" alt=""/></span><div>CRAB<span>SHARE</span><small>GROW TOGETHER</small></div></a>
    <div className="iv-workspace-label">KHÔNG GIAN ĐẦU TƯ</div><nav aria-label="Điều hướng Investor">{nav(primary)}{kind === 'offtake' && <><p className="iv-nav-label">BAO TIÊU</p>{nav(extra)}</>}<p className="iv-nav-label">TÀI KHOẢN</p>{nav(secondary)}</nav>
    <div className="iv-sidebar-bottom"><a href="/cua-hang"><Icon name="bag" size={17}/> Cửa hàng hải sản <Icon name="arrow" size={15}/></a><a href="/"><Icon name="home" size={17}/> Về trang chủ</a><div className="iv-demo-label"><span/> Không gian demo <small>Dữ liệu minh họa</small></div></div>
  </aside><div className="iv-workspace"><header className="iv-topbar"><div><button className="iv-mobile-toggle" onClick={() => setOpen(!open)} aria-label="Mở điều hướng Investor" aria-expanded={open}><Icon name="menu"/></button><span className="iv-breadcrumb-label">Investor <span>/</span> <strong>{items.find(i => i.href === activeHref)?.label ?? 'Chi tiết'}</strong></span></div><div><a className="iv-top-bell" href="/investor/notifications" aria-label="Thông báo"><Icon name="bell"/>{notifications.some(n => !state.read.includes(n.id)) && <i/>}</a><details className="iv-user-menu"><summary><span className="iv-avatar">MA</span><span><strong>{state.name}</strong><small>{kind === 'offtake' ? 'Offtake Investor' : 'Financial Investor'}</small></span><Icon name="down" size={14}/></summary><div><a href="/investor/profile">Hồ sơ của tôi</a><a href={`/dang-nhap?demo=${kind === 'offtake' ? 'financial' : 'offtake'}`}>Đổi sang demo {kind === 'offtake' ? 'Financial' : 'Offtake'}</a><button onClick={() => { signOut(); location.assign('/') }}>Đăng xuất</button></div></details></div></header>
    <main id="investor-content" className="iv-main">{restricted ? <><Heading title="Chức năng dành cho Investor bao tiêu" description="Bạn vẫn có đầy đủ quyền đầu tư tài chính. Đăng ký hồ sơ bao tiêu để mở rộng quyền."/><a className="iv-button" href="/investor/profile?tab=offtake">Đăng ký hồ sơ bao tiêu</a></> : pages[path] ?? <><Heading title="Không tìm thấy màn hình"/><a href="/investor" className="iv-button">Về tổng quan</a></>}</main><footer className="iv-workspace-footer"><span>© 2026 CrabShare</span><span>Demo giao diện · Thanh toán, ký số và eKYC được mô phỏng</span></footer></div></div>
}
export default function InvestorApp() { const { signedIn, role } = useDemoSession(); if (!signedIn || role === 'customer') return <div className="iv-app iv-entry"><img src="/assets/loginCrabIcon.svg" alt="CrabShare" width="54"/><h1>Không gian nhà đầu tư</h1><p>Chọn tài khoản mẫu để khám phá hành trình đầu tư CrabShare.</p><a href="/dang-nhap?demo=financial" className="iv-button">Demo Financial Investor</a><a href="/dang-nhap?demo=offtake" className="iv-button secondary">Demo Offtake Investor</a><a href="/">← Về trang chủ</a></div>; return <InvestorProvider kind={role}><Workspace/></InvestorProvider> }
