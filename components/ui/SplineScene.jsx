// spline 3d scene wrapper (load via next/dynamic with ssr: false; wrap it in an ErrorBoundary)
'use client'

import Spline from '@splinetool/react-spline'
import { useEffect, useId, useRef, useState } from 'react'
import { createAvatarInteraction } from '../../lib/avatar-interaction'
import { createAvatarSleepOverlay } from '../../lib/avatar-sleep-overlay'

// How far the scene is zoomed in; the sleep overlay scales by the same amount so it stays matched to the face.
const ZOOM = 1.45

export default function SplineScene({ sceneUrl, className = '' }) {
    const instructionsId = useId()
    const [status, setStatus] = useState('loading')
    const [greeting, setGreeting] = useState('')
    const element = useRef(null)
    const stage = useRef(null)
    const controller = useRef(null)
    const sleepEffects = useRef(null)
    const mounted = useRef(true)

    useEffect(() => {
        mounted.current = true
        // The stage is composed for the full-size 368px circle; scale it to whatever the circle measures now.
        const host = element.current
        const fit = new ResizeObserver(([entry]) => host.style.setProperty('--avatar-scale', entry.contentRect.width / 368))
        fit.observe(host)
        return () => {
            mounted.current = false
            fit.disconnect()
            controller.current?.dispose()
            sleepEffects.current?.dispose()
            controller.current = null
            sleepEffects.current = null
        }
    }, [])

    function onLoad(app) {
        if (!mounted.current) return
        controller.current?.dispose()
        sleepEffects.current?.dispose()
        const ids = {
            body: 'b324783e-c3f3-4cd2-b50b-f556af630453',
            eyeLeft: '54789fc3-eed2-45c8-a0f5-5ddbdeda107c',
            eyeRight: '33765741-a6b4-478c-a8d0-1af953c133dc',
            head: '06ed846b-3963-452f-92cb-368d411cc783',
            armWave: '8194fd3a-a3d6-4085-9a7b-d652c8483fb3',
            armOther: '87f68afd-c3d5-4791-9e2f-62c355db3bf9',
        }
        const objects = {}
        const rig = {}
        for (const [key, id] of Object.entries(ids)) {
            const object = app.findObjectById(id)
            if (!object) continue
            objects[id] = object
            rig[key] = {
                id,
                position: { x: object.position.x, y: object.position.y, z: object.position.z },
                rotation: { x: object.rotation.x * 180 / Math.PI, y: object.rotation.y * 180 / Math.PI, z: object.rotation.z * 180 / Math.PI },
                scale: { x: object.scale.x, y: object.scale.y, z: object.scale.z },
            }
        }
        // Render the same view into a bigger canvas: a sharp zoom, unlike setZoom (an orbit dolly) or a CSS scale (blurry).
        // The canvas is still display:none here, so read the frame size from the style the runtime wrote.
        const size = (parseFloat(app.canvas.style.width) || 500) * ZOOM
        app.setSize(size, size)
        app.canvas.style.width = app.canvas.style.height = `${size}px`
        // Anchor = the nose tip on the 368px stage.
        sleepEffects.current = createAvatarSleepOverlay(stage.current, { anchor: { x: 52.8, y: 70.7 } })
        // One controller owns the typing, waving, and sleeping poses.
        controller.current = createAvatarInteraction(element.current, rig, {
            write(id, props) {
                const object = objects[id]
                if (props.position) Object.assign(object.position, props.position)
                if (props.scale) Object.assign(object.scale, props.scale)
                if (props.rotation) {
                    for (const axis of ['x', 'y', 'z']) object.rotation[axis] = props.rotation[axis] * Math.PI / 180
                }
            },
            render: () => app.requestRender(),
            stop: () => app.stop(),
            onReaction: setGreeting,
            onSleepChange(isSleeping) {
                sleepEffects.current?.setSleeping(isSleeping)
            },
        })
        setStatus('ready')
    }

    return (
        <div
            ref={element}
            role="button"
            tabIndex={status === 'ready' ? 0 : -1}
            aria-label="Interact with the 3D avatar"
            aria-describedby={instructionsId}
            aria-busy={status === 'loading'}
            aria-disabled={status !== 'ready'}
            className={`relative w-full h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rose-taupe ${status === 'ready' ? 'cursor-pointer' : ''} ${className}`}
            style={{ touchAction: 'pan-y pinch-zoom' }}
        >
            {status === 'loading' && (
                <p className="absolute inset-0 grid place-items-center text-[13px] text-text-muted">Loading…</p>
            )}
            {/* The runtime pins the canvas to the scene's 500px frame: center it on the stage, then drop it 69px so the zoomed figure sits low with the desk near the rim. */}
            <div ref={stage} style={{ '--avatar-zoom': ZOOM }} className="absolute left-1/2 top-1/2 size-[368px] -translate-x-1/2 -translate-y-1/2 scale-[var(--avatar-scale,1)] [&_canvas]:absolute [&_canvas]:left-1/2 [&_canvas]:top-1/2 [&_canvas]:-translate-x-1/2 [&_canvas]:translate-y-[calc(-50%_+_69px)] [&_.avatar-sleep-anchor]:scale-[var(--avatar-zoom)]">
                {/* The scene ships its own copy of the avatar controller for Spline-hosted pages; this page runs lib/avatar-interaction instead. */}
                <Spline scene={sceneUrl} htmlContentMode="none" onLoad={onLoad} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />
            </div>
            <span id={instructionsId} className="sr-only">Move your pointer to look around. Click or press Enter or Space to wave hello. The avatar alternates hands and occasionally reacts to rapid clicks. With no interaction, it gradually gets sleepy and takes a nap. It may wake on its own. Click or press Enter or Space to wake it sooner.</span>
            <span className="sr-only" aria-live="polite">{greeting}</span>
        </div>
    )
}
