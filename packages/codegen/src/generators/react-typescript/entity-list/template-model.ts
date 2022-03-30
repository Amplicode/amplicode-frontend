import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {EntityListMode, EntityListAnswers, EntityListType} from "./answers";
import {GraphQLSchema} from "graphql";
import gql from "graphql-tag";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {AttributeModel} from "../../../building-blocks/stages/template-model/pieces/entity";
import {getEntityAttributes} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityAttributes";
import {getEntityName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getEntityName";
import {getAttributeNames} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getAttributeNames";
import {getTopFieldName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getTopFieldName";
import {getOperationDefinitionName} from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getOperationDefinitionName";
import { getGraphQLStringTypeByPath } from "../../../building-blocks/stages/template-model/pieces/graphql-utils/getGraphQLStringTypeByPath";
import { capitalizeFirst, splitByCapitalLetter } from "../../../common/utils";
import { convertToNullableGraphQLStringType } from "../../../building-blocks/stages/template-model/pieces/graphql-utils/convertToNullableGraphQLStringType";


export interface EntityListTemplateModel extends
  BaseTemplateModel, UtilTemplateModel, ScreenTemplateModel, FiltersTemplateModel {
  queryName: string,
  route: string,
  queryString: string,
  deleteMutationName?: string,
  deleteMutationString?: string,
  idField: string,
  type: EntityListType;
  mode: EntityListMode;
  attributes: AttributeModel[];
  allAttributes: string[];
  itemComponentName?: string;
  refetchQuery: string;
  entityName: string;
}

export const deriveEntityListTemplateModel: AmplicodeTemplateModelStage<AmplicodeComponentOptions, EntityListAnswers, EntityListTemplateModel> = async (
  options: AmplicodeComponentOptions, answers: EntityListAnswers, schema?: GraphQLSchema, _schemaPath?: string
): Promise<EntityListTemplateModel> => {
  if (schema == null) {
    throw new Error('Schema not found');
  }

  const {
    componentName,
    route,
    query: queryString,
    mutation: deleteMutationString,
    type = 'cards',
    mode = 'edit',
    idField = 'id',
    filterByAttributes
  } = answers;

  const queryNode = gql(queryString);
  const mutationNode = deleteMutationString != null ? gql(deleteMutationString) : undefined;
  const queryName = getTopFieldName(queryNode);
  const refetchQuery = getOperationDefinitionName(queryNode);
  const deleteMutationName = mutationNode != null ? getTopFieldName(mutationNode) : undefined;
  const attributes = getEntityAttributes(queryNode, schema);
  const entityName = getEntityName(queryName, schema);
  const allAttributes = getAttributeNames(entityName, schema);

  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
    ...deriveFiltersTemplateModel(queryName, filterByAttributes, schema),
    componentName,
    route,
    queryName,
    queryString,
    deleteMutationName,
    deleteMutationString,
    attributes,
    allAttributes,
    idField,
    type,
    mode,
    refetchQuery,
    entityName
  };
};


interface EntityFilterData {
  attributeName: string | string[];
  caption: string;
  type: string;
}
export interface FiltersTemplateModel {
  filters: EntityFilterData[];
  withFilters: boolean;
  filterImports: {
    withFilterCheckbox: boolean;
    withFilterNumber: boolean;
    withFilterString: boolean;
    withFilterDate: boolean;
  };
}
export function deriveFiltersTemplateModel(queryName: string, filterByAttributes: Array<string[]>, schema?: GraphQLSchema): FiltersTemplateModel {

  let filters: EntityFilterData[] = [];
  if (filterByAttributes != null) {
    if (schema == null) throw new Error('Schema is required for generating filters');

    const listQueryType = schema.getQueryType()?.getFields()[queryName];
    if (listQueryType == null) throw new Error('Can\'t find query name in the schema for generating filters');

    filters = filterByAttributes.map(attributeName => ({
      attributeName: attributeName.length === 1 ? attributeName[0] : attributeName,
      caption: attributeName
        .map(attributeNameElem => capitalizeFirst(splitByCapitalLetter(attributeNameElem)))
        .join(' '),
      type: convertToNullableGraphQLStringType(getGraphQLStringTypeByPath(schema, listQueryType, attributeName))
    }))
  }

  const filterImports = getFilterImports(filters);

  const withFilters = filters.length > 0;

  return {
    filters,
    filterImports,
    withFilters,
  }
}

function getFilterImports(filters: EntityFilterData[]) {
  return {
    withFilterCheckbox: filters.find(filter => filter.type === 'Boolean') != null,
    withFilterNumber: filters.find(filter => filter.type === 'Int' || filter.type === 'BigInteger' || filter.type === 'Float' || filter.type === 'BigDecimal') != null,
    withFilterString: filters.find(filter => filter.type === 'String') != null,
    withFilterDate: filters.find(filter => filter.type === 'Date' || filter.type === 'Time' || filter.type === 'DateTime') != null,
  }
}
