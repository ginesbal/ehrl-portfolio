'use client'

import { Component } from 'react'

// Pass `fallback` for an inline fallback; omit it for the full-page one.
class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError() {
        return { hasError: true }
    }

    componentDidCatch(error, errorInfo) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo)
        }
    }

    render() {
        if (!this.state.hasError) return this.props.children
        if (this.props.fallback !== undefined) return this.props.fallback

        return (
            <div className="min-h-screen flex items-center justify-center bg-bg-primary">
                <div className="text-center max-w-md px-6">
                    <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] leading-tight text-text-primary mb-4">
                        Something went wrong
                    </h2>
                    <p className="text-[16px] text-text-secondary mb-8">
                        Refreshing the page usually fixes it.
                    </p>
                    <button type="button" onClick={() => window.location.reload()} className="btn-primary">
                        Refresh page
                    </button>
                </div>
            </div>
        )
    }
}

export default ErrorBoundary
