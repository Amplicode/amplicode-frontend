import path from "path";
import {YeomanGenerator} from "../../../building-blocks/YeomanGenerator";
import {isBlank} from "../../../common/utils";


export function writeTypeDefs(gen: YeomanGenerator, templateModel: {typeDefs?: string}, relDirShift?: string) {
  if (isBlank(templateModel.typeDefs)) {
    return;
  }
  gen.fs.copyTpl(
    path.join(__dirname, '..', 'common', 'template', 'typeDefs.ts'),
    gen.destinationPath(path.join(relDirShift ?? '', 'src', 'core', 'schema', 'typeDefs.ts')),
    templateModel
  );
}
