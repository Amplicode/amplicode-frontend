import { NullableObjectOrList } from "../types";
import { transform } from "../transform";

/**
 * Adjust backend data for frontend usage.
 *
 * In order to change how custom scalars are deserialized,
 * make changes to {@link customScalarTransformers}
 *
 * @param data
 * @param typename
 */
export function deserialize<T extends NullableObjectOrList>(
  data: T,
  typename?: string
): T {
  return transform<T>(data, "deserialize", { typename });
}
