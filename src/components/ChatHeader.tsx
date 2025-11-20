function ChatHeader() {
  return (
    <div className="bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 px-8 py-6 flex items-center gap-5 shadow-2xl">
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
        <img src="/image.png" alt="Cloudflare Logo" className="w-10 h-10 object-contain" />
      </div>
      <div>
        <h1 className="text-white text-3xl font-bold tracking-tight">Cloudflare AI Chat</h1>
        <p className="text-white text-sm opacity-95 font-medium mt-0.5">Powered by Workers AI</p>
      </div>
    </div>
  )
}

export default ChatHeader
