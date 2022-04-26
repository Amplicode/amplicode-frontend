export function getScalarsTestEntityDisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
