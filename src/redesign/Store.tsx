/* 3 bản thiết kế lại cửa hàng.
   1 — Tối, lưới ảnh lớn như trang chủ; xem sản phẩm toàn màn hình.
   2 — Sáng, kiểu biên tập; danh sách có ảnh, mua ngay trên dòng; xem sản phẩm dạng tấm trượt từ dưới.
   3 — Pha trộn, bento; mua ngay trên thẻ, giỏ hàng luôn hiện bên phải. */
import { Fragment, useState, type ReactNode } from 'react'
import { ArrowUpRight, Clock, Plus, ShoppingBag, X } from 'lucide-react'
import { IMG, KINDS, filterProducts, product, small, vnd, type KindFilter, type Product } from './data'
import { CartButton, CartDrawer, CartProvider, ProductView, Qty, Shell, Switcher, Tabs, TopBar, useCart, useCountdown, useModalLock } from './kit'
import './store.css'

type Sort = 'new' | 'asc' | 'desc'
const sortProducts = (list: Product[], s: Sort) =>
  s === 'new' ? list : [...list].sort((a, b) => (s === 'asc' ? 1 : -1) * (a.sizes[0].price - b.sizes[0].price))

function SortSelect({ value, onChange }: { value: Sort; onChange: (s: Sort) => void }) {
  return (
    <label className="st-sort">
      <span className="st-sort__label">Sắp xếp</span>
      <select value={value} onChange={(e) => onChange(e.target.value as Sort)}>
        <option value="new">Mới thu</option>
        <option value="asc">Giá thấp trước</option>
        <option value="desc">Giá cao trước</option>
      </select>
    </label>
  )
}

/** Khung chứa trang sản phẩm: toàn màn hình, tấm trượt từ dưới hoặc từ phải. */
function Panel({ kind, onClose, children }: { kind: 'full' | 'sheet' | 'side'; onClose: () => void; children: ReactNode }) {
  useModalLock(onClose)
  return (
    <div className={`st-panel st-panel--${kind}`} role="dialog" aria-modal="true" aria-label="Chi tiết sản phẩm">
      <div className="st-panel__scrim" onClick={onClose} />
      <div className="st-panel__box">
        <button type="button" className="rd-iconbtn st-panel__close" onClick={onClose} aria-label="Đóng"><X size={18} /></button>
        <div className="st-panel__scroll">{children}</div>
      </div>
    </div>
  )
}

function CartBar() {
  const c = useCart()
  const cd = useCountdown(c.holdUntil)
  if (!c.count) return null
  return (
    <button type="button" className="st-cartbar" onClick={() => c.setOpen(true)}>
      <span className="st-cartbar__icon"><ShoppingBag size={18} /><i>{c.count}</i></span>
      <span className="st-cartbar__text"><b>{vnd(c.today)}</b><small><Clock size={12} /> giữ hàng {cd.text}</small></span>
      <span className="st-cartbar__go">Xem giỏ <ArrowUpRight size={16} /></span>
    </button>
  )
}

/* =================== Bản 1 — Tối, lưới ảnh lớn =================== */
function CardV1({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const cart = useCart()
  return (
    <article className="s1-card">
      <div className="s1-card__frame">
      <button type="button" className="s1-card__media" onClick={onOpen} aria-label={`Xem ${p.name}`}>
        <img src={small(p.img)} alt="" loading="lazy" />
        <span className="s1-card__top">
          <span className="rd-chip rd-chip--solid">Lô {p.lot}</span>
          {p.preorder ? <span className="rd-tag rd-tag--accent">Đặt trước</span> : p.stock < 10 ? <span className="rd-tag s1-low">Còn {p.stock}</span> : null}
        </span>
      </button>
      <button type="button" className="rd-round s1-card__add" onClick={() => cart.add(p.id, 0)} aria-label={`Thêm ${p.name} vào giỏ`}><Plus size={20} /></button>
      </div>
      <div className="s1-card__meta">
        <div><h3>{p.name}</h3><small>{p.sizes[0].label}</small></div>
        <b>{vnd(p.sizes[0].price)}<small>/{p.unit}</small></b>
      </div>
    </article>
  )
}

function StoreV1Inner() {
  const [kind, setKind] = useState<KindFilter>('Tất cả')
  const [sort, setSort] = useState<Sort>('new')
  const [open, setOpen] = useState<string | null>(null)
  const list = sortProducts(filterProducts(kind), sort)
  return (
    <>
      <TopBar area="store" n={1} right={<CartButton />} />
      <main className="s1">
        <section className="s1-head">
          <p className="rd-eyebrow">Cửa hàng · hàng từ các lô đang bán</p>
          <h1 className="rd-display">Cua tươi,<br /><em>biết rõ từ lô nào.</em></h1>
          <div className="s1-bar">
            <Tabs items={KINDS} value={kind} onChange={setKind} />
            <SortSelect value={sort} onChange={setSort} />
          </div>
        </section>
        <section className="s1-grid" aria-label="Sản phẩm">
          {list.map((p, i) => (
            <Fragment key={p.id}>
              {i === 4 && kind === 'Tất cả' && (
                <button type="button" className="s1-band" onClick={() => setOpen('pre')}>
                  <img src={small(IMG.bound, 1200)} alt="" loading="lazy" />
                  <span className="s1-band__text">
                    <span className="rd-eyebrow">Lô L2612-02 · thu hoạch 20/12</span>
                    <b>Đặt trước, chỉ cọc 15%.</b>
                  </span>
                  <span className="rd-round"><ArrowUpRight size={20} /></span>
                </button>
              )}
              <CardV1 p={p} onOpen={() => setOpen(p.id)} />
            </Fragment>
          ))}
        </section>
      </main>
      {open && <Panel kind="full" onClose={() => setOpen(null)}><ProductView p={product(open)} /></Panel>}
      <CartDrawer />
    </>
  )
}

export function StoreV1() {
  return (
    <Shell theme="dark">
      <CartProvider><StoreV1Inner /></CartProvider>
      <Switcher area="store" n={1} />
    </Shell>
  )
}

/* =================== Bản 2 — Sáng, danh sách biên tập =================== */
function RowAdd({ p }: { p: Product }) {
  const cart = useCart()
  const line = cart.lines.find((l) => l.id === p.id && l.size === 0)
  if (line) return <Qty small value={line.qty} max={p.stock} onChange={(v) => cart.setQty(p.id, 0, v)} />
  return <button type="button" className="rd-btn rd-btn--dark rd-btn--sm" onClick={() => cart.add(p.id, 0)}><Plus size={16} /> Thêm</button>
}

function StoreV2Inner() {
  const [kind, setKind] = useState<KindFilter>('Tất cả')
  const [open, setOpen] = useState<string | null>(null)
  const list = filterProducts(kind)
  return (
    <>
      <TopBar area="store" n={2} right={<CartButton label />} />
      <main className="s2">
        <section className="s2-hero">
          <div className="s2-hero__text">
            <p className="rd-eyebrow">Hàng về hôm nay</p>
            <h1 className="rd-display">Chợ cua<br /><em>của CrabShare.</em></h1>
            <p className="rd-muted s2-hero__lead">Chọn món, chọn cỡ, giao trong ngày. Mỗi con có mã nguồn gốc.</p>
            <a href="#hang" className="rd-btn rd-btn--dark rd-btn--lg">Xem hàng hôm nay</a>
          </div>
          <button type="button" className="s2-hero__media" onClick={() => setOpen('gach')} aria-label="Xem cua gạch son">
            <img src={IMG.gach} alt="" />
            <span className="s2-price"><small>Cua gạch son · lô L2610-05</small><b>690.000 đ/kg</b></span>
          </button>
        </section>
        <nav className="s2-tabs" id="hang" aria-label="Loại hàng">
          {KINDS.map((k) => (
            <button key={k} type="button" className={k === kind ? 'is-on' : ''} onClick={() => setKind(k)}>
              {k}<sup>{filterProducts(k).length}</sup>
            </button>
          ))}
        </nav>
        <ul className="s2-list">
          {list.map((p, i) => (
            <li key={p.id} className="s2-row">
              <button type="button" className="s2-row__img" onClick={() => setOpen(p.id)} aria-label={`Xem ${p.name}`}><img src={small(p.img, 400)} alt="" loading="lazy" /></button>
              <div className="s2-row__main">
                <span className="s2-row__i">{String(i + 1).padStart(2, '0')}</span>
                <button type="button" className="s2-row__name" onClick={() => setOpen(p.id)}>{p.name}</button>
                <small>{p.sizes[0].label} · lô {p.lot}{p.preorder ? ' · đặt trước, cọc 15%' : ` · còn ${p.stock} ${p.unit}`}</small>
              </div>
              <b className="s2-row__price">{vnd(p.sizes[0].price)}<small>/{p.unit}</small></b>
              <div className="s2-row__add"><RowAdd p={p} /></div>
            </li>
          ))}
        </ul>
      </main>
      {open && <Panel kind="sheet" onClose={() => setOpen(null)}><ProductView p={product(open)} /></Panel>}
      <CartBar />
      <CartDrawer />
    </>
  )
}

export function StoreV2() {
  return (
    <Shell theme="light">
      <CartProvider><StoreV2Inner /></CartProvider>
      <Switcher area="store" n={2} />
    </Shell>
  )
}

/* =================== Bản 3 — Pha trộn, bento + giỏ luôn hiện =================== */
function CardV3({ p, onOpen }: { p: Product; onOpen: () => void }) {
  const cart = useCart()
  const [size, setSize] = useState(0)
  const [qty, setQty] = useState(1)
  return (
    <article className="s3-card">
      <button type="button" className="s3-card__img" onClick={onOpen} aria-label={`Xem ${p.name}`}>
        <img src={small(p.img, 500)} alt="" loading="lazy" />
        {p.preorder && <span className="rd-tag rd-tag--accent">Đặt trước</span>}
      </button>
      <div className="s3-card__body">
        <div>
          <h3>{p.name}</h3>
          <small>Lô {p.lot} · còn {p.stock} {p.unit}</small>
        </div>
        {p.sizes.length > 1 ? (
          <div className="rd-pills s3-pills">
            {p.sizes.map((s, i) => <button key={s.label} type="button" className={i === size ? 'is-on' : ''} onClick={() => setSize(i)}>{s.label}</button>)}
          </div>
        ) : <small className="s3-one">{p.sizes[0].label}</small>}
        <b className="s3-card__price">{vnd(p.sizes[size].price)}<small>/{p.unit}</small></b>
        <div className="s3-card__buy">
          <Qty small value={qty} max={p.stock} onChange={(v) => setQty(Math.max(1, v))} />
          <button type="button" className="rd-btn rd-btn--primary rd-btn--sm s3-add" onClick={() => cart.add(p.id, size, qty)} aria-label={`Thêm ${p.name} vào giỏ`}><Plus size={16} />Thêm</button>
        </div>
      </div>
    </article>
  )
}

function CartPanel() {
  const c = useCart()
  const cd = useCountdown(c.holdUntil)
  return (
    <aside className="s3-cart" aria-label="Giỏ hàng">
      <div className="s3-cart__head"><b>Giỏ hàng</b><span>{c.count} món</span></div>
      {c.count === 0 ? (
        <p className="s3-cart__empty"><ShoppingBag size={22} />Bấm + trên món bạn thích.</p>
      ) : (
        <>
          <p className="rd-hold s3-cart__hold"><Clock size={14} /> Giữ hàng · <b>{cd.text}</b></p>
          <ul className="s3-cart__lines">
            {c.lines.map((l) => {
              const p = product(l.id)
              return (
                <li key={`${l.id}-${l.size}`}>
                  <img src={small(p.img, 160)} alt="" />
                  <span className="s3-cart__name"><b>{p.name}</b><small>{p.sizes[l.size].label}</small></span>
                  <Qty small value={l.qty} max={p.stock} onChange={(v) => c.setQty(l.id, l.size, v)} />
                </li>
              )
            })}
          </ul>
          <div className="s3-cart__total"><span>Trả hôm nay</span><b>{vnd(c.today)}</b></div>
          <button type="button" className="rd-btn rd-btn--primary rd-btn--block rd-btn--lg" onClick={() => c.setOpen(true)}>Thanh toán</button>
        </>
      )}
    </aside>
  )
}

function StoreV3Inner() {
  const [kind, setKind] = useState<KindFilter>('Tất cả')
  const [open, setOpen] = useState<string | null>(null)
  const list = filterProducts(kind)
  const pick = (k: KindFilter) => {
    setKind(k)
    document.getElementById('s3-hang')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <>
      <div className="s3-dark">
        <TopBar area="store" n={3} right={<CartButton />} />
        <section className="s3-bento" aria-label="Nổi bật">
          <button type="button" className="s3-tile s3-tile--big" onClick={() => pick('Cua thịt')}>
            <img src={IMG.handPick} alt="" />
            <span className="s3-tile__text"><span className="rd-chip rd-chip--solid"><i style={{ background: '#f5b93b' }} />Vừa thu hoạch</span><b>Lô L2701-01</b><small>412 con cua thịt, bán từ hôm nay</small></span>
            <span className="rd-round"><ArrowUpRight size={20} /></span>
          </button>
          <button type="button" className="s3-tile" onClick={() => pick('Đặt trước')}>
            <img src={small(IMG.bound, 900)} alt="" />
            <span className="s3-tile__text"><b>Đặt trước</b><small>Cọc 15%, giao khi thu hoạch</small></span>
          </button>
          <button type="button" className="s3-tile" onClick={() => pick('Chế biến')}>
            <img src={small(IMG.steamer, 900)} alt="" />
            <span className="s3-tile__text"><b>Hấp sẵn, lẩu cua</b><small>Mở hộp là ăn</small></span>
          </button>
        </section>
      </div>
      <main className="s3" id="s3-hang">
        <div className="s3-main">
          <div className="s3-toolbar">
            <h2 className="rd-h2">{kind === 'Tất cả' ? 'Tất cả hàng' : kind}</h2>
            <Tabs items={KINDS} value={kind} onChange={setKind} />
          </div>
          <div className="s3-grid">{list.map((p) => <CardV3 key={p.id} p={p} onOpen={() => setOpen(p.id)} />)}</div>
        </div>
        <CartPanel />
      </main>
      {open && <Panel kind="side" onClose={() => setOpen(null)}><ProductView p={product(open)} /></Panel>}
      <div className="s3-mobilebar"><CartBar /></div>
      <CartDrawer />
    </>
  )
}

export function StoreV3() {
  return (
    <Shell theme="mix">
      <CartProvider><StoreV3Inner /></CartProvider>
      <Switcher area="store" n={3} />
    </Shell>
  )
}
