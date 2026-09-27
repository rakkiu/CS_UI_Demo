import { useState, type FormEvent } from 'react'
import { SiteFooter, SiteHeader } from './SiteChrome'
import { useDemoSession } from './DemoSession'

const asset = (name: string) => `/assets/${name}`

function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn: saveSession } = useDemoSession()

  const signIn = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!email || !password) {
      setMessage('Vui lòng nhập email và mật khẩu.')
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
          <button type="submit" className="login-submit">Sign In</button>
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
