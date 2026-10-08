'use client'

import { useEffect, useRef } from 'react'

// Native <dialog>: focus trap, Esc to close and an inert page come for free.
// Mount it to open it; onClose fires for Esc, backdrop clicks and dialog.close().
// Put close buttons in a <form method="dialog">: closing natively is what returns
// focus to the opener. Initial focus goes to the element marked data-autofocus.
export default function Dialog({ onClose, className = '', children, ...props }) {
    const ref = useRef(null)
    const pressOnBackdrop = useRef(false)

    useEffect(() => {
        const dialog = ref.current
        if (!dialog) return
        // the native attribute, so showModal focuses it directly (React's autoFocus runs too early)
        dialog.querySelector('[data-autofocus]')?.setAttribute('autofocus', '')
        dialog.showModal()
    }, [])

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            // close on a single click that both starts and ends on the backdrop: not on the second
            // click of the double-click that opened it, and not on a drag into or out of the dialog
            onPointerDown={(e) => { pressOnBackdrop.current = e.target === ref.current }}
            onPointerUp={(e) => { pressOnBackdrop.current &&= e.target === ref.current }}
            onClick={(e) => pressOnBackdrop.current && e.target === ref.current && e.detail <= 1 && ref.current.close()}
            className={`p-0 m-auto bg-transparent max-w-none max-h-none backdrop:bg-[rgb(19_18_16/0.82)] backdrop:backdrop-blur-sm ${className}`}
            {...props}
        >
            {children}
        </dialog>
    )
}
