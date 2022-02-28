import { Typography } from "antd";

const { Paragraph, Text } = Typography;

export interface ValueWithLabelProps {
  key?: string;
  label: string;
  value?: string;
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

  return (
    <Paragraph>
      <Text strong>{label}: </Text>
      <Text>{value}</Text>
    </Paragraph>
  );
}
