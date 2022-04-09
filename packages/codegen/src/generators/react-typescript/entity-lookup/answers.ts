import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export type EntityLookupAnswers =
  ScreenAnswers & {
  query: string;
  idField?: string;
};

export const entityLookupQuestions = [
  {
    caption: 'Component name',
    code: 'componentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Lookup',
    required: true
  },
  {
    caption: 'Component route', // TODO
    code: 'route',
    propertyType: StudioTemplatePropertyType.ROUTE,
    required: true,
    relatedProperty: 'componentName'
  },
  {
    caption: 'Query to load items',
    code: 'query',
    propertyType: StudioTemplatePropertyType.GRAPHQL_QUERY,
    required: true
  },
  {
    caption: 'Name of the id attribute',
    code: 'idField',
    propertyType: StudioTemplatePropertyType.STRING,
    required: false,
    defaultValue: 'id'
  },
  {
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    required: false,
    defaultValue: false
  },
];
