import {gql} from "../../../gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {guessDisplayName, useScreens} from "@amplicode/react-core";
import {useMutation, useQuery} from "@apollo/client";
import {Button, Card, Empty, Space, Spin} from "antd";
import {ValueWithLabel} from "../../../core/crud/ValueWithLabel";
import {useOpenItemScreen} from "../../../core/crud/useOpenItemScreen";
import {PetEditor} from "./PetEditor";
import {useDeleteItem} from "../../../core/crud/useDeleteItem";
import {ApolloError} from "@apollo/client/errors";
import * as React from "react";
import {RequestFailedError} from "../../../core/crud/RequestFailedError";
import {useRouteMatch} from "react-router-dom";
import {ReactNode} from "react";
import {DeleteOutlined, EditOutlined, PlusOutlined} from "@ant-design/icons";
import {FormattedMessage, useIntl} from "react-intl";

const ROUTE = 'pet-list';
const REFETCH_QUERIES = ['Get_Pet_List'];

const GET_PET_LIST = gql(/* GraphQL */ `
    query Get_Pet_List {
        petList {
            id
            identificationNumber
            owner {
                firstName
                lastName
            }
        }
    }
`);

const DELETE_PET = gql(/* GraphQL */ `
    mutation Delete_Pet($id: BigInteger!) {
        delete_Pet(id: $id)
    }
`);


export function PetList() {
  // Load the items from server
  const { loading, error, data } = useQuery(GET_PET_LIST);
  const items = data?.petList;

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className='narrow-layout'>
      <Space direction='vertical'
             style={{width: '100%'}}
      >
        <ButtonPanel />
        <Cards
          items={items}
          loading={loading}
          error={error}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

/**
 * Checks whether the url contains the item id, and if yes - open item editor/details screen.
 */
function useItemUrl() {
  const screens = useScreens();
  const match = useRouteMatch<{ id: string }>(`/${ROUTE}/:id`);

  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetEditor,
    screenCaptionKey: 'screen.PetEditor',
    refetchQueries: REFETCH_QUERIES,
    id: match?.params.id
  })

  if (
    screens.activeTab?.breadcrumbs.length === 1 &&
    match?.params.id != null
  ) {
    openItem();
  }
}

/**
 * Button panel above the cards
 */
function ButtonPanel() {
  const intl = useIntl();

  // A callback that will open an empty editor form so that a new entity instance can be created
  const openEmptyEditor = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetEditor,
    screenCaptionKey: 'screen.PetEditor',
    refetchQueries: REFETCH_QUERIES
  });

  return (
    <div>
      <Button
        htmlType="button"
        key="create"
        title={intl.formatMessage({id: "common.create"})}
        type="primary"
        icon={<PlusOutlined />}
        onClick={openEmptyEditor}
      >
      <span>
        <FormattedMessage id="common.create" />
      </span>
      </Button>
    </div>
  );
}

interface ItemCardsListProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({items, loading, error}: ItemCardsListProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return (
      <RequestFailedError />
    );
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  return (
    <Space direction='vertical'
           style={{width: '100%'}}
    >
      {
        items.map((item) => (
          <ItemCard item={item}
                    key={item?.id}
          />
        ))
      }
    </Space>
  );
}

function ItemCard({item}: {item: ItemType}) {
  // Get the action buttons that will be displayed in the card
  const cardActions: ReactNode[] = useCardActions({item});

  if (item == null) {
    return null;
  }

  return (
    <Card key={item.id}
          title={guessDisplayName(item)}
          actions={cardActions}
          className="narrow-layout"
    >
      <CardFields item={item} />
    </Card>
  );
}

function CardFields({item}: {item: ItemType}) {
  if (item == null) {
    return null;
  }

  return (
    <>
      <ValueWithLabel key='identificationNumber'
                      label='Identification Number'
                      value={item.identificationNumber ?? undefined}
      />
      <ValueWithLabel key='owner'
                      label='Owner'
                      value={guessDisplayName(item.owner ?? undefined)}
      />
    </>
  );
}

/**
 * Returns a Select button in lookup mode, and Edit and Delete buttons otherwise.
 * We are using a hook instead of a component here because `actions` prop of `Card` component
 * expects an array of ReactNodes.
 */
function useCardActions({item}: {item: ItemType}): ReactNode[] {
  const intl = useIntl();

  // Callback that opens an editor either for creating or for editing an item
  // depending on whether `item` is provided
  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetEditor,
    screenCaptionKey: 'screen.PetEditor',
    refetchQueries: REFETCH_QUERIES,
    id: item?.id
  });

  const [runDeleteMutation] = useMutation(DELETE_PET);
  // Callback that deletes the item
  const deleteItem = useDeleteItem(item?.id, runDeleteMutation, REFETCH_QUERIES);

  // Default mode
  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={openItem}
    />,
    <DeleteOutlined
      key="delete"
      title={intl.formatMessage({ id: "common.remove" })}
      onClick={deleteItem}
    />
  ];
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof GET_PET_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType['petList'];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
