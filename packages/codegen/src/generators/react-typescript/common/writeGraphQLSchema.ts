import path from "path";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {isBlank} from "../../../common/utils";


export function writeGraphQLSchema(gen: YeomanGenerator, templateModel: {schema?: string}, relDirShift?: string) {
  if (isBlank(templateModel.schema)) {
    return;
  }
  gen.fs.copyTpl(
    path.join(__dirname, '..', 'common', 'template', 'schema.txt'),
    gen.destinationPath(path.join(relDirShift ?? '', 'src', 'core', 'schema', 'schema.txt')),
    templateModel
  );
}
