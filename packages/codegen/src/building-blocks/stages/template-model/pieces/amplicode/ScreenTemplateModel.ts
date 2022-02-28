import {AmplicodeComponentOptions} from "../../../options/pieces/amplicode";
import {normalizeRelativePath, splitByCapitalLetter} from "../../../../../common/utils";
import {ScreenAnswers} from "../../../answers/amplicode/ScreenAnswers";

export interface ScreenTemplateModel {
  componentName: string,
  caption: string,
  route: string,
  relDirShift: string,
  shouldAddToMenu: boolean,
}

export function deriveScreenTemplateModel(options: AmplicodeComponentOptions, answers: ScreenAnswers): ScreenTemplateModel {
  const {componentName, shouldAddToMenu, route} = answers;

  return {
    relDirShift: normalizeRelativePath(options.dirShift),
    componentName,
    route,
    caption: splitByCapitalLetter(componentName),
    shouldAddToMenu
  };
}