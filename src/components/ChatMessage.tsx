import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

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
        {isUser ? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
        ) : (
          <div className="text-sm leading-relaxed prose prose-sm max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                code: ({ node, inline, className, children, ...props }: any) => {
                  return inline ? (
                    <code className="bg-gray-200 text-gray-800 px-1 py-0.5 rounded text-xs font-mono" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
                pre: ({ children }: any) => (
                  <pre className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto my-2">
                    {children}
                  </pre>
                ),
                p: ({ children }: any) => (
                  <p className="mb-2 last:mb-0">{children}</p>
                ),
                ul: ({ children }: any) => (
                  <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>
                ),
                ol: ({ children }: any) => (
                  <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>
                ),
                li: ({ children }: any) => (
                  <li className="ml-2">{children}</li>
                ),
                h1: ({ children }: any) => (
                  <h1 className="text-xl font-bold mb-2 mt-3 first:mt-0">{children}</h1>
                ),
                h2: ({ children }: any) => (
                  <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h2>
                ),
                h3: ({ children }: any) => (
                  <h3 className="text-base font-bold mb-2 mt-2 first:mt-0">{children}</h3>
                ),
                blockquote: ({ children }: any) => (
                  <blockquote className="border-l-4 border-cloudflare-orange pl-4 italic my-2">
                    {children}
                  </blockquote>
                ),
                a: ({ children, href }: any) => (
                  <a href={href} className="text-cloudflare-orange hover:underline" target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                ),
                table: ({ children }: any) => (
                  <div className="overflow-x-auto my-2">
                    <table className="min-w-full border-collapse border border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                th: ({ children }: any) => (
                  <th className="border border-gray-300 px-3 py-2 bg-gray-200 font-semibold text-left">
                    {children}
                  </th>
                ),
                td: ({ children }: any) => (
                  <td className="border border-gray-300 px-3 py-2">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}

export default ChatMessage
