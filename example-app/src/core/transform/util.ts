import { NamedTypeNode, TypeNode } from "graphql";

export function getNamedTypeNode(typeNode: TypeNode): NamedTypeNode {
  if (typeNode.kind === "NamedType") {
    return typeNode;
  }
  return getNamedTypeNode(typeNode.type);
}
