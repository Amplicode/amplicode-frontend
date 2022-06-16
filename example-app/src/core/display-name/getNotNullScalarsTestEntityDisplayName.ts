export function getNotNullScalarsTestEntityDisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
