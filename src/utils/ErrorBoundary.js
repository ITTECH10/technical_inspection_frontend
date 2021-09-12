import React from 'react'

// Error boundaries currently have to be classes.
class ErrorBoundary extends React.Component {
    state = { hasError: false, error: null };

    autoReloadAfter() {
        if (this.state.hasError) {
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    }

    componentDidUpdate() {
        // this.autoReloadAfter()
    }

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    render() {
        if (this.state.hasError) {
            return (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>Something went wrong :(</h1>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary