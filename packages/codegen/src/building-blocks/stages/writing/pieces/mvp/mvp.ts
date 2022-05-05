import {YeomanGenerator} from "../../../../YeomanGenerator";
import path from "path";
import {capitalizeFirst, splitByCapitalLetter} from "../../../../../common/utils";
import { addMvpAppMenu } from "./addMvpAppMenu";
import { addComponentPreviews } from '../previews-registration';

export interface MvpComponentTemplateModel {
  componentName: string;
  route: string;
  caption: string;
  relDirShift: string;
  shouldAddToMenu: boolean;
  menuItemName?: string;
  includesPath: (...paths: string[]) => string;
}

export async function writeAmplicodeComponent<T extends MvpComponentTemplateModel>(
  templateModel: T,
  gen: YeomanGenerator,
  srcPath: string
) {
  const {
    relDirShift,
    componentName,
    route,
    shouldAddToMenu,
    menuItemName
  } = templateModel;

  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    srcPath,
    gen.destinationPath(componentName + '.tsx'),
    templateModel
  );

  gen.log(`✓ Component ${componentName} written`);

  if (shouldAddToMenu) {
    addMvpAppMenu({
      gen,
      dirShift: relDirShift,
      route,
      componentName,
      menuItemName
    });
  } else {
    gen.log(`✓ Menu item not required for ${componentName}`);
  }

  addScreenI18nKeyEn(componentName, relDirShift, gen);
  gen.log(`✓ i18n messages added for ${componentName}`);

  addComponentPreviews(gen, relDirShift, componentName, componentName)
  gen.log(`✓ Component previews added for ${componentName}`);
}

export function addScreenI18nKeyEn(
  className: string, 
  dirShift: string, 
  gen: YeomanGenerator, 
  componentType: "addons" | "screen" = "screen"
) {
  const existingMessagesPath = path.join(dirShift, 'core', 'i18n', 'messages', 'en.json');
  const existingMessages: Record<string, string> | null = gen.fs.readJSON(existingMessagesPath);
  if (existingMessages == null) {
    throw new Error('i18n messages not found');
  }

  const screenNameKey = `${componentType}.${className}`;

  if (Object.keys(existingMessages).includes(screenNameKey)) {
    return;
  }

  const screenCaption = splitByCapitalLetter(capitalizeFirst(className));
  const mergedMessages = {
    ...existingMessages,
    [screenNameKey]: screenCaption
  };

  gen.fs.writeJSON(existingMessagesPath, mergedMessages);
}

export function addI18nMessagesEn(
  dirShift: string,
  gen: YeomanGenerator,
  messages: Record<string, string>
) {
  const existingMessagesPath = path.join(dirShift, 'core', 'i18n', 'messages', 'en.json');
  const existingMessages: Record<string, string> | null = gen.fs.readJSON(existingMessagesPath);
  if (existingMessages == null) {
    throw new Error('i18n messages not found');
  }

  const existingKeys = Object.keys(existingMessages);
  const messagesKeys = Object.keys(messages);

  const keysToMerge = messagesKeys.filter((messageKey) => {
    const isMessageKeyExist = existingKeys.includes(messageKey);
    if(isMessageKeyExist) {
      gen.log(`message key '${messageKey}' already exists and will not be merged`);
    }
    return !isMessageKeyExist
  })

  if(keysToMerge.length === 0) {
    gen.log(`messages don't have any keys to merge`);
    return;
  }
  const messagesToMerge: Record<string, string> = keysToMerge.reduce((msgs, key) => {
    return {
      ...msgs,
      [key]: messages[key]
    }
  }, {})

  const mergedMessages = {
    ...existingMessages,
    ...messagesToMerge
  };

  gen.fs.writeJSON(existingMessagesPath, mergedMessages);
}
