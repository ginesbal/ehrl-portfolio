// Self-contained so Spline and the portfolio use the same sleeping effects.
export function createAvatarSleepOverlay(element, options = {}) {
    const root = document.createElement('div')
    root.setAttribute('data-avatar-sleep-effects', '')
    root.setAttribute('aria-hidden', 'true')
    root.hidden = true
    root.innerHTML = `
        <style>
            [data-avatar-sleep-effects] { position: absolute; inset: 0; pointer-events: none; z-index: 1; }
            [data-avatar-sleep-effects][hidden] { display: none !important; }
            [data-avatar-sleep-effects] .avatar-sleep-anchor { position: absolute; width: 0; height: 0; }
            [data-avatar-sleep-effects] .avatar-nose-bubble {
                position: absolute; left: 1px; bottom: 1px; width: 24px; height: 28px;
                border: 1.2px solid rgba(151, 177, 183, .85); border-radius: 52% 52% 52% 13%;
                background: radial-gradient(circle at 29% 25%, rgba(255,255,255,.9) 0 7%, rgba(232,246,248,.55) 14%, rgba(209,232,235,.3) 62%, rgba(247,252,252,.65) 100%);
                box-shadow: inset -2px -2px 3px rgba(160,190,196,.18);
                opacity: 0; transform-origin: 0 100%;
                animation: avatar-sleep-bubble 2.8s ease-in-out infinite, avatar-sleep-reveal 1.8s ease-out 4s forwards;
            }
            [data-avatar-sleep-effects] .avatar-bubble-burst { display: none; }
            [data-avatar-sleep-effects][data-state="popping"] .avatar-nose-bubble {
                animation: avatar-bubble-pop 280ms ease-out both;
            }
            [data-avatar-sleep-effects][data-state="popping"] .avatar-bubble-burst {
                display: block; position: absolute; left: -6px; bottom: -3px; width: 42px; height: 42px;
                background:
                    radial-gradient(circle at 35% 8%, #89a4a9 1.6px, transparent 2.1px),
                    radial-gradient(circle at 79% 14%, #89a4a9 1.5px, transparent 2px),
                    radial-gradient(circle at 92% 48%, #89a4a9 1.8px, transparent 2.3px),
                    radial-gradient(circle at 73% 86%, #89a4a9 1.5px, transparent 2px),
                    radial-gradient(circle at 12% 44%, #89a4a9 1.5px, transparent 2px);
                animation: avatar-bubble-burst 280ms ease-out both;
            }
            [data-avatar-sleep-effects][data-state="popping"] .avatar-zzz { display: none; }
            [data-avatar-sleep-effects] .avatar-zzz { position: absolute; left: -84px; bottom: 86px; width: 80px; height: 76px; color: #62574d; opacity: 0; animation: avatar-sleep-reveal 1.4s ease-out 1.8s forwards; }
            [data-avatar-sleep-effects] .avatar-zzz span { position: absolute; font: 700 18px/1.1 system-ui, sans-serif; animation: avatar-sleep-z 3.6s ease-in-out infinite; }
            [data-avatar-sleep-effects] .avatar-zzz span:nth-child(1) { left: 42px; bottom: 0; }
            [data-avatar-sleep-effects] .avatar-zzz span:nth-child(2) { left: 18px; bottom: 19px; font-size: 23px; animation-delay: -.9s; }
            [data-avatar-sleep-effects] .avatar-zzz span:nth-child(3) { left: -6px; bottom: 40px; font-size: 28px; animation-delay: -1.8s; }
            @keyframes avatar-sleep-reveal { from { opacity: 0; } to { opacity: 1; } }
            @keyframes avatar-sleep-bubble { 0%, 100% { transform: rotate(18deg) scale(.62); } 50% { transform: rotate(18deg) scale(1.06); } }
            @keyframes avatar-bubble-pop {
                0% { transform: var(--avatar-bubble-pop-start); opacity: 1; }
                36% { transform: rotate(18deg) scale(1.24); opacity: .88; }
                100% { transform: rotate(18deg) scale(1.36); opacity: 0; }
            }
            @keyframes avatar-bubble-burst {
                0%, 25% { transform: scale(.52); opacity: 0; }
                42% { transform: scale(.9); opacity: .9; }
                100% { transform: scale(1.35); opacity: 0; }
            }
            @keyframes avatar-sleep-z { 0%, 100% { opacity: .22; transform: translate(0, 3px); } 50% { opacity: .85; transform: translate(3px, -5px); } }
            @media (prefers-reduced-motion: reduce) {
                [data-avatar-sleep-effects] .avatar-nose-bubble { animation: none; opacity: 1; transform: rotate(18deg) scale(.8); }
                [data-avatar-sleep-effects] .avatar-zzz { animation: none; opacity: 1; }
                [data-avatar-sleep-effects] .avatar-zzz span { animation: none; opacity: .7; transform: none; }
                [data-avatar-sleep-effects][data-state="popping"] { display: none; }
            }
        </style>
        <div class="avatar-sleep-anchor">
            <span class="avatar-nose-bubble"></span>
            <span class="avatar-bubble-burst"></span>
            <span class="avatar-zzz"><span>z</span><span>z</span><span>Z</span></span>
        </div>`
    const anchor = root.querySelector('.avatar-sleep-anchor')
    const bubble = root.querySelector('.avatar-nose-bubble')
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let sleeping = false
    let sleepStarted = 0
    let popTimer
    function hide() {
        root.hidden = true
        delete root.dataset.state
    }
    anchor.style.left = `${options.anchor?.x ?? 50}%`
    anchor.style.top = `${options.anchor?.y ?? 47}%`
    element.appendChild(root)
    return {
        setSleeping(nextSleeping) {
            if (sleeping === nextSleeping) return
            sleeping = nextSleeping
            window.clearTimeout(popTimer)
            if (sleeping) {
                sleepStarted = performance.now()
                root.dataset.state = 'sleeping'
                root.hidden = false
                return
            }
            if (reducedMotion.matches || performance.now() - sleepStarted < 4000) {
                hide()
                return
            }
            bubble.style.setProperty('--avatar-bubble-pop-start', window.getComputedStyle(bubble).transform)
            root.dataset.state = 'popping'
            popTimer = window.setTimeout(hide, 280)
        },
        dispose() {
            window.clearTimeout(popTimer)
            root.remove()
        },
    }
}
