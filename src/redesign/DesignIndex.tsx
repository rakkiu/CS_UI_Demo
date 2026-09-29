/* Trang chọn bản thiết kế: /thiet-ke */
import { useEffect } from 'react'
import { IMG, small } from './data'
import { Logo, Shell } from './kit'

const STORE = [
  { n: 1, title: 'Bản 1 · Tối, lưới ảnh lớn', img: IMG.gach, desc: 'Giống trang chủ. Ảnh to, bấm + để thêm nhanh, xem sản phẩm toàn màn hình.' },
  { n: 2, title: 'Bản 2 · Sáng, danh sách', img: IMG.steamer, desc: 'Nền sáng, mỗi dòng một món có ảnh. Thêm và đổi số lượng ngay trên dòng.' },
  { n: 3, title: 'Bản 3 · Bento, giỏ luôn hiện', img: IMG.handPick, desc: 'Ô nổi bật ở đầu trang, chọn cỡ và số lượng ngay trên thẻ, giỏ hàng luôn ở bên phải.' },
]
const INVEST = [
  { n: 1, title: 'Bản 1 · Tối, một con số lớn', img: IMG.thit, desc: 'Tổng vốn to ở đầu, thẻ lô có ảnh, trang lô cuộn một mạch, nút góp vốn luôn ở dưới.' },
  { n: 2, title: 'Bản 2 · Sáng kiểu ứng dụng', img: IMG.com, desc: 'Menu trái 3 mục, thẻ số liệu gọn, thẻ góp vốn dính bên phải trang lô.' },
  { n: 3, title: 'Bản 3 · Tiền của bạn ở đâu', img: IMG.tied, desc: 'Bảng 4 cột theo vòng đời lô, lô mới dạng băng chuyền kéo ngang, trang lô kể theo 5 bước.' },
]

export default function DesignIndex() {
  useEffect(() => { document.title = 'CrabShare — Các bản thiết kế' }, [])
  const group = (label: string, base: string, items: typeof STORE) => (
    <section className="rd-index__group">
      <h2 className="rd-h2">{label}</h2>
      <div className="rd-index__grid">
        {items.map((it) => (
          <a key={it.n} className="rd-index__card" href={`/thiet-ke/${base}/${it.n}`}>
            <span className="rd-index__thumb"><img src={small(it.img, 800)} alt="" /><span className="rd-tag rd-tag--accent">Bản {it.n}</span></span>
            <h3 className="rd-h3">{it.title}</h3>
            <p>{it.desc}</p>
          </a>
        ))}
      </div>
    </section>
  )
  return (
    <Shell theme="dark">
      <main className="rd-index">
        <Logo />
        <div style={{ display: 'grid', gap: 14 }}>
          <p className="rd-eyebrow">Duyệt thiết kế · cửa hàng và nhà đầu tư</p>
          <h1 className="rd-display">Chọn một bản <em>để xem.</em></h1>
          <p className="rd-muted">Mỗi bản bấm được thật: thêm vào giỏ, thanh toán, xem lô, góp vốn. Thanh ở cuối màn hình giúp chuyển nhanh giữa các bản.</p>
        </div>
        {group('Cửa hàng', 'cua-hang', STORE)}
        {group('Nhà đầu tư', 'nha-dau-tu', INVEST)}
      </main>
    </Shell>
  )
}
