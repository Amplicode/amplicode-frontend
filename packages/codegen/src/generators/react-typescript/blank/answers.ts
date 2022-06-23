import {StudioTemplatePropertyType} from "../../../common/studio/studio-model";
import {ScreenAnswers} from "../../../building-blocks/stages/answers/amplicode/ScreenAnswers";

export interface BlankAnswers extends ScreenAnswers {}

export const blankQuestions = [
  {
    caption: 'Component name',
    code: 'componentName',
    propertyType: StudioTemplatePropertyType.POLYMER_COMPONENT_NAME,
    defaultValue: 'Blank',
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
    caption: "Add to menu",
    code: "shouldAddToMenu",
    propertyType: StudioTemplatePropertyType.BOOLEAN,
    defaultValue: true,
    required: true
  }
];
