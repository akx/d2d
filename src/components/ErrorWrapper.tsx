import React from "react";

type ErrorRenderer = (error: Error, errorInfo: React.ErrorInfo | undefined, reset: () => void) => React.ReactElement;

const defaultRenderError: ErrorRenderer = (error, _errorInfo, reset) => (
  <div>
    Oops! An error occurred: ${error.toString()}
    <br />
    <a href="#" onClick={reset}>
      Try again
    </a>
  </div>
);

interface ErrorWrapperProps {
  render: () => React.ReactElement;
  renderError?: ErrorRenderer;
}

interface ErrorWrapperState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export default class ErrorWrapper extends React.Component<ErrorWrapperProps, ErrorWrapperState> {
  public override state: ErrorWrapperState = {};

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ error, errorInfo });
  }

  override render() {
    if (this.state.error) {
      return (this.props.renderError || defaultRenderError)(this.state.error, this.state.errorInfo, this.resetError);
    }
    return this.props.render();
  }

  private resetError = () => {
    this.setState({});
  };
}
