import {writeDisplayNameFunction} from "./writeDisplayNameFunction";
import {AttributeModel} from "../../../template-model/pieces/entity";
import {YeomanGenerator} from "../../../../YeomanGenerator";

export async function writeDisplayNameFunctionsForRelations(
  gen: YeomanGenerator,
  attributes: AttributeModel[],
  relDirShift: string
) {
  // Write getXXXDisplayName() functions for relation attributes
  const relationAttrs = attributes
    .filter(attr => attr.isRelationField);

  for (const relation of relationAttrs) {
    if (relation.type == null || relation.nestedAttributes == null) {
      throw new Error('Entity name not found');
    }

    await writeDisplayNameFunction({
      gen,
      entityName: relation.type,
      attributes: relation.nestedAttributes,
      dirShift: relDirShift,
    });
  }
}
