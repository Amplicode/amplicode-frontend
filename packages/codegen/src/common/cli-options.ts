import {OptionConfig} from "yeoman-generator";

export type OptionsConfig = {
  [optionName: string]: OptionConfig;
}

interface CommanderOptionInfo {
  pattern: string;
  description?: string;
}

export interface CommonGenerationOptions {
  dest?: string;
  model?: string;
  answers?: string;
  verbose?: boolean;
  templateOverride?: string;
}

export const commonGenerationOptionsConfig: OptionsConfig = {
  dest: {
    alias: 'd',
    description: 'destination directory',
    type: String
  },
  model: {
    alias: 'm',
    description: 'specify path to project model, if given no interactive prompt will be invoked',
    type: String
  },
  verbose: {
    alias: 'b',
    description: 'log out additional info about generation process',
    type: Boolean
  }
};

export const componentOptionsConfig: OptionsConfig = {
  ...commonGenerationOptionsConfig,
  dirShift: {
    alias: 'f',
    description: 'directory shift for html imports e.g ../../',
    type: String
  },
  answers: {
    alias: 'a',
    description: 'fulfilled params for generator to avoid interactive input in serialized JSON string',
    type: String
  }
};

/**
 * Convert 'OptionsConfig' object to array of items that could be used in generator cli api
 * @param optionsConfig
 */
export function extractAvailableOptions(optionsConfig?: OptionsConfig): CommanderOptionInfo[] {
  if (!optionsConfig) {
    return [];
  }

  const result: CommanderOptionInfo[] = [];
  Object.keys(optionsConfig).forEach(optionFullName => {
    const {type, alias, description} = optionsConfig[optionFullName];
    if (alias) {
      const optionValue = getOptionValue(type, optionFullName);
      const pattern = `-${alias}, --${optionFullName}${optionValue}`;
      description ? result.push({pattern, description}) : result.push({pattern});
    }
  });
  return result;
}

/**
 * Pick  option as object from command
 *
 * @param cmd list of options from cli command
 * @param availableOptions options config
 */
export function pickOptions(cmd: { [key: string]: any }, availableOptions?: OptionsConfig)
  : { [key: string]: string | boolean | Array<Record<string, unknown>> } {

  const passedOptions: { [key: string]: any } = {};
  if (availableOptions) {
    Object.keys(availableOptions).forEach(optionFullName => {
      // eslint-disable-next-line no-prototype-builtins
      if (cmd.hasOwnProperty(optionFullName)) {
        passedOptions[optionFullName] = cmd[optionFullName] as string | boolean;
      }
    })
  }
  return passedOptions;
}

function getOptionValue(type: OptionConfig['type'], optionFullName: string): string {
  if (type === String) {
    return ` [${optionFullName}]`;
  }

  // @ts-ignore TODO: fix yeoman-generator typing
  if (type === Array) {
    return ` [${optionFullName}...]`;
  }

  return '';
}
