function ChatHeader() {
  return (
    <div className="bg-cloudflare-orange px-6 py-4 flex items-center gap-4">
      <svg className="w-10 h-10 text-white" viewBox="0 0 109 109" fill="currentColor">
        <path d="M100.5 58.5c0 1.4-1.1 2.5-2.5 2.5H72.3c-.8 0-1.5.7-1.5 1.5v25.7c0 1.4-1.1 2.5-2.5 2.5h-18c-1.4 0-2.5-1.1-2.5-2.5V62.5c0-.8-.7-1.5-1.5-1.5H20.6c-1.4 0-2.5-1.1-2.5-2.5v-18c0-1.4 1.1-2.5 2.5-2.5h25.7c.8 0 1.5-.7 1.5-1.5V10.8c0-1.4 1.1-2.5 2.5-2.5h18c1.4 0 2.5 1.1 2.5 2.5v25.7c0 .8.7 1.5 1.5 1.5H98c1.4 0 2.5 1.1 2.5 2.5v18z"/>
      </svg>
      <div>
        <h1 className="text-white text-2xl font-bold">Cloudflare AI Chat</h1>
        <p className="text-white text-sm opacity-90">Powered by Workers AI</p>
      </div>
    </div>
  )
}

export default ChatHeader
