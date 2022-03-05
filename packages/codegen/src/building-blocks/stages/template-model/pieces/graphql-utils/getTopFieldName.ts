import {DocumentNode} from "graphql";

export function getTopFieldName(document: DocumentNode): string {
  const operationDefinition = document.definitions[0];
  if (!('selectionSet' in operationDefinition)) {
    throw new Error('Selection set is not found in operation definition');
  }

  const topField = operationDefinition.selectionSet.selections[0];
  if (!('name' in topField)) {
    throw new Error('Field name not found');
  }

  return topField.name.value;
}