import j from "jscodeshift";

const tsxParser = j.withParser('tsx');

/**
 * @param jsExpression - js code which could be value of variable
 * 
 * @returns - Ast from jsExpression
 * */
export function parseExpression(jsExpression: string) {
  const astOfExpression = tsxParser(`const value = ${jsExpression};`)
    .findVariableDeclarators('value')
    .paths()[0]
    .value
    .init;
  
  if(astOfExpression == null) throw new Error('Error while parsing js expression');

  return astOfExpression;
}
