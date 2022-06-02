import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ScalarsTable } from "./ScalarsTable";
import { ScalarsTableEditor } from "./ScalarsTableEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ScalarsTableScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.ScalarsTable" }));

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
          <ScalarsTable />
        </div>
        {recordId && (
          <ScalarsTableEditor refetchQueries={["Get_Scalars_List"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
