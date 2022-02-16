import {gql} from "../../../gql";
import {ResultOf} from "@graphql-typed-document-node/core";
import {guessDisplayName, useScreens} from "@amplicode/react-core";
import {useMutation, useQuery} from "@apollo/client";
import {Card, Empty, Space, Spin} from "antd";
import {ValueWithLabel} from "../../../core/crud/ValueWithLabel";
import { CreateButton } from "../../../core/crud/CreateButton";
import { CloseScreenButton } from "../../../core/crud/CloseScreenButton";
import {useOpenItemScreen} from "../../../core/crud/useOpenItemScreen";
import {PetEditor} from "./PetEditor";
import {useDeleteItem} from "../../../core/crud/useDeleteItem";
import {useSelectItem} from "../../../core/crud/useSelectItem";
import {SelectIconButton} from "../../../core/crud/SelectIconButton";
import {EditIconButton} from "../../../core/crud/EditIconButton";
import {DeleteIconButton} from "../../../core/crud/DeleteIconButton";
import {ApolloError} from "@apollo/client/errors";
import * as React from "react";
import {RequestFailedError} from "../../../core/crud/RequestFailedError";
import {useRouteMatch} from "react-router-dom";
import {ReactNode} from "react";

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


export function PetList({ onSelect }: EntityListScreenProps<ItemType>) {
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
        <ButtonPanel onSelect={onSelect} />
        <Cards
          items={items}
          loading={loading}
          error={error}
          onSelect={onSelect}
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

interface ButtonPanelProps {
  onSelect?: (item: ItemType) => void;
}

/**
 * Button panel above the cards
 */
function ButtonPanel({onSelect}: ButtonPanelProps) {
  // A callback that will open an empty editor form so that a new entity instance can be created
  const openEmptyEditor = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetEditor,
    screenCaptionKey: 'screen.PetEditor',
    refetchQueries: REFETCH_QUERIES
  });

  if (onSelect != null) {
    // Lookup mode
    return (
      <div>
        <CloseScreenButton />
      </div>
    );
  }

  return (
    <div>
      <CreateButton onClick={openEmptyEditor} />
    </div>
  );
}

interface ItemCardsListProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
  onSelect?: (item: ItemType) => void;
}

/**
 * Collection of cards, each card representing an item
 */
function Cards({items, loading, error, onSelect}: ItemCardsListProps) {
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
                    onSelect={onSelect}
          />
        ))
      }
    </Space>
  );
}

interface ItemCardProps {
  item: ItemType;
  /**
   * Passed when the entity list screen is used as a lookup screen.
   * In this case there will be a `Close` button above the cards, and `Select` button in each card.
   * Otherwise there will be a `Create` button above the cards, and `Edit` and `Delete` buttons in each card.
   *
   * @param item this card's item
   */
  onSelect?: (item: ItemType) => void;
}

function ItemCard({item, onSelect}: ItemCardProps) {
  // Get the action buttons that will be displayed in the card
  const cardActions: ReactNode[] = useCardActions({onSelect, item});

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

interface CardActionParams {
  item: ItemType;
  onSelect?: (item: ItemType) => void;
}

/**
 * Returns a Select button in lookup mode, and Edit and Delete buttons otherwise.
 * We are using a hook instead of a component here because `actions` prop of `Card` component
 * expects an array of ReactNodes.
 */
function useCardActions(
  {onSelect, item}: CardActionParams
): ReactNode[] {
  // Callback that opens an editor either for creating or for editing an item
  // depending on whether `item` is provided
  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetEditor,
    screenCaptionKey: 'screenPetEditor',
    refetchQueries: REFETCH_QUERIES,
    id: item?.id
  });

  const [runDeleteMutation] = useMutation(DELETE_PET);
  // Callback that deletes the item
  const deleteItem = useDeleteItem(item?.id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that executes `onSelect` on this item
  const selectItem = useSelectItem(item, onSelect);

  if (onSelect != null) {
    // Lookup mode
    return [<SelectIconButton onClick={selectItem} />];
  }

  // Default mode
  return [
    <EditIconButton onClick={openItem} />,
    <DeleteIconButton onClick={deleteItem} />
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

interface EntityListScreenProps<TItem> {
  onSelect?: (item: TItem) => void;
}
