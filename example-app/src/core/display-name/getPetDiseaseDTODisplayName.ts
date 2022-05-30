export function getPetDiseaseDTODisplayName<
  TEntity extends Record<string, unknown>
>(entityInstance?: TEntity): string {
  if (entityInstance == null) {
    return "";
  }
  if (entityInstance.name != null) {
    return String(entityInstance.name);
  }
  if (entityInstance.description != null) {
    return String(entityInstance.description);
  }
  if (entityInstance.petDiseaseIdentifier != null) {
    return String(entityInstance.petDiseaseIdentifier);
  }
  return JSON.stringify(entityInstance);
}
