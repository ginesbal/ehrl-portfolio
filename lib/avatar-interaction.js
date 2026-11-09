// Self-contained so the same controller can run in Spline's HTML overlay.
export function createAvatarInteraction(element, rig, adapter) {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const parts = Object.fromEntries(Object.entries(rig).filter(([, part]) => part).map(([key, part]) => [key, {
        id: part.id,
        position: { ...part.position },
        rotation: { ...part.rotation },
        scale: { ...part.scale },
    }]))
    const drowsyAfter = 30_000
    const idleLength = 42_000
    const random = adapter.random || Math.random
    const idleWaveDelay = 11_000
    const gestureLengths = { wave: 1_700, nod: 1_100, tilt: 1_400, startled: 1_900, annoyed: 1_250 }
    const tapReactions = { wave: 'Hey! Nice to see you.', nod: 'Mm-hm, hi!', tilt: 'Hmm? Oh, hi there.' }
    const zero = () => ({
        x: 0, y: 0, attention: 0, sleep: 0, drowsy: 0, nod: 0, tilt: 0,
        armWave: 0, armOther: 0, surprise: 0, scan: 0, annoyance: 0, shake: 0,
    })
    const clamp = value => Math.max(0, Math.min(1, value))
    const ease = value => { const p = clamp(value); return p * p * (3 - 2 * p) }
    const began = performance.now()
    let lastActivity = began
    let sleepStarted = began
    let wakeCheck = Infinity
    let annoyanceEligible = began
    let typingTime = 0
    let target = zero()
    let current = zero()
    let frame = 0
    let phaseTimer = 0
    let previous = began
    let gesture = null
    let nextHand = 'armWave'
    let idleWavePlayed = false
    let recentClicks = []
    let lastClick = -Infinity
    let blinkStarted = null
    let heldKey = null
    // The cursor only holds its attention for a while: it looks, loses interest, works, then glances back.
    const pointer = { x: 0, y: 0 }
    let hovering = false
    let lookUntil = 0
    let restUntil = 0
    let sleeping = false
    let disposed = false
    let reduced = media.matches

    function restore() {
        for (const part of Object.values(parts)) {
            adapter.write(part.id, { position: { ...part.position }, rotation: { ...part.rotation }, scale: { ...part.scale } })
        }
        adapter.render?.()
    }

    function gesturePose(now, goal) {
        if (!gesture) return
        const progress = (now - gesture.started) / gestureLengths[gesture.kind]
        if (progress >= 1) {
            if (gesture.kind !== 'wave') adapter.onReaction?.('')
            gesture = null
            return
        }
        if (gesture.kind === 'wave') {
            goal[gesture.hand] = Math.min(ease(progress / 0.22), ease((1 - progress) / 0.24))
        } else if (gesture.kind === 'nod') {
            // two small dips: "mm-hm"
            goal.nod = Math.sin(progress * Math.PI * 2) ** 2 * ease(progress / 0.12) * ease((1 - progress) / 0.25)
        } else if (gesture.kind === 'tilt') {
            goal.tilt = ease(progress / 0.25) * ease((1 - progress) / 0.35)
        } else if (gesture.kind === 'startled') {
            goal.surprise = ease(progress / 0.07) * ease((1 - progress) / 0.36)
            goal.scan = Math.sin(clamp((progress - 0.10) / 0.72) * Math.PI * 2) * goal.surprise
        } else {
            goal.annoyance = ease(progress / 0.13) * ease((1 - progress) / 0.36)
            goal.shake = Math.sin(progress * Math.PI * 5) * goal.annoyance
        }
    }

    function paint(now, still = false) {
        const t = (now - began) / 1000
        const asleep = current.sleep
        const tired = current.drowsy
        const droop = tired * (0.52 + 0.44 * (0.5 - 0.5 * Math.cos(Math.max(0, now - lastActivity - drowsyAfter) / 1000 * 2.1)))
        const work = still ? 0 : (1 - asleep) * (1 - tired * 0.7) * (1 - Math.max(current.surprise * 0.9, current.annoyance * 0.65))
        const breathing = still ? 0 : Math.sin((now - sleepStarted) / 1000 * 1.7) * asleep
        const waveSwing = Math.sin(t * 16) * 9
        let blink = 0
        if (blinkStarted !== null && !still) {
            const p = clamp((now - blinkStarted) / 240)
            blink = Math.sin(Math.PI * p) ** 2
            if (p === 1) blinkStarted = null
        }
        const body = parts.body
        if (body) {
            adapter.write(body.id, {
                rotation: {
                    x: body.rotation.x + current.y * 2.2 - current.attention * 1.2 + asleep * 2.4 + breathing * 0.25 - current.surprise * 3 + current.annoyance * 3.5,
                    y: body.rotation.y + current.x * 8,
                    z: body.rotation.z - current.x * 1.3 + current.attention * 0.9 - asleep * 1.5 + current.shake * 2,
                },
                // only sleep breathing changes the scale; taps never squash the figure
                scale: { x: body.scale.x, y: body.scale.y * (1 + breathing * 0.003), z: body.scale.z },
            })
        }
        const head = parts.head
        if (head) {
            adapter.write(head.id, {
                rotation: {
                    x: head.rotation.x + Math.sin(t * 1.25) * 1.4 * work + current.y * 1.5 + droop * 8 * (1 - asleep) + asleep * 13 + breathing * 0.5 - current.surprise * 11 + current.annoyance * 4 + current.nod * 9,
                    y: head.rotation.y + Math.sin(t * 0.8) * work + current.x * 4 + current.scan * 21 + current.shake * 12,
                    z: head.rotation.z - asleep * 4 + (current.armWave - current.armOther) * 2 + current.scan * 4 - current.annoyance * 5 + current.tilt * 11,
                },
            })
        }
        for (const [key, phase] of [['armWave', 0], ['armOther', 2.2]]) {
            const arm = parts[key]
            if (!arm) continue
            const typing = {
                x: arm.rotation.x + Math.sin(typingTime * 10 + phase) * 3 * work,
                y: arm.rotation.y + Math.sin(typingTime * 8.5 + phase) * 0.7 * work,
                z: arm.rotation.z + Math.sin(typingTime * 9 + phase) * 0.35 * work,
            }
            const side = key === 'armWave' ? 1 : -1
            const lift = current[key]
            typing.x += (-12 - typing.x) * lift
            typing.y += (6 * side - typing.y) * lift
            typing.z += ((150 + waveSwing) * side - typing.z) * lift
            adapter.write(arm.id, { rotation: typing })
        }
        for (const key of ['eyeLeft', 'eyeRight']) {
            const eye = parts[key]
            if (!eye) continue
            const browTilt = key === 'eyeLeft' ? 1 : -1
            const eyeOpening = 1 + current.attention * 0.42 - blink * 1.34 + current.tilt * 0.22 - current.nod * 0.25
                + current.surprise * 1.05 - current.annoyance * 0.66 - droop
            adapter.write(eye.id, {
                position: {
                    x: eye.position.x + current.x * 2.4 + current.scan * 5,
                    y: eye.position.y - current.y * 1.4 + current.attention * 0.65 + current.surprise * 4,
                    z: eye.position.z,
                },
                rotation: { ...eye.rotation, z: eye.rotation.z + browTilt * current.annoyance * 17 },
                scale: {
                    x: eye.scale.x * (1 + current.attention * 0.025),
                    y: eye.scale.y * Math.max(0.08, eyeOpening * (1 - asleep) + 0.08 * asleep),
                    z: eye.scale.z,
                },
            })
        }
        adapter.render?.()
    }

    function follow(now) {
        if (now < lookUntil) {
            target.x = pointer.x
            target.y = pointer.y
            return
        }
        if (lookUntil) {
            // lost interest: back to the laptop for a while
            lookUntil = 0
            restUntil = now + 2_200 + random() * 3_800
            target.x = target.y = target.attention = 0
        } else if (now >= restUntil) {
            lookUntil = now + 1_400 + random() * 2_600
            target.attention = 1
        }
    }

    function draw(now) {
        frame = 0
        if (disposed || reduced || document.hidden) return
        if (hovering && !sleeping) follow(now)
        if (!sleeping && !gesture && !idleWavePlayed && now - lastActivity >= idleWaveDelay && now - lastActivity < drowsyAfter) {
            idleWavePlayed = true
            gesture = { kind: 'wave', hand: 'armOther', started: now }
        }
        const goal = { ...target }
        goal.drowsy = sleeping ? 0 : ease((now - lastActivity - drowsyAfter) / (idleLength - drowsyAfter))
        goal.attention *= 1 - goal.drowsy
        gesturePose(now, goal)
        const elapsed = Math.min(64, Math.max(0, now - previous))
        previous = now
        typingTime += elapsed / 1000 * (1 - current.drowsy * 0.85) * (1 - current.sleep)
        for (const key of Object.keys(current)) {
            const difference = goal[key] - current[key]
            const responseTime = key === 'sleep' ? (sleeping ? 420 : 115) : 80
            current[key] = Math.abs(difference) < 0.0001
                ? goal[key]
                : current[key] + difference * (1 - Math.exp(-elapsed / responseTime))
        }
        paint(now)
        frame = requestAnimationFrame(draw)
    }

    function start() {
        if (disposed || document.hidden) return
        if (reduced) {
            current = { ...zero(), sleep: sleeping ? 1 : 0 }
            paint(performance.now(), true)
        } else if (!frame) {
            previous = performance.now()
            frame = requestAnimationFrame(draw)
        }
    }

    function schedulePhase() {
        clearTimeout(phaseTimer)
        phaseTimer = 0
        if (disposed || document.hidden) return
        const deadline = sleeping ? wakeCheck : lastActivity + idleLength
        phaseTimer = setTimeout(() => {
            phaseTimer = 0
            if (performance.now() < deadline) schedulePhase()
            else if (sleeping) {
                if (random() < 0.2) wake()
                else {
                    wakeCheck = performance.now() + 20_000 + random() * 20_000
                    schedulePhase()
                }
            }
            else fallAsleep()
        }, Math.max(1, Math.ceil(deadline - performance.now())))
    }

    function activity() {
        if (sleeping) return
        lastActivity = performance.now()
        idleWavePlayed = false
        schedulePhase()
    }

    function fallAsleep() {
        if (disposed || sleeping) return
        sleeping = true
        sleepStarted = performance.now()
        wakeCheck = sleepStarted + 45_000 + random() * 45_000
        target = { ...zero(), sleep: 1 }
        gesture = blinkStarted = heldKey = null
        adapter.onSleepChange?.(true)
        adapter.onReaction?.('Taking a little nap. Click to wake me.')
        schedulePhase()
        start()
    }

    function wake() {
        sleeping = false
        target = zero()
        recentClicks = []
        blinkStarted = null
        gesture = reduced ? null : { kind: 'startled', started: performance.now() }
        adapter.onSleepChange?.(false)
        adapter.onReaction?.(reduced ? 'Back to typing.' : 'Huh? Where am I?')
        activity()
        start()
    }

    function resetPointer() {
        target = { ...zero(), sleep: sleeping ? 1 : 0 }
        blinkStarted = null
        heldKey = null
        if (!sleeping && gesture?.kind !== 'startled' && gesture?.kind !== 'annoyed') adapter.onReaction?.('')
        start()
    }

    function attend(blink = false) {
        if (sleeping) return
        activity()
        target.attention = 1
        if (blink && !reduced) blinkStarted = performance.now()
        start()
    }

    function activate() {
        if (disposed) return
        if (sleeping) {
            wake()
            return
        }
        const now = performance.now()
        const freshClick = now - lastClick > 700
        lastClick = now
        recentClicks = recentClicks.filter(time => now - time <= 1_200).slice(-2)
        recentClicks.push(now)
        const rapidBurst = recentClicks.length >= 3 && now >= annoyanceEligible
        if (rapidBurst) annoyanceEligible = now + 30_000
        if (rapidBurst && random() < 0.15) {
            target.attention = 0
            blinkStarted = null
            if (!reduced && gesture?.kind !== 'annoyed') gesture = { kind: 'annoyed', started: now }
            adapter.onReaction?.('Hey, let me finish this!')
        } else if (!gesture && freshClick) {
            // not every tap gets a wave: sometimes a "mm-hm" nod, sometimes a curious tilt
            const roll = random()
            const kind = roll < 0.55 ? 'wave' : roll < 0.8 ? 'nod' : 'tilt'
            target.attention = 1
            lookUntil = now + 2_600 // a tap earns its attention for a moment
            if (!reduced) gesture = kind === 'wave' ? { kind, hand: nextHand, started: now } : { kind, started: now }
            if (kind === 'wave') nextHand = nextHand === 'armWave' ? 'armOther' : 'armWave'
            adapter.onReaction?.(tapReactions[kind])
        }
        activity()
        start()
    }

    function leave() {
        hovering = false
        resetPointer()
    }

    const listeners = {
        pointerenter: event => {
            if (event.pointerType === 'touch') return
            hovering = true
            // it may notice the cursor straight away, or finish what it's typing first
            const now = performance.now()
            if (random() < 0.6) lookUntil = now + 1_400 + random() * 2_200
            else restUntil = now + 600 + random() * 1_600
            attend(true)
        },
        pointermove: event => {
            if (sleeping || event.pointerType === 'touch') return
            const rect = element.getBoundingClientRect()
            if (!rect.width || !rect.height) return
            pointer.x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1))
            pointer.y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1))
            attend()
        },
        pointerdown: event => {
            if (event.button !== 0 || sleeping) return
            attend()
        },
        pointerleave: leave,
        pointercancel: leave,
        focus: () => attend(true),
        blur: resetPointer,
        click: activate,
        keydown: event => {
            if (event.key !== 'Enter' && event.key !== ' ') return
            event.preventDefault()
            if (event.repeat) return
            heldKey = event.key
            if (!sleeping) attend()
        },
        keyup: event => {
            if (event.key !== heldKey) return
            event.preventDefault()
            heldKey = null
            activate()
        },
    }

    function syncMotion() {
        reduced = media.matches
        cancelAnimationFrame(frame)
        frame = 0
        target = { ...zero(), sleep: sleeping ? 1 : 0 }
        current = { ...target }
        gesture = blinkStarted = heldKey = null
        start()
    }

    function onVisibility() {
        cancelAnimationFrame(frame)
        frame = 0
        clearTimeout(phaseTimer)
        phaseTimer = 0
        resetPointer()
        if (document.hidden) return
        if (!sleeping && performance.now() - lastActivity >= idleLength) fallAsleep()
        else {
            if (sleeping) wakeCheck = Math.max(wakeCheck, performance.now() + 20_000)
            schedulePhase()
        }
    }

    // The controller owns head/shoulder motion so typing can yield to waving and sleep.
    adapter.stop?.()
    for (const [name, listener] of Object.entries(listeners)) element.addEventListener(name, listener)
    window.addEventListener('blur', resetPointer)
    document.addEventListener('visibilitychange', onVisibility)
    media.addEventListener('change', syncMotion)
    schedulePhase()
    syncMotion()

    return {
        dispose() {
            if (disposed) return
            disposed = true
            cancelAnimationFrame(frame)
            clearTimeout(phaseTimer)
            for (const [name, listener] of Object.entries(listeners)) element.removeEventListener(name, listener)
            window.removeEventListener('blur', resetPointer)
            document.removeEventListener('visibilitychange', onVisibility)
            media.removeEventListener('change', syncMotion)
            restore()
        },
    }
}
