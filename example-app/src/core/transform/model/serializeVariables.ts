import { DocumentNode, TypeNode } from "graphql";
import { NullableObject } from "../types";
import { getNamedTypeNode } from "../util";
import { serialize } from "./serialize";

/**
 * Serialize graphQL variables with {@link serialize} function for sending to server
 *
 * @param document
 * @param variables
 */
export function serializeVariables<T extends NullableObject>(
  document: DocumentNode,
  variables: T
): T {
  const operation = document.definitions[0];

  if (operation.kind !== "OperationDefinition")
    throw new Error("Operation definition not found");

  let typeMap: Record<string, TypeNode> = {};
  operation.variableDefinitions?.forEach(({ type, variable }) => {
    typeMap[variable.name.value] = type;
  });

  if (variables == null) return variables;

  let serializedVariables: Record<string, unknown> = {};
  Object.entries(variables).forEach(([varName, varValue]) => {
    const type = getNamedTypeNode(typeMap[varName]);
    if (type.kind === "NamedType") {
      serializedVariables[varName] = serialize(
        varValue as any,
        type.name.value
      );
    }
  });

  return serializedVariables as T;
}
