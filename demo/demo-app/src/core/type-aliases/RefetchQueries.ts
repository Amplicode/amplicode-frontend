import { FetchResult, InternalRefetchQueriesInclude } from "@apollo/client";

export type RefetchQueries<TData = any> =
  | ((result: FetchResult<TData>) => InternalRefetchQueriesInclude)
  | InternalRefetchQueriesInclude;
