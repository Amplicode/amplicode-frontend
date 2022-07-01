import { ReactNode, useState, Dispatch, SetStateAction } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Modal,
  message,
  Row,
  Col,
  Form,
  Input,
  Card,
  Empty,
  Space,
  Spin,
  Pagination,
  Select
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { serializeVariables } from "../../../core/transform/model/serializeVariables";
import {
  DeleteOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getOwnerPageDisplayName } from "../../../core/display-name/getOwnerPageDisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";
import { mergeDeep } from "@apollo/client/utilities";
import { Direction, OwnerOrderByProperty } from "../../../gql/graphql";

const REFETCH_QUERIES = ["Get_Owner_List_With_Filter_Page_Sort"];

const OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED = gql(`
  query Get_Owner_List_With_Filter_Page_Sort($filter: OwnerFilterInput, $page: OffsetPageInput, $sort: [OwnerOrderByInput]) {
  ownerListByNamesFilterOffsetPageSorted(filter: $filter, page: $page, sort: $sort) {
    content {
      id
      firstName
      lastName
      city
      address
      telephone
      email
    }
    totalElements
  }
}
`);

const DELETE_OWNER = gql(`
  mutation Delete_Owner($id: ID!) {
    deleteOwner(id: $id)
  }
`);

const initialVariables: QueryVariablesType = {};

export function OwnerCardsWithFilterSortPage() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.OwnerCardsWithFilterSortPage" })
  );

  const [variables, setVariables] = useState<QueryVariablesType>(
    initialVariables
  );

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const {
    loading,
    error,
    data
  } = useQuery(OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED, { variables });
  const items = deserialize(
    data?.ownerListByNamesFilterOffsetPageSorted?.content
  );

  const [pagination, setPagination] = useState<{
    currect: number;
    pageSize: number;
  }>({
    currect: 1,
    pageSize: 10
  });

  const applyPagination = (currect: number, pageSize: number) => {
    setPagination({
      currect,
      pageSize
    });
    setVariables(
      mergeDeep(variables, {
        page: {
          number: currect - 1,
          size: pageSize
        }
      })
    );
  };

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Card>
          <Filters setVariables={setVariables} />
        </Card>
        <ButtonPanel setVariables={setVariables} />
        <Cards items={items} loading={loading} error={error} />
        <Pagination
          current={pagination?.currect}
          pageSize={pagination?.pageSize}
          onChange={applyPagination}
          showSizeChanger
          total={data?.ownerListByNamesFilterOffsetPageSorted?.totalElements}
        />
      </Space>
    </div>
  );
}

interface ButtonPanelProps {
  setVariables: Dispatch<SetStateAction<QueryVariablesType>>;
}
/**
 * Button panel above the cards
 */
function ButtonPanel({ setVariables }: ButtonPanelProps) {
  const intl = useIntl();
  const navigate = useNavigate();

  const applySort = (sort: string) => {
    if (sort != null) {
      setVariables(variables =>
        mergeDeep(variables, { sort: JSON.parse(sort) })
      );
    }
  };

  return (
    <Row justify="space-between" gutter={[16, 8]}>
      <Col>
        <Space>
          <Button
            htmlType="button"
            key="create"
            title={intl.formatMessage({ id: "common.create" })}
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate("new")}
          >
            <span>
              <FormattedMessage id="common.create" />
            </span>
          </Button>
        </Space>
      </Col>
      <Col>
        <Select
          style={{ minWidth: "220px" }}
          allowClear
          placeholder={intl.formatMessage({ id: "sort.sortBy" })}
          onChange={applySort}
          options={[
            {
              label: (
                <>
                  City (<ArrowDownOutlined />)
                </>
              ),
              value: JSON.stringify({
                direction: Direction.Desc,
                property: OwnerOrderByProperty.City
              })
            },
            {
              label: (
                <>
                  City (<ArrowUpOutlined />)
                </>
              ),
              value: JSON.stringify({
                direction: Direction.Asc,
                property: OwnerOrderByProperty.City
              })
            },
            {
              label: (
                <>
                  First Name (<ArrowDownOutlined />)
                </>
              ),
              value: JSON.stringify({
                direction: Direction.Desc,
                property: OwnerOrderByProperty.FirstName
              })
            },
            {
              label: (
                <>
                  First Name (<ArrowUpOutlined />)
                </>
              ),
              value: JSON.stringify({
                direction: Direction.Asc,
                property: OwnerOrderByProperty.FirstName
              })
            }
          ]}
        />
      </Col>
    </Row>
  );
}

interface FiltersProps {
  setVariables: Dispatch<SetStateAction<QueryVariablesType>>;
}
function Filters({ setVariables }: FiltersProps) {
  const [form] = useForm();

  const onResetFilters = async () => {
    await form.resetFields();
    const filters = await form.validateFields();
    setVariables(variables =>
      mergeDeep(
        variables,
        serializeVariables(
          OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED,
          filters
        )
      )
    );
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={filters =>
        setVariables(variables =>
          mergeDeep(
            variables,
            serializeVariables(
              OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED,
              filters
            )
          )
        )
      }
      initialValues={initialVariables}
    >
      <Form.Item shouldUpdate>
        {() => {
          return (
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item name={["filter", "firstName"]} label="First Name">
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "firstName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "firstName"]])
                          }
                        />
                      ) : (
                        <span />
                      )
                    }
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item name={["filter", "lastName"]} label="Last Name">
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "lastName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "lastName"]])
                          }
                        />
                      ) : (
                        <span />
                      )
                    }
                  />
                </Form.Item>
              </Col>
            </Row>
          );
        }}
      </Form.Item>

      <Space>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="filters.apply" />
        </Button>
        <Button onClick={onResetFilters}>
          <FormattedMessage id="filters.reset" />
        </Button>
      </Space>
    </Form>
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
function Cards({ items, loading, error }: ItemCardsListProps) {
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
    <Space direction="vertical" className="card-space">
      {items.map(item => (
        <ItemCard item={item} key={item?.id} />
      ))}
    </Space>
  );
}

function ItemCard({ item }: { item: ItemType }) {
  // Get the action buttons that will be displayed in the card
  const cardActions: ReactNode[] = useCardActions(item);

  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getOwnerPageDisplayName(item)}
      actions={cardActions}
      className="narrow-layout"
    >
      <ValueWithLabel
        key="firstName"
        label="First Name"
        value={item.firstName ?? undefined}
      />
      <ValueWithLabel
        key="lastName"
        label="Last Name"
        value={item.lastName ?? undefined}
      />
      <ValueWithLabel key="city" label="City" value={item.city ?? undefined} />
      <ValueWithLabel
        key="address"
        label="Address"
        value={item.address ?? undefined}
      />
      <ValueWithLabel
        key="telephone"
        label="Telephone"
        value={item.telephone ?? undefined}
      />
      <ValueWithLabel
        key="email"
        label="Email"
        value={item.email ?? undefined}
      />
    </Card>
  );
}

/**
 * Returns action buttons that will be displayed inside the card.
 */
function useCardActions(item: ItemType): ReactNode[] {
  const intl = useIntl();
  const { showDeleteConfirm, deleting } = useDeleteConfirm(item?.id);

  const navigate = useNavigate();

  return [
    <EditOutlined
      key="edit"
      title={intl.formatMessage({ id: "common.edit" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />,
    deleting ? (
      <LoadingOutlined />
    ) : (
      <DeleteOutlined
        key="delete"
        title={intl.formatMessage({ id: "common.remove" })}
        onClick={showDeleteConfirm}
      />
    )
  ];
}

/**
 * Returns a confirmation dialog and invokes delete mutation upon confirmation
 * @param id id of the entity instance that should be deleted
 */
function useDeleteConfirm(id: string | null | undefined) {
  const intl = useIntl();

  const [runDeleteMutation, { loading }] = useMutation(DELETE_OWNER);
  const deleteItem = useDeleteItem(id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that deletes the item
  function handleDeleteItem() {
    deleteItem()
      .then(({ errors }: FetchResult) => {
        if (errors == null || errors.length === 0) {
          return handleDeleteSuccess();
        }
        return handleDeleteGraphQLError(errors);
      })
      .catch(handleDeleteNetworkError);
  }

  // Function that is executed when mutation is successful
  function handleDeleteSuccess() {
    return message.success(
      intl.formatMessage({ id: "EntityDetailsScreen.deletedSuccessfully" })
    );
  }

  // Function that is executed when mutation results in a GraphQL error
  function handleDeleteGraphQLError(
    errors: ReadonlyArray<GraphQLError> | undefined
  ) {
    console.error(errors);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  // Function that is executed when mutation results in a network error (such as 4xx or 5xx)
  function handleDeleteNetworkError(error: Error | ApolloError) {
    console.error(error);
    return message.error(intl.formatMessage({ id: "common.requestFailed" }));
  }

  return {
    showDeleteConfirm: () =>
      Modal.confirm({
        content: intl.formatMessage({
          id: "EntityListScreen.deleteConfirmation"
        }),
        okText: intl.formatMessage({ id: "common.ok" }),
        cancelText: intl.formatMessage({ id: "common.cancel" }),
        onOk: handleDeleteItem
      }),
    deleting: loading
  };
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<
  typeof OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED
>;
/**
 * Type of variables used to filter the items list
 */
type QueryVariablesType = VariablesOf<
  typeof OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED
>;
/**
 * Type of the items list
 */
type ItemListType = Exclude<
  QueryResultType["ownerListByNamesFilterOffsetPageSorted"],
  null | undefined
>["content"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
