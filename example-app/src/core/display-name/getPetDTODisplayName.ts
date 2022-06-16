export function getPetDTODisplayName<TEntity extends Record<string, unknown>>(
  entityInstance?: TEntity | null
): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
