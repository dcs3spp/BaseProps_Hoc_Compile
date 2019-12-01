import { History } from "history";

export type ClearError = {
  history?: History;
  navigateTo?: string;
  fromAction: string;
  fromComponent: string;
};

export type FailureNotify = {
  fromAction: string;
  fromComponent: string;
  message: string;
};
