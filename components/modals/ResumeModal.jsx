'use client'

import Dialog from '../ui/Dialog.jsx'

const pdfPath = '/files/resume.pdf'

export default function ResumeModal({ onClose }) {
    return (
        <Dialog
            onClose={onClose}
            aria-labelledby="resume-title"
            className="w-full h-full md:w-[min(64rem,calc(100%-4rem))] md:h-[90vh]"
        >
            <div className="w-full h-full flex flex-col bg-bg-primary md:rounded-[var(--radius-lg)] overflow-hidden">
                <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4 border-b border-border-light">
                    <div className="min-w-0">
                        <h2 id="resume-title" className="font-serif text-[20px] md:text-[24px] leading-tight text-text-primary">
                            Resume
                        </h2>
                        <p className="text-[13px] text-text-muted truncate">Ehrl Balquin, Full-Stack Developer</p>
                    </div>

                    <div className="flex items-center gap-1 md:gap-3">
                        <a href={pdfPath} download="Ehrl_Balquin_Resume.pdf" className="btn-link px-2">
                            Download<span className="hidden md:inline">&nbsp;PDF</span>
                        </a>
                        <form method="dialog" className="contents">
                            <button
                                data-autofocus
                                className="w-11 h-11 grid place-items-center rounded-full text-text-secondary hover:bg-rose-taupe/10 active:scale-95"
                                aria-label="Close resume"
                            >
                                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden>
                                    <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <iframe
                    src={`${pdfPath}#view=FitH`}
                    className="flex-1 w-full border-0 bg-bg-secondary"
                    title="Resume PDF"
                />
            </div>
        </Dialog>
    )
}
