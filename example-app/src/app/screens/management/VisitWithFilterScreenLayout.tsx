import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { VisitWithFilter } from "./VisitWithFilter";
import { VisitWithFilterEditor } from "./VisitWithFilterEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function VisitWithFilterScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.VisitWithFilter" }));

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
          <VisitWithFilter />
        </div>
        {recordId && (
          <VisitWithFilterEditor
            refetchQueries={["Get_Visit_List_With_Filter"]}
          />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
