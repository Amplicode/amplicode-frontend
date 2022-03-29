import React, { useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import { Button, Card, Empty, Space, Spin } from "antd";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { CloseOutlined } from "@ant-design/icons";
import { useScreens } from "@amplicode/react-core";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";

const PET_TYPE_LIST = gql(`
  query Get_Pet_Type_List {
    petTypeList {
      id, 
      name
    }
  }
`);

interface PetTypeLookupProps {
  onSelect?: (entityInstance: Record<string, unknown>) => {};
}

export function PetTypeLookup(props: PetTypeLookupProps) {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_TYPE_LIST);
  const items = data?.petTypeList;

  const screens = useScreens();
  const goToParentScreen = useCallback(() => {
    screens.closeActiveBreadcrumb();
  }, [screens]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <ButtonPanel goToParentScreen={goToParentScreen} />
        <Cards
          items={items}
          loading={loading}
          error={error}
          onSelect={item => {
            props.onSelect != null && props.onSelect(item);
            goToParentScreen();
          }}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

interface ButtonPanelProps {
  goToParentScreen: () => void;
}

/**
 * Button panel above
 */
function ButtonPanel(props: ButtonPanelProps) {
  const intl = useIntl();

  return (
    <div>
      <Button
        htmlType="button"
        key="close"
        title={intl.formatMessage({ id: "common.close" })}
        icon={<CloseOutlined />}
        onClick={props.goToParentScreen}
      >
        <span>
          <FormattedMessage id="common.close" />
        </span>
      </Button>
    </div>
  );
}

interface ItemCardsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({ items, loading, error, onSelect }: ItemCardsProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <RequestFailedError />;
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  return (
    <Space direction="vertical" className="lookup-cards card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} onSelect={onSelect} />
      ))}
    </Space>
  );
}

interface ItemCardProps {
  item: ItemType;
  onSelect: (entityInstance: Record<string, unknown>) => void;
}

function ItemCard({ item, onSelect }: ItemCardProps) {
  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getPetTypeDTODisplayName(item)}
      className="narrow-layout"
      onClick={() => onSelect(item)}
    >
      <ValueWithLabel key="name" label="Name" value={item.name ?? undefined} />
    </Card>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_TYPE_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petTypeList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
