import { useState, type FormEvent } from 'react'

const asset = (name: string) => `/assets/${name}`

type FormState = {
  email: string
  firstName: string
  lastName: string
  phone: string
  investorType: string
  password: string
  confirmPassword: string
  terms: boolean
  otp: boolean
}

const initialForm: FormState = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',
  investorType: 'Financial Investor',
  password: '',
  confirmPassword: '',
  terms: false,
  otp: false,
}

function RegisterPage() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [message, setMessage] = useState('')

  const update = <Key extends keyof FormState>(key: Key, value: FormState[Key]) => {
    setForm((current) => ({ ...current, [key]: value }))
    setMessage('')
  }

  const canSubmit = Boolean(
    form.email && form.firstName && form.lastName && form.phone && form.password &&
    form.confirmPassword && form.terms && form.otp,
  )

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (form.password !== form.confirmPassword) {
      setMessage('Mật khẩu xác nhận chưa khớp.')
      return
    }
    if (!canSubmit) {
      setMessage('Vui lòng điền đủ thông tin và xác nhận các điều khoản.')
      return
    }
    setMessage('Tài khoản demo đã được tạo. Bạn có thể tích hợp API để lưu dữ liệu thật.')
  }

  return (
    <main className="register-page">
      <section className="register-card" aria-labelledby="register-title" data-node-id="67:2097">
        <header className="register-brand">
          <a href="/" className="register-logo" aria-label="CrabShare, về trang chủ">
            <span className="register-wordmark"><strong>CRAB</strong><span>SHARE</span></span>
            <span className="register-logo-icon"><img src={asset('registerCrabIcon.svg')} alt="" /></span>
          </a>
          <span className="register-tagline">BATCH . GROW . SHARE</span>
          <h1 id="register-title">Create an account to start investing in CrabShare Batches</h1>
        </header>

        <form className="register-form" onSubmit={submit} noValidate>
          <label className="register-field">
            <span className="sr-only">Email Address</span>
            <input type="email" autoComplete="email" value={form.email} onChange={(event) => update('email', event.target.value)} placeholder="Email Address" required />
          </label>
          <label className="register-field">
            <span className="sr-only">First Name</span>
            <input autoComplete="given-name" value={form.firstName} onChange={(event) => update('firstName', event.target.value)} placeholder="First Name" required />
          </label>
          <label className="register-field">
            <span className="sr-only">Last Name</span>
            <input autoComplete="family-name" value={form.lastName} onChange={(event) => update('lastName', event.target.value)} placeholder="Last Name" required />
          </label>

          <div className="register-composite-field">
            <label className="register-small-label" htmlFor="phone">Cell Number</label>
            <div className="register-phone-line">
              <span className="register-country"><img src={asset('registerVietnamFlag.svg')} alt="Cờ Việt Nam" /><span>+84</span><img src={asset('registerChevron.svg')} alt="" /></span>
              <input id="phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} aria-label="Cell Number" required />
            </div>
          </div>

          <div className="register-composite-field">
            <label className="register-small-label" htmlFor="investor-type">Investor Type</label>
            <span className="register-select-wrap">
              <select id="investor-type" value={form.investorType} onChange={(event) => update('investorType', event.target.value)}>
                <option>Financial Investor</option>
                <option>Strategic Investor</option>
                <option>Business Partner</option>
              </select>
              <img className="register-select-base" src={asset('registerSelect.svg')} alt="" />
              <img src={asset('registerChevronDown.svg')} alt="" />
            </span>
          </div>

          <label className="register-field register-password-field">
            <span className="sr-only">Password</span>
            <input type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={(event) => update('password', event.target.value)} placeholder="Password" required />
            <button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? 'Hide password' : 'Show password'}><img src={asset('registerEye.svg')} alt="" /></button>
          </label>
          <label className="register-field register-password-field">
            <span className="sr-only">Confirm Password</span>
            <input type={showConfirmPassword ? 'text' : 'password'} autoComplete="new-password" value={form.confirmPassword} onChange={(event) => update('confirmPassword', event.target.value)} placeholder="Confirm Password" required />
            <button type="button" onClick={() => setShowConfirmPassword((current) => !current)} aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}><img src={asset('registerEye.svg')} alt="" /></button>
          </label>

          <label className="register-check">
            <input type="checkbox" checked={form.terms} onChange={(event) => update('terms', event.target.checked)} />
            <span>I agree to the <button type="button" className="register-inline-link">terms and conditions.</button></span>
          </label>
          <label className="register-check register-otp-check">
            <input type="checkbox" checked={form.otp} onChange={(event) => update('otp', event.target.checked)} />
            <span>I agree to the use of my cell number to receive One Time Pin<br />(OTP) per login to protect my account.</span>
          </label>

          <button className="register-submit" type="submit" disabled={!canSubmit}>CREATE ACCOUNT</button>
          {message && <p className={message.startsWith('Tài khoản') ? 'register-success' : 'register-error'} role="status">{message}</p>}
        </form>

        <p className="register-signin">Do you have an existing account? <a href="/dang-nhap">Sign in</a></p>
      </section>
    </main>
  )
}

export default RegisterPage
