"use client";
import React, { Component, ErrorInfo, ReactNode } from "react";
import styles from "./ErrorBoundary.module.css";
import clsx from "clsx";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <h2 className={styles.errorTitle}>Something went wrong</h2>
            <p className={styles.errorMessage}>
              We&apos;re sorry, but something unexpected happened. Please try
              refreshing the page.
            </p>
            <div className={styles.errorActions}>
              <button
                className={clsx(styles.actionButton, styles.retryButton)}
                onClick={() => {
                  this.setState({ hasError: false, error: undefined });
                }}
              >
                Try Again
              </button>
              <button
                className={styles.actionButton}
                onClick={() => {
                  window.location.reload();
                }}
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
