import {filterFieldValues} from "@amplicode/react-core";
import {NullableObjectOrList} from "../types";
import {transform} from "../transform";

export function serializeCustomScalars<T extends NullableObjectOrList>(data: T, typename?: string): T {
  return stripTypename(transform<T>(data, 'serialize', {typename}));
}

function stripTypename<T extends NullableObjectOrList>(data: T): T {
  if (data == null) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(stripTypename) as T;
  }

  return filterFieldValues(data, ["__typename"]) as T;
}