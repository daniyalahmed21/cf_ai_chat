interface ChatMessageProps {
  content: string
  isUser: boolean
}

function ChatMessage({ content, isUser }: ChatMessageProps) {
  return (
    <div className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 ${
        isUser ? 'bg-gray-700' : 'bg-cloudflare-orange'
      }`}>
        {isUser ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
        )}
      </div>

      <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
        isUser
          ? 'bg-cloudflare-orange text-white'
          : 'bg-gray-100 text-gray-800'
      }`}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
      </div>
    </div>
  )
}

export default ChatMessage
