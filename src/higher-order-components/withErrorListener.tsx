import * as React from "react";

import { connect, MapStateToProps } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router-dom";

import { clearErrorAction } from "../features/errors/actions";
import { Diff } from "utility-types";
import { FailureNotify } from "../features/errors/types";
import { filterErrors } from "../features/errors/selectors";

import { RootState } from "typesafe-actions";
import { withId } from "./componentId/withId";

/**
 * Type declarations
 */
export type RequiredProps = { uniqueId: string };

/**
 * Internal components
 */

/** ================================= ErrorInfo ======================================== */

/**
 * Redux types
 */
const mapErrorInfoDispatchToProps = {
  clearError: clearErrorAction
};

type ErrorInfoReduxProps = typeof mapErrorInfoDispatchToProps;
type ErrorInfoProps = { info: FailureNotify } & RouteComponentProps &
  ErrorInfoReduxProps;

/**
 * Functional component to display error info and dispatch CLEAR_ERROR action when unmounted.
 * @param param0  properties for display error info and dispatching CLEAR_ERROR action
 */
const ErrorInfoBase = ({
  info,
  clearError,
  history
}: ErrorInfoProps): JSX.Element => {
  function goHome(): void {
    console.log("Go home button has been clicked");
    clearError(info.fromAction, info.fromComponent, history, "/");
  }
  return (
    <React.Fragment>
      <p>Error {info.message}</p>
      <p>Received from action {info.fromAction}</p>
      <p>Received for component id {info.fromComponent}</p>
      <button onClick={goHome}>Home</button>
    </React.Fragment>
  );
};

/** Connect the ErrorInfoBase component to the redux store */
const ErrorInfoConnected = connect<
  {},
  typeof mapErrorInfoDispatchToProps,
  {},
  RootState
>(
  null,
  mapErrorInfoDispatchToProps
)(ErrorInfoBase);

/** ================================== End ErrorInfo =================================== */

/* ===================================== HoC =========================================== */

/**
 * withErrorListener
 * HoC that renders errors on the redux store raised for a component.
 * The base component must remain unchanged with no new properties.
 * The withErrorListener enhances the behaviour of the base component by listening on the redux store for errors
 * notified.
 *
 * If no errors are found then render base component with it's own properties.
 * @param BaseComponent  The component to wrap. This must have a uniqueId property rendered by withId HoC.
 */
export const withErrorListener = <BaseProps extends RequiredProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  /**
   * Injected properties for use inside the HOC component class only
   * These are excluded from react-redux connect, i.e. they are not injected into connect function's ownProps argument
   * They are also not injected into the base component.
   * The only propertis that should be possed down when rendering BaseComponent is BaseProps.
   */
  type InjectedProps = TReduxProps & RouteComponentProps; //this solves typed connect issue, how to pass on base component's own props at line 174....
  // type InjectedProps = TReduxProps & RouteComponentProps & BaseProps; // including base props here breaks the typed connect, do I need this to pass on in line 177...

  /**
   * Remove the following injected properties injected from Base props:
   * - redux state and dispatch
   * - react router
   */
  type HocProps = Diff<BaseProps, InjectedProps>;

  /** == Redux properties ================================================================ **/

  /**
   * The object type returned by mapState function.
   * I need to declare it, as opposed to using TState, otherwise a circular reference is created.
   */
  type StateProps = {
    filteredErrors: FailureNotify[];
  };

  /**
   * Function to return subset of store state that filters errors for the wrapped component via uniqueId property
   * @param state  The root state
   * @param ownProps  uniqueId property is required to fullfil filter operation.
   * @returns  StateProps type that contains a list of filtered errors of type FailureNotify.
   */
  const mapState: MapStateToProps<StateProps, RequiredProps, RootState> = (
    state: RootState,
    ownProps: RequiredProps
  ): StateProps => {
    // uniqueId property is always undefined here???
    console.log(`withErrorListener mapStateToProps => ${ownProps.uniqueId}`);
    return {
      filteredErrors: [] // filterErrors(state.errors, ownProps)
    } as StateProps;
  };

  /**
   * Dispatch object. Each object key is mapped to an action.
   */
  const dispatchProps = {
    clearError: clearErrorAction
  };

  type TDispatchProps = typeof dispatchProps;
  type TStateProps = ReturnType<typeof mapState>;
  type TReduxProps = TStateProps & TDispatchProps;

  /** =============================== ErrorListener Component Class ==================== */

  /**
   * ErrorListener component class
   * This should accept:
   * - Base component properties
   * - Redux state and dispatch properties
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
        // false positive linter error, tsc compiles
        return <BaseComponent {...restProps as BaseProps} />;
      }
    }
  }

  // connect to redux store
  const ConnectedHoc = connect<
    TStateProps,
    TDispatchProps,
    HocProps, // this merges properties with ownProps, exclude redux and router props
    RootState
  >(
    mapState,
    dispatchProps
  )(ErrorListener);
  // connect to router
  const RoutedHoc = withRouter(ConnectedHoc);

  // inject uniqueId
  return withId(RoutedHoc);
};
