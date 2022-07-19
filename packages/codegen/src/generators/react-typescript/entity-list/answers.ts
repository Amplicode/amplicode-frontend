import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export type EntityListMode = 'edit' | 'view' | 'view with details';
export type EntityListType = 'list' | 'cards' | 'table';

export interface EntityListAnswers extends ScreenAnswers {
  type?: EntityListType;
  multiselect?: boolean;
  mode?: EntityListMode;
  route: string;
  query: string; // TODO may be rename with 'listQuery'
  mutation?: string; // TODO may be rename with 'deleteMutation'
  idField?: string;
  filterByArguments?: Array<string[]>;
  orderByArguments?: string[];
  paginationType?: 'offset' | 'cursor';
}

export const entityListQuestions: StudioTemplateProperty[] = [
  {
    caption: 'Component name',
    code: 'componentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'List',
    required: true
  },
  {
    caption: 'Component route',
    code: 'route',
    propertyType: StudioTemplatePropertyType.ROUTE,
    required: true,
    relatedProperty: 'componentName'
  },
  {
    caption: 'Entity list type',
    // description: 'Possible values: "cards", "list", "table"
    code: 'type',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: 'cards',
    options: ['cards', 'list', 'table'],
  },
  {
    caption: 'Multiselect',
    code: 'multiselect',
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    defaultValue: false,
    showIf: {
      type: 'table'
    }
  },
  {
    caption: 'Entity list mode',
    // description: 'Possible values: ' +
    //   '"edit" (there will be buttons to create and edit entity), ' +
    //   '"view" (read-only, there will be no action buttons), ' +
    //   '"view with details" (read-only, there will be a button to view entity details). ' +
    //   'Presence of delete button depends on whether delete mutation has been provided.',
    code: 'mode',
    propertyType: StudioTemplatePropertyType.OPTION,
    defaultValue: 'edit',
    options: ['edit', 'view', 'view with details'],
  },
  {
    caption: 'Query to load items',
    code: 'query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Mutation to delete an item',
    // TODO rename with 'deleteMutation'
    code: 'mutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false
  },
  {
    caption: 'Name of the id attribute',
    code: 'idField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false,
    defaultValue: 'id'
  },
  {
    caption: "Select arguments to filter by",
    code: "filterByArguments",
    propertyType: StudioTemplatePropertyType.FILTER_QUERY_ARGUMENT_ARRAY,
    relatedProperty: 'query',
    required: false,
  },
  {
    caption: "Select arguments to order by",
    code: "orderByArguments",
    propertyType: StudioTemplatePropertyType.ORDER_QUERY_ARGUMENT_ARRAY,
    relatedProperty: 'query',
    required: false,
  },
  {
    caption: "Pagination type",
    code: "paginationType",
    propertyType: StudioTemplatePropertyType.PAGINATION_TYPE,
    relatedProperty: 'query',
    required: false,
  },
  {
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: true,
    defaultValue: true
  }
];
