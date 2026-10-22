import { Archive, Mail, MailOpen, MoreHorizontal, Star, Trash2 } from 'lucide-react'
export default function EmailRow({ email, onOpen, onStar, onDelete, onArchive, onToggleRead }) {
  return <div className={`group flex items-center gap-2 border-b border-slate-100 px-3 py-3.5 transition hover:bg-brand-50/60 dark:border-slate-800 dark:hover:bg-white/[.04] sm:gap-3 sm:px-5 ${email.unread ? 'bg-[#fffdfa] dark:bg-[#1d1621]' : 'bg-slate-50/60 dark:bg-[#19131d]'}`}>
    <button aria-label={email.starred ? 'Unstar email' : 'Star email'} onClick={e => { e.stopPropagation(); onStar(email.id) }} className="shrink-0 p-1 text-slate-300 transition hover:text-amber-400">{email.starred ? <Star size={17} className="fill-amber-400 text-amber-400"/> : <Star size={17}/>}</button>
    <button onClick={() => onOpen(email.id)} className="flex min-w-0 flex-1 items-center gap-3 text-left">
      <div className={`hidden h-10 w-10 shrink-0 place-items-center rounded-full text-xs font-bold sm:grid ${email.color}`}>{email.initials}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2"><span className={`truncate text-[13px] ${email.unread ? 'font-extrabold text-slate-900 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{email.sender}</span>{email.attachments?.length > 0 && <span className="hidden rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-500 dark:bg-white/10 sm:inline">{email.attachments.length} file</span>}</div>
        <div className="truncate text-[13px]"><span className={`${email.unread ? 'font-bold text-slate-800 dark:text-slate-100' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{email.subject}</span><span className="text-slate-400"> — {email.preview}</span></div>
      </div>
      <span className={`hidden shrink-0 pl-2 text-[11px] sm:block ${email.unread ? 'font-bold text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>{email.time}</span>
    </button>
    <div className="flex shrink-0 items-center gap-0.5 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
      <button title={email.unread ? 'Mark as read' : 'Mark as unread'} onClick={() => onToggleRead(email.id)} className="hidden rounded-lg p-2 text-slate-400 hover:bg-white hover:text-brand-600 dark:hover:bg-white/10 sm:block">{email.unread ? <MailOpen size={16}/> : <Mail size={16}/>}</button>
      <button title="Archive" onClick={() => onArchive(email.id)} className="hidden rounded-lg p-2 text-slate-400 hover:bg-white hover:text-brand-600 dark:hover:bg-white/10 sm:block"><Archive size={16}/></button>
      <button title="Delete" onClick={() => onDelete(email.id)} className="rounded-lg p-2 text-slate-400 hover:bg-white hover:text-rose-500 dark:hover:bg-white/10"><Trash2 size={16}/></button>
    </div>
  </div>
}
