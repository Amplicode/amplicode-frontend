import {EntityListMode, EntityListType} from "../entity-list/answers";
import {StudioTemplateProperty, StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export interface EntityManagementAnswers extends ScreenAnswers {
  listComponentName: string,
  itemComponentName: string,
  route: string,
  type: EntityListType,
  mode?: EntityListMode,
  listQuery: string,
  detailsQuery: string,
  upsertMutation?: string,
  deleteMutation?: string,
  idField?: string,
  filterByArguments: Array<string[]>;
}

export const commonEntityManagementQuestions: StudioTemplateProperty[] =  [
  {
    caption: 'List component name',
    code: 'listComponentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'List',
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'List component route',
    code: 'route',
    propertyType: StudioTemplatePropertyType.ROUTE,
    required: true,
    relatedProperty: 'listComponentName',
    step: {
      name: "Entity List",
      order: "1"
    }
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
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Query to load items',
    code: 'listQuery',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: "Select arguments to filter by",
    code: "filterByArguments",
    propertyType: StudioTemplatePropertyType.FILTER_QUERY_ARGUMENT_ARRAY,
    relatedProperty: 'listQuery',
    required: false,
    step: {
      name: "Entity List",
      order: "1",
    }
  },
  {
    caption: 'Mutation to delete an item',
    code: 'deleteMutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Name of the id attribute',
    code: 'listIdField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false,
    defaultValue: 'id',
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    defaultValue: true,
    required: true,
    step: {
      name: "Entity List",
      order: "1"
    }
  },
  {
    caption: 'Details component name',
    code: 'itemComponentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Details',
    required: true,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Query to load item',
    code: 'detailsQuery',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Mutation to create or update item',
    code: 'upsertMutation',
    propertyType: StudioTemplatePropertyType.GRAPHQL_MUTATION,
    required: false,
    step: {
      name: "Entity Details",
      order: "2"
    }
  },
  {
    caption: 'Name of the id attribute',
    code: 'detailsIdField',
    propertyType: StudioTemplatePropertyType.STRING,
    defaultValue: 'id',
    required: false,
    step: {
      name: "Entity Details",
      order: "2"
    }
  }
];
