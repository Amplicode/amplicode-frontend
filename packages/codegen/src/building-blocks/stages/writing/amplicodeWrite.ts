import {YeomanGenerator} from "../../YeomanGenerator";

export const amplicodeWrite = async <T>(
  templateModel: T, gen: YeomanGenerator
): Promise<void> => {
  gen.log(`Generating to ${gen.destinationPath()}`);

  gen.fs.copyTpl(
    gen.templatePath() + '/**',
    gen.destinationPath('.'),
    templateModel,
    undefined,
    { globOptions: { dot: true } }
  );
}