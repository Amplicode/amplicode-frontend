import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyOwnerListWithFilterSortPage } from "./ReadOnlyOwnerListWithFilterSortPage";
import { ReadOnlyOwnerListWithFilterSortPageDetails } from "./ReadOnlyOwnerListWithFilterSortPageDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyOwnerListWithFilterSortPageScreenLayout() {
  const intl = useIntl();
  usePageTitle(
    intl.formatMessage({ id: "screen.ReadOnlyOwnerListWithFilterSortPage" })
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
          <ReadOnlyOwnerListWithFilterSortPage />
        </div>
        {recordId && <ReadOnlyOwnerListWithFilterSortPageDetails />}
      </BreadcrumbContext.Provider>
    </>
  );
}
