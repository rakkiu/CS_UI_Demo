import { createContext, useContext, useState, type ReactNode } from 'react'

type DemoSession = { signedIn: boolean; cartCount: number; signIn: () => void; signOut: () => void; addToCart: () => void; clearCart: () => void }
const SessionContext = createContext<DemoSession | null>(null)

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [signedIn, setSignedIn] = useState(() => localStorage.getItem('crabshare-demo-user') === 'signed-in')
  const [cartCount, setCartCount] = useState(() => Number(localStorage.getItem('crabshare-demo-cart') || 0))
  const signIn = () => { localStorage.setItem('crabshare-demo-user', 'signed-in'); setSignedIn(true) }
  const signOut = () => { localStorage.removeItem('crabshare-demo-user'); setSignedIn(false) }
  const addToCart = () => setCartCount((count) => { const next = count + 1; localStorage.setItem('crabshare-demo-cart', String(next)); return next })
  const clearCart = () => { localStorage.removeItem('crabshare-demo-cart'); setCartCount(0) }
  return <SessionContext.Provider value={{ signedIn, cartCount, signIn, signOut, addToCart, clearCart }}>{children}</SessionContext.Provider>
}

export function useDemoSession() {
  const session = useContext(SessionContext)
  if (!session) throw new Error('useDemoSession must be used within DemoSessionProvider')
  return session
}
