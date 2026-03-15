'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)

function InputField({ id, label, type = 'text', value, onChange, focused, onFocus, onBlur, rows, autoComplete }) {
  const isTextarea = !!rows
  const Tag = isTextarea ? 'textarea' : 'input'
  const isFocused = focused === id

  // validation states
  const showNameError = id === 'name' && value.length > 0 && !value.trim()
  const showEmailError = id === 'email' && value.length > 0 && !isEmail(value.trim())
  const showMessageError = id === 'message' && value.trim().length > 0 && value.trim().length < 10

  // helper text for each field
  const getHelperText = () => {
    if (id === 'name' && !value) return 'Your full name'
    if (id === 'email' && !value) return 'Your email address'
    if (id === 'message' && !value) return 'Tell me about your project or inquiry'
    return null
  }

  const helperText = getHelperText()

  return (
    <div>
      <motion.label
        htmlFor={id}
        className="block text-[11px] font-semibold tracking-[0.2em] uppercase mb-3"
        animate={{ color: isFocused ? 'var(--rose-taupe)' : 'var(--text-muted)' }}
      >
        {label}
      </motion.label>
      <div className="relative">
        <Tag
          id={id}
          name={id}
          type={type}
          autoComplete={autoComplete}
          rows={rows}
          required
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full px-0 py-3 text-[16px] bg-transparent border-b-2 transition-colors duration-200 outline-none resize-none"
          style={{ borderBottomColor: isFocused ? 'transparent' : 'var(--border-light)' }}
        />
        {isFocused && (
          <motion.div
            className="absolute left-0 bottom-0 h-[2px] bg-rose-taupe"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.3 }}
          />
        )}
      </div>
      {helperText && isFocused && (
        <p className="text-[12px] text-text-muted mt-2 italic">{helperText}</p>
      )}
      {showNameError && <p className="text-[12px] text-text-muted mt-2">Name is required</p>}
      {showEmailError && <p className="text-[12px] text-text-muted mt-2">Valid email required</p>}
      {showMessageError && (
        <p className="text-[12px] text-text-muted mt-2">
          {10 - value.trim().length} more characters needed
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', _hp: '' })
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null) // 'success' | 'error' | null
  const statusRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus(null)

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (form._hp || !name || !isEmail(email) || message.length < 10) {
      setStatus('error')
      statusRef.current?.focus()
      return
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
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
      statusRef.current?.focus()
    }
  }

  const complete = form.name.trim() && isEmail(form.email.trim()) && form.message.trim().length >= 10

<<<<<<< Updated upstream
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
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-[15px] opacity-80">Thanks, {firstName(form.name)}.</p>
            </div>
          </div>
        </motion.div>

        {/* mobile */}
        <motion.div
          className="md:hidden flex items-center gap-4 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <a href="mailto:ehrlbalquin@gmail.com" className="text-[13px] opacity-70 hover:opacity-100 transition-opacity">
            ehrlbalquin@gmail.com
          </a>
          <span className="w-[1px] h-3 bg-white/20" />
          <a href="https://linkedin.com/in/ehrlbalquin" target="_blank" rel="noopener noreferrer" className="text-[13px] opacity-70 hover:opacity-100 transition-opacity">
            LinkedIn
          </a>
          <span className="w-[1px] h-3 bg-white/20" />
          <a href="https://github.com/ginesbal" target="_blank" rel="noopener noreferrer" className="text-[13px] opacity-70 hover:opacity-100 transition-opacity">
            GitHub
          </a>
        </motion.div>
      </div>

      {/* Right form */}
      <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center bg-bg-primary">
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
=======
      {/* right - form */}
      <div className="w-full md:w-1/2 px-6 py-8 md:p-12 lg:p-16 flex flex-col md:justify-center bg-bg-primary">
        <div className="max-w-md mx-auto w-full">
          {/* mobile: section context above form */}
          <motion.div
            className="md:hidden mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-[0.2em] uppercase text-text-muted">Send a message</p>
              <p className="text-[10px] tracking-[0.2em] text-text-muted">Calgary, AB</p>
            </div>
            <div className="h-[1px] bg-border-light mt-3" />
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-6 md:space-y-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <input type="text" name="_hp" value={form._hp} onChange={(e) => setForm(p => ({ ...p, _hp: e.target.value }))} className="hidden" tabIndex={-1} aria-hidden="true" />

            <InputField
              id="name"
              label="Name"
              value={form.name}
              onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
              focused={focusedField}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              autoComplete="name"
            />

            <InputField
              id="email"
              label="Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))}
              focused={focusedField}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              autoComplete="email"
            />

            <InputField
              id="message"
              label="Message"
              value={form.message}
              onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
              focused={focusedField}
              onFocus={() => setFocusedField('message')}
              onBlur={() => setFocusedField(null)}
              rows={5}
            />

            <button
              type="submit"
              disabled={!complete || busy}
              className={`w-full min-h-[48px] flex items-center justify-center text-[13px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 ${
                complete && !busy
                  ? 'bg-rose-taupe text-white hover:bg-opacity-90'
                  : 'bg-border-light text-text-muted cursor-not-allowed'
              }`}
            >
              {busy ? 'Sending' : 'Send'}
>>>>>>> Stashed changes
            </button>

            {!complete && (
              <p className="text-[12px] text-text-muted text-center">
                Fill all fields to send message
              </p>
            )}

            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
<<<<<<< Updated upstream
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
=======
              {status === 'success' && <p className="text-[14px] text-rose-taupe">Sent. I'll reply soon.</p>}
              {status === 'error' && <p className="text-[14px] text-text-muted">Error. Try emailing directly.</p>}
>>>>>>> Stashed changes
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}