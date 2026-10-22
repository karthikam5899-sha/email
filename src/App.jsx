import { useEffect, useMemo, useState } from 'react'
import { Navigate, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import { initialEmails } from './data/emails'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import ComposeModal from './components/ComposeModal'
import InboxPage from './pages/InboxPage'
import EmailDetail from './pages/EmailDetail'
import { ForgotPassword, SignIn, SignUp } from './pages/AuthPages'

function MailWorkspace() {
  const [emails,setEmails] = useState(initialEmails)
  const [folder,setFolder] = useState('inbox')
  const [query,setQuery] = useState('')
  const [composeOpen,setComposeOpen] = useState(false)
  const [composeInitial,setComposeInitial] = useState(null)
  const [composeMode,setComposeMode] = useState('compose')
  const [mobileOpen,setMobileOpen] = useState(false)
  const [dark,setDark] = useState(false)
  const [toast,setToast] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  useEffect(()=>{document.documentElement.classList.toggle('dark',dark)},[dark])
  useEffect(()=>{if(location.pathname==='/inbox')setFolder('inbox')},[location.pathname])
  const selectedEmail = useMemo(()=>emails.find(e=>e.id===Number(params.id)),[emails,params.id])
  const notify = message => { setToast(message); window.setTimeout(()=>setToast(''),2600) }
  const openFolder = id => {setFolder(id);navigate('/inbox')}
  const startCompose = (initial=null, mode='compose') => {setComposeInitial(initial);setComposeMode(mode);setComposeOpen(true)}
  const openEmail = id => {
    const email = emails.find(item => item.id === id)
    if (email?.folder === 'drafts') {
      startCompose({draftId: email.id, to: email.to || '', cc: email.cc || '', bcc: email.bcc || '', subject: email.subject === '(no subject)' ? '' : email.subject, message: email.body, attachments: email.attachments || []})
      return
    }
    navigate(`/email/${id}`)
  }
  const sendEmail = data => {
    const newEmail = {id:Date.now(),folder:'sent',sender:'You',email:'me@workmail.com',initials:'ME',color:'bg-indigo-100 text-indigo-700',subject:data.subject,preview:data.message.slice(0,100),body:data.message,time:'Just now',date:'Today, just now',unread:false,starred:false,attachments:data.attachments||[],to:data.to,cc:data.cc,bcc:data.bcc}
    setEmails(old=>[newEmail,...old.filter(e=>!(composeInitial?.draftId && e.id===composeInitial.draftId))])
    notify('Email sent successfully')
  }
  const saveDraft = data => {
    const draft={id:composeInitial?.draftId||Date.now(),folder:'drafts',sender:'You',email:'me@workmail.com',initials:'ME',color:'bg-indigo-100 text-indigo-700',subject:data.subject||'(no subject)',preview:data.message||'No message content',body:data.message||'',time:'Just now',date:'Today, just now',unread:false,starred:false,attachments:data.attachments||[],to:data.to,cc:data.cc,bcc:data.bcc}
    setEmails(old=>[draft,...old.filter(e=>e.id!==draft.id)])
    notify('Draft saved')
  }
  const discardCompose = () => {
    if (composeInitial?.draftId) {
      setEmails(old=>old.filter(email=>email.id!==composeInitial.draftId))
    }
    notify('Message discarded')
  }
  const archive = id => {setEmails(old=>old.map(e=>e.id===id?{...e,folder:'archive'}:e));notify('Email archived')}
  const deleteEmail = id => {setEmails(old=>old.map(e=>e.id===id?{...e,folder:'trash'}:e));notify('Moved to trash')}
  const star = id => setEmails(old=>old.map(e=>e.id===id?{...e,starred:!e.starred}:e))
  const reply = email => startCompose({to:email.email,subject:`Re: ${email.subject}`,message:`\n\nOn ${email.date}, ${email.sender} wrote:\n> ${email.preview}`},'reply')
  const forward = email => startCompose({subject:`Fwd: ${email.subject}`,message:`\n\n---------- Forwarded message ----------\nFrom: ${email.sender} <${email.email}>\nSubject: ${email.subject}\n\n${email.body}`},'forward')
  const isDetail = location.pathname.startsWith('/email/')
  return <div className="flex min-h-screen bg-[#fff7f2] text-slate-800 dark:bg-[#17111b] dark:text-slate-100">
    <Sidebar active={folder} onNavigate={openFolder} emails={emails} onCompose={()=>startCompose()} onSignOut={()=>navigate('/signin', { replace: true })} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    <div className="flex min-w-0 flex-1 flex-col">
      <Topbar query={query} setQuery={setQuery} dark={dark} setDark={setDark} setMobileOpen={setMobileOpen} onSignOut={()=>navigate('/signin', { replace: true })}/>
      <main className="mx-auto w-full max-w-[1500px] flex-1 px-3 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div key={`${location.pathname}:${folder}`} className="page-intro">
          {isDetail ? <EmailDetail email={selectedEmail} onBack={()=>navigate('/inbox')} onStar={star} onArchive={archive} onDelete={deleteEmail} onReply={reply} onForward={forward}/> : <InboxPage folder={folder} emails={emails} setEmails={setEmails} onOpen={openEmail} onCompose={()=>startCompose()} query={query}/>}
        </div>
        <footer className="mt-8 flex flex-wrap items-center justify-between gap-2 px-1 text-[11px] text-slate-400"><span>© 2026 e-Mail Workspace</span><span>Designed for a clearer workday</span></footer>
      </main>
    </div>
    <ComposeModal open={composeOpen} onClose={()=>setComposeOpen(false)} onSend={sendEmail} onSaveDraft={saveDraft} onDiscard={discardCompose} initial={composeInitial} mode={composeMode}/>
    {toast && <div role="status" className="fixed bottom-5 left-1/2 z-[80] -translate-x-1/2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl animate-in">{toast}</div>}
  </div>
}
export default function App() {
  return <Routes>
    <Route path="/" element={<Navigate to="/signin" replace/>}/>
    <Route path="/signin" element={<SignIn/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/forgot-password" element={<ForgotPassword/>}/>
    <Route path="/inbox" element={<MailWorkspace/>}/>
    <Route path="/email/:id" element={<MailWorkspace/>}/>
    <Route path="*" element={<Navigate to="/signin" replace/>}/>
  </Routes>
}
