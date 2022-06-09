import {amplicodeGetGraphQLSchema} from "../../../../building-blocks/stages/graphql-schema/amplicodeGetGraphQLSchema";
import {AmplicodeCommonOptions} from "../../../../building-blocks/stages/options/pieces/amplicode";
import {GraphQLSchema, printSchema} from "graphql";
import {expect} from "chai";
import * as path from "path";


describe('amplicodeGetGraphQLSchema',  async () => {

  const RELATIVE_SCHEMA_PATH = './../../../../../../../scripts/schema/schema.graphql';
  const RELATIVE_ADDON_SCHEMA_PATH = './../../../../../../../scripts/schema/defaultaddon.graphqls';

  it('should return schema from single relative path', async () => {
    const opts: AmplicodeCommonOptions = {
      schema: [[RELATIVE_SCHEMA_PATH]]
    };
    const schemaStr = printSchema(await amplicodeGetGraphQLSchema(opts, __dirname) as GraphQLSchema);
    expect(schemaStr).to.contain('type Mutation {');
    expect(schemaStr).to.contain('type Query {');
    expect(schemaStr).to.contain('notNullScalarsTestEntity(id: ID): NotNullScalarsTestEntity');
    expect(schemaStr).to.contain('deleteNotNullScalarsTestEntity(id: ID): Void');
  });

  it('should return schema from single absolute path', async () => {
    const opts: AmplicodeCommonOptions = {
      schema: [[path.join(__dirname, RELATIVE_SCHEMA_PATH)]]
    };
    const schemaStr = printSchema(await amplicodeGetGraphQLSchema(opts, '') as GraphQLSchema);
    expect(schemaStr).to.contain('type Mutation {');
    expect(schemaStr).to.contain('type Query {');
    expect(schemaStr).to.contain('notNullScalarsTestEntity(id: ID): NotNullScalarsTestEntity');
    expect(schemaStr).to.contain('deleteNotNullScalarsTestEntity(id: ID): Void');
  });

  it('should return schema from multiple paths', async () => {
    const opts: AmplicodeCommonOptions = {
      schema: [
        [path.join(__dirname, RELATIVE_SCHEMA_PATH), RELATIVE_ADDON_SCHEMA_PATH]]
    };
    const schemaStr = printSchema(await amplicodeGetGraphQLSchema(opts, __dirname) as GraphQLSchema);
    console.log(schemaStr);

    expect(schemaStr).to.contain('testEntity(id: ID): TestEntity');
    expect(schemaStr).to.contain('deleteTestEntity(id: ID): Boolean!');
    expect(schemaStr).to.contain('notNullScalarsTestEntity(id: ID): NotNullScalarsTestEntity');
    expect(schemaStr).to.contain('deleteNotNullScalarsTestEntity(id: ID): Void');
  });

});
