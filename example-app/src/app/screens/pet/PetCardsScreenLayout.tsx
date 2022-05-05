import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb } from "antd";
import { PetCards } from "./PetCards";
import { PetCardsEditor } from "./PetCardsEditor";
import { BreadcrumbContext } from "../../../core/screen/BreadcrumbContext";
import { usePageTitle } from "../../../core/screen/usePageTitle";
import { useIntl } from "react-intl";

export function PetCardsScreenLayout() {
  const intl = useIntl();
  usePageTitle(intl.formatMessage({ id: "screen.PetCards" }));

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
          <PetCards />
        </div>
        {recordId && (
          <PetCardsEditor refetchQueries={["Get_Pet_List_With_Filter"]} />
        )}
      </BreadcrumbContext.Provider>
    </>
  );
}
