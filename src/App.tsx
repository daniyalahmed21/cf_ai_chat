import { useState, useRef, useEffect } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import ChatHeader from './components/ChatHeader'

interface Message {
  content: string
  isUser: boolean
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    { content: "Hello! I'm your AI assistant powered by Cloudflare Workers AI. How can I help you today?", isUser: false }
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const userId = useRef(`user-${Math.random().toString(36).substr(2, 9)}`)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const sendMessage = async (message: string) => {
    setMessages(prev => [...prev, { content: message, isUser: true }])
    setIsTyping(true)

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': userId.current
        },
        body: JSON.stringify({ message })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      if (reader) {
        setIsTyping(false)
        setMessages(prev => [...prev, { content: '', isUser: false }])

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          fullText += chunk

          setMessages(prev => {
            const newMessages = [...prev]
            newMessages[newMessages.length - 1] = { content: fullText, isUser: false }
            return newMessages
          })
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setIsTyping(false)
      setMessages(prev => [...prev, {
        content: 'Sorry, there was an error processing your message. Please try again.',
        isUser: false
      }])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl flex flex-direction-col overflow-hidden">
        <ChatHeader />

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} content={msg.content} isUser={msg.isUser} />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-cloudflare-orange flex items-center justify-center text-white font-semibold flex-shrink-0">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div className="bg-gray-100 rounded-2xl px-4 py-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput onSend={sendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}

export default App
