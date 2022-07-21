import {YeomanGenerator} from "../../../../../../src/building-blocks/YeomanGenerator";
import {amplicodePipeline} from "../../../../../../src/building-blocks/pipelines/amplicodePipeline";
import path from "path";
import {writeTemplate} from "../../../../../../src/building-blocks/stages/writing/pieces/writeTemplate";
import {CommonGenerationOptions} from "../../../../../../src/common/cli-options";
import YeomanEnvironment from "yeoman-environment";
import {GENERATORS_DEST_DIR} from "../../../../common";
import fs from "fs";
import {expectFileContainsIgnoreSpace} from "../../../../../../src/test/test-commons";

const DEST_DIR = path.join(GENERATORS_DEST_DIR, 'building-blocks', 'writeTemplate');

class TestGenerator extends YeomanGenerator {
  constructor(args: string | string[], options: CommonGenerationOptions) {
    super(args, options);
  }

  async generate() {
    await amplicodePipeline({
      templateDir: path.join(__dirname, 'template'),
      stages: {
        write: async (_templateModel, gen) => {
          await writeTemplate(gen);
        }
      }
    }, this);
  }
}

describe('writeTemplate', async () => {
  it('writes template preserving folder structure', async () => {
    const env = new YeomanEnvironment();
    const generator = TestGenerator;
    env.registerStub(generator, generator.name);
    env.run(generator.name, {
      dest: DEST_DIR
    });

    const generatedFilePath = path.join(DEST_DIR, 'a', 'b', 'c.txt');
    const generatedFile = fs.readFileSync(generatedFilePath, 'utf-8');
    expectFileContainsIgnoreSpace(generatedFile, 'test');
  });
});