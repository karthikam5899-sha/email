import { useEffect, useRef, useState } from 'react'
import { Bell, HelpCircle, LogOut, Menu, Moon, Search, Sun, X } from 'lucide-react'
export default function Topbar({ query, setQuery, dark, setDark, setMobileOpen, onSignOut }) {
  const [profileOpen, setProfileOpen] = useState(false)
  const profileRef = useRef(null)
  useEffect(() => {
    if (!profileOpen) return undefined
    const closeOnOutsideClick = event => {
      if (!profileRef.current?.contains(event.target)) setProfileOpen(false)
    }
    const closeOnEscape = event => {
      if (event.key === 'Escape') setProfileOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [profileOpen])

  return <header className="sticky top-0 z-20 flex h-[76px] items-center gap-3 border-b border-slate-200/80 bg-[#fffdfa]/90 px-4 backdrop-blur-xl dark:border-slate-800 dark:bg-[#1d1621]/90 sm:px-6 lg:px-8">
    <button aria-label="Open navigation" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 lg:hidden"><Menu size={20}/></button>
    <div className="relative w-full max-w-[540px]">
      <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
      <input type="search" aria-label="Search emails" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search emails..." className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-16 text-sm outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:bg-[#fffdfa] focus:ring-4 focus:ring-brand-500/10 dark:border-slate-700 dark:bg-white/5 dark:text-white dark:focus:bg-white/10"/>
      <kbd className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400 dark:border-slate-700 dark:bg-white/5">⌘ K</kbd>
    </div>
    <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
      <button aria-label="Help" className="hidden rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10 sm:block"><HelpCircle size={19}/></button>
      <button aria-label="Notifications" className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"><Bell size={19}/><span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-[#fffdfa] dark:ring-[#1d1621]"/></button>
      <button aria-label="Toggle dark mode" onClick={() => setDark(!dark)} className="rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10">{dark ? <Sun size={19}/> : <Moon size={19}/>}</button>
      <div className="relative ml-1" ref={profileRef}>
        <button
          type="button"
          aria-label="Open profile menu"
          aria-haspopup="dialog"
          aria-expanded={profileOpen}
          onClick={() => setProfileOpen(open => !open)}
          className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-700 text-xs font-bold text-white ring-2 ring-[#fffdfa] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-500/30 dark:ring-slate-700"
        >
          AK
        </button>
        {profileOpen && <section role="dialog" aria-label="Profile menu" className="absolute right-0 top-12 z-50 w-[min(20rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-[#fffdfa] p-4 text-left shadow-xl dark:border-slate-700 dark:bg-[#241b27]">
          <div className="flex items-start gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-700 text-sm font-bold text-white">AK</div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white">Alex Kim</p>
              <p className="truncate text-sm text-slate-500 dark:text-slate-400">alex@workmail.com</p>
            </div>
            <button type="button" aria-label="Close profile menu" onClick={() => setProfileOpen(false)} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10"><X size={16}/></button>
          </div>
          <div className="my-4 border-t border-slate-100 dark:border-slate-700"/>
          <button type="button" onClick={() => { setProfileOpen(false); onSignOut() }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-200 dark:hover:bg-rose-500/10 dark:hover:text-rose-400">
            <LogOut size={16}/> Sign out
          </button>
        </section>}
      </div>
    </div>
  </header>
}
