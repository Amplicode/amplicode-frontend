import {DocumentNode} from "graphql";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";

export function getEntityAttributes(queryNode: DocumentNode, idField: string) {
  const operationDef = queryNode.definitions[0];

  if (!('selectionSet' in operationDef)) {
    throw new Error('selectionSet not found in OperationDefinition');
  }

  const queryField = operationDef.selectionSet.selections[0];

  if (!('selectionSet' in queryField)) {
    throw new Error('selectionSet not found in query Field');
  }

  const fields = queryField.selectionSet?.selections ?? [];

  return fields
    .filter(field => {
      if (!('name' in field)) {
        throw new Error('Cannot find field name');
      }

      return field.name.value !== idField;
    })
    .map(field => {
      if (!('name' in field)) {
        throw new Error('Cannot find field name');
      }

      return {
        name: field.name.value,
        displayName: capitalizeFirst(splitByCapitalLetter(field.name.value)),
        isRelationField: ('selectionSet' in field) && (field.selectionSet != null),
      };
    });
}