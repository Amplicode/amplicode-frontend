import {DocumentNode, GraphQLList, GraphQLNonNull, GraphQLSchema} from "graphql";
import {AttributeModel} from "../entity";
import {getTopFieldName} from "./getTopFieldName";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";
import {getAttributeNames} from "./getAttributeNames";
import {getEntityName} from "./getEntityName";
import {getTypeFields} from "./getTypeFields";
import {isAnyLeafType} from "./isAnyLeafType";
import { getSelectedFieldNamesFromTopField } from "./getSelectedFieldNamesFromTopField";

export function getEntityAttributes(documentNode: DocumentNode, schema: GraphQLSchema): AttributeModel[] {
  // e.g. "petList"
  const queryFieldName: string = getTopFieldName(documentNode);
  // e.g. "PetDTO"
  const entityName: string = getEntityName(queryFieldName, schema);

  const typeFields = getTypeFields(entityName, schema);

  const selectedFieldNames = getSelectedFieldNamesFromTopField(documentNode);

  return selectedFieldNames
    .filter(fieldKey => {
      // Do not include id attribute
      return typeFields[fieldKey].name !== 'id' // TODO determine id field from schema
    })
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
        idField: 'id' // TODO Get id field name from schema
      };
    });
}