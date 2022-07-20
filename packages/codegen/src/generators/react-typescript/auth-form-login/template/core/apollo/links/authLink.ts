import { setContext } from '@apollo/client/link/context';

export const authLink = setContext((_, { headers }) => {
  // noop implementation
  return {
    headers
  };
});
