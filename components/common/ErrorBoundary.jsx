'use client'
import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }
    static getDerivedStateFromError() {
        return { hasError: true }
    }
    componentDidCatch(err, info) {
        // Optional: log to an error service
        // console.error('PhoneMockup error:', err, info)
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="p-6 border border-border-light rounded-lg bg-bg-accent">
                    <p className="text-sm text-text-secondary">
                        Something went wrong loading the demo. Please try again later.
                    </p>
                </div>
            )
        }
        return this.props.children
    }
}
