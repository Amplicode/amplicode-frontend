import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PetTable } from "./PetTable";
import { PetTableEditor } from "./PetTableEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function PetTableScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.PetTable" }));

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
          <PetTable />
        </div>
        {recordId && (
          <PetTableEditor refetchQueries={["Get_Pet_List_With_Filter"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
