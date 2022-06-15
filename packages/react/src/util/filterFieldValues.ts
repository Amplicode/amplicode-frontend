/**
 * Remove all attributes with name listed in sortOutFields from fieldValues recursively.
 *
 * @param fieldValues object to be filtered
 * @param sortOutFields fields to be removed from filtered object
 */
export function filterFieldValues(fieldValues: Record<string, unknown>, sortOutFields: string[]): Record<string, unknown> {
  return removeProperties(fieldValues, sortOutFields);
}

function removeProperties(obj: Record<string, unknown>, sortOutFields: string[]): Record<string, unknown> {
  if (Object(obj) !== obj) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(o => removeProperties(o, sortOutFields)) as unknown as Record<string, unknown>;
  }

  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => !sortOutFields.includes(key))
      .map(([key, value]) => ([key, removeProperties(value as Record<string, unknown>, sortOutFields)])
      ));
}
