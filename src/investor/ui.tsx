import type { ReactNode } from 'react'

const paths: Record<string, ReactNode> = {
  home: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1Z" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  bag: <><rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a4 4 0 0 1 8 0v2M3 12h18M10 12v3h4v-3"/></>,
  file: <><path d="M14 2H5v20h14V7ZM14 2v6h5M8 12h8M8 16h6"/></>,
  chart: <><path d="M3 3v18h18M7 16v-5M12 16V7M17 16v-8"/></>,
  bell: <><path d="M5 9a7 7 0 0 1 14 0c0 7 2 7 2 8H3c0-1 2-1 2-8ZM9 21h6"/></>,
  user: <><circle cx="12" cy="7" r="4"/><path d="M4 21v-3a8 8 0 0 1 16 0v3"/></>,
  truck: <><path d="M2 5h12v12H2ZM14 9h4l4 5v3h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
  box: <><path d="m12 2 10 5v10l-10 5-10-5V7ZM2 7l10 5 10-5M12 12v10M7 4.5l10 5"/></>,
  leaf: <><path d="M20 3C5 1 0 11 7 17c6 6 15 1 13-14ZM4 21 16 9"/></>,
  arrow: <><path d="M4 12h16m-6-6 6 6-6 6"/></>,
  back: <path d="M20 12H4m6-6-6 6 6 6"/>,
  down: <path d="m6 9 6 6 6-6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  bank: <><path d="m2 8 10-6 10 6ZM2 21h20M5 11v7M12 11v7M19 11v7"/></>,
  shield: <><path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6Z"/><path d="m8 12 3 3 5-6"/></>,
  search: <><circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/></>,
  download: <><path d="M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5"/></>,
  plus: <path d="M12 4v16M4 12h16"/>,
  menu: <path d="M3 6h18M3 12h18M3 18h18"/>,
  close: <path d="m5 5 14 14M19 5 5 19"/>,
  logout: <><path d="M9 3H3v18h6M9 12h12m-5-5 5 5-5 5"/></>,
  info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v1"/></>,
}
export function Icon({ name, size = 20 }: { name: string; size?: number }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.grid}</svg> }
export function Badge({ children, tone = '' }: { children: ReactNode; tone?: string }) { return <span className={`iv-badge ${tone}`}>{children}</span> }
export function Heading({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) { return <div className="iv-heading"><div>{eyebrow && <p className="iv-eyebrow">{eyebrow}</p>}<h1 tabIndex={-1}>{title}</h1>{description && <p className="iv-description">{description}</p>}</div>{action}</div> }
export function Panel({ title, subtitle, action, children, className = '' }: { title?: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) { return <section className={`iv-panel ${className}`}>{title && <div className="iv-panel-heading"><div><h2>{title}</h2>{subtitle && <p>{subtitle}</p>}</div>{action}</div>}{children}</section> }
export function Stat({ label, value, note, icon, dark = false }: { label: string; value: string; note: string; icon: string; dark?: boolean }) { return <div className={`iv-stat ${dark ? 'dark' : ''}`}><div><span>{label}</span><Icon name={icon}/></div><strong>{value}</strong><small>{note}</small></div> }
export function Empty({ title, text, action }: { title: string; text: string; action?: ReactNode }) { return <div className="iv-empty"><Icon name="search" size={30}/><h3>{title}</h3><p>{text}</p>{action}</div> }
export function Note({ children, tone = '' }: { children: ReactNode; tone?: string }) { return <div className={`iv-note ${tone}`}><Icon name="info" size={18}/><div>{children}</div></div> }
export function Progress({ value }: { value: number }) { return <div className="iv-progress" role="progressbar" aria-label="Tiến độ huy động" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}><span style={{ width: `${Math.min(value, 100)}%` }}/></div> }
export function Back({ href, children }: { href: string; children: ReactNode }) { return <a className="iv-back" href={href}><Icon name="back" size={16}/>{children}</a> }
