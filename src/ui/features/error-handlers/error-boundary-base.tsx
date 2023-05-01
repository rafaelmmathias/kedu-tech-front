import React, { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundaryBase extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong in the application.</h1>
          <button onClick={() => this.setState({ hasError: false })}>
            Ok, retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
