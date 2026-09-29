/* 3 bản thiết kế lại cổng nhà đầu tư.
   1 — Tối như trang chủ: một con số lớn, thẻ lô có ảnh, trang lô cuộn một mạch.
   2 — Sáng kiểu ứng dụng: menu trái 3 mục, thẻ số liệu gọn, thẻ góp vốn dính bên phải.
   3 — "Tiền của bạn đang ở đâu": bảng 4 cột theo vòng đời lô, lô mới dạng băng chuyền, trang lô kể theo 5 bước. */
import { useRef, useState, type CSSProperties, type PointerEvent as RPointerEvent } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, Bell, ChevronRight, Compass, House, Receipt, ShoppingBag } from 'lucide-react'
import {
  HOLDINGS, INVESTOR, LIFE, LOTS, NOTICES, STAGES, activeHoldings, activeTotal, closedPayout2610, lifeIndex, lot, maxCapital, minContribution,
  myPayout2611, pct, small, stage, tr, vnd, type Lot,
} from './data'
import {
  ContributeModal, CostBars, FundBar, Lifeline, Logo, SettleSim, SettlementCard, Shell, StageChip, StickyInvest, Switcher, Tabs, TopBar, Tranches,
} from './kit'
import './investor.css'

/* ---------- điều hướng trong một bản ---------- */
type View = 'home' | 'explore' | 'lot' | 'settle'
function useNav() {
  const [view, setView] = useState<View>('home')
  const [code, setCode] = useState('L2612-01')
  const [prev, setPrev] = useState<View>('home')
  const top = () => window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  return {
    view,
    code,
    /** Trang đang được coi là mục menu hiện tại (lô mở từ đâu thì giữ mục đó). */
    section: view === 'lot' ? prev : view,
    go: (v: View) => { setView(v); top() },
    open: (c: string) => { setPrev(view === 'lot' ? prev : view); setCode(c); setView('lot'); top() },
    back: () => { setView(prev); top() },
  }
}

const FILTERS = ['Tất cả', ...STAGES.map((s) => s.label)] as const
type Filter = (typeof FILTERS)[number]
const byFilter = (f: Filter) => LOTS.filter((l) => f === 'Tất cả' || stage(l.stage).label === f)
const holdingOf = (code: string) => HOLDINGS.find((h) => h.code === code)
const facts = (l: Lot) => [
  ['Mục tiêu', tr(l.target, 0)],
  ['Đã góp', `${pct(l.confirmed, l.target)}%`],
  ['Góp tối thiểu', tr(minContribution(l))],
  ['Chu kỳ', `${l.cycleDays} ngày · ${l.boxes} ô`],
]

function Bell0() {
  return <button type="button" className="rd-iconbtn iv-bell" aria-label="Thông báo, 3 mới"><Bell size={18} /><i /></button>
}

/** Thẻ lô có ảnh nền: dùng ở lưới (bản 1) và băng chuyền (bản 3). */
function LotTile({ l, onOpen, className = '' }: { l: Lot; onOpen: () => void; className?: string }) {
  return (
    <button type="button" className={`iv-tile is-${l.stage} ${className}`} onClick={onOpen}>
      <img src={small(l.img, 900)} alt="" loading="lazy" />
      <span className="iv-tile__top"><StageChip s={l.stage} solid /><span className="iv-tile__go"><ArrowUpRight size={18} /></span></span>
      <span className="iv-tile__body">
        <b className="iv-tile__code">{l.code}</b>
        <span className="iv-tile__crab">{l.crab} · {l.boxes} ô</span>
        {l.stage === 'funding' ? <FundBar l={l} labels={false} /> : <Lifeline s={l.stage} compact />}
        <span className="iv-tile__meta"><b>{l.stage === 'funding' ? `${pct(l.confirmed, l.target)}%` : tr(l.target, 0)}</b><span>{l.when}</span></span>
      </span>
    </button>
  )
}

/** Các khối nội dung của trang lô, bản nào cũng dùng. */
function LotSections({ l }: { l: Lot }) {
  return (
    <>
      <section className="iv-card">
        <h3 className="rd-h3">Tiền đi đâu</h3>
        <CostBars l={l} />
      </section>
      <section className="iv-card">
        <h3 className="rd-h3">Hành trình</h3>
        <Lifeline s={l.stage} />
        <Tranches l={l} />
        <p className="rd-note">{l.note}</p>
      </section>
      {l.stage === 'settle' ? (
        <section className="iv-card iv-card--wide">
          <h3 className="rd-h3">Bảng quyết toán</h3>
          <SettlementCard />
        </section>
      ) : l.stage !== 'closed' ? (
        <section className="iv-card iv-card--wide">
          <h3 className="rd-h3">Thử xem cách chia</h3>
          <SettleSim l={l} />
        </section>
      ) : null}
    </>
  )
}

/* =================== Bản 1 — Tối =================== */
function MineCard({ code, amount, onOpen }: { code: string; amount: number; onOpen: () => void }) {
  const l = lot(code)
  return (
    <button type="button" className="i1-mine" onClick={onOpen}>
      <span className="i1-mine__img"><img src={small(l.img, 600)} alt="" loading="lazy" /><StageChip s={l.stage} solid /></span>
      <span className="i1-mine__body">
        <span className="i1-mine__row"><b>{l.code}</b><span>{l.crab}</span></span>
        <b className="i1-mine__amt">{vnd(amount)}</b>
        <Lifeline s={l.stage} compact />
        <span className="i1-mine__when">{l.when}</span>
      </span>
    </button>
  )
}

function InvV1Inner() {
  const nav = useNav()
  const [filter, setFilter] = useState<Filter>('Tất cả')
  const [investing, setInvesting] = useState<Lot | null>(null)
  const l = lot(nav.code)
  return (
    <>
      <TopBar area="investor" n={1} right={<><Bell0 /><span className="rd-avatar">{INVESTOR.initials}</span></>}>
        <button type="button" className={nav.section === 'home' ? 'is-on' : ''} onClick={() => nav.go('home')}>Tổng quan</button>
        <button type="button" className={nav.section !== 'home' ? 'is-on' : ''} onClick={() => nav.go('explore')}>Khám phá lô</button>
        <a href="/thiet-ke/cua-hang/1">Cửa hàng</a>
      </TopBar>

      {nav.view === 'home' && (
        <main className="i1">
          <section className="i1-hero">
            <p className="rd-eyebrow">Chào {INVESTOR.name}</p>
            <p className="rd-big">{vnd(activeTotal)}</p>
            <p className="rd-muted">đang nằm trong {activeHoldings.length} lô, mỗi lô một tài khoản riêng</p>
            <div className="i1-stats">
              <div><small>Chờ nhận về</small><b>{tr(myPayout2611, 2)}</b><span>L2611-01 · quyết toán</span></div>
              <div><small>Đã nhận về</small><b>{tr(closedPayout2610, 2)}</b><span>L2610-03 · đã chia</span></div>
              <div><small>Đang nuôi</small><b>1 lô</b><span>L2612-02 · ngày 34 / 60</span></div>
            </div>
          </section>
          <button type="button" className="i1-todo" onClick={() => nav.open('L2611-01')}>
            <span className="i1-todo__dot" />
            <span><b>Soát bảng quyết toán L2611-01</b><small>Còn 5 ngày để đồng ý hoặc hỏi lại</small></span>
            <span className="rd-round"><ArrowRight size={18} /></span>
          </button>
          <section className="i1-sec">
            <div className="i1-sec__head"><h2 className="rd-h2">Lô của bạn</h2></div>
            <div className="i1-mines">{activeHoldings.map((h) => <MineCard key={h.code} code={h.code} amount={h.amount} onOpen={() => nav.open(h.code)} />)}</div>
          </section>
          <section className="i1-sec">
            <div className="i1-sec__head">
              <h2 className="rd-h2">Đang gọi vốn</h2>
              <button type="button" className="iv-link" onClick={() => nav.go('explore')}>Tất cả lô <ArrowRight size={16} /></button>
            </div>
            <div className="i1-grid i1-grid--2">{LOTS.filter((x) => x.stage === 'funding').map((x) => <LotTile key={x.code} l={x} onOpen={() => nav.open(x.code)} />)}</div>
          </section>
        </main>
      )}

      {nav.view === 'explore' && (
        <main className="i1">
          <section className="i1-head">
            <p className="rd-eyebrow">{LOTS.length} lô · {STAGES.length} trạng thái</p>
            <h1 className="rd-display">Khám phá <em>lô.</em></h1>
            <Tabs items={FILTERS} value={filter} onChange={setFilter} />
          </section>
          <div className="i1-grid">{byFilter(filter).map((x) => <LotTile key={x.code} l={x} onOpen={() => nav.open(x.code)} />)}</div>
        </main>
      )}

      {nav.view === 'lot' && (
        <main className="i1 i1-lot">
          <button type="button" className="iv-back" onClick={nav.back}><ArrowLeft size={16} /> Quay lại</button>
          <section className="i1-lothero">
            <img src={l.img} alt="" />
            <div className="i1-lothero__text">
              <StageChip s={l.stage} solid />
              <h1 className="rd-display">{l.code}</h1>
              <p>{l.crab} · {l.boxes} ô · {l.when}</p>
            </div>
          </section>
          <dl className="i1-facts">{facts(l).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          {l.stage === 'funding' && <div className="iv-card"><FundBar l={l} /></div>}
          {holdingOf(l.code) && <p className="iv-mine">Bạn đang góp <b>{vnd(holdingOf(l.code)!.amount)}</b> vào lô này.</p>}
          <div className="i1-sections"><LotSections l={l} /></div>
          <StickyInvest l={l} onInvest={() => setInvesting(l)} />
        </main>
      )}
      {investing && <ContributeModal l={investing} onClose={() => setInvesting(null)} />}
    </>
  )
}

export function InvestorV1() {
  return (
    <Shell theme="dark">
      <InvV1Inner />
      <Switcher area="investor" n={1} />
    </Shell>
  )
}

/* =================== Bản 2 — Sáng kiểu ứng dụng =================== */
function InvestCard({ l, onInvest }: { l: Lot; onInvest: (amount: number) => void }) {
  const min = minContribution(l)
  const room = Math.max(min, maxCapital(l) - l.confirmed)
  const [amount, setAmount] = useState(Math.min(room, Math.max(min, 10_000_000)))
  const mine = holdingOf(l.code)
  if (l.stage !== 'funding') {
    return (
      <aside className="i2-invest">
        <StageChip s={l.stage} />
        <p className="i2-invest__big">{l.when}</p>
        {mine ? <p className="rd-muted">Bạn góp {vnd(mine.amount)} vào lô này.</p> : <p className="rd-muted">Lô không nhận thêm vốn.</p>}
        <p className="rd-note">{l.note}</p>
      </aside>
    )
  }
  return (
    <aside className="i2-invest">
      <p className="rd-eyebrow">Góp vào lô này</p>
      <p className="i2-invest__big">{vnd(amount)}</p>
      <input className="rd-range" type="range" min={min} max={room} step={500_000} value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ '--p': (amount - min) / Math.max(1, room - min) } as CSSProperties} aria-label="Số tiền góp" />
      <div className="rd-range__ends"><span>Tối thiểu {tr(min)}</span><span>Còn {tr(room)}</span></div>
      <dl className="i2-invest__dl">
        <dt>Phần của bạn</dt><dd>≈ {pct(amount, l.confirmed + amount)}%</dd>
        <dt>Lỗ tối đa</dt><dd>{tr(amount)}</dd>
        <dt>Hạn gọi vốn</dt><dd>{l.when.replace(' gọi vốn', '')}</dd>
      </dl>
      <button type="button" className="rd-btn rd-btn--primary rd-btn--block rd-btn--lg" onClick={() => onInvest(amount)}>Góp vốn</button>
      <p className="rd-note">Giữ chỗ 15 phút. Chưa đủ 80% đúng hạn thì hoàn tiền.</p>
    </aside>
  )
}

function InvV2Inner() {
  const nav = useNav()
  const [filter, setFilter] = useState<Filter>('Tất cả')
  const [investing, setInvesting] = useState<{ l: Lot; amount: number } | null>(null)
  const l = lot(nav.code)
  const bySt = (s: string) => activeHoldings.filter((h) => lot(h.code).stage === s).reduce((a, h) => a + h.amount, 0)
  const alloc = STAGES.map((s) => ({ ...s, v: bySt(s.key) })).filter((s) => s.v > 0)
  const items: { v: View; label: string; icon: typeof House }[] = [
    { v: 'home', label: 'Tổng quan', icon: House },
    { v: 'explore', label: 'Khám phá lô', icon: Compass },
    { v: 'settle', label: 'Quyết toán', icon: Receipt },
  ]
  const active = nav.section
  const titles: Record<View, string> = { home: `Chào ${INVESTOR.name}`, explore: 'Khám phá lô', lot: l.code, settle: 'Quyết toán' }
  return (
    <div className="i2">
      <aside className="i2-side">
        <Logo />
        <nav className="i2-nav" aria-label="Menu">
          {items.map(({ v, label, icon: Icon }) => (
            <button key={v} type="button" className={active === v ? 'is-on' : ''} onClick={() => nav.go(v)}><Icon size={18} />{label}</button>
          ))}
          <a href="/thiet-ke/cua-hang/2"><ShoppingBag size={18} />Cửa hàng</a>
        </nav>
        <div className="i2-side__me"><span className="rd-avatar">{INVESTOR.initials}</span><span><b>Nguyễn {INVESTOR.name}</b><small>Nhà đầu tư</small></span></div>
      </aside>

      <main className="i2-main">
        <header className="i2-head">
          <div>
            {nav.view === 'lot' && <button type="button" className="iv-back" onClick={nav.back}><ArrowLeft size={16} /> Quay lại</button>}
            <h1 className="rd-h2">{titles[nav.view]}</h1>
          </div>
          <Bell0 />
        </header>

        {nav.view === 'home' && (
          <div className="i2-grid">
            <section className="i2-balance">
              <small>Vốn đang tham gia</small>
              <b>{vnd(activeTotal)}</b>
              <span className="i2-alloc">{alloc.map((a) => <i key={a.key} style={{ flex: a.v, background: a.tone }} title={a.label} />)}</span>
              <ul className="i2-legend">{alloc.map((a) => <li key={a.key}><i style={{ background: a.tone }} />{a.label}<b>{tr(a.v, 0)}</b></li>)}</ul>
            </section>
            <section className="iv-card i2-todo">
              <h3 className="rd-h3">Việc cần làm</h3>
              <button type="button" onClick={() => nav.open('L2611-01')}><span className="i2-todo__dot" /><span><b>Soát quyết toán L2611-01</b><small>còn 5 ngày</small></span><ChevronRight size={18} /></button>
              <button type="button" onClick={() => nav.open('L2612-01')}><span className="i2-todo__dot is-green" /><span><b>L2612-01 sắp đủ vốn</b><small>84% · còn 5 ngày</small></span><ChevronRight size={18} /></button>
            </section>
            <section className="iv-card i2-table">
              <h3 className="rd-h3">Lô của bạn</h3>
              {activeHoldings.map((h) => {
                const x = lot(h.code)
                return (
                  <button type="button" key={h.code} className="i2-row" onClick={() => nav.open(h.code)}>
                    <img src={small(x.img, 200)} alt="" />
                    <span className="i2-row__name"><b>{x.code}</b><small>{x.crab}</small></span>
                    <StageChip s={x.stage} />
                    <span className="i2-row__life"><Lifeline s={x.stage} compact /></span>
                    <b className="i2-row__amt">{vnd(h.amount)}</b>
                    <ChevronRight size={18} />
                  </button>
                )
              })}
            </section>
            <section className="iv-card i2-notes">
              <h3 className="rd-h3">Mới nhất</h3>
              <ul>{NOTICES.map((n) => <li key={n.t}><b>{n.t}</b><small>{n.s}</small></li>)}</ul>
            </section>
          </div>
        )}

        {nav.view === 'explore' && (
          <div className="i2-explore">
            <Tabs items={FILTERS} value={filter} onChange={setFilter} />
            <div className="iv-card i2-list">
              {byFilter(filter).map((x) => (
                <button type="button" key={x.code} className="i2-lrow" onClick={() => nav.open(x.code)}>
                  <img src={small(x.img, 240)} alt="" />
                  <span className="i2-lrow__name"><b>{x.code}</b><small>{x.crab} · {x.boxes} ô</small></span>
                  <span className="i2-lrow__prog">{x.stage === 'funding' ? <><FundBar l={x} labels={false} /><small>{pct(x.confirmed, x.target)}% của {tr(x.target, 0)}</small></> : <><Lifeline s={x.stage} compact /><small>{stage(x.stage).label}</small></>}</span>
                  <span className="i2-lrow__when">{x.when}</span>
                  <span className="rd-btn rd-btn--ghost rd-btn--sm">Xem</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {nav.view === 'lot' && (
          <div className="i2-lot">
            <div className="i2-lot__main">
              <div className="i2-lot__img"><img src={l.img} alt="" /><StageChip s={l.stage} solid /></div>
              <p className="rd-muted">{l.crab} · {l.boxes} ô · {OPERATOR_NAME}</p>
              <dl className="i2-facts">{facts(l).map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
              <LotSections l={l} />
            </div>
            <InvestCard key={l.code} l={l} onInvest={(amount) => setInvesting({ l, amount })} />
          </div>
        )}

        {nav.view === 'settle' && (
          <div className="i2-grid">
            <section className="iv-card i2-wide">
              <h3 className="rd-h3">L2611-01 · chờ bạn soát</h3>
              <SettlementCard />
            </section>
            <section className="iv-card">
              <h3 className="rd-h3">Đã xong</h3>
              <div className="i2-done"><span><b>L2610-03</b><small>Cua gạch · góp 15 triệu</small></span><b>{vnd(closedPayout2610)}</b></div>
              <p className="rd-note">Tiền đã chuyển về tài khoản ngân hàng của bạn.</p>
            </section>
          </div>
        )}
      </main>
      {investing && <ContributeModal l={investing.l} initial={investing.amount} onClose={() => setInvesting(null)} />}
    </div>
  )
}
const OPERATOR_NAME = 'HTX Nuôi cua Cà Mau'

export function InvestorV2() {
  return (
    <Shell theme="light">
      <InvV2Inner />
      <Switcher area="investor" n={2} />
    </Shell>
  )
}

/* =================== Bản 3 — Tiền của bạn đang ở đâu =================== */
function Carousel({ onOpen }: { onOpen: (code: string) => void }) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; left: number; moved: number } | null>(null)
  const list = LOTS.filter((l) => l.stage === 'funding' || l.stage === 'soon')
  const move = (dir: number) => ref.current?.scrollBy({ left: dir * ref.current.clientWidth * 0.7, behavior: 'smooth' })
  const onDown = (e: RPointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || !ref.current) return
    drag.current = { x: e.clientX, left: ref.current.scrollLeft, moved: 0 }
  }
  const onMove = (e: RPointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || !ref.current) return
    d.moved = Math.abs(e.clientX - d.x)
    ref.current.scrollLeft = d.left - (e.clientX - d.x)
  }
  const onUp = () => { setTimeout(() => { drag.current = null }, 0) }
  return (
    <div className="i3-car">
      <div className="i3-car__nav">
        <button type="button" className="rd-iconbtn" onClick={() => move(-1)} aria-label="Trước"><ArrowLeft size={18} /></button>
        <button type="button" className="rd-iconbtn" onClick={() => move(1)} aria-label="Sau"><ArrowRight size={18} /></button>
      </div>
      <div ref={ref} className="i3-car__track" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerLeave={onUp}>
        {[...list, ...LOTS.filter((l) => l.stage === 'growing' || l.stage === 'harvest')].map((l) => (
          <LotTile key={l.code} l={l} className="i3-card" onOpen={() => { if (!drag.current || drag.current.moved < 6) onOpen(l.code) }} />
        ))}
      </div>
    </div>
  )
}

const STORY = [
  { n: '01', t: 'Chi phí khoá trước', at: 0 },
  { n: '02', t: 'Góp và ký', at: 0 },
  { n: '03', t: 'Nuôi và giải ngân theo mốc', at: 1 },
  { n: '04', t: 'Thu hoạch và bán', at: 2 },
  { n: '05', t: 'Quyết toán', at: 3 },
]

function InvV3Inner() {
  const nav = useNav()
  const [investing, setInvesting] = useState<Lot | null>(null)
  const l = lot(nav.code)
  const cols = LIFE.map((label, i) => {
    const hs = activeHoldings.filter((h) => lifeIndex(lot(h.code).stage) === i)
    return { label, hs, sum: hs.reduce((a, h) => a + h.amount, 0) }
  })
  const cur = lifeIndex(l.stage)
  return (
    <>
      <TopBar area="investor" n={3} right={<><Bell0 /><span className="rd-avatar">{INVESTOR.initials}</span></>}>
        <button type="button" className={nav.section === 'home' ? 'is-on' : ''} onClick={() => nav.go('home')}>Tiền của tôi</button>
        <button type="button" className={nav.section !== 'home' ? 'is-on' : ''} onClick={() => nav.go('explore')}>Lô mới</button>
      </TopBar>

      {nav.view === 'home' && (
        <main className="i3">
          <section className="i3-head">
            <h1 className="rd-display">Tiền của bạn<br /><em>đang ở đâu.</em></h1>
            <p className="i3-total"><b className="rd-num">{vnd(activeTotal)}</b><span>trong {activeHoldings.length} lô</span></p>
          </section>
          <section className="i3-board" aria-label="Vốn theo từng bước của lô">
            {cols.map((c, i) => (
              <div key={c.label} className={`i3-col${c.hs.length ? '' : ' is-empty'}`}>
                <p className="i3-col__head"><span>{String(i + 1).padStart(2, '0')} · {c.label}</span><b>{c.sum ? tr(c.sum, 0) : '—'}</b></p>
                {c.hs.map((h) => {
                  const x = lot(h.code)
                  return (
                    <button type="button" key={h.code} className="i3-chip" onClick={() => nav.open(h.code)}>
                      <img src={small(x.img, 200)} alt="" />
                      <span><b>{x.code}</b><small>{x.when}</small></span>
                      <b className="i3-chip__amt">{tr(h.amount, 0)}</b>
                    </button>
                  )
                })}
                {!c.hs.length && i === 0 && <button type="button" className="i3-empty" onClick={() => nav.go('explore')}>Tìm lô mới <ArrowRight size={16} /></button>}
                {!c.hs.length && i !== 0 && <p className="i3-empty i3-empty--quiet">Chưa có lô ở bước này</p>}
              </div>
            ))}
          </section>
          <section className="i3-feed">
            <h2 className="rd-h2">Nhật ký</h2>
            <ol>
              {[...NOTICES, { t: 'L2610-03 đã chia xong', s: `Bạn nhận ${vnd(closedPayout2610)}` }].map((n, i) => (
                <li key={n.t}><span className="i3-feed__dot" /><div><b>{n.t}</b><small>{n.s}</small></div><time>{['Hôm nay', 'Hôm qua', '2 ngày trước', '3 tuần trước'][i]}</time></li>
              ))}
            </ol>
          </section>
        </main>
      )}

      {nav.view === 'explore' && (
        <main className="i3">
          <section className="i3-head">
            <h1 className="rd-display">Lô <em>mới.</em></h1>
            <p className="rd-muted">Kéo sang để xem. Chọn một lô để đọc từng bước.</p>
          </section>
          <Carousel onOpen={nav.open} />
        </main>
      )}

      {nav.view === 'lot' && (
        <main className="i3 i3-lot">
          <div className="i3-lot__media">
            <button type="button" className="iv-back" onClick={nav.back}><ArrowLeft size={16} /> Quay lại</button>
            <div className="i3-lot__img"><img src={l.img} alt="" /><span><StageChip s={l.stage} solid /><b>{l.code}</b><small>{l.crab} · {l.boxes} ô</small></span></div>
          </div>
          <ol className="i3-story">
            {STORY.map((s, i) => (
              <li key={s.n} className={cur >= s.at ? 'is-reached' : ''}>
                <span className="i3-story__n">{s.n}</span>
                <div className="i3-story__body">
                  <h3 className="rd-h3">{s.t}</h3>
                  {i === 0 && <CostBars l={l} />}
                  {i === 1 && (
                    <div className="i3-story__stack">
                      <FundBar l={l} />
                      <p className="rd-muted">Góp tối thiểu {tr(minContribution(l))}. Hợp đồng giữa bạn và {OPERATOR_NAME}, người nuôi ký trước.</p>
                      {holdingOf(l.code) && <p className="iv-mine">Bạn đã góp <b>{vnd(holdingOf(l.code)!.amount)}</b>.</p>}
                    </div>
                  )}
                  {i === 2 && <Tranches l={l} />}
                  {i === 3 && <p className="rd-muted">Cua lên có mã QR, bán trên cửa hàng trong tối đa 4 tháng. Tiền bán về thẳng tài khoản lô.</p>}
                  {i === 4 && (l.stage === 'settle' ? <SettlementCard /> : l.stage === 'closed' ? <p className="rd-muted">Đã chia xong cho mọi nhà đầu tư.</p> : <SettleSim l={l} />)}
                </div>
              </li>
            ))}
          </ol>
          <StickyInvest l={l} onInvest={() => setInvesting(l)} />
        </main>
      )}
      {investing && <ContributeModal l={investing} onClose={() => setInvesting(null)} />}
    </>
  )
}

export function InvestorV3() {
  return (
    <Shell theme="dark" className="rd--teal">
      <InvV3Inner />
      <Switcher area="investor" n={3} />
    </Shell>
  )
}
