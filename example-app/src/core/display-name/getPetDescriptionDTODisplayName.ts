export function getPetDescriptionDTODisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity | null): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  return JSON.stringify(entityInstance);
}
