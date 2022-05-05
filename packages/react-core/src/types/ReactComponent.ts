import {IReactComponent} from "mobx-react/dist/types/IReactComponent";

/**
 * React component of any kind.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ReactComponent<P = any> = IReactComponent<P>;
