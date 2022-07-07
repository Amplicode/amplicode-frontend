import { DocumentNode } from "graphql";
import { unpackPaginationFields } from "./unpackPaginationFields";

export function getSelectedFieldNamesFromTopField(documentNode: DocumentNode) {
  const operation = documentNode.definitions[0];

  if (operation.kind !== 'OperationDefinition') throw new Error('Operation definition not found');
  const topField = operation.selectionSet.selections[0];

  if (topField.kind !== 'Field') throw new Error('topField can be only Field kind');
  let selectedFields = topField.selectionSet?.selections;

  if (selectedFields == null) throw new Error('Fields from topField aren\'t found');

  selectedFields = unpackPaginationFields(selectedFields);

  return selectedFields
    .map(topField => {
      if (topField.kind !== 'Field') throw new Error('Field from topField can be only Field kind');
      return topField.name.value;
    });
}