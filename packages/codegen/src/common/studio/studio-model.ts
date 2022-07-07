import {RestService, RestServiceMethod} from "../model/cuba-model";

export const enum StudioTemplatePropertyType {
  ENTITY = 'ENTITY',
  VIEW = 'VIEW',
  NESTED_ENTITY_VIEW = 'NESTED_ENTITY_VIEW',
  STRING = 'STRING',
  BOOLEAN = 'BOOLEAN',
  INTEGER = 'INTEGER',
  OPTION = 'OPTION',
  MULTI_OPTION = 'MULTI_OPTION',
  REST_QUERY = 'REST_QUERY',
  REST_SERVICE_METHOD = 'REST_SERVICE_METHOD',
  POLYMER_COMPONENT_NAME = 'POLYMER_COMPONENT_NAME',
  PASSWORD = 'PASSWORD',
  GRAPHQL_QUERY = 'GRAPHQL_QUERY',
  GRAPHQL_MUTATION = 'GRAPHQL_MUTATION',
  MENU_ITEM = 'MENU_ITEM',
  ROUTE = 'ROUTE',
  ATTRIBUTE = 'ATTRIBUTE',
  ATTRIBUTES_ARRAY = 'ATTRIBUTES_ARRAY',
  FILTER_QUERY_ARGUMENT_ARRAY = 'FILTER_QUERY_ARGUMENT_ARRAY',
  ORDER_QUERY_ARGUMENT_ARRAY = 'ORDER_QUERY_ARGUMENT_ARRAY',
  PAGINATION_TYPE = 'PAGINATION_TYPE',
}

export interface StudioTemplateProperty {
  code: string;
  caption: string;
  propertyType: StudioTemplatePropertyType;
  defaultValue?: string | boolean | string[] | Array<string[]>;
  required?: boolean;
  relatedProperty?: string;
  options?: string[];
  step?: {
    name: string;
    order: "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
  };
  showIf?: {
    [key: string]: string | boolean | string[] | Array<string[]>;
  }
  // --not supported
  //advanced: boolean;
  //filterScript: string;
}

export interface RestServiceMethodModel {
  service: RestService;
  method: RestServiceMethod;
}

export interface EntityInfo {
  name: string;
}

export interface ViewInfo {
  name: string;
  entityName: string;
}

export interface RestQueryInfo {
  name: string;
  entityName: string;
}

export interface RestServiceMethodInfo {
  serviceName: string;
  methodName: string;
}
