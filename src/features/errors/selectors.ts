import { RequiredProps } from "../../higher-order-components/withErrorListener";
import { ErrorState } from "./reducer";
import { FailureNotify } from "./types";

export const filterErrors = (
  state: ErrorState,
  selectorprops: RequiredProps
): FailureNotify[] => {
  return state.error.filter(e => e.fromComponent === selectorprops.uniqueId);
};
