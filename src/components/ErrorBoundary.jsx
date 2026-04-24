/**
 * ErrorBoundary Component
 * 
 * Catches JavaScript errors in any child component tree,
 * logs the error, and displays a fallback UI instead of crashing the whole app.
 * 
 * This is the React equivalent of try/catch for components.
 * Without this, a single error in any component would crash the ENTIRE site.
 */
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          background: '#0a0a1a',
          color: '#fff',
          fontFamily: "'Inter', sans-serif",
          padding: '24px',
        }}>
          <div>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 800,
              background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '16px',
            }}>
              Oops!
            </h1>
            <p style={{ color: '#b0b0c8', fontSize: '16px', marginBottom: '24px' }}>
              Something went wrong. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '14px 32px',
                borderRadius: '50px',
                border: 'none',
                background: 'linear-gradient(135deg, #6c63ff, #00d4ff)',
                color: '#fff',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
