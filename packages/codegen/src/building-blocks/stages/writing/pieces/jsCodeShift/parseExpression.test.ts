import {expect} from "chai";
import { parseExpression } from "./parseExpression";

describe('parseExpression', () => {
  it('Struct of primitives', () => {
    const stringExpression = parseExpression(`"string"`);
    expect(stringExpression.type).eq("StringLiteral");
    if (stringExpression.type === 'StringLiteral') {
      expect(stringExpression.value).eq("string");
    }

    const numberExpression = parseExpression('0');
    expect(numberExpression.type).eq("NumericLiteral");
    if (numberExpression.type === 'NumericLiteral') {
      expect(numberExpression.value).eq(0);
    }

    const boolExpression = parseExpression('true');
    expect(boolExpression.type).eq("BooleanLiteral");
    if (boolExpression.type === 'BooleanLiteral') {
      expect(boolExpression.value).eq(true);
    }
  });

  it('Struct of object', () => {
    const object = parseExpression(`{
      number: 0,
      string: "string",
    }`);

    if (object.type === 'ObjectExpression') {
      if (object.properties[0].type === 'ObjectProperty') {
        if (object.properties[0].key.type === 'Identifier') {
          expect(object.properties[0].key.name).eq('number');
        }
        if (object.properties[0].value.type === 'NumericLiteral') {
          expect(object.properties[0].value.value).eq(0);
        }
      }

      if (object.properties[1].type === 'ObjectProperty') {
        if (object.properties[1].key.type === 'Identifier') {
          expect(object.properties[1].key.name).eq('string');
        }
        if (object.properties[1].value.type === 'StringLiteral') {
          expect(object.properties[1].value.value).eq('string');
        }
      }
    }
  });

  it('Struct of array', () => {
    const array = parseExpression('[0, "string", true]');
    
    expect(array.type).eq('ArrayExpression');
    if (array.type === 'ArrayExpression') {
      if (array.elements[0]?.type === 'NumericLiteral') {
        expect(array.elements[0].value).eq(0);
      }

      if (array.elements[1]?.type === 'StringLiteral') {
        expect(array.elements[1].value).eq('string');
      }

      if (array.elements[2]?.type === 'BooleanLiteral') {
        expect(array.elements[2].value).eq(true);
      }
    }
  });

  it('Struct of jsx', () => {
    const jsx = parseExpression('<div numberProp={0}>{"childText"}</div>');

    expect(jsx.type).eq("JSXElement");
    if (jsx.type === 'JSXElement') {
      if (jsx.openingElement.type === 'JSXOpeningElement') {
        if (jsx.openingElement.name.type === 'JSXIdentifier') {
          expect(jsx.openingElement.name.name).eq('div');
        }
        if (jsx.openingElement.attributes?.[0].type === 'JSXAttribute') {
          expect(jsx.openingElement.attributes?.[0].name.name).eq('numberProp');
        }
      }

      if (jsx.closingElement?.type === 'JSXClosingElement') {
        if (jsx.closingElement.name.type === 'JSXIdentifier') {
          expect(jsx.closingElement.name.name).eq('div');
        }
      }

      if (jsx.children?.[0].type === 'JSXExpressionContainer') {
        if (jsx.children?.[0].expression.type === 'StringLiteral') {
          expect(jsx.children?.[0].expression.value).eq("childText");
        }
      }
    }
  });
});
