import {filterFieldValues} from "@amplicode/react-core";

export function form2gql(
  fieldValues: Record<string, unknown>
): Record<string, unknown> {
  // do not send __typename to back end on form submit
  return filterFieldValues(fieldValues, ["__typename"]);
}
