import {AmplicodeComponentOptions} from "../../../options/pieces/amplicode";
import {normalizeRelativePath, splitByCapitalLetter} from "../../../../../common/utils";
import {ScreenAnswers} from "../../../answers/amplicode/ScreenAnswers";
import {GraphQLSchema, printSchema} from "graphql";

export interface ScreenTemplateModel {
  componentName: string;
  caption: string;
  route: string;
  relDirShift: string;
  shouldAddToMenu: boolean;
  schema?: string;
  menuItemName?: string;
}

export function deriveScreenTemplateModel(options: AmplicodeComponentOptions, answers: ScreenAnswers, schema?: GraphQLSchema): ScreenTemplateModel {
  const {componentName, shouldAddToMenu, route} = answers;

  return {
    relDirShift: normalizeRelativePath(options.dirShift),
    componentName,
    route,
    caption: splitByCapitalLetter(componentName),
    shouldAddToMenu,
    schema: schema ? printSchema(schema, { commentDescriptions: true }) : undefined
  };
}
