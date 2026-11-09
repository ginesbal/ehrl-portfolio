import assert from 'node:assert/strict'
import test from 'node:test'
import { watchArrival } from './punctuation.js'

function setup(t) {
    let now = 0
    let observe = null
    const timers = new Map()
    const scrollers = new Set()
    let id = 0
    const saved = { IntersectionObserver: globalThis.IntersectionObserver, window: globalThis.window, setTimeout: globalThis.setTimeout, clearTimeout: globalThis.clearTimeout }
    Object.assign(globalThis, {
        IntersectionObserver: class { constructor(callback) { observe = callback } observe() {} disconnect() { observe = null } },
        window: { addEventListener: (_, fn) => scrollers.add(fn), removeEventListener: (_, fn) => scrollers.delete(fn) },
        setTimeout: (fn, ms) => { timers.set(++id, { fn, at: now + ms }); return id },
        clearTimeout: key => timers.delete(key),
    })
    t.after(() => Object.assign(globalThis, saved))
    const arrivals = []
    const stop = watchArrival({}, () => arrivals.push(now))
    return {
        arrivals, stop, scrollers,
        enter: () => observe?.([{ isIntersecting: true }]),
        leave: () => observe?.([{ isIntersecting: false }]),
        scroll: () => scrollers.forEach(fn => fn()),
        tick(ms) {
            now += ms
            for (const [key, timer] of [...timers]) if (timer.at <= now) { timers.delete(key); timer.fn() }
        },
    }
}

test('an arrival waits for scrolling to pause, fires once per visit, and re-arms after leaving', t => {
    const f = setup(t)
    f.enter()
    for (let i = 0; i < 5; i++) { f.tick(100); f.scroll() }
    assert.deepEqual(f.arrivals, [], 'still scrolling: no arrival yet')
    f.tick(180)
    assert.deepEqual(f.arrivals, [680], 'arrives 180ms after the last scroll')
    f.scroll(); f.tick(500)
    assert.equal(f.arrivals.length, 1, 'resting inside the band does not arrive again')
    f.leave(); f.enter(); f.tick(180)
    assert.equal(f.arrivals.length, 2, 'coming back counts as a new arrival')
})

test('passing through without stopping never arrives, and stop() removes every hook', t => {
    const f = setup(t)
    f.enter(); f.tick(100); f.leave(); f.tick(1000)
    assert.deepEqual(f.arrivals, [])
    f.stop()
    assert.equal(f.scrollers.size, 0)
})
