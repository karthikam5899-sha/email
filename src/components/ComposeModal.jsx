import { useEffect, useRef, useState } from 'react'
import { Paperclip, Send, X } from 'lucide-react'

const isValidRecipients = value => !value.trim() || value.split(',').every(address => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.trim()))

export default function ComposeModal({ open, onClose, onSend, onSaveDraft, onDiscard, initial = null, mode = 'compose' }) {
  const [to, setTo] = useState('')
  const [cc, setCc] = useState('')
  const [bcc, setBcc] = useState('')
  const [showCc, setShowCc] = useState(false)
  const [showBcc, setShowBcc] = useState(false)
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [attachments, setAttachments] = useState([])
  const [error, setError] = useState('')
  const [discardConfirm, setDiscardConfirm] = useState(false)
  const fileRef = useRef(null)

  useEffect(() => {
    if (!open) return
    setTo(initial?.to || '')
    setCc(initial?.cc || '')
    setBcc(initial?.bcc || '')
    setShowCc(Boolean(initial?.cc))
    setShowBcc(Boolean(initial?.bcc))
    setSubject(initial?.subject || '')
    setMessage(initial?.message || '')
    setAttachments(initial?.attachments || [])
    setError('')
    setDiscardConfirm(false)
  }, [open, initial])

  if (!open) return null

  const handleSend = event => {
    event.preventDefault()
    if (!isValidRecipients(to) || !to.trim()) return setError('Enter one or more valid recipient email addresses.')
    if (!isValidRecipients(cc)) return setError('Check the Cc email addresses.')
    if (!isValidRecipients(bcc)) return setError('Check the Bcc email addresses.')
    if (!subject.trim()) return setError('Please add a subject.')
    if (!message.trim()) return setError('Please write a message before sending.')
    onSend({ to, cc, bcc, subject: subject.trim(), message, attachments })
    onClose()
  }

  const saveDraft = () => {
    onSaveDraft({ to, cc, bcc, subject: subject || '(no subject)', message, attachments })
    onClose()
  }

  const discard = () => {
    onDiscard()
    onClose()
  }

  const addAttachments = event => {
    setAttachments(current => [...current, ...Array.from(event.target.files || [], file => file.name)])
    event.target.value = ''
  }

  const recipientField = (id, label, value, onChange, placeholder, autoFocus = false) => <div className="flex items-center border-b border-slate-100 px-5 dark:border-slate-800">
    <label htmlFor={id} className="w-12 shrink-0 text-sm text-slate-500 dark:text-slate-400">{label}</label>
    <input id={id} type="text" autoFocus={autoFocus} value={value} onChange={event => { onChange(event.target.value); setError('') }} placeholder={placeholder} autoComplete="off" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none dark:text-white" />
  </div>

  return <div className="fixed inset-0 z-[60] flex items-end justify-center bg-slate-950/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-5" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section aria-labelledby="compose-title" role="dialog" aria-modal="true" className="flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-2xl border border-slate-200 bg-[#fffdfa] shadow-2xl dark:border-slate-700 dark:bg-[#211925] sm:max-w-[680px] sm:rounded-2xl">
      <header className="flex items-center justify-between bg-slate-50 px-5 py-3 dark:bg-white/5">
        <h2 id="compose-title" className="text-sm font-bold text-slate-800 dark:text-white">{mode === 'reply' ? 'Reply' : mode === 'forward' ? 'Forward message' : 'New message'}</h2>
        <button type="button" aria-label="Close compose" onClick={onClose} className="rounded p-1.5 text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"><X size={17} /></button>
      </header>
      <form onSubmit={handleSend} className="flex min-h-0 flex-1 flex-col">
        {recipientField('compose-to', 'To', to, setTo, 'recipient@example.com', true)}
        {(showCc || showBcc) && <div className="flex justify-end gap-3 border-b border-slate-100 px-5 py-1 dark:border-slate-800">
          {!showCc && <button type="button" onClick={() => setShowCc(true)} className="text-xs text-slate-400 hover:text-brand-600">Add Cc</button>}
          {!showBcc && <button type="button" onClick={() => setShowBcc(true)} className="text-xs text-slate-400 hover:text-brand-600">Add Bcc</button>}
        </div>}
        {!showCc && !showBcc && <div className="flex justify-end gap-3 border-b border-slate-100 px-5 py-1 dark:border-slate-800">
          <button type="button" onClick={() => setShowCc(true)} className="text-xs text-slate-400 hover:text-brand-600">Cc</button>
          <button type="button" onClick={() => setShowBcc(true)} className="text-xs text-slate-400 hover:text-brand-600">Bcc</button>
        </div>}
        {showCc && recipientField('compose-cc', 'Cc', cc, setCc, 'Add Cc recipients')}
        {showBcc && recipientField('compose-bcc', 'Bcc', bcc, setBcc, 'Add Bcc recipients')}
        <div className="flex items-center border-b border-slate-100 px-5 dark:border-slate-800">
          <label htmlFor="compose-subject" className="w-12 shrink-0 text-sm text-slate-500 dark:text-slate-400">Subject</label>
          <input id="compose-subject" value={subject} onChange={event => { setSubject(event.target.value); setError('') }} placeholder="Add a subject" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none dark:text-white" />
        </div>
        <textarea aria-label="Message" value={message} onChange={event => { setMessage(event.target.value); setError('') }} placeholder="Write your message..." className="soft-scrollbar min-h-[180px] flex-1 resize-y bg-transparent px-5 py-4 text-sm leading-7 outline-none dark:text-slate-200 sm:min-h-[240px]" />
        {attachments.length > 0 && <ul aria-label="Attachments" className="flex flex-wrap gap-2 px-5 pb-3">
          {attachments.map((name, index) => <li key={`${name}-${index}`} className="flex items-center gap-1 rounded-lg bg-slate-100 py-1 pl-2.5 pr-1 text-xs text-slate-600 dark:bg-white/10 dark:text-slate-300">
            <span className="max-w-[220px] truncate">{name}</span>
            <button type="button" aria-label={`Remove ${name}`} onClick={() => setAttachments(current => current.filter((_, itemIndex) => itemIndex !== index))} className="rounded p-1 text-slate-400 hover:bg-white hover:text-rose-500 dark:hover:bg-white/10"><X size={13} /></button>
          </li>)}
        </ul>}
        {error && <p role="alert" className="px-5 pb-2 text-xs font-medium text-rose-500">{error}</p>}
        {discardConfirm && <div role="alertdialog" aria-label="Discard draft confirmation" className="mx-4 mb-2 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-rose-50 px-3 py-2 text-xs dark:bg-rose-500/10">
          <span className="text-rose-700 dark:text-rose-300">Discard this message and its changes?</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => setDiscardConfirm(false)} className="rounded-lg px-2 py-1 font-semibold text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-white/10">Keep editing</button>
            <button type="button" onClick={discard} className="rounded-lg bg-rose-600 px-2 py-1 font-semibold text-white hover:bg-rose-700">Discard message</button>
          </div>
        </div>}
        <footer className="flex flex-wrap items-center gap-2 border-t border-slate-100 px-4 py-3 dark:border-slate-800 sm:px-5">
          <button type="submit" className="flex items-center gap-2 rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-brand-600"><Send size={15} /> Send</button>
          <button type="button" onClick={saveDraft} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10">Save draft</button>
          <button type="button" onClick={() => setDiscardConfirm(true)} className="rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10">Discard</button>
          <button type="button" aria-label="Attach files" onClick={() => fileRef.current?.click()} className="ml-auto rounded-xl p-2.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10"><Paperclip size={18} /></button>
          <input ref={fileRef} type="file" multiple className="hidden" onChange={addAttachments} />
        </footer>
      </form>
    </section>
  </div>
}
