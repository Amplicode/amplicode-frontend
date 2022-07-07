import { SelectionNode } from "graphql";

export function unpackPaginationFields(fields: readonly SelectionNode[]): readonly SelectionNode[] {
  const content = fields.find(field => field.kind === 'Field' && field.name.value === 'content' && Array.isArray(field.selectionSet?.selections));
  const totalElements = fields.find(field => field.kind === 'Field' && field.name.value === 'totalElements');

  if (
    content != null
    && content.kind === 'Field'
    && content.selectionSet != null
    && totalElements != null
  ) {
    return content.selectionSet.selections;
  }

  return fields;
}
