'use client'

import { useMemo, useState } from 'react'

const PROMPTS = [
  'What are you working on right now?',
  'What stack do you enjoy most?',
  'What should I check out next?'
]

const RESPONSES = {
  'What are you working on right now?': 'I am polishing portfolio interactions and shipping cleaner UX details.',
  'What stack do you enjoy most?': 'I love React + Next.js for UI, then Node/Python for backend work.',
  'What should I check out next?': 'Open Selected Work first, then the project deep dives for architecture details.'
}

export default function ModelChatBubble() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('Tap me to chat with this model.')

  const promptChips = useMemo(() => PROMPTS, [])

  const handlePrompt = (prompt) => {
    setMessage(RESPONSES[prompt] || 'Great question. Ask another one!')
  }

  return (
    <div className="absolute z-30 -top-2 -right-2 flex flex-col items-end gap-2 pointer-events-none">
      {isOpen && (
        <div
          className="w-[260px] rounded-2xl border p-3 shadow-xl pointer-events-auto"
          style={{
            background: 'var(--bg-primary)',
            borderColor: 'var(--rose-quartz)',
            boxShadow: '0 14px 34px rgba(0,0,0,0.18)'
          }}
        >
          <p className="text-[12px] leading-relaxed mb-3" style={{ color: 'var(--text-primary)' }}>
            {message}
          </p>
          <div className="flex flex-wrap gap-2">
            {promptChips.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => handlePrompt(prompt)}
                className="text-[10px] px-2.5 py-1.5 rounded-full border transition-colors duration-200"
                style={{
                  borderColor: 'var(--border-light)',
                  color: 'var(--text-secondary)',
                  background: 'var(--bg-secondary)'
                }}
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Toggle chat bubble"
        className="pointer-events-auto rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase shadow-lg border transition-all duration-300 hover:-translate-y-0.5"
        style={{
          background: 'var(--rose-taupe)',
          color: 'var(--anti-flash-white)',
          borderColor: 'var(--onyx)',
          boxShadow: '0 10px 24px rgba(0,0,0,0.2)'
        }}
      >
        {isOpen ? 'Close Chat' : 'Chat'}
      </button>
    </div>
  )
}
