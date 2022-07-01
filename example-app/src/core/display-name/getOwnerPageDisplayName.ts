export function getOwnerPageDisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity | null): string {
  if (entityInstance == null) {
    return "";
  }
  return JSON.stringify(entityInstance);
}
