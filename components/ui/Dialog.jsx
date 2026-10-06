'use client'

import { useEffect, useRef } from 'react'

// Native <dialog>: focus trap, Esc to close and an inert page come for free.
// Mount it to open it; onClose fires for Esc, backdrop clicks and dialog.close().
export default function Dialog({ onClose, className = '', children, ...props }) {
    const ref = useRef(null)

    useEffect(() => {
        ref.current?.showModal()
    }, [])

    return (
        <dialog
            ref={ref}
            onClose={onClose}
            onClick={(e) => e.target === ref.current && ref.current.close()}
            className={`p-0 m-auto bg-transparent max-w-none max-h-none backdrop:bg-[rgb(19_18_16/0.82)] backdrop:backdrop-blur-sm ${className}`}
            {...props}
        >
            {children}
        </dialog>
    )
}
