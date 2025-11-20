function ChatHeader() {
  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 px-8 py-7 flex items-center justify-between shadow-2xl">
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl transform hover:scale-105 transition-transform">
          <img src="/image.png" alt="Cloudflare Logo" className="w-11 h-11 object-contain" />
        </div>
        <div>
          <h1 className="text-white text-3xl font-bold tracking-tight flex items-center gap-3">
            Cloudflare AI Chat
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">BETA</span>
          </h1>
          <p className="text-white/90 text-sm font-medium mt-1 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
            </svg>
            Powered by Workers AI
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg animate-pulse"></div>
        <span className="text-white text-sm font-medium">Online</span>
      </div>
    </div>
  )
}

export default ChatHeader
