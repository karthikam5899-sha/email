import { Archive, AtSign, File, Inbox, LogOut, PenSquare, Send, ShieldAlert, Star, Trash2, X } from 'lucide-react'

const folders = [
  { id: 'inbox', label: 'Inbox', icon: Inbox },
  { id: 'starred', label: 'Starred', icon: Star },
  { id: 'sent', label: 'Sent', icon: Send },
  { id: 'drafts', label: 'Drafts', icon: File },
  { id: 'archive', label: 'Archive', icon: Archive },
  { id: 'spam', label: 'Spam', icon: ShieldAlert },
  { id: 'trash', label: 'Trash', icon: Trash2 },
]
export default function Sidebar({ active, onNavigate, emails, onCompose, onSignOut, mobileOpen, setMobileOpen }) {
  const count = folder => {
    const matching = folder === 'starred'
      ? emails.filter(email => email.starred && email.folder !== 'trash')
      : emails.filter(email => email.folder === folder)
    const unread = folder === 'inbox' || folder === 'spam'
      ? matching.filter(email => email.unread).length
      : null
    return { value: unread ?? matching.length, description: unread === null ? 'emails' : 'unread emails' }
  }
  return <>
    {mobileOpen && <button aria-label="Close menu overlay" className="fixed inset-0 z-30 bg-slate-950/40 lg:hidden" onClick={() => setMobileOpen(false)} />}
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 flex w-[264px] shrink-0 flex-col border-r border-slate-200/80 bg-[#fffdfa] px-4 py-5 transition-transform duration-200 dark:border-slate-800 dark:bg-[#1d1621] lg:translate-x-0 ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
      <div className="mb-8 flex shrink-0 items-center justify-between px-2">
        <button onClick={() => onNavigate('inbox')} aria-label="e-Mail home" className="flex items-center gap-2.5"><span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-white shadow-lg shadow-brand-700/20"><AtSign size={21}/></span><span className="font-extrabold text-[22px] tracking-tight text-slate-900 dark:text-white">e-Mail</span></button>
        <button aria-label="Close navigation" className="lg:hidden p-2 text-slate-400" onClick={() => setMobileOpen(false)}><X size={19}/></button>
      </div>
      <button onClick={onCompose} className="flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-brand-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-600 active:scale-[.98]"><PenSquare size={17}/> Compose email</button>
      <p className="mt-8 mb-3 shrink-0 px-3 text-[10px] font-bold uppercase tracking-[.18em] text-slate-400">Workspace</p>
      <nav aria-label="Mail folders" className="soft-scrollbar min-h-0 flex-1 space-y-1 overflow-y-auto overscroll-contain pr-1">
        {folders.map(({ id, label, icon: Icon }) => {
          const selected = active === id
          const { value: n, description } = count(id)
          return <button key={id} onClick={() => { onNavigate(id); setMobileOpen(false) }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${selected ? 'bg-brand-50 font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200' : 'font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-white/5'}`}>
            <Icon size={18} strokeWidth={selected ? 2.3 : 1.8}/><span>{label}</span>{n > 0 && <span aria-label={`${n} ${description}`} className={`ml-auto rounded-md px-2 py-0.5 text-xs ${selected ? 'bg-white text-brand-700 dark:bg-white/10 dark:text-brand-200' : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300'}`}>{n}</span>}
          </button>
        })}
      </nav>
      <div className="mt-auto shrink-0 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
        <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand-300 to-brand-700 text-sm font-bold text-white">AK</div><div className="min-w-0"><p className="truncate text-sm font-bold text-slate-800 dark:text-white">Alex Kim</p><p className="truncate text-xs text-slate-500 dark:text-slate-400">alex@workmail.com</p></div></div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"><div className="h-full w-[62%] rounded-full bg-brand-500"/></div><p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400">Storage used <span className="font-semibold">6.2 GB of 10 GB</span></p>
        <button onClick={onSignOut} className="mt-4 flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-rose-400"><LogOut size={16}/> Sign out</button>
      </div>
    </aside>
  </>
}
