import {toFatSnakeCase} from "../../../util/to-fat-snake-case";
import {capitalizeFirst, splitByCapitalLetter, unCapitalizeFirst} from "../../../../common/utils";
import {dollarsToUnderscores} from "../../../util/dollars-to-underscores";
import {fatSnakeToNormal} from "../../../util/fat-snake-to-normal";
import {fatSnakeToPascal} from '../../../util/fat-snake-to-pascal';

export type UtilTemplateModel = {
  toFatSnakeCase: (str: string) => string;
  unCapitalizeFirst: (str: string) => string;
  dollarsToUnderscores: (str: string) => string;
  splitByCapitalLetter: (str: string) => string;
  capitalizeFirst: (str: string) => string;
  fatSnakeToNormal: (str: string) => string;
  fatSnakeToPascal: (str: string) => string;
};

/**
 * You can add this to your TemplateModel if you want to use these utilities inside your
 * template.
 */
export const templateUtilities: UtilTemplateModel = {
  toFatSnakeCase,
  unCapitalizeFirst,
  dollarsToUnderscores,
  splitByCapitalLetter,
  capitalizeFirst,
  fatSnakeToNormal,
  fatSnakeToPascal
};