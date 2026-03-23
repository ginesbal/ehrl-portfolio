'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import FloatingCircles from '../ui/FloatingCircles.jsx'

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
          className="w-full px-0 py-2 text-[16px] bg-transparent border-b-2 transition-colors duration-200 outline-none resize-none"
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
  const [status, setStatus] = useState(null)
  const [focusedField, setFocusedField] = useState(null)
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

  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row">
      <FloatingCircles section="contact" />

      {/* left - dark panel */}
      <div className="w-full md:w-1/2 px-2 pt-2 pb-0 md:px-10 md:pt-4 md:pb-1 lg:px-12 lg:pt-6 lg:pb-2 flex flex-col bg-bg-dark text-text-light">
        <motion.div
          className="mb-4 md:mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-[11px] tracking-[0.3em] uppercase opacity-60">04</span>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
          <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.1]">
            Let's talk
          </h2>
        </motion.div>

        {/* desktop: full contact info */}
        <motion.div
          className="hidden md:flex flex-col max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="space-y-6">
            <div>
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-3">Email</p>
              <a href="mailto:ehrlbalquin@gmail.com" className="text-[17px] hover:text-rose-taupe transition-colors block">
                ehrlbalquin@gmail.com
              </a>
            </div>

            <div className="pt-10">
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-3">Social</p>
              <div className="space-y-2">
                <a href="https://linkedin.com/in/ehrlbalquin" target="_blank" rel="noopener noreferrer" className="text-[17px] hover:text-rose-taupe transition-colors block">
                  LinkedIn
                </a>
                <a href="https://github.com/ginesbal" target="_blank" rel="noopener noreferrer" className="text-[17px] hover:text-rose-taupe transition-colors block">
                  GitHub
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-white/10">
              <p className="text-[11px] tracking-[0.2em] uppercase opacity-50 mb-2">Based in</p>
              <p className="text-[15px]">Calgary, AB</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* right - form */}
      <div className="w-full md:w-1/2 px-6 pt-10 pb-0 md:px-12 md:pt-6 md:pb-2 lg:px-16 lg:pt-8 lg:pb-3 flex flex-col md:justify-center bg-bg-primary">
        <div className="max-w-md mx-auto w-full">
          {/* mobile: section context above form */}
          <motion.div
            className="md:hidden mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4 md:space-y-5"
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
              rows={4}
            />

            <button
              type="submit"
              disabled={!complete || busy}
              className={`w-full min-h-[48px] flex items-center justify-center text-[13px] font-semibold tracking-[0.2em] uppercase transition-all duration-200 ${complete && !busy
                ? 'bg-rose-taupe text-white hover:bg-opacity-90'
                : 'bg-border-light text-text-muted cursor-not-allowed'
                }`}
            >
              {busy ? 'Sending' : 'Send'}
            </button>

            {!complete && (
              <p className="text-[12px] text-text-muted text-center">
                Fill all fields to send message
              </p>
            )}

            <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
              {status === 'success' && <p className="text-[14px] text-rose-taupe">Sent. I'll reply soon.</p>}
              {status === 'error' && <p className="text-[14px] text-text-muted">Error. Try emailing directly.</p>}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
