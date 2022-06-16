import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerTableWithMultiselect } from "./OwnerTableWithMultiselect";
import { OwnerTableWithMultiselectEditor } from "./OwnerTableWithMultiselectEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerTableWithMultiselectScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.OwnerTableWithMultiselect" }));

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
          <OwnerTableWithMultiselect />
        </div>
        {recordId && (
          <OwnerTableWithMultiselectEditor
            refetchQueries={["Get_Owner_List"]}
          />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
