import { FetchResult } from "@apollo/client/link/core";
import { MutationFunctionOptions } from "@apollo/client/react/types/types";
import {
  ApolloCache,
  DefaultContext,
  OperationVariables
} from "@apollo/client/core";

export type MutationFn<
  TData = any,
  TVariables = OperationVariables,
  TContext = DefaultContext,
  TCache extends ApolloCache<any> = ApolloCache<any>
> = (
  options?: MutationFunctionOptions<TData, TVariables, TContext, TCache>
) => Promise<FetchResult<TData>>;
