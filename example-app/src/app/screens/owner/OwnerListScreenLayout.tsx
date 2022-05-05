import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { OwnerList } from "./OwnerList";
import { OwnerListEditor } from "./OwnerListEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function OwnerListScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.OwnerList" }));

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
          <OwnerList />
        </div>
        {recordId && <OwnerListEditor refetchQueries={["Get_Owner_List"]} />}
      </BreadcrumbContext.Provider>
    </>
  );
}
