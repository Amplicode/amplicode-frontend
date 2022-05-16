import { Typography } from "antd";
const { Paragraph, Text } = Typography;

export interface ValueWithLabelProps {
  key?: string;
  label: string;
  value?: string | number | boolean;
  isUrl?: boolean;
  renderIfEmptyValue?: boolean;
}

/**
 * A simple component that renders a labeled value.
 */
export function ValueWithLabel({
                                 label,
                                 value,
                                 isUrl,
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

  if (isUrl === true) {
    return (
      <Paragraph>
        <Text strong>{label}: </Text>
        <a target="_blank" rel="noreferrer" href={value as string}>
          {value}
        </a>
      </Paragraph>
    );
  }

  return (
    <Paragraph>
      <Text strong>{label}: </Text>
      <Text>{formattedValue}</Text>
    </Paragraph>
  );
}
