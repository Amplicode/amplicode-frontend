export function loggerMiddleware(storeAPI: any) {
  return function wrapDispatch(next: any) {
    return function handleAction(action: any) {
      console.log('action', action);
      return next(action);
    }
  }
}