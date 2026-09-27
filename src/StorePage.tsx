import { useMemo, useState } from 'react'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { useDemoSession } from './DemoSession'

const asset = (name: string) => `/assets/${name}`

const products = [
  ['Loại 1', 'Vừa (450g)', 'Cua Gạch Son Cà Mau — Chuẩn RAS Thượng Hạng', '490.000 đ', '550.000 đ', ''],
  ['Loại 1', 'Vừa (400g)', 'Cua Yếm Vuông (Cua Y Yếm) Buộc Dây Rơm Tự Nhiên', '385.000 đ', '', 'Từ Batch #CR-0142'],
  ['Loại 1', 'Lớn (>650g)', 'Cua Thịt Càng Lớn Siêu Cồ (Y7 Tuyển Chọn)', '620.000 đ', '680.000 đ', 'Từ Batch #CR-0141'],
  ['Loại 1', 'Hộp 500g', 'Thịt Càng & Đùi Cua Tươi Bóc Sẵn Hút Chân Không', '450.000 đ', '', ''],
  ['Loại 2', 'Vừa (380g)', 'Cua Cốm (Cua Hai Da) Chuẩn Bị Lột Xác', '520.000 đ', '', ''],
  ['Loại 2', 'Vừa (320g)', 'Cua Thịt Cà Mau Y3 Tiêu Chuẩn Gia Đình', '310.000 đ', '', ''],
]

function StorePage() {
  const [grade, setGrade] = useState('Loại 1')
  const [size, setSize] = useState('Vừa (400g)')
  const { cartCount: cart, addToCart } = useDemoSession()
  const [sort, setSort] = useState('Mới nhất')
  const active = useMemo(() => [grade, `Kích cỡ: ${size}`], [grade, size])
  const clear = () => { setGrade(''); setSize('') }

  return <>
    <SiteHeader />
    <main className="store-page">
    <section className="store-hero"><p>TRANG CHỦ <b>/</b> <strong>CỬA HÀNG</strong></p><h1>Sản phẩm từ các Batch đã thu hoạch</h1><span>Hải sản tươi sống và thịt cua sơ chế sạch từ hệ thống trang trại tuần hoàn RAS, minh bạch<br />100% nguồn gốc và nhật ký nuôi.</span></section>
    <section className="store-content">
      <aside className="store-filter">
        <div className="filter-heading"><span><img src={asset('storeFilter.svg')} alt="" />BỘ LỌC TÌM KIẾM</span><button onClick={clear}>Xoá bộ lọc</button></div>
        <h2>GRADE (PHÂN HẠNG)</h2>
        {['Loại 1 (Tuyển chọn đặc biệt)', 'Loại 2 (Tiêu chuẩn xuất khẩu)', 'Loại 3 (Cua thịt thường)'].map((label, index) => <label key={label}><input checked={grade === `Loại ${index + 1}`} onChange={() => setGrade(`Loại ${index + 1}`)} type="checkbox" /><span>{label}</span><em>({[18,12,8][index]})</em></label>)}
        <h2>KÍCH CỠ</h2><div className="filter-options">{['Nhỏ (250g)', 'Vừa (400g)', 'Lớn (>600g)'].map(x => <button className={size === x ? 'selected' : ''} onClick={() => setSize(x)} key={x}>{x}</button>)}</div>
        <h2>KHOẢNG GIÁ</h2><div className="price-range"><label>TỐI THIỂU<input value="300.000" readOnly /></label><b>—</b><label>TỐI ĐA<input value="1.500.000" readOnly /></label></div>
        <button className="clear-all" onClick={clear}>↻ XOÁ TOÀN BỘ BỘ LỌC</button>
      </aside>
      <div className="store-list">
        <div className="store-toolbar"><div>ĐANG CHỌN: {active.map(x => <button key={x}>{x} ×</button>)}<button onClick={clear}>Xoá tất cả</button></div><label>SẮP XẾP: <select value={sort} onChange={e=>setSort(e.target.value)}><option>Mới nhất</option><option>Giá tăng dần</option><option>Giá giảm dần</option></select></label><span aria-live="polite">GIỎ HÀNG: {cart}</span></div>
        <div className="product-grid">{products.map(([type, weight, name, price, old, batch]) => <article className="product-card" key={name}><a href="/san-pham"><div className="product-image"><span>{type}</span><b>{weight}</b><img src={asset('storeCrab.png')} alt={name} /></div></a><small>{batch || ' '}</small><h2>{name}</h2><div className="product-price"><strong>{price}</strong>{old && <del>{old}</del>}</div><button onClick={addToCart}><img src={asset('storeCart.svg')} alt="" />THÊM VÀO GIỎ</button></article>)}</div>
        <div className="store-pagination"><span>Hiển thị 1–6 trong tổng số 38 sản phẩm thu hoạch</span><div><button><img src={asset('storePrev.svg')} alt="Trang trước" /></button><button className="current">1</button><button>2</button><button>3</button><b>…</b><button>7</button><button><img src={asset('storeNext.svg')} alt="Trang sau" /></button></div></div>
      </div>
    </section>
    </main>
    <SiteFooter />
  </>
}
export default StorePage
