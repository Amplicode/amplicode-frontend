import { SecurityStore } from "./security";

/**
 * Need to use a singleton constant because it's used outside of the React context.
 */

export const securityStore = new SecurityStore();
