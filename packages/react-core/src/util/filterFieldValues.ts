/**
 * Remove all attributes with name listed in sortOutFields from fieldValues recursively.
 *
 * @param fieldValues object to be filtered
 * @param sortOutFields fields to be removed from filtered object
 */
export function filterFieldValues(fieldValues: Record<string, unknown>, sortOutFields: string[]): Record<string, unknown> {
  return removeProperties(fieldValues, sortOutFields);
}

function removeProperties(obj: any, sortOutFields: string[]): any {
  if (Object(obj) !== obj) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(o => removeProperties(o, sortOutFields));
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !sortOutFields.includes(key))
      .map(([key, value]) => ([key, removeProperties(value, sortOutFields)])
      ));
}
