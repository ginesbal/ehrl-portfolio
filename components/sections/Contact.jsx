'use client'

import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import FloatingCircles from '../ui/FloatingCircles.jsx'

const EMAIL = 'ehrlbalquin@gmail.com'

const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ehrlbalquin' },
  { label: 'GitHub', href: 'https://github.com/ginesbal' },
]

// Validation is native (required / type / minLength). :user-invalid only matches
// after someone has interacted with the field, so errors never shout on first paint.
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
          aria-describedby={`${id}-error`}
          className="peer w-full px-0 py-2 text-[16px] text-text-primary bg-transparent border-0 border-b-2 border-border-medium outline-none resize-none [&:user-invalid]:border-[var(--danger)]"
          {...props}
        />
        <span
          aria-hidden
          className="absolute left-0 bottom-0 h-[2px] w-full bg-rose-taupe origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-out-expo)] peer-focus:scale-x-100"
        />
        <p id={`${id}-error`} className="hidden peer-[:user-invalid]:block text-[13px] mt-2 text-[var(--danger)]">
          {error}
        </p>
      </div>
    </div>
  )
}

export default function Contact() {
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState(null)
  const statusRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formEl = e.currentTarget
    const data = Object.fromEntries(new FormData(formEl))
    if (data._hp) return

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
          onSubmit={handleSubmit}
          className="max-w-md mx-auto w-full space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <input type="text" name="_hp" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

          <Field id="name" label="Name" autoComplete="name" minLength={2} pattern=".*\S.*\S.*" error="Please enter your name." />
          <Field id="email" label="Email" type="email" autoComplete="email" error="Please enter a valid email address." />
          <Field id="message" label="Message" rows={4} minLength={10} error="A little more detail, please (10+ characters)." />

          <button
            type="submit"
            disabled={busy}
            className="w-full min-h-[48px] flex items-center justify-center text-[13px] font-semibold tracking-[0.2em] uppercase bg-rose-taupe text-text-light hover:bg-[var(--powder-blush-700)] active:scale-[0.98] transition-[background-color,transform] duration-200 disabled:opacity-60 disabled:cursor-wait"
          >
            {busy ? 'Sending…' : 'Send'}
          </button>

          <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none text-[14px]">
            {status === 'success' && <p className="text-rose-taupe">Message sent. I&apos;ll get back to you soon.</p>}
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
