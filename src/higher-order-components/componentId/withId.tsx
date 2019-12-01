import * as React from "react";
import cuid from "cuid";
import { Diff } from "utility-types";

/**
 * Type declarations
 */
type InjectedProps = {
  uniqueId: string;
};

export const withId = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  /**
   * Type declarations
   */
  type HocProps = Diff<BaseProps, InjectedProps>;

  type HocState = {
    readonly uniqueId: string;
  };

  return class IdHoC extends React.Component<HocProps, HocState> {
    static displayName = `withIdListener(${BaseComponent.name})`;
    static readonly WrappedComponent = BaseComponent;
    
    readonly state: HocState = {
      uniqueId: String(cuid()),
    }

    /**
     * Inject uniqueId property into base component and passes down original properties
     * @returns Rendered component.
     */
    render() {
      const { ...restProps } = this.props;
      const { uniqueId } = this.state;
      return <BaseComponent uniqueId = { uniqueId } {...restProps as BaseProps} />;
    }
  };
};
