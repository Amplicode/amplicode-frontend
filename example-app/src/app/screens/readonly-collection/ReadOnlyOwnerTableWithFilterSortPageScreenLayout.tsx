import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyOwnerTableWithFilterSortPage } from "./ReadOnlyOwnerTableWithFilterSortPage";
import { ReadOnlyOwnerTableWithFilterSortPageDetails } from "./ReadOnlyOwnerTableWithFilterSortPageDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyOwnerTableWithFilterSortPageScreenLayout() {
  const intl = useIntl();
  usePageTitle(
    intl.formatMessage({ id: "screen.ReadOnlyOwnerTableWithFilterSortPage" })
  );

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
          <ReadOnlyOwnerTableWithFilterSortPage />
        </div>
        {recordId && <ReadOnlyOwnerTableWithFilterSortPageDetails />}
      </BreadcrumbContext.Provider>
    </>
  );
}
