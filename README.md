# Overview

Code not compiling higher-order-components/withErrorListener.tsx with BaseProps.....

``` typescript
return <BaseComponent {...restProps as BaseProps} />; // this line causes compile error.
```

``` bash
Conversion of type '{ filteredErrors: FailureNotify[]; clearError: (fromAction: string, fromComponent: string, history?: History<any> | undefined, navigateTo?: string | 
undefined) => PayloadAction<constants.CLEAR_ERROR, ClearError>; ... 4 more ...; children?: ReactNode; }' to type 'BaseProps' may be a mistake because neither type sufficiently overl
aps with the other. If this was intentional, convert the expression to 'unknown' first.  TS2352
```

``` typescript
/**
   * ErrorListener component class
   * This should:
   * - Pass on base component properties when rendering base component
   * - Contain redux state and dispatch properties....these are not passed down into base component
   */
  class ErrorListener extends React.Component<InjectedProps, never> {
    static displayName = `withErrorListener(${BaseComponent.name})`;
    static readonly WrappedComponent = BaseComponent;

    /**
     * Render error if there is one to display, otherwise render the base component
     * @returns Rendered error if error occurred. Rendered base component if no error occurred. Base Component is rendered with it's own props only
     */
    render() {
      const { ...restProps } = this.props;
      console.log(
        `withErrorListener [error_count=${this.props.filteredErrors.length}]`
      );

      if (this.props.filteredErrors.length > 0) {
        return (
          <ErrorInfoConnected
            info={this.props.filteredErrors[0]}
            {...restProps}
          />
        );
      } else {
        return <BaseComponent {...restProps as BaseProps} />;
      }
    }
  }
```
I think what is happening is that it cannot perform the cast to BaseProps because these properties have been removed from InjectedProps. 

If the code is updated to be InjectedProps & BaseProps as listed below then revert back to the original compile error with connect function and have to cast to any....

``` typescript
/**
   * ErrorListener component class
   * This should:
   * - Pass on base component properties when rendering base component
   * - Contain redux state and dispatch properties....these are not passed down into base component
   */
  class ErrorListener extends React.Component<InjectedProps & BaseProps, never> {
    static displayName = `withErrorListener(${BaseComponent.name})`;
    static readonly WrappedComponent = BaseComponent;

    /**
     * Render error if there is one to display, otherwise render the base component
     * @returns Rendered error if error occurred. Rendered base component if no error occurred. Base Component is rendered with it's own props only
     */
    render() {
      const { ...restProps } = this.props;
      console.log(
        `withErrorListener [error_count=${this.props.filteredErrors.length}]`
      );

      if (this.props.filteredErrors.length > 0) {
        return (
          <ErrorInfoConnected
            info={this.props.filteredErrors[0]}
            {...restProps}
          />
        );
      } else {
        return <BaseComponent {...restProps as BaseProps} />;
      }
    }
  }
```

How is it possible to pass on base component's own properties using nested HOC without having to cast connect component argument as any?
