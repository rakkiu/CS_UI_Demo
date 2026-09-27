import { useState } from 'react'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { useDemoSession } from './DemoSession'

const asset = (name: string) => `/assets/${name}`
const pageData: Record<string, { title: string; subtitle: string }> = {
  '/gio-hang': { title: 'Giỏ hàng', subtitle: 'Kiểm tra sản phẩm trước khi thanh toán' },
  '/thanh-toan': { title: 'Thanh toán', subtitle: 'Thông tin giao hàng và phương thức thanh toán' },
  '/xac-nhan-don-hang': { title: 'Xác nhận đơn hàng', subtitle: 'Đơn hàng #CS-240826 đã được tiếp nhận' },
  '/theo-doi-don-hang': { title: 'Theo dõi đơn hàng', subtitle: 'Đơn hàng #CS-240826 đang được chuẩn bị' },
  '/lich-su-don-hang': { title: 'Lịch sử đơn hàng', subtitle: 'Các đơn hàng gần đây của bạn' },
  '/huy-tra-hang': { title: 'Yêu cầu huỷ / trả hàng', subtitle: 'Đơn hàng #CS-240826 · Cua Gạch Son Cà Mau' },
  '/danh-gia-don-hang': { title: 'Đánh giá đơn hàng', subtitle: 'Hãy chia sẻ trải nghiệm mua hàng của bạn' },
  '/san-pham': { title: 'Cua Gạch Son Cà Mau — Chuẩn RAS Thượng Hạng', subtitle: 'Sản phẩm thu hoạch từ Batch #CR-0142' },
}

function ProductRow() { return <div className="commerce-product"><img src={asset('storeCrab.png')} alt="Cua Gạch Son Cà Mau" /><div><strong>Cua Gạch Son Cà Mau — Chuẩn RAS Thượng Hạng</strong><p>Loại 1 · Vừa (450g) · Batch #CR-0142</p></div><b>490.000 đ</b></div> }

function CheckoutForm({ onSubmit }: { onSubmit: () => void }) {
  return <section className="checkout-layout">
    <div className="checkout-form">
      <div className="checkout-heading"><div><h1>Thanh toán</h1><div className="checkout-progress"><span>1. Giỏ hàng</span><i /><b>2. Thanh toán</b><i /><span>3. Hoàn tất</span></div></div><a href="/gio-hang">← Quay lại giỏ hàng</a></div>
      <form onSubmit={(event) => { event.preventDefault(); onSubmit() }}>
        <h2>1. Thông tin nhận hàng</h2><div className="checkout-fields two"><label>HỌ VÀ TÊN *<input defaultValue="Nguyễn Dũng" required /></label><label>SỐ ĐIỆN THOẠI *<input defaultValue="0901 234 567" required /></label></div>
        <div className="checkout-fields"><label>ĐỊA CHỈ GIAO HÀNG *<input placeholder="Số nhà, tên đường, Phường/Xã" required /></label></div><div className="checkout-fields two"><label>TỈNH / THÀNH PHỐ *<select defaultValue="TP. Hồ Chí Minh"><option>TP. Hồ Chí Minh</option><option>Hà Nội</option></select></label><label>QUẬN / HUYỆN *<select defaultValue="TP. Thủ Đức"><option>TP. Thủ Đức</option><option>Quận 1</option></select></label></div><button type="button" className="checkout-note">+ Thêm ghi chú giao hàng</button>
        <div className="checkout-payment"><h2>2. Phương thức thanh toán</h2><label className="checkout-option"><input type="radio" name="payment" defaultChecked /><span><b>Thanh toán khi nhận hàng (COD)</b><small>Thanh toán bằng tiền mặt khi đơn hàng được giao.</small></span></label><label className="checkout-option"><input type="radio" name="payment" /><span><b>Chuyển khoản ngân hàng</b><small>Thông tin chuyển khoản sẽ hiển thị sau khi đặt hàng.</small></span></label></div>
        <button className="checkout-submit">XÁC NHẬN ĐẶT HÀNG</button>
      </form>
    </div>
    <aside className="checkout-summary"><h2>Đơn hàng của bạn</h2><ProductRow /><div><p>Tạm tính <b>490.000 đ</b></p><p>Phí vận chuyển <b>Miễn phí</b></p><strong>Tổng cộng <b>490.000 đ</b></strong></div><small>🔒 Thông tin thanh toán của bạn được bảo mật.</small></aside>
  </section>
}

function Rating({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return <div className="review-stars" aria-label={`${value} trên 5 sao`}>{[1, 2, 3, 4, 5].map((star) => <button type="button" key={star} onClick={() => onChange(star)} aria-label={`${star} sao`} className={star <= value ? 'active' : ''}>★</button>)}</div>
}

function ReviewOrder() {
  const [ratings, setRatings] = useState([5, 4, 5])
  const [sent, setSent] = useState(false)
  const items = [['Cua Gạch Son Cà Mau', 'Loại 1 (400g - 450g) · Số lượng: 1'], ['Cua Yếm Vuông Dây Rơm', 'Loại 1 (400g) · Số lượng: 2'], ['Thịt Càng & Đùi Cua Tươi Bóc Sẵn', 'Hộp 500g · Số lượng: 1']]
  return <main className="commerce-page review-page"><section className="review-wrap"><p className="review-breadcrumb"><a href="/">Trang chủ</a> / <a href="/lich-su-don-hang">Đơn hàng của tôi</a> / #CS-20260909-014 / <b>Đánh giá đơn hàng</b></p><h1>Đánh giá đơn hàng</h1><p className="review-order">Đơn hàng #CS-20260909-014 · Đã giao 09/09/2026</p><div className="review-products">{items.map(([name, detail], index) => <div className="review-product" key={name}><div className="review-thumb"><img src={asset('storeCrab.png')} alt="" /></div><div><h2>{name}</h2><p>{detail}</p></div><Rating value={ratings[index]} onChange={(rating) => setRatings((all) => all.map((value, itemIndex) => itemIndex === index ? rating : value))} /></div>)}</div><label className="review-comment">Chia sẻ thêm về đơn hàng của bạn<textarea placeholder="Sản phẩm có tươi ngon, đóng gói cẩn thận và giao đúng hẹn không?" /></label><div className="review-bottom"><span>{sent ? 'Cảm ơn bạn đã gửi đánh giá.' : 'Đánh giá của bạn giúp CrabShare phục vụ tốt hơn.'}</span><button onClick={() => setSent(true)}>GỬI ĐÁNH GIÁ</button></div></section></main>
}

export default function CommercePage() {
  const path = window.location.pathname
  const { title, subtitle } = pageData[path] ?? pageData['/gio-hang']
  const { cartCount, addToCart, clearCart, signedIn } = useDemoSession()
  const [submitted, setSubmitted] = useState(false)
  const isCart = path === '/gio-hang'; const isCheckout = path === '/thanh-toan'; const isProduct = path === '/san-pham'
  const isTracking = path === '/theo-doi-don-hang' || path === '/xac-nhan-don-hang'; const isHistory = path === '/lich-su-don-hang'
  if (isCheckout) return <><SiteHeader /><main className="commerce-page checkout-page"><div className="commerce-wrap"><CheckoutForm onSubmit={() => { clearCart(); window.location.assign('/xac-nhan-don-hang') }} /></div></main><SiteFooter /></>
  if (path === '/danh-gia-don-hang') return <><SiteHeader /><ReviewOrder /><SiteFooter /></>
  return <><SiteHeader /><main className="commerce-page"><div className="commerce-wrap"><p className="commerce-breadcrumb"><a href="/">TRANG CHỦ</a> / <span>{title.toUpperCase()}</span></p><h1>{title}</h1><p className="commerce-subtitle">{subtitle}</p>
    {isProduct ? <section className="commerce-detail"><img src={asset('storeCrab.png')} alt="Cua Gạch Son Cà Mau" /><div><span className="commerce-badge">LOẠI 1 · 450G</span><h2>Cua gạch tươi sống, nuôi tuần hoàn RAS</h2><p>Minh bạch nguồn gốc, giao trong ngày tại TP. Hồ Chí Minh.</p><strong className="commerce-price">490.000 đ</strong><button className="commerce-button" onClick={addToCart}>THÊM VÀO GIỎ</button></div></section> : isCart ? <section className="commerce-grid"><div className="commerce-card">{cartCount ? <><ProductRow /><div className="commerce-actions"><button onClick={clearCart}>Xoá giỏ hàng</button><a className="commerce-button" href="/thanh-toan">THANH TOÁN</a></div></> : <p>Giỏ hàng đang trống. <a href="/cua-hang">Khám phá cửa hàng</a></p>}</div><aside className="commerce-summary"><h2>Tóm tắt đơn hàng</h2><p>Tạm tính <b>{cartCount * 490000 || 0} đ</b></p><p>Phí giao hàng <b>Miễn phí</b></p><strong>Tổng cộng <b>{cartCount * 490000 || 0} đ</b></strong></aside></section> : isTracking ? <section className="commerce-card commerce-centered"><div className="commerce-status">✓</div><h2>{path === '/xac-nhan-don-hang' ? 'Đặt hàng thành công!' : 'Đơn hàng đang được giao đến bạn'}</h2><p>{subtitle}</p><div className="commerce-steps"><b>Đã xác nhận</b><b>Đang chuẩn bị</b><b>Đang giao</b><b>Hoàn thành</b></div><a className="commerce-button" href="/theo-doi-don-hang">THEO DÕI ĐƠN HÀNG</a></section> : isHistory ? <section className="commerce-card"><div className="commerce-tabs"><b>TẤT CẢ</b><span>ĐANG XỬ LÝ</span><span>HOÀN THÀNH</span></div><ProductRow /><div className="commerce-actions"><span>Đã giao thành công</span><a href="/danh-gia-don-hang">ĐÁNH GIÁ</a><a href="/huy-tra-hang">YÊU CẦU TRẢ HÀNG</a></div></section> : <section className="commerce-card commerce-centered"><h2>{submitted ? 'Cảm ơn đánh giá của bạn!' : title}</h2><p>{subtitle}</p><div className="commerce-stars">★★★★★</div><textarea placeholder="Viết nhận xét của bạn" /><button className="commerce-button" onClick={() => setSubmitted(true)}>{path === '/huy-tra-hang' ? 'GỬI YÊU CẦU' : 'GỬI ĐÁNH GIÁ'}</button></section>}
    {!signedIn && !isProduct && <p className="commerce-login-note">Đăng nhập demo để xem hồ sơ và giỏ hàng trên header.</p>}
  </div></main><SiteFooter /></>
}
