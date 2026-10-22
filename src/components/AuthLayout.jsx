import { AtSign } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, footer }) {
  const location = useLocation()
  return <div key={location.pathname} className="page-intro min-h-screen bg-[#fff7f2] dark:bg-[#17111b] flex">
    <div className="hidden lg:flex lg:w-[46%] xl:w-1/2 p-12 xl:p-16 bg-gradient-to-br from-[#38243f] via-[#71314f] to-[#bb4d55] text-white flex-col justify-between relative overflow-hidden">
      <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full border border-white/10" />
      <div className="absolute -bottom-32 -left-24 h-[30rem] w-[30rem] rounded-full border border-white/10" />
      <Link to="/signin" aria-label="e-Mail home" className="flex items-center gap-3 relative z-10"><span className="grid place-items-center w-11 h-11 rounded-2xl bg-white text-brand-700"><AtSign size={23}/></span><span className="font-extrabold text-2xl tracking-tight">e-Mail</span></Link>
      <div className="relative z-10 max-w-lg">
        <div className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold tracking-wide mb-6">YOUR SPACE, ORGANIZED</div>
        <h2 className="font-extrabold text-4xl xl:text-5xl leading-tight tracking-tight">A calmer way to manage your inbox.</h2>
        <p className="mt-5 text-rose-100/90 text-lg leading-8">Less clutter. More clarity. Keep conversations moving with an email workspace designed around you.</p>
        <div className="mt-10 rounded-2xl bg-white/10 border border-white/10 p-5 backdrop-blur-sm">
          <div className="flex items-center gap-3"><div className="h-10 w-10 rounded-full bg-[#ffe0b8] text-[#704038] grid place-items-center font-bold">OR</div><div><p className="font-semibold">Olivia Rhye</p><p className="text-sm text-rose-100/80">Product Designer</p></div><span className="ml-auto text-xs text-rose-100/80">10:42 AM</span></div>
          <p className="font-semibold mt-4">The new brand direction is ready ✨</p><p className="text-sm text-rose-100/85 mt-1">I’ve attached the latest concepts for the brand refresh...</p>
        </div>
      </div>
      <p className="relative z-10 text-sm text-rose-100/70">© 2026 e-Mail. Made for better workdays.</p>
    </div>
    <div className="flex-1 flex flex-col justify-center items-center p-4 sm:p-8">
      <div className="lg:hidden mb-6 sm:mb-10"><Link to="/signin" aria-label="e-Mail home" className="flex items-center gap-2 font-extrabold text-2xl text-slate-900 dark:text-white"><span className="grid place-items-center w-10 h-10 rounded-xl bg-brand-500 text-white"><AtSign size={21}/></span>e-Mail</Link></div>
      <div className="page-intro-card w-full max-w-[460px] rounded-3xl border border-slate-200/80 bg-[#fffdfa] p-5 shadow-[0_18px_60px_rgba(88,48,62,0.12)] sm:p-8 dark:border-slate-700 dark:bg-[#211925] dark:shadow-black/20">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h1>
        <p className="mt-2 mb-7 text-slate-500 dark:text-slate-400">{subtitle}</p>
        {children}
        {footer && <div className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">{footer}</div>}
      </div>
    </div>
  </div>
}
