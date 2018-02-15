import * as commander from 'commander';
import {generate, collectGenerators, collectSubGenerators} from "./init";
import {Command} from 'commander';

const cli: Command = commander;

cli.version(require('../package').version, '-v, --version');

const generators = collectGenerators();

generators.forEach(generator => {
  const subgenerators = collectSubGenerators(generator.name);
  subgenerators.forEach(subgen => {
    cli
      .command(`${generator.name}:${subgen.name}`)
      .action(async function() {
        generate(generator.name, subgen.name);
      })
  })
});
cli.parse(process.argv);

if (!process.argv.slice(2).length) {
  cli.outputHelp()
}