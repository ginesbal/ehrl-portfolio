'use client'

import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false, error: null }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error }
    }

    componentDidCatch(error, errorInfo) {
        // Log to error reporting service in production
        if (process.env.NODE_ENV === 'development') {
            console.error('Error caught by boundary:', error, errorInfo)
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg-primary)' }}>
                    <div className="text-center max-w-md px-6">
                        <h2 className="text-3xl font-light mb-4" style={{ color: 'var(--text-primary)' }}>
                            Something went wrong
                        </h2>
                        <p className="text-[16px] mb-8" style={{ color: 'var(--text-secondary)' }}>
                            We're sorry for the inconvenience. Please refresh the page to try again.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                            style={{
                                background: 'var(--rose-taupe)',
                                color: 'white'
                            }}
                        >
                            Refresh Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
