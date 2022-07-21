import {YeomanGenerator} from "../../../YeomanGenerator";

export async function writeTemplate(
  gen: YeomanGenerator,
  templateModel: Record<string, unknown> = {}
) {
  await gen.fs.copyTpl(
    gen.templatePath() + '/**',
    gen.destinationPath('.'),
    templateModel
  );
}