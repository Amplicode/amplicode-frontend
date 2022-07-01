import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerTableWithFilterSortPage } from "./OwnerTableWithFilterSortPage";
import { OwnerTableWithFilterSortPageEditor } from "./OwnerTableWithFilterSortPageEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerTableWithFilterSortPageScreenLayout() {
  const intl = useIntl();
  usePageTitle(
    intl.formatMessage({ id: "screen.OwnerTableWithFilterSortPage" })
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
          <OwnerTableWithFilterSortPage />
        </div>
        {recordId && (
          <OwnerTableWithFilterSortPageEditor
            refetchQueries={["Get_Owner_List_With_Filter_Page_Sort"]}
          />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
