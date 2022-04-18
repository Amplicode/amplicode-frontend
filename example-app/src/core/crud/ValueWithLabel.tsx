import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export interface ValueWithLabelProps {
  key?: string;
  label: string;
  value?: string | number | boolean;
  renderIfEmptyValue?: boolean;
}

/**
 * A simple component that renders a labeled value.
 */
export function ValueWithLabel({
  label,
  value,
  renderIfEmptyValue = false
}: ValueWithLabelProps) {
  if (value == null && !renderIfEmptyValue) {
    return null;
  }

  let formattedValue: string | number | boolean = value!;
  if (value === true) {
    formattedValue = "✓";
  }
  if (value === false) {
    formattedValue = "✕";
  }

  return (
    <Paragraph>
      <Text strong>{label}: </Text>
      <Text>{formattedValue}</Text>
    </Paragraph>
  );
}
