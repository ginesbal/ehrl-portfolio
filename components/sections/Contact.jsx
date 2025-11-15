'use client'

import { useRef, useState } from 'react'

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export default function ContactRefined() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _hp: '' })
  const [currentField, setCurrentField] = useState(0)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)
  const statusRef = useRef(null)

  const firstName = (name) => {
    const t = (name || '').trim()
    if (!t) return ''
    const f = t.split(/\s+/)[0]
    return f.charAt(0).toUpperCase() + f.slice(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (form._hp || !name || !isEmail(email) || message.length < 10) {
      setStatus('error'); statusRef.current?.focus(); return
    }

    setBusy(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject: 'Portfolio Contact Form', message })
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '', _hp: '' })
        setCurrentField(0)
      } else setStatus('error')
    } catch { setStatus('error') }
    finally { setBusy(false); statusRef.current?.focus() }
  }

  const complete = form.name.trim() && isEmail(form.email.trim()) && form.message.trim().length >= 10

  return (
    <section id="contact" className="flex flex-col md:flex-row md:max-h-screen relative mt-8 md:mt-0">
      <div className="w-full md:w-1/2 p-5 md:p-8 lg:p-12 flex flex-col justify-center bg-bg-dark text-text-light">
        <div className="max-w-md ml-0 lg:ml-8">
          <h2 className="text-[24px] md:text-[48px] lg:text-[56px] font-light leading-tight mb-3 md:mb-4">
            {currentField === 0 && <>Let's start with<br /><span className="text-rose-taupe">your name</span></>}
            {currentField === 1 && <>Great! Now<br /><span className="text-rose-taupe">your email</span></>}
            {currentField === 2 && <>Almost done<br /><span className="text-rose-taupe">tell me more</span></>}
          </h2>
          <p className="text-[14px] md:text-[16px] leading-relaxed mb-6 md:mb-6 lg:mb-8 opacity-80">
            {currentField === 0 && "I'd love to know who I'm talking with."}
            {currentField === 1 && "So I can get back to you."}
            {currentField === 2 && "Share your project details or say hello."}
          </p>

          <nav aria-label="Direct contact" className="hidden md:block space-y-2.5 text-[15px]">
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" href="mailto:ehrl.balquin@gmail.com">ehrl.balquin@gmail.com</a><br />
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/ehrlbalquin">LinkedIn</a><br />
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" target="_blank" rel="noopener noreferrer" href="https://github.com/ehrlbalquin">GitHub</a>
          </nav>

          {!!form.name.trim() && (
            <div className="mt-6 md:mt-6 lg:mt-8 pt-6 md:pt-6 border-t border-white/10">
              <p className="text-[14px] md:text-[15px] opacity-80">Thanks, {firstName(form.name)}.</p>
            </div>
          )}
        </div>
      </div>

      <div className="w-full md:w-1/2 p-5 md:p-8 lg:p-12 flex flex-col justify-center bg-bg-primary">
        <div className="max-w-md mx-auto w-full">
          <form onSubmit={handleSubmit} noValidate className="space-y-5 md:space-y-5 lg:space-y-5">
            <input type="text" name="_hp" value={form._hp} onChange={(e) => setForm(p => ({ ...p, _hp: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden="true" />

            <div>
              <label htmlFor="name" className={`block text-[11px] font-semibold tracking-wide uppercase mb-2 transition-colors ${currentField === 0 ? 'text-rose-taupe' : 'text-text-muted'}`}>Name</label>
              <input
                id="name" name="name" type="text" autoComplete="name"
                placeholder="Your name" required
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                onFocus={() => setCurrentField(0)}
                className={`w-full px-4 py-3 text-[15px] bg-bg-secondary border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-taupe/20 min-h-[48px] ${currentField === 0 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
              {form.name.length > 0 && !form.name.trim() && (
                <p className="mt-1.5 text-[11px]" style={{ color: 'var(--danger)' }}>Name is required</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className={`block text-[11px] font-semibold tracking-wide uppercase mb-2 transition-colors ${currentField === 1 ? 'text-rose-taupe' : 'text-text-muted'}`}>Email</label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                placeholder="you@email.com" required
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                onFocus={() => setCurrentField(1)}
                className={`w-full px-4 py-3 text-[15px] bg-bg-secondary border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-taupe/20 min-h-[48px] ${currentField === 1 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
              {form.email.length > 0 && !isEmail(form.email.trim()) && (
                <p className="mt-1.5 text-[11px]" style={{ color: 'var(--danger)' }}>Please enter a valid email address</p>
              )}
            </div>

            <div>
              <label htmlFor="message" className={`block text-[11px] font-semibold tracking-wide uppercase mb-2 transition-colors ${currentField === 2 ? 'text-rose-taupe' : 'text-text-muted'}`}>Message</label>
              <textarea
                id="message" name="message" rows={4} placeholder="Tell me about your project…"
                required
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={() => setCurrentField(2)}
                className={`w-full px-4 py-3 text-[15px] bg-bg-secondary border-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-taupe/20 resize-none ${currentField === 2 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
              {form.message.trim().length > 0 && form.message.trim().length < 10 ? (
                <p className="mt-1.5 text-[11px]" style={{ color: 'var(--danger)' }}>{10 - form.message.trim().length} more characters needed</p>
              ) : (
                <p className="mt-1.5 text-[11px] text-text-muted">Minimum 10 characters</p>
              )}
            </div>

            <button type="submit" disabled={!complete || busy} className={`w-full px-6 py-3.5 text-[14px] font-semibold rounded-lg transition-all duration-200 min-h-[52px] ${complete && !busy ? 'bg-rose-taupe text-white active:scale-[0.98]' : 'bg-border-light text-text-muted cursor-not-allowed'}`}>
              {busy ? 'Sending…' : 'Send Message'} <span aria-hidden>→</span>
            </button>

            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status === 'success' && (
                <div className="mt-6 p-4 rounded-lg border border-rose-taupe bg-rose-taupe/10">
                  <p className="text-[15px] font-medium text-rose-taupe">Message sent successfully! I'll get back to you soon.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-6 p-4 rounded-lg border bg-danger-weak" style={{ borderColor: 'var(--danger)' }}>
                  <p className="text-[15px] font-medium" style={{ color: 'var(--danger)' }}>✗ Something went wrong. Please try again or email me directly.</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}