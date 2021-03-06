import {Entity, ProjectModel} from "../../../../common/model/cuba-model";
import {getEntityPath} from "../../../../generators/react-typescript/common/template-model";
import {GraphQLEnumValue, GraphQLType} from "graphql";

export interface AttributeModel {
  name: string | string[];
  type: string;
  gqlType: GraphQLType;
  displayName: string;
  enumOptions?: Array<GraphQLEnumValue>;
  isSingleRelationField: boolean;
  isMultiRelationField: boolean;
  nestedAttributes?: string[];
}

export interface EntityWithPath extends Entity {
  path: string; // path relative to SDK placement
}

export interface EntityTemplateModel {
  entity: EntityWithPath;
}

export interface EntityAnswers {
  entity: Entity;
}

export function deriveEntity(
  answers: EntityAnswers, projectModel: ProjectModel
): EntityTemplateModel {
  const entity = answers.entity;

  return {
    entity: {
      ...entity,
      path: getEntityPath(entity, projectModel)
    }
  };
}
