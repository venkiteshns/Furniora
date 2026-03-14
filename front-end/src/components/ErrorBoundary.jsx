import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('ErrorBoundary caught an error', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg border border-red-100">
                        <div className="text-center">
                            <h2 className="mt-6 text-3xl font-extrabold text-red-600">
                                Oops! Something went wrong.
                            </h2>
                            <p className="mt-2 text-sm text-gray-600">
                                We're sorry, but an unexpected error occurred.
                            </p>
                            <p className="mt-4 text-xs text-red-500 bg-red-50 p-2 rounded break-words">
                                {this.state.error?.toString()}
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="mt-6 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                                Refresh Page
                            </button>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
