import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { ReadOnlyPetDiseaseList } from "./ReadOnlyPetDiseaseList";
import { ReadOnlyPetDiseaseListDetails } from "./ReadOnlyPetDiseaseListDetails";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function ReadOnlyPetDiseaseListScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.ReadOnlyPetDiseaseList" }));

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
          <ReadOnlyPetDiseaseList />
        </div>
        {recordId && <ReadOnlyPetDiseaseListDetails />}
      </BreadcrumbContext.Provider>
    </>
  );
}
