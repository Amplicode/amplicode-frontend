import {GraphQLScalarType} from "graphql/type/definition";
import {Dayjs} from "dayjs";
import {transform} from "../transform";
import {NullableObjectOrList, ScalarTransformer} from "../types";

export function toListPresentation<T extends NullableObjectOrList>(data: T, typename?: string): T {
  return transform<T>(data,  'deserialize', {
    typename,
    transformers: listPresentationTransformers
  });
}

const listPresentationTransformers: Record<string, ScalarTransformer | GraphQLScalarType> = {
  'Date': {
    parseValue: (value?: Dayjs) => {
      if (value == null) {
        return value;
      }
      return value.format('LL')
    }
  }
};