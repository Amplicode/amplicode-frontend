import {Entity, ProjectModel} from "../../../../common/model/cuba-model";
import {getEntityPath} from "../../../../generators/react-typescript/common/template-model";
import {GraphQLEnumValue} from "graphql";

export interface AttributeModel {
  name: string;
  type?: string;
  displayName: string;
  enumOptions?: Array<GraphQLEnumValue>;
  isRelationField: boolean;
  nestedAttributes?: string[];
  idField?: string;
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

  const entityWithPath = {
    entity: {
      ...entity,
      path: getEntityPath(entity, projectModel)
    }
  };

  return entityWithPath;
}