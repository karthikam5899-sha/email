# e-Mail — Email Application UI

A responsive frontend-only email application built with React, Vite, Tailwind CSS, and React Router.

## Features
- Sign in, sign up, and forgot-password screens with client-side validation
- Inbox, Sent, Drafts, Spam, Trash, Starred, and Archive folders with email counts and unread indicators
- Search email by sender, subject, or preview
- Reopen and edit saved drafts; sign out to return to the sign-in screen
- Read/unread, star, delete, archive, and restore actions
- Email detail view with reply and forward compose UI
- Detailed sample grocery, shopping, bank, train, utility, and mobile emails with contextual photos
- Compose email with To, CC, BCC, subject, message, removable attachment chips, and send/save/discard actions
- Save and reopen drafts, retaining recipient fields and attachment names
- Responsive sidebar with mobile menu
- Light/dark theme toggle
- Warm sunset theme with coral, plum, and peach accents
- Mock data; no backend required

> This is a UI demo. Authentication and sending are simulated in the browser; data resets on refresh. The sample messages and transaction details are fictional, and contextual email photos load from Unsplash.

## Requirements
- Node.js 18+ recommended
- npm

## Setup
```bash
# 1. Extract the ZIP, then open the project folder
cd mailflow-email-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
Open the local URL printed by Vite (usually `http://localhost:5173`).

## Production build
```bash
npm run build
npm run preview
```

## Folder structure
```text
mailflow-email-app/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── data/
    │   └── emails.js
    ├── components/
    │   ├── AuthLayout.jsx
    │   ├── EmailRow.jsx
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   └── ComposeModal.jsx
    └── pages/
        ├── AuthPages.jsx
        ├── InboxPage.jsx
        └── EmailDetail.jsx
```
