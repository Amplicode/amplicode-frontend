import { ReactNode, useMemo, useState, useCallback } from "react";
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
  Badge
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { serializeVariables } from "../../../core/transform/model/serializeVariables";
import { DatePicker } from "@amplicode/react";
import {
  DeleteOutlined,
  LoadingOutlined,
  EditOutlined,
  PlusOutlined,
  CloseCircleOutlined,
  UpOutlined,
  DownOutlined
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
import { getVisitDTODisplayName } from "../../../core/display-name/getVisitDTODisplayName";
import { getPetDTODisplayName } from "../../../core/display-name/getPetDTODisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";
import { NamePath } from "antd/lib/form/interface";
import { mergeDeep } from "@apollo/client/utilities";

const REFETCH_QUERIES = ["Get_Visit_List_With_Filter"];

const VISIT_FILTERED_LIST = gql(`
  query Get_Visit_List_With_Filter($filter: VisitFilterInput) {
  visitFilteredList(filter: $filter) {
    description
    id
    pet {
      id
      identificationNumber
      birthDate
      type {
        id
        name
      }
      owner {
        id
        firstName
        lastName
      }
    }
    visitEnd
    visitStart
  }
}
`);

const DELETE_VISIT = gql(`
  mutation Delete_Visit($id: ID!) {
  deleteVisit(id: $id)
}
`);

const initialQueryVariables: QueryVariablesType = {};

export function VisitWithFilter() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.VisitWithFilter" }));

  const [queryVariables, setQueryVariables] = useState<QueryVariablesType>(
    initialQueryVariables
  );

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const { loading, error, data } = useQuery(VISIT_FILTERED_LIST, {
    variables: queryVariables
  });

  const mergeQueryVariales = useCallback(
    (newQueryVariables: QueryVariablesType) => {
      setQueryVariables(queryVariables =>
        mergeDeep(queryVariables, newQueryVariables)
      );
    },
    []
  );

  const items = useMemo(() => deserialize(data?.visitFilteredList), [
    data?.visitFilteredList
  ]);

  const applyFilters = useCallback(
    (filters: QueryVariablesType) => {
      mergeQueryVariales(serializeVariables(VISIT_FILTERED_LIST, filters));
    },
    [mergeQueryVariales]
  );

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Card>
          <Filters onApplyFilters={applyFilters} />
        </Card>
        <ButtonPanel />
        <Cards items={items} loading={loading} error={error} />
      </Space>
    </div>
  );
}

/**
 * Button panel above the cards
 */
function ButtonPanel() {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
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
  );
}

const couldBeHiddenFilters: NamePath[] = [
  ["filter", "petIdentificationNumber"]
];

interface FiltersProps {
  onApplyFilters: (queryVariables: QueryVariablesType) => void;
}
function Filters({ onApplyFilters }: FiltersProps) {
  const [form] = useForm();

  const [showAll, setShowAll] = useState(false);

  const [countHiddenTouchedFilters, setCountHiddenTouchedFilters] = useState(0);
  const [countHiddenInvalideFilters, setCountHiddenInvalideFilters] = useState(
    0
  );

  const onResetFilters = async () => {
    await form.resetFields();
    const filters = await form.validateFields();
    onApplyFilters(filters);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onApplyFilters}
      initialValues={initialQueryVariables}
    >
      <Form.Item shouldUpdate>
        {() => {
          const newCountHiddenTouchedFilters = showAll
            ? 0
            : couldBeHiddenFilters.filter(filterName =>
                form.isFieldTouched(filterName)
              ).length;
          if (newCountHiddenTouchedFilters !== countHiddenTouchedFilters) {
            setCountHiddenTouchedFilters(newCountHiddenTouchedFilters);
          }

          const newCountHiddenInvalideFilters = showAll
            ? 0
            : couldBeHiddenFilters.filter(
                filterName => form.getFieldError(filterName).length > 0
              ).length;
          if (newCountHiddenInvalideFilters !== countHiddenInvalideFilters) {
            setCountHiddenInvalideFilters(newCountHiddenInvalideFilters);
          }

          return (
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name={["filter", "ownerFirstName"]}
                  label="Owner First Name"
                >
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "ownerFirstName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "ownerFirstName"]])
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
                <Form.Item
                  name={["filter", "ownerLastName"]}
                  label="Owner Last Name"
                >
                  <Input
                    suffix={
                      form.isFieldTouched(["filter", "ownerLastName"]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([["filter", "ownerLastName"]])
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
                <Form.Item
                  name={["filter", "visitStartAfter"]}
                  label="Visit Start After"
                >
                  <DatePicker showTime={{ format: "HH:mm:ss" }} />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  name={["filter", "visitStartBefore"]}
                  label="Visit Start Before"
                >
                  <DatePicker showTime={{ format: "HH:mm:ss" }} />
                </Form.Item>
              </Col>

              <Col span={6} style={{ display: showAll ? "block" : "none" }}>
                <Form.Item
                  name={["filter", "petIdentificationNumber"]}
                  label="Pet Identification Number"
                >
                  <Input
                    suffix={
                      form.isFieldTouched([
                        "filter",
                        "petIdentificationNumber"
                      ]) ? (
                        <CloseCircleOutlined
                          onClick={() =>
                            form.resetFields([
                              ["filter", "petIdentificationNumber"]
                            ])
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

      <Row justify="space-between">
        <Col>
          <Space>
            <Button type="primary" htmlType="submit">
              <FormattedMessage id="filters.apply" />
            </Button>
            <Button onClick={onResetFilters}>
              <FormattedMessage id="filters.reset" />
            </Button>
          </Space>
        </Col>

        <Col>
          <Button type="link" onClick={() => setShowAll(!showAll)}>
            <Space>
              <FormattedMessage
                id={showAll ? "filters.collapse" : "filters.showAll"}
              />
              {countHiddenInvalideFilters > 0 && (
                <Badge
                  style={{ backgroundColor: "#FF4D4F" }}
                  size="small"
                  count={countHiddenInvalideFilters}
                />
              )}
              {countHiddenInvalideFilters === 0 &&
                countHiddenTouchedFilters > 0 && (
                  <Badge
                    style={{ backgroundColor: "#1890ff" }}
                    size="small"
                    count={countHiddenTouchedFilters}
                  />
                )}
              {showAll ? <UpOutlined /> : <DownOutlined />}
            </Space>
          </Button>
        </Col>
      </Row>
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
      title={getVisitDTODisplayName(item)}
      actions={cardActions}
      className="narrow-layout"
    >
      <ValueWithLabel
        key="description"
        label="Description"
        value={item.description ?? undefined}
      />
      <ValueWithLabel
        key="pet"
        label="Pet"
        value={getPetDTODisplayName(item.pet ?? undefined)}
      />
      <ValueWithLabel
        key="visitEnd"
        label="Visit End"
        value={item.visitEnd?.format("LLL") ?? undefined}
      />
      <ValueWithLabel
        key="visitStart"
        label="Visit Start"
        value={item.visitStart?.format("LLL") ?? undefined}
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

  const [runDeleteMutation, { loading }] = useMutation(DELETE_VISIT);
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
type QueryResultType = ResultOf<typeof VISIT_FILTERED_LIST>;
/**
 * Type of variables used to filter the items list
 */
type QueryVariablesType = VariablesOf<typeof VISIT_FILTERED_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["visitFilteredList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
