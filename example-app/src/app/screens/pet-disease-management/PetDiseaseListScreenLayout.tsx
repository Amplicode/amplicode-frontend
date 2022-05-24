import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PetDiseaseList } from "./PetDiseaseList";
import { PetDiseaseListEditor } from "./PetDiseaseListEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function PetDiseaseListScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.PetDiseaseList" }));

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
          <PetDiseaseList />
        </div>
        {recordId && (
          <PetDiseaseListEditor refetchQueries={["Get_Pet_Disease_List"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
