function isArrayGraphQLStringType(graphQLStringType: string) {
  return /^\[.+\]$/.test(graphQLStringType);
}
function getGraphQLStringTypeFromArray(graphQLStringType: string) {
  return graphQLStringType.replace(/(^\[)|(\]$)/g, '')
}

function isNotNullGraphQLStringType(graphQLStringType: string) {
  return /.+!$/.test(graphQLStringType);
}
function getGraphQLStringTypeFromNotNull(graphQLStringType: string) {
  return graphQLStringType.replace(/!$/, '')
}

export function convertToNullableGraphQLStringType(graphQLStringType: string): string {
  if (isNotNullGraphQLStringType(graphQLStringType)) {
    return convertToNullableGraphQLStringType(getGraphQLStringTypeFromNotNull(graphQLStringType));
  }

  if (isArrayGraphQLStringType(graphQLStringType)) {
    return '[' + convertToNullableGraphQLStringType(getGraphQLStringTypeFromArray(graphQLStringType)) + ']';
  }

  return graphQLStringType;
}