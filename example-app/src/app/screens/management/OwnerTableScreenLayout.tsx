import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerTable } from "./OwnerTable";
import { OwnerTableEditor } from "./OwnerTableEditor";
import { BreadcrumbContext, BreadcrumbItem } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerTableScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.OwnerTable" }));

  const { recordId } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<BreadcrumbItem[]>([]);

  return (
    <>
      {recordId && (
        <Breadcrumb className="crud-screen-breadcrumb">
          {breadcrumbItems.map(item => (
            <Breadcrumb.Item>{item.caption}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <BreadcrumbContext.Provider value={{breadcrumbItems, setBreadcrumbItems}}>
        <div style={{ display: recordId ? "none" : "block" }}>
          <OwnerTable />
        </div>
        {recordId && <OwnerTableEditor refetchQueries={["Get_Owner_List"]} />}
      </BreadcrumbContext.Provider>
    </>
  );
}
