// TODO unused
export function getDisplayedAttributes<
  TItemType extends Record<string, unknown>
>(item: TItemType, idAttrName: string = "id"): string[] {
  return Object.keys(item).filter(
    a =>
      a !== idAttrName && // Do not show id field
      a !== "__typename" && // Do not show __typename field
      item[a] !== null // Do not show empty fields
  );
}
