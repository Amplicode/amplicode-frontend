export function getPetDiseaseDTODisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  return JSON.stringify(entityInstance);
}
