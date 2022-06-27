import {
  GraphQLScalarSerializer,
  GraphQLScalarValueParser
} from "graphql/type/definition";

export type ScalarTransformer<TInternal = unknown, TExternal = unknown> = {
  serialize?: GraphQLScalarSerializer<TExternal>;
  parseValue?: GraphQLScalarValueParser<TInternal>;
};

export type NullableObject = Record<string, unknown> | null | undefined;

export type NullableObjectOrList =
  | Record<string, unknown>
  | Array<Record<string, unknown> | null>
  | null
  | undefined;
