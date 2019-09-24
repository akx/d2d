import React from "react";

type ErrorRenderer = (error: Error, errorInfo: React.ErrorInfo | undefined, reset: () => void) => React.ReactChild;

const defaultRenderError: ErrorRenderer = (error, errorInfo, reset) => (
  <div>
    Oops! An error occurred: ${error.toString()}
    <br />
    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
    <a href="#" onClick={reset}>
      Try again
    </a>
  </div>
);

interface ErrorWrapperProps {
  render: () => React.ReactChild;
  renderError?: ErrorRenderer;
}

interface ErrorWrapperState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorWrapper extends React.Component<ErrorWrapperProps, ErrorWrapperState> {
  public state: ErrorWrapperState = {};

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.error) {
      return (this.props.renderError || defaultRenderError)(this.state.error, this.state.errorInfo, this.resetError);
    }
    return this.props.render();
  }

  private resetError = () => {
    this.setState({ error: undefined, errorInfo: undefined });
  };
}
