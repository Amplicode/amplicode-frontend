import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyScalarsList } from "./ReadOnlyScalarsList";
import { ReadOnlyScalarsListDetails } from "./ReadOnlyScalarsListDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyScalarsListScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.ReadOnlyScalarsList" }));

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
          <ReadOnlyScalarsList />
        </div>
        {recordId && <ReadOnlyScalarsListDetails />}
      </BreadcrumbContext.Provider>
    </>
  );
}
