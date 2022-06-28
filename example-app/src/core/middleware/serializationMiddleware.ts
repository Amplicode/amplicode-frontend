import { deserialize } from "../transform/model/deserialize";

export function serializationMiddleware(storeAPI: any) {
  return function wrapDispatch(next: any) {
    return function handleAction(action: any) {
      // deserialize
      // TODO same problem as when putting deserialize into Apollo link: state should be serializable, won't work with e.g. dayjs dates
      // if (action.type === 'api/executeQuery/fulfilled') {
      //   Object.keys(action.payload).forEach(key => {
      //     action.payload[key] = deserialize(action.payload[key]);
      //   });
      // }

      return next(action);
    }
  }
}