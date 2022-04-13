import { filterFieldValues } from "@amplicode/react-core";
import { NullableObjectOrList } from "../types";
import { transform } from "../transform";

/**
 * In order to change how custom scalars are serialized,
 * make changes to {@link customScalarTransformers}.
 *
 * In addition, this function recursively removes `__typename` from data object
 * (`__typename` can be present, for example, in relation fields).
 *
 * @param data
 * @param typename
 */
export function serializeCustomScalars<T extends NullableObjectOrList>(
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
