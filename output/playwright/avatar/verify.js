async (page) => {
  const assert = (condition, message) => { if (!condition) throw new Error(message) }
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('http://127.0.0.1:3100/#about')
  const avatar = page.getByRole('button', { name: 'Interact with the 3D avatar' })
  await avatar.waitFor({ state: 'visible' })
  await page.waitForFunction(() => document.querySelector('[aria-label="Interact with the 3D avatar"]')?.getAttribute('aria-busy') === 'false')
  await avatar.scrollIntoViewIfNeeded()
  await page.waitForTimeout(850)
  const canvas = avatar.locator('canvas')
  assert(await canvas.isVisible(), 'Avatar canvas did not load')
  assert(await avatar.getAttribute('tabindex') === '0', 'Avatar is not keyboard focusable')
  await page.mouse.move(0, 0)
  await page.waitForTimeout(800)
  await avatar.screenshot({ path: 'output/playwright/avatar/rest.png' })

  const bounds = await avatar.boundingBox()
  await page.mouse.move(bounds.x + bounds.width * 0.82, bounds.y + bounds.height * 0.4)
  await page.waitForTimeout(350)
  await avatar.screenshot({ path: 'output/playwright/avatar/attentive.png' })
  const hintFits = await avatar.evaluate(element => {
    const hint = element.querySelector('[aria-hidden="true"]')
    const circle = element.getBoundingClientRect()
    const text = hint.getBoundingClientRect()
    const radius = circle.width / 2
    return [[text.left, text.top], [text.right, text.top], [text.left, text.bottom], [text.right, text.bottom]]
      .every(([x, y]) => Math.hypot(x - circle.left - radius, y - circle.top - radius) <= radius + 2)
  })
  assert(hintFits, 'The interaction hint is clipped by the circle')
  const expected = ['Hey! Nice to meet you.', 'You made my day.', 'A wink, just for you.']
  for (let index = 0; index < expected.length; index++) {
    await avatar.click()
    await page.waitForTimeout(index === 2 ? 390 : 250)
    assert(await avatar.locator('[aria-live]').textContent() === expected[index], 'Click reaction did not cycle')
    await avatar.screenshot({ path: `output/playwright/avatar/${['nod', 'sway', 'wink'][index]}.png` })
  }

  await avatar.focus()
  await page.keyboard.press('Enter')
  assert(await avatar.locator('[aria-live]').textContent() === expected[0], 'Enter activation failed')
  await page.keyboard.press('Space')
  assert(await avatar.locator('[aria-live]').textContent() === expected[1], 'Space activation failed')
  await page.mouse.move(0, 0)
  await avatar.evaluate(element => element.blur())
  assert(await avatar.locator('[aria-live]').textContent() === '', 'Leaving did not clear the reaction')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.waitForTimeout(250)
  const restingCanvas = await canvas.evaluate(element => element.toDataURL())
  await avatar.hover()
  await avatar.click()
  await page.waitForTimeout(350)
  const reducedCanvas = await canvas.evaluate(element => element.toDataURL())
  assert(restingCanvas === reducedCanvas, 'Reduced motion did not freeze the avatar')
  assert(await avatar.locator('[aria-live]').textContent() === expected[2], 'Reduced-motion text feedback failed')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.waitForTimeout(300)
  assert(await canvas.isVisible(), 'Avatar failed to resume')

  await page.setViewportSize({ width: 390, height: 844 })
  await page.reload()
  await page.waitForTimeout(450)
  assert(await page.locator('canvas').count() === 0, 'Desktop avatar was loaded on mobile')
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Mobile overflow')
  assert(errors.length === 0, `Browser errors: ${errors.join('; ')}`)
  console.log(JSON.stringify({ canvas: 'loaded', hover: 'passed', clicks: 'nod, sway, wink', keyboard: 'Enter and Space passed', reducedMotion: 'frozen pose and text feedback passed', hint: 'fits circle', mobile: 'no canvas or overflow', errors }))
}
