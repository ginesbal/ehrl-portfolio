async (page) => {
  const warnings = []
  page.on('console', message => { if (message.text().includes('GL_INVALID_FRAMEBUFFER_OPERATION')) warnings.push(message.text()) })
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://127.0.0.1:3100/#about')
  await page.waitForFunction(() => document.querySelector('[aria-label="Interact with the 3D avatar"]')?.getAttribute('aria-busy') === 'false')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForFunction(() => document.querySelectorAll('canvas').length === 0)
  await page.waitForTimeout(400)
  if (warnings.length) throw new Error(`Hidden avatar caused ${warnings.length} WebGL warnings`)
  return { desktopToMobile: 'avatar unmounted', webglWarnings: warnings.length }
}
