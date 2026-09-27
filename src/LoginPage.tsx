import { useEffect, useState, type FormEvent } from 'react'
import { demoAccounts, type InvestorKind } from './investor/data'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { useDemoSession } from './DemoSession'

const asset = (name: string) => `/assets/${name}`

function LoginPage() {
  const demoParam = new URLSearchParams(window.location.search).get('demo')
  const demoKind = demoParam === 'financial' || demoParam === 'offtake' ? demoParam : null
  const [email, setEmail] = useState(demoKind ? demoAccounts[demoKind].email : '')
  const [password, setPassword] = useState(demoKind ? demoAccounts[demoKind].password : '')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn: saveSession } = useDemoSession()
  const [entering, setEntering] = useState(Boolean(demoKind))
  useEffect(() => {
    if (!demoKind) return
    const timer = window.setTimeout(() => { saveSession(demoKind); window.location.replace('/investor') }, 900)
    return () => window.clearTimeout(timer)
  }, [demoKind])
  const enterDemo = (kind: InvestorKind) => { setEmail(demoAccounts[kind].email); setPassword(demoAccounts[kind].password); setEntering(true); saveSession(kind); window.location.assign('/investor') }

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes('@') || !password.trim()) { setMessage('Vui lòng nhập email và mật khẩu để tiếp tục bản demo.'); return }
    const investorKind = email.toLowerCase() === demoAccounts.financial.email ? 'financial' : email.toLowerCase() === demoAccounts.offtake.email ? 'offtake' : null
    if (investorKind) { saveSession(investorKind); window.location.assign('/investor'); return }
    if (email.toLowerCase() === 'operator@crabshare.com') {
      saveSession()
      window.location.assign('/operator')
      return
    }
    if (email.toLowerCase() === 'admin@crabshare.com') {
      saveSession()
      window.location.assign('/admin')
      return
    }
    saveSession()
    window.location.assign('/')
  }

  return (
    <>
      <SiteHeader />
      <main className="login-page">
      <section className="login-card" aria-labelledby="login-title" data-node-id="67:1962">
        <header className="login-brand">
          <a href="/" className="login-logo" aria-label="CrabShare, về trang chủ">
            <span className="login-wordmark"><strong>CRAB</strong><span>SHARE</span></span>
            <span className="login-logo-icon"><img src={asset('loginCrabIcon.svg')} alt="" /></span>
          </a>
          <span className="login-tagline">BATCH . GROW . SHARE</span>
          <h1 id="login-title" className="sr-only">Sign In</h1>
        </header>

        <form className="login-form" onSubmit={signIn} noValidate>
          <label className="login-field">
            <span className="sr-only">Email</span>
            <input type="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setMessage('') }} placeholder="Email" required />
            <img src={asset('loginMail.svg')} alt="" />
          </label>
          <label className="login-field">
            <span className="sr-only">Password</span>
            <input type={showPassword ? 'text' : 'password'} autoComplete="current-password" value={password} onChange={(event) => { setPassword(event.target.value); setMessage('') }} placeholder="Password" required />
            <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}><img src={asset('loginEye.svg')} alt="" /></button>
          </label>

          <button type="button" className="login-reset" onClick={() => setMessage('Tính năng đặt lại mật khẩu sẽ được kết nối với email service.')}>Reset Password</button>
          <button type="submit" className="login-submit" disabled={entering}>{entering ? 'Đang mở workspace Investor…' : 'Sign In'}</button>
          <div className="rounded border border-[#eadbc8] bg-[#fff8f0] p-4 text-center">
            <p className="mb-3 text-xs text-[#71685d]">Trải nghiệm với tài khoản mẫu</p>
            <div className="flex flex-wrap justify-center gap-2"><button type="button" disabled={entering} onClick={() => enterDemo('financial')} className="rounded border border-[#855123] px-3 py-2 text-xs text-[#855123]">Financial Investor</button><button type="button" disabled={entering} onClick={() => enterDemo('offtake')} className="rounded bg-[#855123] px-3 py-2 text-xs text-white">Offtake Investor</button></div>
            {entering && <p role="status" className="mt-3 text-xs">Đã điền email và mật khẩu demo. Đang chuyển trang…</p>}
          </div>
          <div className="login-divider"><span>OR</span></div>
          <button type="button" className="login-passkey" onClick={() => setMessage('Đăng nhập Passkey cần được kết nối với WebAuthn.') }><img src={asset('loginFingerprint.svg')} alt="" />SIGN IN WITH PASSKEY</button>
          {message && <p className={message.startsWith('Đăng nhập') ? 'login-success' : 'login-error'} role="status">{message}</p>}
          <p className="login-signup">Don't have an account? <a href="/dang-ky">Sign Up</a></p>
        </form>
      </section>
      </main>
      <SiteFooter />
    </>
  )
}

export default LoginPage
