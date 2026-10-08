'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import { EMAIL_PATTERN, LIMITS } from '@/lib/contact'
import FloatingCircles from '../ui/FloatingCircles.jsx'

const EMAIL = 'ehrlbalquin@gmail.com'

const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ehrlbalquin' },
  { label: 'GitHub', href: 'https://github.com/ginesbal' },
]

// The API's own rules (lib/contact.js) on trimmed values. Each returns what's wrong in words, or null.
const rules = {
  name: (v) => (!v ? 'Please enter your name.' : v.length < LIMITS.name.min ? `Your name needs at least ${LIMITS.name.min} characters.` : null),
  email: (v) =>
    !v ? 'Please enter your email.'
      : v.length > LIMITS.email.max ? 'That email address is too long.'
        : !EMAIL_PATTERN.test(v) ? 'Enter a full email address, like name@example.com.'
          : null,
  message: (v) => (!v ? 'Please write a message.' : v.length < LIMITS.message.min ? `A little more detail, please (${LIMITS.message.min}+ characters).` : null),
}
const check = (el) => rules[el.name](el.value.trim())

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
          className="peer block w-full px-0 py-2 text-[16px] text-text-primary bg-transparent border-0 border-b-2 border-border-medium focus:outline-none resize-none aria-[invalid=true]:border-[var(--danger)]"
          {...props}
        />
        {/* the focus indicator: a rose underline, 5.5:1 on the page and heavier than the 2px resting line */}
        <span
          aria-hidden
          className="absolute left-0 bottom-0 h-[3px] w-full bg-rose-taupe origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-expo)] peer-focus:scale-x-100"
        />
      </div>
      {/* the line is always there, so an error appearing never moves what's below (a click on Send can't miss) */}
      <p id={`${id}-error`} className="min-h-[18px] mt-1 text-[13px] leading-[18px] text-[var(--danger)]">
        {error}
      </p>
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
    if (busy) return
    const formEl = e.currentTarget
    const data = Object.fromEntries(new FormData(formEl))
    if (data._hp) return

    const fields = Object.keys(rules).map((name) => formEl.elements[name])
    const found = Object.fromEntries(fields.map((el) => [el.name, check(el)]))
    // render the messages (and drop an earlier result) first, so the focused field is read with its error
    flushSync(() => {
      setErrors(found)
      setStatus(null)
    })
    const firstInvalid = fields.find((el) => found[el.name])
    if (firstInvalid) {
      // focus() on the field that already has focus does nothing, so blur it first to have it read again
      if (firstInvalid === document.activeElement) firstInvalid.blur()
      firstInvalid.focus()
      return
    }

    setBusy(true)
    let result = 'error'
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
      if (res.ok) {
        result = 'success'
        formEl.reset()
      }
    } catch {
      // network failure: result stays 'error'
    }
    // render the outcome before moving focus to it, so the focus lands on the message, not an empty region
    flushSync(() => {
      setStatus(result)
      setBusy(false)
    })
    statusRef.current?.focus()
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
          className="max-w-md mx-auto w-full space-y-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <Field id="name" label="Name" autoComplete="name" maxLength={LIMITS.name.max} error={errors.name} />
          <Field id="email" label="Email" type="email" autoComplete="email" error={errors.email} />
          <Field id="message" label="Message" rows={4} maxLength={LIMITS.message.max} error={errors.message} />

          {/* aria-disabled, not disabled: a disabled button drops keyboard focus to the page while sending */}
          <button
            type="submit"
            aria-disabled={busy || undefined}
            className="w-full min-h-[48px] flex items-center justify-center text-[13px] font-semibold tracking-[0.2em] uppercase bg-rose-taupe text-text-light hover:bg-[var(--powder-blush-700)] active:scale-[0.98] transition-[background-color,transform] duration-200 aria-disabled:opacity-60 aria-disabled:cursor-wait"
          >
            {busy ? 'Sending…' : 'Send'}
          </button>

          <div ref={statusRef} tabIndex={-1} aria-live="polite" className="!mt-4 focus:outline-none text-[14px]">
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
