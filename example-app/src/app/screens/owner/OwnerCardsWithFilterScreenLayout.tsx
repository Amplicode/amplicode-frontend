import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerCardsWithFilter } from "./OwnerCardsWithFilter";
import { OwnerCardsWithFilterEditor } from "./OwnerCardsWithFilterEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerCardsWithFilterScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.OwnerCardsWithFilter" }));

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
          <OwnerCardsWithFilter />
        </div>
        {recordId && (
          <OwnerCardsWithFilterEditor
            refetchQueries={["Get_Owner_List_With_Filter"]}
          />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
