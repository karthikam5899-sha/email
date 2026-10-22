import { useState } from 'react'
import { Eye, EyeOff, ArrowLeft, CheckCircle2, Mail } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'

const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

function Field({ id, label, type = 'text', value, onChange, placeholder, autoComplete, error, errorId }) {
  return <label htmlFor={id} className="block">
    <span className="mb-1.5 block text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</span>
    <input
      id={id}
      name={id}
      required
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      autoComplete={autoComplete}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? errorId : undefined}
      className="auth-input"
    />
  </label>
}

function PasswordField({ id, label, value, onChange, placeholder = 'Enter your password', autoComplete, error, errorId, trailing }) {
  const [visible, setVisible] = useState(false)
  return <div className="block">
    <div className="mb-1.5 flex items-center justify-between">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-200">{label}</label>
      {trailing}
    </div>
    <span className="relative block">
      <input
        id={id}
        name={id}
        required
        minLength={6}
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className="auth-input pr-12"
      />
      <button
        type="button"
        aria-label={visible ? 'Hide password' : 'Show password'}
        aria-pressed={visible}
        onClick={() => setVisible(current => !current)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:hover:text-slate-200"
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </span>
  </div>
}

function FormError({ id, children }) {
  if (!children) return null
  return <p id={id} role="alert" className="text-sm font-medium text-rose-600 dark:text-rose-400">{children}</p>
}

export function SignIn() {
  const [email, setEmail] = useState('alex@workmail.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = event => {
    event.preventDefault()
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    setError('')
    navigate('/inbox')
  }

  return <AuthLayout title="Welcome back" subtitle="Enter your details to access your inbox." footer={<>Don’t have an account? <Link className="font-bold text-brand-600 hover:underline" to="/signup">Sign up</Link></>}>
    <form className="space-y-5" onSubmit={submit} noValidate>
      <Field id="email" label="Email address" type="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} placeholder="you@example.com" autoComplete="email" error={error && !isValidEmail(email)} errorId="signin-error" />
      <PasswordField id="password" label="Password" value={password} onChange={event => { setPassword(event.target.value); setError('') }} autoComplete="current-password" error={error && password.length < 6} errorId="signin-error" trailing={<Link to="/forgot-password" className="text-xs font-bold text-brand-600 hover:underline">Forgot password?</Link>} />
      <FormError id="signin-error">{error}</FormError>
      <label className="flex items-center gap-2 text-sm text-slate-500">
        <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-brand-500" />
        Remember me for 30 days
      </label>
      <button className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20">
        Sign in
      </button>
      <div className="relative py-1 text-center text-xs text-slate-400"><span className="bg-[#fffdfa] px-3 dark:bg-[#211925]">DEMO ACCESS</span><div className="absolute left-0 right-0 top-1/2 -z-10 border-t border-slate-200 dark:border-slate-700" /></div>
      <p className="text-center text-xs leading-5 text-slate-400">Use the pre-filled demo details or enter any valid email and a 6+ character password.</p>
    </form>
  </AuthLayout>
}

export function SignUp() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = event => {
    event.preventDefault()
    if (name.trim().length < 2) return setError('Please enter your full name.')
    if (!isValidEmail(email)) return setError('Please enter a valid email address.')
    if (password.length < 6) return setError('Password must be at least 6 characters.')
    if (password !== confirm) return setError('Passwords do not match.')
    if (!acceptedTerms) return setError('Please accept the Terms of Service and Privacy Policy.')
    setError('')
    navigate('/inbox')
  }

  return <AuthLayout title="Create your account" subtitle="Get a little more clarity in your inbox." footer={<>Already have an account? <Link className="font-bold text-brand-600 hover:underline" to="/signin">Sign in</Link></>}>
    <form className="space-y-4" onSubmit={submit} noValidate>
      <Field id="name" label="Full name" value={name} onChange={event => { setName(event.target.value); setError('') }} placeholder="Alex Kim" autoComplete="name" error={error && name.trim().length < 2} errorId="signup-error" />
      <Field id="signup-email" label="Email address" type="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} placeholder="you@example.com" autoComplete="email" error={error && !isValidEmail(email)} errorId="signup-error" />
      <PasswordField id="new-password" label="Password" value={password} onChange={event => { setPassword(event.target.value); setError('') }} autoComplete="new-password" error={error && password.length < 6} errorId="signup-error" />
      <PasswordField id="confirm-password" label="Confirm password" value={confirm} onChange={event => { setConfirm(event.target.value); setError('') }} placeholder="Re-enter your password" autoComplete="new-password" error={error && confirm !== password} errorId="signup-error" />
      <FormError id="signup-error">{error}</FormError>
      <label className="flex items-start gap-2 text-xs leading-5 text-slate-500">
        <input required type="checkbox" checked={acceptedTerms} onChange={event => { setAcceptedTerms(event.target.checked); setError('') }} className="mt-1 h-4 w-4 accent-brand-500" />
        <span>I agree to the Terms of Service and Privacy Policy.</span>
      </label>
      <button className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20">
        Create account
      </button>
    </form>
  </AuthLayout>
}

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const submit = event => {
    event.preventDefault()
    if (!isValidEmail(email)) return setError('Enter a valid email address.')
    setError('')
    setSent(true)
  }

  return <AuthLayout title={sent ? 'Check your inbox' : 'Forgot password?'} subtitle={sent ? 'If an account exists for that address, a reset link is on its way.' : 'No worries — we’ll send you instructions to reset it.'} footer={<Link to="/signin" className="inline-flex items-center gap-2 font-bold text-brand-600 hover:underline"><ArrowLeft size={15} /> Back to sign in</Link>}>
    {sent ? <div role="status" className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center dark:border-emerald-900 dark:bg-emerald-900/20">
      <CheckCircle2 className="mx-auto mb-3 text-emerald-600" size={35} />
      <p className="text-sm text-emerald-800 dark:text-emerald-300">Password reset instructions have been requested for <b>{email}</b>.</p>
      <button onClick={() => setSent(false)} className="mt-4 text-sm font-bold text-brand-600">Try another email</button>
    </div> : <form className="space-y-5" onSubmit={submit} noValidate>
      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10"><Mail size={22} /></div>
      <Field id="reset-email" label="Email address" type="email" value={email} onChange={event => { setEmail(event.target.value); setError('') }} placeholder="you@example.com" autoComplete="email" error={Boolean(error)} errorId="forgot-error" />
      <FormError id="forgot-error">{error}</FormError>
      <button className="w-full rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/20">Send reset link</button>
    </form>}
  </AuthLayout>
}
