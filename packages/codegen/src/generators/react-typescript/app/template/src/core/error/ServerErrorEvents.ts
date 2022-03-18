import { ErrorHandler } from "@apollo/client/link/error";

export type ServerErrorEvents = {
  graphQLError: ErrorHandler;
  unauthorized: () => void;
};
