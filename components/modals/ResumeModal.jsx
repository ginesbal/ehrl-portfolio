'use client'

import { useEffect } from 'react';

export default function ResumeModal({ isOpen, onClose }) {

    const pdfPath = "/files/resume.pdf"
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        // Always clean up both the listener and the scroll lock
        return () => {
            window.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-8"
            onClick={onClose}
        >
            {/* backdrop */}
            <div
                className="absolute inset-0 backdrop-blur-sm"
                style={{ background: 'rgba(26, 31, 32, 0.8)' }}
            />

            {/* modal content */}
            <div
                className="relative w-full h-full md:max-w-5xl md:h-[90vh] bg-white md:rounded-lg shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
            >
                {/* header */}
                <div
                    className="flex items-center justify-between p-4 md:p-6 border-b"
                    style={{ borderColor: 'var(--border-light)' }}
                >
                    <div className="flex-1 min-w-0 pr-3">
                        <h2 className="text-[16px] md:text-[20px] font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                            Resume
                        </h2>
                        <p className="text-[12px] md:text-[13px] mt-1 truncate" style={{ color: 'var(--text-muted)' }}>
                            Ehrl Balquin - Full Stack Developer
                        </p>
                    </div>

                    <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
                        {/* Download Button - Hidden on mobile, shown on desktop */}
                        <a
                            href={pdfPath}
                            download="Ehrl_Balquin_Resume.pdf"
                            className="hidden md:inline-flex px-5 py-2 text-[14px] rounded-lg transition-all hover:scale-105"
                            style={{
                                background: 'var(--rose-taupe)',
                                color: 'white'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Download PDF
                        </a>

                        {/* Mobile Download Icon Button */}
                        <a
                            href={pdfPath}
                            download="Ehrl_Balquin_Resume.pdf"
                            className="md:hidden p-2 rounded-lg transition-colors active:bg-gray-100"
                            style={{ color: 'var(--rose-taupe)' }}
                            onClick={(e) => e.stopPropagation()}
                            aria-label="Download resume"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round"/>
                                <polyline points="7 10 12 15 17 10" strokeLinecap="round" strokeLinejoin="round"/>
                                <line x1="12" y1="15" x2="12" y2="3" strokeLinecap="round"/>
                            </svg>
                        </a>

                        {/* close button */}
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg transition-colors hover:bg-gray-100 active:bg-gray-200"
                            aria-label="Close resume"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path
                                    d="M15 5L5 15M5 5L15 15"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* pdf viewer */}
                <div className="flex-1 overflow-hidden p-3 md:p-6">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                        <iframe
                            src={`${pdfPath}#view=FitH`}
                            className="w-full h-full"
                            title="Resume PDF"
                            style={{ border: '1px solid var(--border-light)' }}
                        />

                        {/* Fallback for mobile or if iframe doesn't work */}
                        <div className="hidden">
                            <p className="text-center py-12" style={{ color: 'var(--text-muted)' }}>
                                Unable to display PDF preview.
                                <br />
                                <a
                                    href={pdfPath}
                                    target="_blank"
                                    className="underline mt-2 inline-block"
                                    style={{ color: 'var(--rose-taupe)' }}
                                >
                                    Open in new tab
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer with Quick Actions */}
                <div
                    className="p-4 md:p-6 border-t flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-0 md:justify-between"
                    style={{ borderColor: 'var(--border-light)' }}
                >
                    <p className="text-[12px] md:text-[13px]" style={{ color: 'var(--text-muted)' }}>
                        Last updated: January 2025
                    </p>

                    <div className="flex items-center gap-4 text-[13px] md:text-[13px]">
                        <a
                            href={pdfPath}
                            target="_blank"
                            className="hover:underline transition-colors min-h-[44px] flex items-center"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Open in new tab ↗
                        </a>
                        <a
                            href="mailto:ehrl.balquin@gmail.com?subject=Resume%20Inquiry"
                            className="hover:underline transition-colors min-h-[44px] flex items-center"
                            style={{ color: 'var(--text-secondary)' }}
                        >
                            Contact me
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}