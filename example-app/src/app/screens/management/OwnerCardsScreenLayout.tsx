import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerCards } from "./OwnerCards";
import { OwnerCardsEditor } from "./OwnerCardsEditor";
import { BreadcrumbItem, BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerCardsScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.OwnerCards" }));

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
          <OwnerCards />
        </div>
        {recordId && <OwnerCardsEditor refetchQueries={["Get_Owner_List"]} />}
      </BreadcrumbContext.Provider>
    </>
  );
}
