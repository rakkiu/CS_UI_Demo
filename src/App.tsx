import { useState, type FormEvent } from 'react'
import { SiteHeader, SiteFooter } from './SiteChrome'
import { useDemoSession } from './DemoSession'
import './minhbach.css'

const photo = (name: string) => `/minhbach/${name}`
const money = (n: number) => `${n.toLocaleString('vi-VN')} ₫`
const farmers = [
  { name: 'Nguyễn Văn Tám', pond: 'Đầm Năm Căn', harvest: '12,4 tấn', ponds: 3, x: 18, y: 20 },
  { name: 'Trần Văn Hải', pond: 'Đầm Đất Mũi', harvest: '8,6 tấn', ponds: 1, x: 62, y: 12 },
  { name: 'Lê Minh Quân', pond: 'Đầm Ngọc Hiển', harvest: '15,2 tấn', ponds: 2, x: 81, y: 56 },
  { name: 'Phạm Văn Đức', pond: 'Đầm Cái Nước', harvest: '6,9 tấn', ponds: 1, x: 20, y: 73 },
  { name: 'Võ Thị Hồng', pond: 'Đầm Phú Tân', harvest: '9,8 tấn', ponds: 2, x: 61, y: 83 },
]
const lots = [
  { code: 'CM-NC-2026-07', name: 'Lô Năm Căn · đợt 7', farmer: 0, raised: 418, target: 480, days: 6, harvest: '15/01/2027', expected: '8–14%', status: 'Sắp đủ vốn' },
  { code: 'CM-DM-2026-03', name: 'Lô Đất Mũi · đợt 3', farmer: 1, raised: 186, target: 320, days: 12, harvest: '28/02/2027', expected: '9–15%', status: 'Đang gọi vốn' },
  { code: 'CM-NH-2026-05', name: 'Lô Ngọc Hiển · đợt 5', farmer: 2, raised: 60, target: 250, days: 21, harvest: '10/03/2027', expected: '7–12%', status: 'Mới mở' },
]
const products = [
  { id: 'thit', name: 'Cua thịt Y1 yếm vuông', farmer: 0, weight: '400–500 g/con', price: 420000, unit: 'kg', qr: 'CM-NC-2026-06-0042', lot: 'CM-NC-2026-06', seed: '18/05/2026', harvest: '22/09/2026' },
  { id: 'gach', name: 'Cua gạch Đất Mũi (loại 1)', farmer: 1, weight: '350–450 g/con', price: 690000, unit: 'kg', qr: 'CM-DM-2026-02-0187', lot: 'CM-DM-2026-02', seed: '02/06/2026', harvest: '26/09/2026' },
  { id: 'com', name: 'Cua cốm', farmer: 2, weight: '250–350 g/con', price: 480000, unit: 'kg', qr: 'CM-NH-2026-04-0113', lot: 'CM-NH-2026-04', seed: '10/06/2026', harvest: '24/09/2026' },
  { id: 'hop', name: 'Hộp quà cua thượng hạng', farmer: 3, weight: '3 con · khoảng 1,5 kg/hộp', price: 1290000, unit: 'hộp', qr: 'CM-CN-2026-03-0009', lot: 'CM-CN-2026-03', seed: '25/05/2026', harvest: '20/09/2026' },
]
const steps = [
  ['Góp vốn', 'Chọn một lô đang gọi vốn và góp từ 1 triệu đồng. Chi phí chuẩn của lô được công khai trước khi bạn xuống tiền.'],
  ['Nuôi và theo dõi', 'Người nuôi cập nhật nhật ký, ảnh và số liệu cảm biến mỗi ngày. Bạn xem được ngay trên tài khoản của mình.'],
  ['Thu hoạch, bán', 'Cua thu hoạch được bán trên cửa hàng CrabShare, mỗi con gắn mã QR truy xuất về đúng lô đã nuôi nó.'],
  ['Quyết toán', 'Doanh thu trừ chi phí chuẩn, phần còn lại chia theo tỷ lệ vốn góp và chuyển về tài khoản của bạn.'],
]
const trust = [
  ['▣', 'Tiền nằm ở tài khoản riêng của lô', 'Vốn góp được giữ ở tài khoản riêng của từng lô do tổ chức trung gian quản lý.'],
  ['▤', 'Hợp đồng ký số', 'Mỗi lần góp vốn đi kèm hợp đồng điện tử có chữ ký số, bạn tải về và lưu lại được.'],
  ['◎', 'Nhật ký lấy thẳng từ trại', 'Ảnh và nhật ký nuôi đồng bộ trực tiếp từ hệ thống tại trại, có dấu thời gian.'],
  ['▦', 'Mỗi con cua có mã QR', 'Tra mã là biết con cua thuộc lô nào, hộ nào nuôi, thả giống ngày nào.'],
]
const faqs = [
  ['Góp vốn tối thiểu bao nhiêu?', 'Mỗi lần góp tối thiểu 1.000.000 ₫. Bạn có thể góp vào nhiều lô khác nhau.'],
  ['Khi nào tôi nhận được tiền?', 'Sau khi lô thu hoạch, bán xong và được quyết toán. Ngày thu hoạch dự kiến ghi trên từng lô.'],
  ['Nếu lô bị lỗ thì sao?', 'Phần lỗ chia theo tỷ lệ vốn góp. Mức lỗ tối đa bằng đúng số vốn bạn đã góp.'],
  ['Tôi có rút vốn giữa chừng được không?', 'Trong lúc lô đang nuôi thì không rút trực tiếp được. Điều kiện cụ thể thể hiện trong hợp đồng.'],
  ['Tôi tra cứu nguồn gốc cua như thế nào?', 'Nhập mã trên tem QR vào ô tra cứu. Bạn không cần đăng nhập.'],
]

function App() {
  const { addToCart } = useDemoSession()
  const [code, setCode] = useState('')
  const [searchedCode, setSearchedCode] = useState<string | null>(null)
  const [mapQuery, setMapQuery] = useState('')
  const [farmerIndex, setFarmerIndex] = useState(0)
  const [toast, setToast] = useState('')
  const match = products.find((product) => product.qr === searchedCode)
  const lookup = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSearchedCode(code.trim().toUpperCase()) }
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2500) }

  return <div className="mh-home" id="dau-trang"><SiteHeader />
    <section className="mh-hero"><div><span className="mh-kicker">Nền tảng góp vốn & truy xuất cua Cà Mau</span><h1>Góp vốn nuôi cua Cà Mau.<br />Mua cua có nguồn gốc rõ ràng.</h1><p>CrabShare dành cho hai nhóm: <b>nhà đầu tư</b> muốn góp vốn vào từng lô nuôi cụ thể và theo dõi nó mỗi ngày, và <b>người mua</b> muốn biết con cua mình ăn đến từ đầm nào, ai nuôi.</p><div className="mh-actions"><a className="mh-button solid" href="#lo-goi-von">Tôi muốn đầu tư</a><a className="mh-button ghost" href="#cua-hang">Tôi muốn mua cua</a></div></div></section>
    <section className="mh-kpis" aria-label="CrabShare qua các con số">{[['Lô đã quyết toán', '12', 'lô'], ['Tổng vốn đã góp', '4,8', 'tỷ ₫'], ['Cua đã bán', '38.500', 'kg'], ['Hộ nuôi liên kết', '57', 'hộ']].map(([label, value, unit]) => <div key={label}><span>{label}</span><strong>{value} <small>{unit}</small></strong></div>)}</section>
    <main>
      <section className="mh-section" id="cach-hoat-dong"><span className="mh-eyebrow">CÁCH HOẠT ĐỘNG</span><h2>Bốn bước của một lô nuôi</h2><ol className="mh-steps">{steps.map(([title, body], i) => <li key={title}><span>{i + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol></section>
      <section className="mh-section mh-white" id="lo-goi-von"><div className="mh-section-head"><div><span className="mh-eyebrow">DÀNH CHO NHÀ ĐẦU TƯ</span><h2>Lô đang gọi vốn</h2><p>Góp từ 1.000.000 ₫ vào một lô nuôi cụ thể, biết rõ đầm nào, hộ nào nuôi.</p></div><a className="mh-button outline" href="/dang-ky">Bắt đầu đầu tư</a></div><div className="mh-lots">{lots.map((lot) => { const pct = Math.round(lot.raised / lot.target * 100); const farmer = farmers[lot.farmer]; return <article key={lot.code}><div className="mh-lot-top"><span>{lot.code}</span><b>{lot.status}</b></div><h3>{lot.name}</h3><p>{farmer.pond} · hộ {farmer.name}</p><div className="mh-progress-head"><strong>{lot.raised} triệu ₫ <small>/ {lot.target} triệu ₫</small></strong><b>{pct}%</b></div><div className="mh-progress" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}><i style={{ width: `${pct}%` }} /></div><p className="mh-progress-caption">Vốn tối thiểu 60% · Mốc 90%</p><dl><div><dt>Còn lại</dt><dd>{lot.days} ngày</dd></div><div><dt>Thu hoạch dự kiến</dt><dd>{lot.harvest}</dd></div><div><dt>Góp tối thiểu</dt><dd>1.000.000 ₫</dd></div><div><dt>Lợi nhuận kỳ vọng</dt><dd>{lot.expected}/vụ</dd></div></dl><a className="mh-button solid" href="/dang-ky">Xem chi tiết lô</a></article> })}</div><p className="mh-risk"><b>Đầu tư có thể lỗ, tối đa bằng số vốn bạn đã góp.</b> Lợi nhuận kỳ vọng không phải cam kết. <a href="#hoi-dap">Tìm hiểu rủi ro</a></p></section>
      <section className="mh-section" id="vi-sao"><span className="mh-eyebrow">VÌ SAO TIN ĐƯỢC</span><h2>Bạn không phải tin lời, bạn kiểm tra được</h2><div className="mh-trust">{trust.map(([icon, title, body]) => <article key={title}><span>{icon}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>
      <section className="mh-section mh-white" id="cua-hang"><div className="mh-section-head"><div><span className="mh-eyebrow">DÀNH CHO NGƯỜI MUA</span><h2>Cua sống Cà Mau</h2><p>Cua từ các đầm đối tác, con nào cũng có mã truy xuất về đúng lô nuôi.</p></div><a className="mh-button outline" href="/cua-hang">Xem cửa hàng</a></div><div className="mh-products">{products.map((product) => { const farmer = farmers[product.farmer]; return <article key={product.id}><div className="mh-product-photo"><span>CrabShare · {farmer.pond}</span><img src={photo(`cua-${product.id}-card.jpg`)} alt={product.name} /></div><div className="mh-farmer-line"><i>{farmer.name.split(' ').slice(-2).map((part) => part[0]).join('')}</i><span><b>{farmer.name}</b><small>Hộ nuôi · {farmer.pond}</small></span></div><h3>{product.name}</h3><p>Trọng lượng: {product.weight}</p><button className="mh-text-link" onClick={() => { setCode(product.qr); setSearchedCode(product.qr); document.getElementById('tra-cuu')?.scrollIntoView({ behavior: 'smooth' }) }}>Tra nguồn gốc mẫu</button><strong>{money(product.price)} <small>/{product.unit}</small></strong><div className="mh-product-actions"><button className="mh-button outline" onClick={() => { addToCart(); notify(`Đã thêm ${product.name} vào giỏ`) }}>Thêm vào giỏ</button><a className="mh-button solid" href="/san-pham">Xem sản phẩm</a></div></article> })}</div></section>
      <section className="mh-section mh-lookup" id="tra-cuu"><img src={photo('truy-xuat.png')} alt="Tem truy xuất đặt cạnh cua" /><div><span className="mh-eyebrow">TRA CỨU NGUỒN GỐC</span><h2>Con cua của bạn đến từ đâu?</h2><p>Quét mã QR trên tem bằng camera điện thoại, hoặc nhập mã in bên dưới tem. Không cần đăng nhập.</p><form onSubmit={lookup}><label htmlFor="mh-code">Mã truy xuất</label><div><input id="mh-code" value={code} onChange={(event) => setCode(event.target.value)} placeholder="VD: CM-DM-2026-02-0187" /><button className="mh-button solid">Tra cứu</button></div></form><p className="mh-samples">Thử mã mẫu: {products.slice(0, 2).map((product) => <button key={product.qr} onClick={() => { setCode(product.qr); setSearchedCode(product.qr) }}>{product.qr}</button>)}</p>{searchedCode && (match ? <div className="mh-lookup-result"><b>✓ Mã truy xuất hợp lệ</b><h3>{match.name}</h3><dl><dt>Lô nuôi</dt><dd>{match.lot}</dd><dt>Hộ nuôi</dt><dd>{farmers[match.farmer].name}</dd><dt>Thả giống</dt><dd>{match.seed}</dd><dt>Thu hoạch</dt><dd>{match.harvest}</dd></dl></div> : <p className="mh-lookup-error">Không tìm thấy mã {searchedCode}. Vui lòng kiểm tra lại tem.</p>)}</div></section>
      <section className="mh-section mh-hub" id="nguoi-nuoi"><span className="mh-eyebrow">NGƯỜI NUÔI</span><h2>Những hộ nuôi đứng sau mỗi lô</h2><p>Mỗi ghim trên bản đồ là một đầm đối tác. Chọn một đầm để xem hộ nuôi.</p><div className="mh-hub-grid"><div className="mh-map"><input aria-label="Tìm đầm nuôi" value={mapQuery} onChange={(event) => setMapQuery(event.target.value)} placeholder="Tìm đầm nuôi…" /><div className="mh-map-pins">{farmers.map((farmer, i) => `${farmer.name} ${farmer.pond}`.toLowerCase().includes(mapQuery.toLowerCase()) && <button key={farmer.name} className={i === farmerIndex ? 'selected' : ''} style={{ left: `${farmer.x}%`, top: `${farmer.y}%` }} onClick={() => setFarmerIndex(i)}>◆<small>{farmer.pond}</small></button>)}</div><span>Sơ đồ minh hoạ · không theo tỷ lệ</span></div><div className="mh-farmer-cards">{[farmers[farmerIndex], farmers[farmerIndex === 0 ? 1 : 0]].map((farmer) => <article key={farmer.name}><div className="mh-farmer-photo">{farmer === farmers[0] ? <img src={photo('farmer.png')} alt={farmer.name} /> : <span>{farmer.name.split(' ').slice(-2).map((part) => part[0]).join('')}</span>}</div><div><h3>{farmer.name}</h3><p>Hộ nuôi · {farmer.pond}</p><p>Đã thu <b>{farmer.harvest}</b> qua {farmer.ponds} đầm</p><a href="/dang-ky" className="mh-button outline">Xem lô đang gọi vốn</a></div></article>)}</div></div><aside className="mh-invite"><div><b>Bạn là người nuôi cua?</b><span>Đăng ký gọi vốn cho lô của bạn, CrabShare hỗ trợ lập chi phí chuẩn và bán cua sau thu hoạch.</span></div><a className="mh-button solid" href="/dang-ky">Đăng ký gọi vốn</a></aside></section>
      <section className="mh-section" id="hoi-dap"><span className="mh-eyebrow">HỎI ĐÁP</span><h2>Câu hỏi thường gặp</h2><div className="mh-faq">{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    </main><p className="mh-credit">Ảnh cua minh hoạ từ Wikimedia Commons, tác giả Wibowo Djatmiko và Judgefloro · <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.vi">CC BY-SA 4.0</a>.</p><SiteFooter /><div className={`mh-toast ${toast ? 'visible' : ''}`} role="status">{toast}</div>
  </div>
}

export default App
