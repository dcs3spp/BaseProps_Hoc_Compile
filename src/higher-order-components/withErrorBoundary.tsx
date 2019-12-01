import React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

/**
 * Build error introduced by playground withErrorBoundary class if extend HoCProps with new properties
 * @remarks Adding a property to HocProps here causes the same build error as mentioned
 * in issue https://github.com/piotrwitek/react-redux-typescript-guide/issues/195
 */
export const withErrorBoundary = <BaseProps extends {}>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = {
    // here you can extend hoc with new props
    // addedProp: string // uncomment this to introduce a build error
  };
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withErrorBoundary(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to service provider
    };

    render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }

      return children;
    }
  };
};