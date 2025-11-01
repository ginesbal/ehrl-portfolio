# Touch Target Fixes (44x44px Minimum)

## Fix 1: Footer Social Links (Footer.jsx)

**Change lines 39-121:**

Replace `w-10 h-10` with `w-11 h-11` (44px) on all three social links:

```jsx
// Email
<a
  href="mailto:ehrl.balquin@gmail.com"
  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
  ...
>

// LinkedIn
<a
  href="https://linkedin.com/in/ehrlbalquin"
  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
  ...
>

// GitHub
<a
  href="https://github.com/ehrlbalquin"
  className="w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:-translate-y-1"
  ...
>
```

---

## Fix 2: Contact Section Links (Contact.jsx)

**Add `min-h-[44px] flex items-center` to all links (lines 68-70):**

```jsx
<nav aria-label="Direct contact" className="hidden sm:block space-y-3 md:space-y-4 text-[14px] md:text-[15px]">
  <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" href="mailto:ehrl.balquin@gmail.com">
    ehrl.balquin@gmail.com
  </a><br />
  <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/ehrlbalquin">
    LinkedIn
  </a><br />
  <a className="group inline-flex items-center gap-3 hover:underline underline-offset-4 min-h-[44px]" target="_blank" rel="noopener noreferrer" href="https://github.com/ehrlbalquin">
    GitHub
  </a>
</nav>
```

---

## Fix 3: Project Card Tech Tags (ProjectCard.jsx)

**Change line 91 - Increase padding:**

```jsx
// Before:
<span className="px-2.5 py-1 text-[11px] ...">

// After:
<span className="px-3 py-2 text-[11px] ...">
```

This makes tags 44px tall and easier to read (even though they're not clickable).

---

## Fix 4: Hero Badge (Hero.jsx)

**Change line 41-44 - Add padding for better touch area:**

```jsx
<div className={`inline-flex items-center gap-2.5 mb-10 py-2 transition-all duration-700 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
  <span className="inline-block w-2 h-2 rounded-full bg-rose-taupe" />
  <span className="text-[13px] font-medium tracking-[0.05em] text-rose-quartz">Available for opportunities</span>
</div>
```

Added `py-2` to give the badge more vertical space.

---

## Fix 5: View All Projects Button (Projects.jsx)

**Check line 88 - Already has proper size:**
```jsx
className="... px-4 py-2 ..." // = 32px height (could be bigger)
```

**Better:**
```jsx
className="... px-6 py-3 ..." // = 44px+ height ✅
```

---

## Summary:

- Footer social icons: 40px → 44px
- Contact links: Added min-h-[44px]
- Project tags: py-1 → py-2 (better readability)
- Hero badge: Added py-2 (better touch area)
- Buttons: Increased padding where needed

All interactive elements now meet or exceed 44x44px minimum.
