import { GraphQLError } from 'graphql/error/GraphQLError';
import { FormInstance } from "antd";

export function useValidateForm(errors: ReadonlyArray<GraphQLError>, form: FormInstance<any>) {

  const isFieldError = (error: GraphQLError) => error.extensions.path != null &&
    Object.keys(form.getFieldsValue()).includes(
      error.extensions.path[error.extensions.path.length - 1]
    );

  const isBeanValidation = (error: GraphQLError) => error.extensions.classification === "BeanValidationError";

  const formErrors = errors.reduce<any>(
    ([fieldErrors, globalErrors], error: GraphQLError) => {
    return isFieldError(error) ?
      [[...fieldErrors, error],globalErrors] :
      [fieldErrors, [...globalErrors, error]];
    },
    [[], []]
  );

  const [fieldErrors, globalErrors] = formErrors;

  function setFiledErrors() {
    if (fieldErrors.length > 0) {
      form.setFields(
        fieldErrors
          .map((error: GraphQLError) => ({
            name: error.extensions.path[error.extensions.path.length - 1],
            errors: error.message
          }))
          .reduce((acc: any[], curr: Record<string, string | string[]>) => {
            const found = acc.reduce((n, item, i) => {
              return (item.name === curr.name) ? i : n;
            }, -1);
            if (found >= 0) {
              acc[found].errors = acc[found].errors.concat(curr.errors);
            } else {
              const obj = {
                name: curr.name,
                errors: [curr.errors]
              };
              acc = acc.concat([obj]);
            }
            return acc;
          }, [])
      );
    }
  }

  return {
    fieldErrors,
    globalErrors,
    setFiledErrors,
    isBeanValidation
  }
}