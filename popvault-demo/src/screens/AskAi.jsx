import { useEffect, useRef, useState } from 'react'
import { useAppState } from '../state.jsx'
import ScreenHeader from '../components/ScreenHeader.jsx'
import { answerQuestion } from '../lib/askAi.js'

const GREETING =
  "Hi, I'm your PopVault assistant. Ask me about your coverage, premium, or claims — or tap a suggestion below."
const SUGGESTIONS = [
  "What's covered?",
  'How much is my premium?',
  "What's my coverage limit?",
  'How do I file a claim?',
]

export default function AskAi() {
  const { state } = useAppState()
  const [messages, setMessages] = useState(() => [{ id: 0, role: 'ai', text: GREETING }])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const bottomRef = useRef(null)
  const timeoutRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isThinking])

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const hasAsked = messages.some((m) => m.role === 'user')

  const ask = (text) => {
    const question = text.trim()
    if (!question || isThinking) return
    setMessages((prev) => [...prev, { id: prev.length, role: 'user', text: question }])
    setInput('')
    setIsThinking(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setMessages((prev) => [...prev, { id: prev.length, role: 'ai', text: answerQuestion(question, state) }])
      setIsThinking(false)
    }, 700)
  }

  return (
    <div className="flex flex-col h-full px-6 pb-10">
      <ScreenHeader title="Ask AI" />

      <div role="log" aria-live="polite" className="flex-1 overflow-y-auto flex flex-col gap-3 pb-2">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
              m.role === 'user'
                ? 'self-end bg-vault-purple text-white'
                : 'self-start bg-vault-panel border border-vault-line text-vault-text'
            }`}
          >
            {m.text}
          </div>
        ))}

        {isThinking && (
          <div className="self-start bg-vault-panel border border-vault-line text-vault-mute rounded-2xl px-4 py-2.5 text-sm animate-pulse">
            PopVault AI is typing…
          </div>
        )}

        {!hasAsked && (
          <div className="flex flex-wrap gap-2 mt-1">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => ask(s)}
                className="text-xs text-vault-mute bg-vault-panel border border-vault-line rounded-full px-3 py-1.5 active:bg-vault-card"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); ask(input) }} className="mt-6 flex items-center gap-2">
        <label htmlFor="ask-ai-input" className="sr-only">
          Ask a question about your policy
        </label>
        <input
          id="ask-ai-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about your policy…"
          autoFocus
          className="flex-1 bg-vault-panel border border-vault-line rounded-2xl px-4 py-3 text-sm text-vault-text outline-none placeholder:text-vault-mute focus:border-vault-purple"
        />
        <button
          type="submit"
          disabled={!input.trim() || isThinking}
          aria-label="Send"
          className="w-11 h-11 shrink-0 rounded-2xl bg-vault-purple text-white flex items-center justify-center disabled:opacity-40"
        >
          ➤
        </button>
      </form>
    </div>
  )
}
