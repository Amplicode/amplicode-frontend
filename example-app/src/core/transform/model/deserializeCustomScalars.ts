import {NullableObjectOrList} from "../types";
import {transform} from "../transform";

export function deserializeCustomScalars<T extends NullableObjectOrList>(data: T, typename?: string): T {
  return transform<T>(data,  'deserialize', {typename});
}