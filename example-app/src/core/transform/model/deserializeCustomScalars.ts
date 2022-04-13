import { NullableObjectOrList } from "../types";
import { transform } from "../transform";

/**
 * In order to change how custom scalars are deserialized,
 * make changes to {@link customScalarTransformers}
 *
 * @param data
 * @param typename
 */
export function deserializeCustomScalars<T extends NullableObjectOrList>(
  data: T,
  typename?: string
): T {
  return transform<T>(data, "deserialize", { typename });
}
