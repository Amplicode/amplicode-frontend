import {DocumentNode, GraphQLList, GraphQLNonNull, GraphQLSchema} from "graphql";
import {AttributeModel} from "../entity";
import {getTopFieldName} from "./getTopFieldName";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";
import {getAttributeNames} from "./getAttributeNames";
import {getEntityName} from "./getEntityName";
import {getTypeFields} from "./getTypeFields";
import {isAnyLeafType} from "./isAnyLeafType";
import { getSelectedFieldNamesFromTopField } from "./getSelectedFieldNamesFromTopField";

export function getEntityAttributes(documentNode: DocumentNode, schema: GraphQLSchema, idField: string): AttributeModel[] {
  // e.g. "petList"
  const queryFieldName: string = getTopFieldName(documentNode);
  // e.g. "PetDTO"
  const entityName: string = getEntityName(queryFieldName, schema);

  const typeFields = getTypeFields(entityName, schema);

  const selectedFieldNames = getSelectedFieldNamesFromTopField(documentNode);

  if (!selectedFieldNames.find(fieldKey => typeFields[fieldKey].name === idField)) {
    throw new Error(`${queryFieldName} query attributes did not contain id attribute with name '${idField}', ` +
      `which required for screen generation`);
  }

  return selectedFieldNames
    // Do not include id attribute
    .filter(fieldKey => typeFields[fieldKey].name !== idField)
    .map(fieldKey => {
      const field = typeFields[fieldKey];

      const fieldType = (field.type instanceof GraphQLList || field.type instanceof GraphQLNonNull)
        ? field.type.ofType.name
        : field.type.name;

      return {
        name: field.name,
        displayName: capitalizeFirst(splitByCapitalLetter(field.name)),
        isRelationField: !(isAnyLeafType(field.type)),
        type: fieldType,
        nestedAttributes: isAnyLeafType(field.type)
          ? undefined
          : getAttributeNames(fieldType, schema),
      };
    });
}
