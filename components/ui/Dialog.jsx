'use client'

import { useEffect, useRef } from 'react'

// Native <dialog>: focus trap, Esc to close and an inert page come for free.
// Mount it to open it; onClose fires for Esc, backdrop clicks and dialog.close().
// Put close buttons in a <form method="dialog">: closing natively is what returns
// focus to the opener. Initial focus goes to the element marked data-autofocus
// (React's autoFocus fires before showModal, while the dialog is still hidden).
export default function Dialog({ onClose, className = '', children, ...props }) {
    const ref = useRef(null)

    useEffect(() => {
        ref.current?.showModal()
        ref.current?.querySelector('[data-autofocus]')?.focus()
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
