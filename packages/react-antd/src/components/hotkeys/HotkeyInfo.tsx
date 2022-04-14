import { Descriptions } from "antd";
import { observer } from "mobx-react";
import { useIntl } from "react-intl";
import { HotkeyConfig } from "@amplicode/react-core";

function groupBy<T extends HotkeyConfig, K extends keyof T>(configs: T[], propName: K): Record<string, T[]> {
  return configs.reduce<Record<string, T[]>>((acc: Record<string, T[]>, el) => {
    const propValue = el[propName] as unknown as string;
    if (acc[propValue] == null) {
      acc[propValue] = [];
    }
    acc[propValue].push(el);
    return acc;
  }, {});
}

interface HotkeyInfoProps {
  hotkeyConfigs: HotkeyConfig[];
}
export const HotkeyInfo = observer(({hotkeyConfigs}: HotkeyInfoProps) => {
  const intl = useIntl();

  const hotkeysConfigByCategory = groupBy(hotkeyConfigs, 'categoryName');

  return (
    <div>
      {Object.entries(hotkeysConfigByCategory)
        .map(([category, categoryHotkeysConfig]) => (
          <Descriptions
            key={category}
            title={intl.formatMessage({id: category})}
            column={1}
          >
            {categoryHotkeysConfig
              .map(hotkeyConfig =>
                <Descriptions.Item
                  key={hotkeyConfig.description}
                  label={hotkeyConfig.hotkey}
                >
                  {intl.formatMessage({id: hotkeyConfig.description})}
                </Descriptions.Item>
              )
            }
          </Descriptions>
        ))
      }
    </div>
  )
});
