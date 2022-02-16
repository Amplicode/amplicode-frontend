import {FormInstance} from "antd";
import {useEffect} from "react";
import {gql2form} from "../format/gql2form";

/**
 * Puts the `item` inside the `form`
 *
 * @param form
 * @param item
 */
export function useFormData<ItemType extends Record<string, unknown> | null>(form: FormInstance, item?: ItemType) {
  useEffect(() => {
    if (item != null) {
      const fieldValues = gql2form(item);
      form.setFieldsValue(fieldValues);
    }
  }, [item, form]);
}