import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { TestScalarsCards } from "./TestScalarsCards";
import { TestScalarsCardsEditor } from "./TestScalarsCardsEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function TestScalarsCardsScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.TestScalarsCards" }));

  const { recordId } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);

  return (
    <>
      {recordId && (
        <Breadcrumb>
          {breadcrumbItems.map(item => (
            <Breadcrumb.Item>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <BreadcrumbContext.Provider
        value={{ breadcrumbItems, setBreadcrumbItems }}
      >
        <div style={{ display: recordId ? "none" : "block" }}>
          <TestScalarsCards />
        </div>
        {recordId && (
          <TestScalarsCardsEditor refetchQueries={["Get_Scalars_List"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}