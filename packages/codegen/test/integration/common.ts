import YeomanEnvironment from "yeoman-environment";
import path from "path";
import fs from "fs";
import {promisify} from "util";
const rimraf = promisify(require('rimraf'));

const SCHEMA_DIR_PATH = path.join(__dirname, '..', '..', '..', '..', 'scripts', 'schema');
export const SCHEMA_PATH = path.join(SCHEMA_DIR_PATH, 'schema.graphql');
export const SCHEMA2_PATH = path.join(SCHEMA_DIR_PATH, 'defaultaddon.graphqls');
export const GENERATORS_DIR = path.join(process.cwd(), 'src', 'generators', 'react-typescript');
export const GENERATORS_DEST_DIR = path.join(process.cwd(), 'test', 'integration', 'generated');

export async function cleanup(destDir: string) {
  await rimraf(`${destDir}/{*,.*}`);
  !fs.existsSync(destDir) && fs.mkdirSync(destDir, {recursive: true});

  // avoid exception on read i18n messages in mvp.ts, create file first TODO - fix in mpv.ts 'addScreenI18nKeyEn'
  fs.mkdirSync(path.join(destDir, 'core', 'i18n', 'messages'), {recursive: true});
  fs.writeFileSync(path.join(destDir, 'core', 'i18n', 'messages', 'en.json'), '{}');
}

export function opts(dir: string, answers: any, schema: string[]) {
  return {
    schema: schema,
    dest: dir,
    debug: true,
    answers: Buffer.from(JSON.stringify(answers)).toString('base64')
  }
}

export async function generate(
  generatorPath: string,
  options?: {},
  templateOverride?: string,
): Promise<void> {
  const env = new YeomanEnvironment();

  const {generator} = await import(generatorPath);
  env.registerStub(generator, generator.name);
  return env.run(generator.name, {
    templateOverride,
    ...options
  });
}
