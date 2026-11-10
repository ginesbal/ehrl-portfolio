async page => page.evaluate(() => ({
  time: performance.now(),
  text: document.querySelector('[aria-live]')?.textContent,
  sleeping: !document.querySelector('[data-avatar-sleep-effects]')?.hidden,
  reduced: matchMedia('(prefers-reduced-motion: reduce)').matches,
  hidden: document.hidden,
}))
