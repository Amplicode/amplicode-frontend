import { filterFieldValues } from "@amplicode/react";
import { NullableObjectOrList } from "../types";
import { transform } from "../transform";

/**
 * Serialize form data before sending to server - additional formatting required for custom scalar types
 * and objects with `__typename` field.
 *
 * In addition, this function recursively removes `__typename` from data object
 * (`__typename` can be present, for example, in relation fields).
 *
 * @param data
 * @param typename
 */
export function serialize<T extends NullableObjectOrList>(
  data: T,
  typename?: string
): T {
  return stripTypename(
    transform<T>(data, "serialize", { typename })
  );
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
