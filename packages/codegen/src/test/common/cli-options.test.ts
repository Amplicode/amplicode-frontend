import {extractAvailableOptions, OptionsConfig, pickOptions} from "../../common/cli-options";
import {expect} from "chai";
import {OptionConfig} from "yeoman-generator";
import {
  amplicodeCommonOptionsConfig
} from "../../building-blocks/stages/options/pieces/amplicode";

describe('cli options', function () {
  it('should return empty array if no options passed', function () {
    expect(extractAvailableOptions().length).eq(0);
  });

  it('should return empty array if alias not set', function () {
    const optsConfig: OptionsConfig = {option1: {}};
    expect(extractAvailableOptions(optsConfig).length).eq(0);
  });

  it('should extract options from config', function () {
    const optionConfig: OptionConfig = { alias: 'o1' };

    const optsConfig: OptionsConfig = {option1: optionConfig};
    let res = extractAvailableOptions(optsConfig);
    expect(res[0].pattern).eq('-o1, --option1');
    expect(res[0].description).to.be.undefined;

    optionConfig['description'] = 'option one';
    res = extractAvailableOptions(optsConfig);
    expect(res[0].pattern).eq('-o1, --option1');
    expect(res[0].description).eq('option one');
  });

  it('should extract array option', function () {
    const availableOptions = extractAvailableOptions(amplicodeCommonOptionsConfig);
    const schemaOpt = availableOptions.find(item => item.pattern === '-s, --schema [schema...]');
    expect(schemaOpt).not.undefined;
    expect(schemaOpt!.description).eq('specify path (or set of paths) to GraphQL schema');
  });

  it('should pick options from cmd', function () {
    const optionConfig: OptionConfig = { alias: 'o1' };

    const optsConfig: OptionsConfig = {option1: optionConfig};
    let res = pickOptions({opt: 123}, optsConfig);
    expect(res).to.be.empty;

    res = pickOptions({option1: 123}, optsConfig);
    expect(res['option1']).eq(123);
  });

  it('should pik array option', function () {
    const res = pickOptions({schema: ['schema1', 'schema2']}, amplicodeCommonOptionsConfig);
    expect((res.schema as []).length).eq(2);
  });

});
