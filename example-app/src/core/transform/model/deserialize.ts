import { NullableObjectOrList } from "../types";
import { transform } from "../transform";

/**
 * Used to process fetched data (for example, data received from `useQuery`).
 * Apollo Client deserializes built-in scalars, but not custom scalars, therefore data will contain
 * custom scalar fields in serialized format. These fields will be deserialized using the functions
 * in {@link customScalarTransformers}.
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
