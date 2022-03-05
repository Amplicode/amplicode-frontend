import {DocumentNode} from "graphql";
import {ExecutableDefinitionNode} from "graphql/language/ast";

export function getOperationDefinitionName(node: DocumentNode): string {
  const operationDefinitionName = (node.definitions[0] as ExecutableDefinitionNode).name;
  if (operationDefinitionName == undefined) {
    throw new Error('Operation definition name not found');
  }
  return operationDefinitionName.value;
}