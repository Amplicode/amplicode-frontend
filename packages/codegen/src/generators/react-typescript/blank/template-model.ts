import {AmplicodeTemplateModelStage} from "../../../building-blocks/pipelines/amplicodePipeline";
import {AmplicodeComponentOptions} from "../../../building-blocks/stages/options/pieces/amplicode";
import {BlankAnswers} from "./answers";
import {GraphQLSchema} from "graphql";
import {templateUtilities, UtilTemplateModel} from "../../../building-blocks/stages/template-model/pieces/util";
import {
  deriveScreenTemplateModel,
  ScreenTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/ScreenTemplateModel";
import {
  baseTemplateModel,
  BaseTemplateModel
} from "../../../building-blocks/stages/template-model/pieces/amplicode/BaseTemplateModel";

export interface BlankTemplateModel extends
BaseTemplateModel,
ScreenTemplateModel,
UtilTemplateModel {}

export const deriveBlankTemplateModel: AmplicodeTemplateModelStage<
  AmplicodeComponentOptions, BlankAnswers, BlankTemplateModel
> = async (
  options: AmplicodeComponentOptions,
  answers: BlankAnswers,
  _schema?: GraphQLSchema,
): Promise<BlankTemplateModel>  => {
  return {
    ...baseTemplateModel,
    ...templateUtilities,
    ...deriveScreenTemplateModel(options, answers),
  }
};
