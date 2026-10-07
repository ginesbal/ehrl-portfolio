'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import FloatingCircles from '../ui/FloatingCircles.jsx'

const EMAIL = 'ehrlbalquin@gmail.com'

const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ehrlbalquin' },
  { label: 'GitHub', href: 'https://github.com/ginesbal' },
]

// The same rules the API applies (app/api/contact/route.js), on trimmed values.
// Each returns what's wrong in words, or null.
const rules = {
  name: (v) => (!v ? 'Please enter your name.' : v.length < 2 ? 'Your name needs at least 2 characters.' : null),
  email: (v, el) => (!v ? 'Please enter your email.' : el.validity.typeMismatch ? 'That email address looks incomplete.' : null),
  message: (v) => (!v ? 'Please write a message.' : v.length < 10 ? 'A little more detail, please (10+ characters).' : null),
}
const check = (el) => rules[el.name](el.value.trim(), el)

function Field({ id, label, error, rows, ...props }) {
  const Tag = rows ? 'textarea' : 'input'
  return (
    <div className="group">
      <label
        htmlFor={id}
        className="block text-[11px] font-semibold tracking-[0.2em] uppercase mb-2 text-text-muted transition-colors group-focus-within:text-rose-taupe"
      >
        {label}
      </label>
      <div className="relative">
        <Tag
          id={id}
          name={id}
          rows={rows}
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="peer w-full px-0 py-2 text-[16px] text-text-primary bg-transparent border-0 border-b-2 border-border-medium focus:outline-none resize-none aria-[invalid=true]:border-[var(--danger)]"
          {...props}
        />
        {/* the focus indicator: a 2px rose underline, 5.5:1 on the page */}
        <span
          aria-hidden
          className="absolute left-0 bottom-0 h-[2px] w-full bg-rose-taupe origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-expo)] peer-focus:scale-x-100"
        />
      </div>
      {error && (
        <p id={`${id}-error`} className="text-[13px] mt-2 text-[var(--danger)]">
          {error}
        </p>
      )}
    </div>
  )
}

export default function Contact() {
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)
  const [errors, setErrors] = useState({})
  const statusRef = useRef(null)

  // Errors appear once a filled-in field is left, or on submit, and update as you type.
  const handleBlur = (e) => {
    if (rules[e.target.name] && e.target.value) setErrors((prev) => ({ ...prev, [e.target.name]: check(e.target) }))
  }
  const handleInput = (e) => {
    if (errors[e.target.name]) setErrors((prev) => ({ ...prev, [e.target.name]: check(e.target) }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = Object.fromEntries(new FormData(formEl))
    if (data._hp) return

    const fields = Object.keys(rules).map((name) => formEl.elements[name])
    const found = Object.fromEntries(fields.map((el) => [el.name, check(el)]))
    // render the messages first, so the focused field is announced with its error
    flushSync(() => setErrors(found))
    const firstInvalid = fields.find((el) => found[el.name])
    if (firstInvalid) {
      firstInvalid.focus()
      return
    }

    setBusy(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          subject: 'Portfolio Contact Form',
          message: data.message.trim(),
        }),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) formEl.reset()
    } catch {
      setStatus('error')
    } finally {
      setBusy(false)
      statusRef.current?.focus()
    }
  }

  return (
    <section className="relative overflow-hidden flex flex-col md:flex-row">
      <FloatingCircles section="contact" />

      {/* left - dark panel */}
      <div className="w-full md:w-1/2 px-5 py-10 md:px-10 md:py-12 lg:px-12 lg:py-16 flex flex-col bg-bg-dark text-text-light">
        <motion.h2
          className="mb-8 md:mb-12 font-serif text-[clamp(2.5rem,6.5vw,5rem)] font-normal tracking-[-0.01em] leading-[0.98]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Let&apos;s <span className="italic">talk</span>
        </motion.h2>

        <motion.dl
          className="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-6 md:gap-y-8 max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="col-span-2 md:col-span-1">
            <dt className="text-[11px] tracking-[0.2em] uppercase text-text-light/60 mb-2">Email</dt>
            <dd>
              <a href={`mailto:${EMAIL}`} className="text-[17px] hover:text-rose-taupe">{EMAIL}</a>
            </dd>
          </div>
          <div>
            <dt className="text-[11px] tracking-[0.2em] uppercase text-text-light/60 mb-2">Social</dt>
            <dd className="flex flex-col gap-1">
              {links.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[17px] hover:text-rose-taupe">
                  {label}
                </a>
              ))}
            </dd>
          </div>
          <div className="md:pt-6 md:border-t md:border-text-light/10">
            <dt className="text-[11px] tracking-[0.2em] uppercase text-text-light/60 mb-2">Based in</dt>
            <dd className="text-[15px]">Calgary, AB</dd>
          </div>
        </motion.dl>
      </div>

      {/* right - form */}
      <div className="w-full md:w-1/2 px-5 py-10 md:px-12 md:py-12 lg:px-16 flex flex-col md:justify-center bg-bg-primary">
        <motion.form
          noValidate
          onSubmit={handleSubmit}
          onBlur={handleBlur}
          onInput={handleInput}
          className="max-w-md mx-auto w-full space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <Field id="name" label="Name" autoComplete="name" error={errors.name} />
          <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <Field id="message" label="Message" rows={4} error={errors.message} />

          <button
            type="submit"
            disabled={busy}
            className="w-full min-h-[48px] flex items-center justify-center text-[13px] font-semibold tracking-[0.2em] uppercase bg-rose-taupe text-text-light hover:bg-[var(--powder-blush-700)] active:scale-[0.98] transition-[background-color,transform] duration-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {busy ? 'Sending…' : 'Send'}
          </button>

          <div ref={statusRef} tabIndex={-1} aria-live="polite" className="focus:outline-none text-[14px]">
            {status === 'success' && <p className="text-text-primary">Message sent. I&apos;ll get back to you soon.</p>}
            {status === 'error' && (
              <p className="text-text-secondary">
                That didn&apos;t go through. You can email me directly at{' '}
                <a href={`mailto:${EMAIL}`} className="text-rose-taupe underline underline-offset-4">{EMAIL}</a>.
              </p>
            )}
          </div>
        </motion.form>
      </div>
    </section>
  )
}
