import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from 'react'
import { initialState, type InvestorKind, type InvestorState } from './data'
type Context = { state: InvestorState; setState: Dispatch<SetStateAction<InvestorState>>; kind: InvestorKind; notify: (message: string) => void }
const InvestorContext = createContext<Context | null>(null)
export function InvestorProvider({ kind, children }: { kind: InvestorKind; children: ReactNode }) {
  const key = `crabshare-investor-v1-${kind}`
  const [state, rawSet] = useState<InvestorState>(() => { try { const saved = JSON.parse(localStorage.getItem(key) || 'null'); return saved ? { ...initialState, ...saved } : initialState } catch { return initialState } })
  const [message, setMessage] = useState('')
  const setState: Dispatch<SetStateAction<InvestorState>> = (update) => rawSet(prev => { const next = typeof update === 'function' ? update(prev) : update; localStorage.setItem(key, JSON.stringify(next)); return next })
  return <InvestorContext.Provider value={{ state, setState, kind, notify: setMessage }}>{children}{message && <div className="iv-toast" role="status"><span>{message}</span><button onClick={() => setMessage('')} aria-label="Đóng thông báo">×</button></div>}</InvestorContext.Provider>
}
export function useInvestor() { const ctx = useContext(InvestorContext); if (!ctx) throw new Error('Investor provider missing'); return ctx }
