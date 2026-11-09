import assert from 'node:assert/strict'
import test from 'node:test'
import { createAvatarInteraction } from './avatar-interaction.js'

const IDLE_MS = 42000
const NAP_MS = 45000
const AMBIENT_WAVE_MS = 11000

class Events {
    listeners = new Map()
    addEventListener(name, listener) {
        if (!this.listeners.has(name)) this.listeners.set(name, new Set())
        this.listeners.get(name).add(listener)
    }
    removeEventListener(name, listener) { this.listeners.get(name)?.delete(listener) }
    dispatch(name, props = {}) {
        const event = { button: 0, pointerType: 'mouse', preventDefault() {}, ...props }
        for (const listener of this.listeners.get(name) || []) listener(event)
    }
    get listenerCount() { return [...this.listeners.values()].reduce((sum, listeners) => sum + listeners.size, 0) }
}

function setup(t, initiallyReduced = false, random = () => 0) {
    const element = new Events()
    element.getBoundingClientRect = () => ({ left: 10, top: 20, width: 300, height: 300 })
    const media = new Events()
    media.matches = initiallyReduced
    const page = new Events()
    page.hidden = false
    const browser = new Events()
    browser.matchMedia = () => media
    const frames = new Map()
    const timers = new Map()
    let sequence = 0
    let now = 0
    const schedule = (callback, delay = 0) => {
        // Timer deadlines use integer milliseconds while the animation clock can be fractional.
        timers.set(++sequence, { callback, at: Math.floor(now) + Math.max(0, Math.floor(delay)) })
        return sequence
    }
    const unschedule = id => timers.delete(id)
    const raf = callback => { frames.set(++sequence, callback); return sequence }
    const caf = id => frames.delete(id)
    Object.assign(browser, { setTimeout: schedule, clearTimeout: unschedule, requestAnimationFrame: raf, cancelAnimationFrame: caf })
    const globals = { window: browser, document: page, performance: { now: () => now }, requestAnimationFrame: raf, cancelAnimationFrame: caf, setTimeout: schedule, clearTimeout: unschedule }
    const descriptors = Object.fromEntries(Object.keys(globals).map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
    for (const [key, value] of Object.entries(globals)) Object.defineProperty(globalThis, key, { configurable: true, writable: true, value })
    const part = (id, position, rotation, scale = { x: 1, y: 1, z: 1 }) => ({ id, position, rotation, scale })
    const rig = {
        body: part('body', { x: -33.72, y: -754.03, z: -1007.32 }, { x: 0, y: 0, z: -4.37 }, { x: 1.67, y: 1.88, z: 1.57 }),
        eyeLeft: part('left', { x: 89.13, y: 178.55, z: 177.58 }, { x: 0, y: 0, z: 0 }, { x: 0.64, y: 0.64, z: 0.64 }),
        eyeRight: part('right', { x: -83.53, y: 180.65, z: 177.58 }, { x: 0, y: 0, z: 0 }, { x: 0.64, y: 0.64, z: 0.64 }),
        head: part('head', { x: 0, y: 332.52, z: -29 }, { x: -2.36, y: -3.18, z: 0 }),
        armWave: part('armWave', { x: 177.47, y: 292.14, z: 59.12 }, { x: -100.18, y: 80.27, z: 6.39 }, { x: 0.75, y: 0.75, z: 0.68 }),
        armOther: part('armOther', { x: -184.97, y: 272.72, z: 57.87 }, { x: -100.32, y: 80, z: 12.7 }, { x: 1, y: 0.75, z: 0.75 }),
    }
    const poses = new Map(Object.values(rig).map(({ id, ...pose }) => [id, structuredClone(pose)]))
    const reactions = []
    const sleeps = []
    let writes = 0
    let stopped = 0
    const controllerFactory = (0, eval)(`(${createAvatarInteraction.toString()})`)
    const controller = controllerFactory(element, rig, {
        write: (id, props) => { Object.assign(poses.get(id), structuredClone(props)); writes++ },
        onReaction: message => reactions.push(message),
        onSleepChange: sleeping => sleeps.push(sleeping),
        stop: () => stopped++,
        random,
    })
    t.after(() => {
        controller.dispose()
        for (const [key, descriptor] of Object.entries(descriptors)) {
            if (descriptor) Object.defineProperty(globalThis, key, descriptor)
            else delete globalThis[key]
        }
    })
    function step(milliseconds = 16) {
        now += milliseconds
        for (let count = 0; count < 1000; count++) {
            const due = [...timers.entries()].find(([, timer]) => timer.at <= now)
            if (!due) break
            timers.delete(due[0])
            due[1].callback()
            assert.notEqual(count, 999, 'a timer rearmed endlessly without advancing time')
        }
        const callbacks = [...frames.values()]
        frames.clear()
        callbacks.forEach(callback => callback(now))
    }
    function advance(milliseconds) {
        for (let remaining = milliseconds; remaining > 0;) {
            const duration = Math.min(16, remaining)
            step(duration)
            remaining -= duration
        }
    }
    function assertRest() {
        for (const { id, ...pose } of Object.values(rig)) assert.deepEqual(poses.get(id), pose)
    }
    function assertWorkingArm(arm) {
        for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(poses.get(arm).rotation[axis] - rig[arm].rotation[axis]) < 18, `${arm} should stay near its typing ${axis} pose`)
    }
    function assertRaisedArm(arm) {
        assert.ok(Math.abs(poses.get(arm).rotation.z - rig[arm].rotation.z) > 65, `${arm} should lift above the shoulder`)
    }
    return { element, media, page, browser, frames, timers, rig, poses, reactions, sleeps, controller, step, advance, assertRest, assertWorkingArm, assertRaisedArm, get now() { return now }, get writes() { return writes }, get stopped() { return stopped } }
}

test('fractional activity times do not cause an early or endlessly rearmed sleep timer', t => {
    const f = setup(t)
    f.step(0.25)
    f.element.dispatch('click')
    f.step(IDLE_MS - 0.25)
    assert.deepEqual(f.sleeps, [], 'the fractional deadline has not elapsed')
    f.step(1)
    assert.deepEqual(f.sleeps, [true])
})

test('hover blinks and tracks while the character keeps typing', t => {
    const f = setup(t)
    f.element.dispatch('pointerenter')
    f.element.dispatch('pointermove', { clientX: 310, clientY: 320 })
    f.advance(112)
    assert.ok(f.poses.get('left').scale.y < f.rig.eyeLeft.scale.y, 'both eyes blink on arrival')
    assert.equal(f.poses.get('left').scale.y, f.poses.get('right').scale.y)
    f.advance(1000)
    assert.ok(f.poses.get('left').scale.y > f.rig.eyeLeft.scale.y)
    assert.ok(f.poses.get('body').rotation.y > 6)
    const typing = structuredClone(f.poses.get('armOther'))
    f.advance(150)
    assert.notDeepEqual(f.poses.get('armOther'), typing, 'typing should continue while awake')
    f.element.dispatch('pointerleave')
    assert.ok(f.poses.get('body').rotation.y > 0, 'pointer leave should ease, not snap')
    f.advance(1200)
    assert.ok(Math.abs(f.poses.get('body').rotation.y) < 0.01)
})

test('separated clicks alternate hands and return them to typing', t => {
    const f = setup(t)
    for (const arm of ['armWave', 'armOther', 'armWave']) {
        f.element.dispatch('click')
        f.advance(650)
        f.assertRaisedArm(arm)
        f.assertWorkingArm(arm === 'armWave' ? 'armOther' : 'armWave')
        f.advance(1600)
        f.assertWorkingArm('armWave')
        f.assertWorkingArm('armOther')
    }
})

test('three quick activations make the avatar shake its head and squint, then settle', t => {
    const f = setup(t)
    for (let click = 0; click < 3; click++) {
        f.element.dispatch('click')
        if (click < 2) f.advance(200)
    }
    assert.equal(f.frames.size, 1, 'rapid clicks must share one animation clock')
    const yaw = []
    const narrowedEyes = []
    for (let sample = 0; sample < 12; sample++) {
        f.advance(64)
        yaw.push(f.poses.get('head').rotation.y)
        narrowedEyes.push(f.poses.get('left').scale.y < f.rig.eyeLeft.scale.y * 0.75 && f.poses.get('right').scale.y < f.rig.eyeRight.scale.y * 0.75)
    }
    assert.ok(Math.max(...yaw) - Math.min(...yaw) > 10, 'the third quick click should cause a visible head shake')
    assert.ok(narrowedEyes.includes(true), 'annoyance should narrow both eyes')
    f.advance(1500)
    f.assertWorkingArm('armWave')
    f.assertWorkingArm('armOther')
    assert.ok(f.poses.get('left').scale.y > f.rig.eyeLeft.scale.y * 0.9, 'the squint should settle')
})

test('one ambient wave follows eleven uninterrupted idle seconds without delaying sleep', t => {
    const f = setup(t)
    f.step(10000)
    f.element.dispatch('pointermove', { clientX: 150, clientY: 150 })
    f.step(1650)
    f.assertWorkingArm('armOther')
    f.step(AMBIENT_WAVE_MS - 1651)
    f.assertWorkingArm('armOther')
    f.step(1)
    f.advance(650)
    f.assertRaisedArm('armOther')
    f.assertWorkingArm('armWave')
    f.advance(1600)
    f.assertWorkingArm('armOther')
    f.step(IDLE_MS - AMBIENT_WAVE_MS - 2251)
    assert.notEqual(f.sleeps.at(-1), true)
    f.step(1)
    assert.equal(f.sleeps.at(-1), true, 'an ambient wave should not count as user activity')
})

test('sleep begins at forty-two idle seconds and active interaction resets that deadline', t => {
    const f = setup(t)
    f.step(IDLE_MS - 1)
    assert.notEqual(f.sleeps.at(-1), true, 'the avatar must stay awake before forty-two seconds')
    f.step(1)
    assert.equal(f.sleeps.at(-1), true, 'sleep should begin at forty-two seconds')
    f.advance(1800)
    assert.ok(f.poses.get('left').scale.y < f.rig.eyeLeft.scale.y * 0.25, 'sleep closes the eyes')
    assert.equal(f.poses.get('left').scale.y, f.poses.get('right').scale.y)
    assert.ok(f.poses.get('head').rotation.x > f.rig.head.rotation.x + 6, 'sleep should droop the head')
    const restingArm = structuredClone(f.poses.get('armOther'))
    f.advance(240)
    for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(f.poses.get('armOther').rotation[axis] - restingArm.rotation[axis]) < 0.5, 'typing must stop during sleep')
    f.element.dispatch('click')
    assert.equal(f.sleeps.at(-1), false)
    f.step(15000)
    f.element.dispatch('pointermove', { clientX: 200, clientY: 100 })
    f.step(IDLE_MS - 1)
    assert.equal(f.sleeps.at(-1), false, 'recent pointer activity should reset the idle deadline')
    f.step(1)
    assert.equal(f.sleeps.at(-1), true)
})

function assertStartled(f) {
    const yaw = []
    const widenedEyes = []
    for (let sample = 0; sample < 14; sample++) {
        f.advance(64)
        yaw.push(f.poses.get('head').rotation.y)
        widenedEyes.push(f.poses.get('left').scale.y > f.rig.eyeLeft.scale.y * 1.15 && f.poses.get('right').scale.y > f.rig.eyeRight.scale.y * 1.15)
    }
    assert.ok(widenedEyes.includes(true), 'waking should visibly widen both eyes')
    assert.ok(Math.max(...yaw) - Math.min(...yaw) > 10, 'the startled avatar should look from side to side')
}

test('the earliest random wake is after 45 seconds, then the avatar startles awake and starts a fresh idle interval', t => {
    const f = setup(t)
    f.step(IDLE_MS)
    f.advance(NAP_MS - 1)
    assert.deepEqual(f.sleeps, [true])
    f.step(1)
    assert.deepEqual(f.sleeps, [true, false])
    const wokeAt = f.now
    assertStartled(f)
    f.advance(900)
    const typing = structuredClone(f.poses.get('armOther'))
    f.advance(180)
    assert.notDeepEqual(f.poses.get('armOther'), typing, 'typing should resume after automatic wake')
    f.step(IDLE_MS - (f.now - wokeAt) - 1)
    assert.deepEqual(f.sleeps, [true, false], 'a second nap should wait for a fresh idle interval')
    f.step(1)
    assert.deepEqual(f.sleeps, [true, false, true])
})

test('sleep survives hover and focus; the first click wakes and resumes work', t => {
    const f = setup(t)
    f.step(IDLE_MS)
    f.advance(1800)
    for (const event of ['pointerenter', 'pointermove', 'pointerleave', 'focus', 'blur']) {
        f.element.dispatch(event, { clientX: 150, clientY: 150 })
        f.advance(32)
        assert.equal(f.sleeps.at(-1), true, `${event} must not wake the character`)
    }
    f.element.dispatch('click')
    assert.equal(f.sleeps.at(-1), false)
    assertStartled(f)
    f.assertWorkingArm('armWave')
    f.assertWorkingArm('armOther')
    f.advance(900)
    const typing = structuredClone(f.poses.get('armOther'))
    f.advance(180)
    assert.notDeepEqual(f.poses.get('armOther'), typing, 'waking must resume typing')
})

test('keyboard activation ignores repeat, cancels on blur and wakes with Enter or Space', t => {
    const f = setup(t)
    f.element.dispatch('focus')
    const initial = f.reactions.filter(Boolean).length
    f.element.dispatch('keydown', { key: ' ' })
    f.element.dispatch('keydown', { key: ' ', repeat: true })
    assert.equal(f.reactions.filter(Boolean).length, initial)
    f.element.dispatch('keyup', { key: ' ' })
    f.element.dispatch('keyup', { key: ' ' })
    assert.equal(f.reactions.filter(Boolean).length, initial + 1)
    f.element.dispatch('keydown', { key: 'Enter' })
    f.element.dispatch('blur')
    f.element.dispatch('keyup', { key: 'Enter' })
    assert.equal(f.reactions.filter(Boolean).length, initial + 1, 'blur must cancel a held key')
    for (const key of ['Enter', ' ']) {
        f.step(IDLE_MS)
        assert.equal(f.sleeps.at(-1), true)
        f.element.dispatch('keydown', { key })
        assert.equal(f.sleeps.at(-1), true)
        f.element.dispatch('keyup', { key })
        assert.equal(f.sleeps.at(-1), false, `${key} should wake the character`)
    }
})

test('hidden idle time counts and the full nap plays after the tab returns', t => {
    const f = setup(t)
    f.page.hidden = true
    f.page.dispatch('visibilitychange')
    assert.equal(f.frames.size, 0, 'hidden pages should pause the animation loop')
    f.step(IDLE_MS + NAP_MS + 1000)
    assert.equal(f.frames.size, 0)
    f.page.hidden = false
    f.page.dispatch('visibilitychange')
    f.step(0)
    assert.equal(f.sleeps.at(-1), true, 'returning after the idle deadline should show a nap')
    f.step(NAP_MS - 1)
    assert.equal(f.sleeps.at(-1), true, 'the visible nap should last for its full duration')
    f.step(1)
    assert.equal(f.sleeps.at(-1), false)
})

test('reduced motion keeps static sleep and wake feedback without continuing animation frames', t => {
    const f = setup(t, true)
    f.step()
    assert.ok(f.stopped >= 1, 'authored loops must be stopped')
    assert.equal(f.frames.size, 0)
    f.element.dispatch('click')
    f.step()
    assert.ok(f.reactions.at(-1))
    assert.equal(f.frames.size, 0, 'reduced motion must not animate a wave')
    f.step(IDLE_MS)
    f.step()
    assert.equal(f.sleeps.at(-1), true)
    assert.ok(f.poses.get('left').scale.y < f.rig.eyeLeft.scale.y * 0.25)
    assert.equal(f.frames.size, 0, 'sleep breathing must be static with reduced motion')
    f.element.dispatch('pointerenter')
    f.element.dispatch('click')
    f.step()
    assert.equal(f.sleeps.at(-1), false)
    assert.equal(f.frames.size, 0)
    f.media.matches = false
    f.media.dispatch('change')
    f.step()
    assert.equal(f.frames.size, 1, 'normal-motion typing should resume')
})

test('disposal clears timers, frames, listeners and driven transforms', t => {
    const f = setup(t)
    f.step(IDLE_MS)
    f.advance(700)
    f.controller.dispose()
    f.assertRest()
    const writes = f.writes
    f.controller.dispose()
    f.element.dispatch('click')
    f.browser.dispatch('blur')
    f.media.dispatch('change')
    f.step(120000)
    assert.equal(f.writes, writes)
    assert.equal(f.frames.size, 0)
    assert.equal(f.timers.size, 0)
    for (const events of [f.element, f.media, f.browser, f.page]) assert.equal(events.listenerCount, 0)
})


test('most rapid click bursts are not annoyed, and annoyance rolls are rate limited', t => {
    let rolls = 0
    const f = setup(t, false, () => { rolls++; return 0.8 })
    for (let i = 0; i < 15; i++) { f.element.dispatch('click'); f.advance(100) }
    // one roll picks the first tap's reaction, one decides annoyance for the whole burst
    assert.equal(rolls, 2, 'continuous clicks get only one annoyance chance per cooldown')
    assert.ok(!f.reactions.includes('Hey, let me finish this!'))
    f.advance(31000)
    for (let i = 0; i < 3; i++) { f.element.dispatch('click'); f.advance(100) }
    assert.equal(rolls, 4)
})

test('random wake checks can leave the avatar asleep, but clicking always wakes it', t => {
    const f = setup(t, false, () => 0.9)
    f.step(IDLE_MS)
    f.step(85500)
    assert.deepEqual(f.sleeps, [true], 'failed wake chance keeps the nap going')
    f.step(38000)
    assert.deepEqual(f.sleeps, [true], 'later failed check also keeps sleeping')
    f.element.dispatch('click')
    assert.deepEqual(f.sleeps, [true, false])
})

test('heavy eyelids struggle before sleep and user activity restores alertness', t => {
    const f = setup(t)
    f.advance(36000)
    const lids = []
    for (let i = 0; i < 20; i++) { f.advance(200); lids.push(f.poses.get('left').scale.y) }
    assert.deepEqual(f.sleeps, [], 'drowsiness precedes actual sleep')
    assert.ok(Math.min(...lids) < f.rig.eyeLeft.scale.y * 0.45)
    assert.ok(Math.max(...lids) - Math.min(...lids) > 0.1, 'eyelids attempt to reopen')
    f.element.dispatch('pointermove', { clientX: 150, clientY: 150 })
    f.advance(1000)
    assert.ok(f.poses.get('left').scale.y > f.rig.eyeLeft.scale.y)
    assert.deepEqual(f.sleeps, [])
})


test('rapid clicks do not restart, swap hands, or queue another wave', t => {
    const rolls = [0, 0.9] // the first tap waves, the burst is not annoyed, later taps wave again
    const f = setup(t, false, () => rolls.length ? rolls.shift() : 0)
    f.element.dispatch('click')
    f.advance(650)
    f.assertRaisedArm('armWave')
    for (let i = 0; i < 20; i++) {
        f.element.dispatch('click')
        f.advance(100)
        f.assertWorkingArm('armOther')
    }
    f.assertWorkingArm('armWave')
    f.advance(800)
    f.element.dispatch('click')
    f.advance(650)
    f.assertRaisedArm('armOther')
})

test('some taps get a "mm-hm" nod instead of a wave, and both hands keep typing', t => {
    const f = setup(t, false, () => 0.6)
    f.element.dispatch('click')
    const pitch = []
    for (let i = 0; i < 12; i++) {
        f.advance(80)
        pitch.push(f.poses.get('head').rotation.x - f.rig.head.rotation.x)
        f.assertWorkingArm('armWave')
        f.assertWorkingArm('armOther')
    }
    assert.ok(Math.max(...pitch) > 5, 'the head should dip in a nod')
    assert.equal(f.reactions.at(-1), 'Mm-hm, hi!')
})

test('some taps get a curious head tilt instead of a wave', t => {
    const f = setup(t, false, () => 0.9)
    f.element.dispatch('click')
    const roll = []
    for (let i = 0; i < 14; i++) {
        f.advance(80)
        roll.push(f.poses.get('head').rotation.z - f.rig.head.rotation.z)
        f.assertWorkingArm('armWave')
        f.assertWorkingArm('armOther')
    }
    assert.ok(Math.max(...roll) > 6, 'the head should tilt')
})

test('taps never squash the figure', t => {
    const f = setup(t, false, () => 0.6)
    for (let i = 0; i < 12; i++) {
        f.element.dispatch('pointerdown')
        f.element.dispatch('click')
        f.advance(90)
        assert.deepEqual(f.poses.get('body').scale, f.rig.body.scale, 'the body keeps its scale while awake')
    }
})

test('the avatar follows the cursor only some of the time: it looks, loses interest, then glances back', t => {
    const f = setup(t)
    f.element.dispatch('pointerenter')
    f.element.dispatch('pointermove', { clientX: 310, clientY: 170 })
    const yaw = []
    for (let i = 0; i < 80; i++) { f.advance(100); yaw.push(f.poses.get('body').rotation.y - f.rig.body.rotation.y) }
    assert.ok(yaw.slice(0, 14).some(v => v > 5), 'it notices the cursor at first')
    assert.ok(yaw.slice(20, 34).every(v => Math.abs(v) < 1), 'then it goes back to work for a while')
    assert.ok(yaw.slice(40).some(v => v > 5), 'and later glances back')
})
