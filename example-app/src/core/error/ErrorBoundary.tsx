import React, { ErrorInfo, PropsWithChildren } from "react";
import { useIntl } from "react-intl";
import { Result } from "antd";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  message: string;
  render?: (message: string) => React.ReactNode;
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(error, errorInfo);
  }

  render() {
    const { render, message } = this.props;

    if (this.state.hasError) {
      return render == null ? <>{message}</> : <>{render(message)}</>;
    }

    return this.props.children;
  }
}

export const AppErrorBoundary = function(props: PropsWithChildren<{}>) {
  const intl = useIntl();

  return (
    <ErrorBoundary
      message={intl.formatMessage({ id: "common.unknownAppError" })}
      render={message => <Result status="error" title={message} />}
    >
      {props.children}
    </ErrorBoundary>
  );
};
