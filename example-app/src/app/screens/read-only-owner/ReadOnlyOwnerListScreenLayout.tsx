import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyOwnerList } from "./ReadOnlyOwnerList";
import { ReadOnlyOwnerListDetails } from "./ReadOnlyOwnerListDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyOwnerListScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.ReadOnlyOwnerList" }));

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
          <ReadOnlyOwnerList />
        </div>
        {recordId && (
          <ReadOnlyOwnerListDetails refetchQueries={["Get_Owner_List"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
