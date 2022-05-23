import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { TestNotNullScalarsCards } from "./TestNotNullScalarsCards";
import { TestNotNullScalarsCardsEditor } from "./TestNotNullScalarsCardsEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function TestNotNullScalarsCardsScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.TestNotNullScalarsCards" }));

  const { recordId } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);

  return (
    <>
      {recordId && (
        <Breadcrumb className="crud-screen-breadcrumb">
          {breadcrumbItems.map(item => (
            <Breadcrumb.Item>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <BreadcrumbContext.Provider value={setBreadcrumbItems}>
        <div style={{ display: recordId ? "none" : "block" }}>
          <TestNotNullScalarsCards />
        </div>
        {recordId && (
          <TestNotNullScalarsCardsEditor
            refetchQueries={["Get_NN_Scalars_List"]}
          />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
