import { Input, InputProps, Tag } from "antd";

export function EntityRelationsField({
  value
}: Omit<InputProps, "value"> & { value?: readonly string[] }) {
  return (
    <>
      {value?.length && value?.length > 0 ? (
        <Input type="hidden" />
      ) : (
        <Input disabled placeholder={"No items"} />
      )}

      {/* custom view (readonly) for x-to-many relation */}
      {value?.map(entry => (
        <Tag>{entry}</Tag>
      ))}
    </>
  );
}
