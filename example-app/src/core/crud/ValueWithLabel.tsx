import { Tag, Typography } from "antd";
const { Paragraph, Text } = Typography;

export interface ValueWithLabelProps {
  key?: string;
  label: string;
  value?: string | number | boolean | null | string[];
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
  const valueIsEmptyArray = Array.isArray(value) && value.length === 0;
  if ((value == null || valueIsEmptyArray) && !renderIfEmptyValue) {
    return null;
  }

  if (Array.isArray(value)) {
    return (
      <Paragraph>
        <Text strong>{label}: </Text>
        {value.map(entry => (
          <Tag>{entry}</Tag>
        ))}
      </Paragraph>
    );
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
