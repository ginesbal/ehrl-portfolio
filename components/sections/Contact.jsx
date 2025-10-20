'use client'

import { useRef, useState } from 'react'

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

export default function ContactRefined() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _hp: '' })
  const [currentField, setCurrentField] = useState(0)
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
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
    <section id="contact" className="min-h-screen flex flex-col md:flex-row relative">
      {/* Left copy */}
      <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-bg-dark text-text-light">
        <div className="max-w-md ml-0 lg:ml-12">
          <h2 className="text-[40px] md:text-[56px] font-light leading-tight mb-6">
            {currentField === 0 && <>Let’s start with<br /><span className="text-rose-taupe">your name</span></>}
            {currentField === 1 && <>Great! Now<br /><span className="text-rose-taupe">your email</span></>}
            {currentField === 2 && <>Almost done<br /><span className="text-rose-taupe">tell me more</span></>}
          </h2>
          <p className="text-[16px] leading-relaxed mb-12 opacity-80">
            {currentField === 0 && "I'd love to know who I'm talking with."}
            {currentField === 1 && "So I can get back to you."}
            {currentField === 2 && "Share your project details or say hello."}
          </p>

          <nav aria-label="Direct contact" className="space-y-4 text-[15px]">
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4" href="mailto:ehrl.balquin@gmail.com">ehrl.balquin@gmail.com</a><br />
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/ehrlbalquin">LinkedIn</a><br />
            <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer" href="https://github.com/ehrlbalquin">GitHub</a>
          </nav>

          {!!form.name.trim() && (
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[15px] opacity-80">Thanks, {firstName(form.name)}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-bg-primary">
        <div className="max-w-md mx-auto w-full">
          <form onSubmit={handleSubmit} noValidate className="space-y-10">
            {/* honeypot */}
            <input type="text" name="_hp" value={form._hp} onChange={(e) => setForm(p => ({ ...p, _hp: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden="true" />

            <div>
              <label htmlFor="name" className={`label ${currentField === 0 ? 'text-rose-taupe' : 'text-text-muted'}`}>Name</label>
              <input
                id="name" name="name" type="text" autoComplete="name"
                placeholder="Your name" required
                value={form.name}
                onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
                onFocus={() => setCurrentField(0)}
                className={`text-input ${currentField === 0 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
            </div>

            <div>
              <label htmlFor="email" className={`label ${currentField === 1 ? 'text-rose-taupe' : 'text-text-muted'}`}>Email</label>
              <input
                id="email" name="email" type="email" autoComplete="email"
                placeholder="you@email.com" required
                value={form.email}
                onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
                onFocus={() => setCurrentField(1)}
                className={`text-input ${currentField === 1 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
            </div>

            <div>
              <label htmlFor="message" className={`label ${currentField === 2 ? 'text-rose-taupe' : 'text-text-muted'}`}>Message</label>
              <textarea
                id="message" name="message" rows={4} placeholder="Tell me about your project…"
                required
                value={form.message}
                onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                onFocus={() => setCurrentField(2)}
                className={`text-area ${currentField === 2 ? 'border-rose-taupe' : 'border-border-light'}`}
              />
              <p className="mt-1 text-[12px] text-text-muted">Min 10 characters.</p>
            </div>

            <button type="submit" disabled={!complete || busy} className={`btn ${complete && !busy ? 'btn-primary' : 'btn-disabled btn-primary'}`}>
              {busy ? 'Sending…' : 'Send Message'} <span aria-hidden>→</span>
            </button>

            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status === 'success' && (
                <div className="mt-6 p-4 rounded-lg border border-rose-taupe bg-rose-taupe/10">
                  <p className="text-[15px] font-medium text-rose-taupe"> Message sent successfully! I’ll get back to you soon.</p>
                </div>
              )}
              {status === 'error' && (
                <div className="mt-6 p-4 rounded-lg border border-red-600 bg-red-600/10">
                  <p className="text-[15px] font-medium text-red-600">✗ Something went wrong. Please try again or email me directly.</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
