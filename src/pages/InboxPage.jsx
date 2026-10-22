import { useEffect, useMemo, useState } from 'react'
import { Archive, CheckCheck, ChevronDown, Inbox, MoreHorizontal, RefreshCw, Search, ShieldAlert, Trash2 } from 'lucide-react'
import EmailRow from '../components/EmailRow'

const folderMeta = {
  inbox: { title: 'Inbox', desc: 'All your important conversations in one place.', icon: Inbox },
  starred: { title: 'Starred', desc: 'The messages you’ve marked as important.', icon: 'star' },
  sent: { title: 'Sent', desc: 'Messages you’ve sent to other people.', icon: 'send' },
  drafts: { title: 'Drafts', desc: 'Messages you’ve started but haven’t sent yet.', icon: 'draft' },
  archive: { title: 'Archive', desc: 'Conversations tucked away for later.', icon: Archive },
  spam: { title: 'Spam', desc: 'Suspicious messages are collected here.', icon: ShieldAlert },
  trash: { title: 'Trash', desc: 'Deleted messages stay here until removed.', icon: Trash2 },
}
export default function InboxPage({ folder, emails, setEmails, onOpen, onCompose, query }) {
  const [selected, setSelected] = useState([])
  const meta = folderMeta[folder] || folderMeta.inbox
  const visible = useMemo(() => emails.filter(e => {
    const inFolder = folder === 'starred' ? e.starred && e.folder !== 'trash' : e.folder === folder
    const q = query.trim().toLowerCase()
    return inFolder && (!q || [e.sender,e.email,e.subject,e.preview].some(s => s?.toLowerCase().includes(q)))
  }), [emails, folder, query])
  useEffect(() => {
    setSelected(current => current.filter(id => visible.some(email => email.id === id)))
  }, [visible])
  const update = (id, changes) => setEmails(old => old.map(e => e.id === id ? {...e,...changes} : e))
  const remove = id => setEmails(old => old.map(e => e.id === id ? {...e, folder: 'trash', unread: false} : e))
  const archive = id => setEmails(old => old.map(e => e.id === id ? {...e, folder: 'archive'} : e))
  const bulkRead = () => { setEmails(old => old.map(e => selected.includes(e.id) ? {...e, unread:false} : e)); setSelected([]) }
  const bulkDelete = () => { setEmails(old => old.map(e => selected.includes(e.id) ? {...e, folder:'trash'} : e)); setSelected([]) }
  const bulkArchive = () => { setEmails(old => old.map(e => selected.includes(e.id) ? {...e, folder:'archive'} : e)); setSelected([]) }
  const selectAll = () => setSelected(selected.length === visible.length ? [] : visible.map(e => e.id))
  const empty = folder === 'drafts' ? 'No drafts yet' : folder === 'sent' ? 'Nothing sent yet' : folder === 'trash' ? 'Trash is empty' : folder === 'spam' ? 'No spam here' : folder === 'archive' ? 'No archived emails' : folder === 'starred' ? 'No starred emails' : 'Your inbox is clear'
  return <div>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div><div className="flex items-center gap-2"><h1 className="font-['Manrope'] text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-[28px]">{meta.title}</h1>{folder === 'inbox' && <span className="rounded-lg bg-brand-50 px-2 py-1 text-xs font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-200">{visible.filter(e=>e.unread).length} new</span>}</div><p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{meta.desc}</p></div>
      <button onClick={onCompose} className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600 sm:hidden">Compose email</button>
    </div>
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-[#fffdfa] shadow-soft dark:border-slate-800 dark:bg-[#1d1621]">
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-3 dark:border-slate-800 sm:px-5">
        <button onClick={selectAll} aria-label="Select all emails" aria-pressed={visible.length > 0 && selected.length === visible.length} className={`grid h-8 w-8 place-items-center rounded-lg border ${selected.length ? 'border-brand-500 bg-brand-50 text-brand-600 dark:bg-brand-500/10' : 'border-slate-200 text-slate-400 dark:border-slate-700'}`}><span className={`h-3 w-3 rounded-sm border ${selected.length ? 'border-brand-500 bg-brand-500' : 'border-slate-300 dark:border-slate-600'}`}/></button>
        <button title="Refresh" onClick={()=>setSelected([])} className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-white/10"><RefreshCw size={16}/></button>
        {selected.length > 0 ? <><span className="text-xs font-semibold text-slate-500">{selected.length} selected</span><button title="Mark selected as read" onClick={bulkRead} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"><CheckCheck size={16}/></button><button title="Archive selected" onClick={bulkArchive} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"><Archive size={16}/></button><button title="Delete selected" onClick={bulkDelete} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"><Trash2 size={16}/></button></> : <button className="flex items-center gap-1 rounded-lg px-2 py-2 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">More <ChevronDown size={14}/></button>}
        <span className="ml-auto text-xs text-slate-400">{visible.length ? `1–${visible.length} of ${visible.length}` : '0 emails'}</span>
      </div>
      {visible.length ? visible.map(email => <div key={email.id} className="flex items-stretch"><button aria-label={selected.includes(email.id)?'Deselect email':'Select email'} onClick={()=>setSelected(s=>s.includes(email.id)?s.filter(x=>x!==email.id):[...s,email.id])} className="w-7 shrink-0 border-b border-slate-100 text-center dark:border-slate-800 sm:w-10"><span className={`inline-block h-3.5 w-3.5 rounded border ${selected.includes(email.id)?'border-brand-500 bg-brand-500':'border-slate-300 dark:border-slate-600'}`}/></button><div className="min-w-0 flex-1"><EmailRow email={email} onOpen={id=>{update(id,{unread:false});onOpen(id)}} onStar={id=>update(id,{starred:!emails.find(e=>e.id===id)?.starred})} onDelete={remove} onArchive={archive} onToggleRead={id=>update(id,{unread:!emails.find(e=>e.id===id)?.unread})}/></div></div>) : <div className="flex min-h-[360px] flex-col items-center justify-center px-6 py-12 text-center"><div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-white/5">{query ? <Search size={27}/> : <Inbox size={27}/>}</div><h3 className="font-bold text-slate-800 dark:text-white">{query ? 'No matching emails' : empty}</h3><p className="mt-1 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">{query ? 'Try a different search term or check another folder.' : 'When something lands here, you’ll find it waiting for you.'}</p>{folder==='inbox'&&!query&&<button onClick={onCompose} className="mt-5 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-bold text-white hover:bg-brand-600">Write an email</button>}</div>}
      <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-400 dark:border-slate-800"><span>Showing {visible.length} conversations</span><span className="hidden sm:block">Updated just now</span></div>
    </div>
  </div>
}
