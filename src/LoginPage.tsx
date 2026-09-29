import { useEffect, useState, type FormEvent } from 'react'
import { demoAccounts, type InvestorKind } from './investor/data'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { useDemoSession } from './DemoSession'

const asset = (name: string) => `/assets/${name}`
const customerDemoAccount = { email: 'customer@demo.crabshare.vn', password: 'CrabShareDemo2026' }
const operatorDemoAccount = { email: 'operator@crabshare.com', password: 'CrabShareDemo2026' }
type LoginDemoKind = InvestorKind | 'customer' | 'operator'

function LoginPage() {
  const demoParam = new URLSearchParams(window.location.search).get('demo')
  const demoKind: LoginDemoKind | null = demoParam === 'financial' || demoParam === 'offtake' || demoParam === 'customer' || demoParam === 'operator' ? demoParam : null
  const demoAccount = demoKind === 'customer' ? customerDemoAccount : demoKind === 'operator' ? operatorDemoAccount : demoKind ? demoAccounts[demoKind] : null
  const [email, setEmail] = useState(demoAccount?.email ?? '')
  const [password, setPassword] = useState(demoAccount?.password ?? '')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn: saveSession } = useDemoSession()
  const [entering, setEntering] = useState(Boolean(demoKind))

  useEffect(() => {
    if (!demoKind) return
    const timer = window.setTimeout(() => {
      saveSession(demoKind)
      window.location.replace(demoKind === 'customer' ? '/' : demoKind === 'operator' ? '/operator' : '/investor')
    }, 900)
    return () => window.clearTimeout(timer)
  }, [demoKind])

  const enterDemo = (kind: LoginDemoKind) => {
    const account = kind === 'customer' ? customerDemoAccount : kind === 'operator' ? operatorDemoAccount : demoAccounts[kind]
    setEmail(account.email)
    setPassword(account.password)
    setEntering(true)
    saveSession(kind)
    window.location.assign(kind === 'customer' ? '/' : kind === 'operator' ? '/operator' : '/investor')
  }

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email.includes('@') || !password.trim()) {
      setMessage('Vui lòng nhập email và mật khẩu để tiếp tục bản demo.')
      return
    }
    const investorKind =
      email.toLowerCase() === demoAccounts.financial.email
        ? 'financial'
        : email.toLowerCase() === demoAccounts.offtake.email
        ? 'offtake'
        : null
    if (investorKind) { saveSession(investorKind); window.location.assign('/investor'); return }
    if (email.toLowerCase() === 'operator@crabshare.com') {
      saveSession('operator')
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
      <main className='login-page'>
        <section className='login-card' aria-labelledby='login-title' data-node-id='67:1962'>
          <header className='login-brand'>
            <a href='/' className='login-logo' aria-label='CrabShare'>
              <span className='login-wordmark'><strong>CRAB</strong><span>SHARE</span></span>
              <span className='login-logo-icon'><img src={asset('loginCrabIcon.svg')} alt='' /></span>
            </a>
            <span className='login-tagline'>BATCH . GROW . SHARE</span>
            <h1 id='login-title' className='sr-only'>Sign In</h1>
          </header>
          <div className='login-demo-banner'>
            <div className='login-demo-header'>
              <span className='login-demo-badge'>DEMO</span>
              <p className='login-demo-desc'>Truy cập nhanh bằng tài khoản mẫu — không cần đăng ký</p>
            </div>
            <div className='login-demo-actions'>
              <button id='demo-customer-btn' type='button' className='login-demo-btn login-demo-btn--outline' disabled={entering} onClick={() => enterDemo('customer')}>
                <span className='login-demo-btn-text'>
                  <strong>Customer</strong>
                  <small>Mua cua · Giỏ hàng · Theo dõi đơn hàng</small>
                </span>
              </button>
              <button id='demo-financial-btn' type='button' className='login-demo-btn login-demo-btn--outline' disabled={entering} onClick={() => enterDemo('financial')}>
                <span className='login-demo-btn-text'>
                  <strong>Financial Investor</strong>
                  <small>Góp vốn · Danh mục · Quyết toán</small>
                </span>
              </button>
              <button id='demo-offtake-btn' type='button' className='login-demo-btn login-demo-btn--filled' disabled={entering} onClick={() => enterDemo('offtake')}>
                <span className='login-demo-btn-text'>
                  <strong>Offtake Investor</strong>
                  <small>Bao tiêu · Giao nhận ưu tiên</small>
                </span>
              </button>
              <button id='demo-operator-btn' type='button' className='login-demo-btn login-demo-btn--outline' disabled={entering} onClick={() => enterDemo('operator')}>
                <span className='login-demo-btn-text'>
                  <strong>Farm Operator</strong>
                  <small>Vận hành ao · Nhật ký nuôi · Thu hoạch & đối soát</small>
                </span>
              </button>
            </div>
            {entering && <p role='status' className='login-demo-status'>Đang đăng nhập tài khoản demo…</p>}
          </div>
          <form className='login-form' onSubmit={signIn} noValidate>
            <label className='login-field'>
              <span className='sr-only'>Email</span>
              <input type='email' autoComplete='email' value={email} onChange={e => { setEmail(e.target.value); setMessage('') }} placeholder='Email' required />
              <img src={asset('loginMail.svg')} alt='' />
            </label>
            <label className='login-field'>
              <span className='sr-only'>Password</span>
              <input type={showPassword ? 'text' : 'password'} autoComplete='current-password' value={password} onChange={e => { setPassword(e.target.value); setMessage('') }} placeholder='Password' required />
              <button type='button' onClick={() => setShowPassword(v => !v)} aria-label={showPassword ? 'Hide password' : 'Show password'}><img src={asset('loginEye.svg')} alt='' /></button>
            </label>
            <button type='button' className='login-reset' onClick={() => setMessage('Tính năng đặt lại mật khẩu sẽ được kết nối với email service.')}>Reset Password</button>
            <button type='submit' className='login-submit' disabled={entering}>{entering ? 'Đang đăng nhập…' : 'Sign In'}</button>
            <div className='login-divider'><span>OR</span></div>
            <button type='button' className='login-passkey' onClick={() => setMessage('Đăng nhập Passkey cần được kết nối với WebAuthn.')}><img src={asset('loginFingerprint.svg')} alt='' />SIGN IN WITH PASSKEY</button>
            {message && <p className={message.startsWith('Đăng nhập') ? 'login-success' : 'login-error'} role='status'>{message}</p>}
            <p className='login-signup'>Don't have an account? <a href='/dang-ky'>Sign Up</a></p>
          </form>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}

export default LoginPage
