import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyPetTable } from "./ReadOnlyPetTable";
import { ReadOnlyPetTableDetails } from "./ReadOnlyPetTableDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyPetTableScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.ReadOnlyPetTable" }));

  const { recordId } = useParams();
  const [breadcrumbItems, setBreadcrumbItems] = useState<string[]>([]);

  return (
    <>
      {recordId && (
        <Breadcrumb>
          {breadcrumbItems.map(item => (
            <Breadcrumb.Item>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
      )}

      <BreadcrumbContext.Provider
        value={{ breadcrumbItems, setBreadcrumbItems }}
      >
        <div style={{ display: recordId ? "none" : "block" }}>
          <ReadOnlyPetTable />
        </div>
        {recordId && (
          <ReadOnlyPetTableDetails refetchQueries={["Get_Pet_List"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
