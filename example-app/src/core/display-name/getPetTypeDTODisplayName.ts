export function getPetTypeDTODisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.id != null) {
    return String(entityInstance.id);
  }
  return JSON.stringify(entityInstance);
}
