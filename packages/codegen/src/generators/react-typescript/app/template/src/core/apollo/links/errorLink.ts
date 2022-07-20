import {onError} from "@apollo/client/link/error";
import {serverErrorEmitter} from "../../error/serverErrorEmitter";

export const errorLink = onError(errorResponse =>
  serverErrorEmitter.emit("graphQLError", errorResponse)
);