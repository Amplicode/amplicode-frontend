import {YeomanGenerator} from "../../../YeomanGenerator";

export async function writeTemplate(
  gen: YeomanGenerator,
  src: string = '**',
  dest: string = '.',
  templateModel: Record<string, unknown> = {}
) {
  await gen.fs.copyTpl(
    gen.templatePath(src),
    gen.destinationPath(dest),
    templateModel
  );
}