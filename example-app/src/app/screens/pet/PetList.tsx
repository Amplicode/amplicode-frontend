import { ReactNode, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Modal,
  message,
  Card,
  Row,
  Col,
  Form,
  Input,
  Empty,
  List,
  Space,
  Spin
} from "antd";
import { useForm } from "antd/lib/form/Form";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  CloseCircleOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "@amplicode/gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { FetchResult } from "@apollo/client/link/core";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";

const REFETCH_QUERIES = ["Get_Pet_List_With_Filter"];

const PET_BY_IDENTIFICATION_NUMBER_LIST = gql(`
  query Get_Pet_List_With_Filter($identificationNumber: String) {
    petByIdentificationNumberList(identificationNumber: $identificationNumber) {
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
  }
`);

const DELETE_PET = gql(`
  mutation Delete_Pet($id: ID!) {
    deletePet(id: $id)
  }
`);

const initialFilterVars: QueryVariablesType = {};

export function PetList() {
  const [filterVars, setFilterVars] = useState<QueryVariablesType>(
    initialFilterVars
  );

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const { loading, error, data } = useQuery(PET_BY_IDENTIFICATION_NUMBER_LIST, {
    variables: filterVars
  });
  const items = deserialize(data?.petByIdentificationNumberList);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <ButtonPanel />
        <Card>
          <Filters onApplyFilters={setFilterVars} />
        </Card>
        <ListItems items={items} loading={loading} error={error} />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

/**
 * Button panel above
 */
function ButtonPanel() {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <div>
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
    </div>
  );
}

interface FiltersProps {
  onApplyFilters: (filters: QueryVariablesType) => void;
}
function Filters({ onApplyFilters }: FiltersProps) {
  const [form] = useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onApplyFilters}
      initialValues={initialFilterVars}
    >
      <Form.Item shouldUpdate>
        {() => (
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Identification Number"
                name={"identificationNumber"}
              >
                <Input
                  suffix={
                    form.isFieldTouched("identificationNumber") ? (
                      <CloseCircleOutlined
                        onClick={() =>
                          form.resetFields(["identificationNumber"])
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
        )}
      </Form.Item>

      <Space>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="filters.apply" />
        </Button>
        <Button
          onClick={() => {
            form.resetFields();
            onApplyFilters(form.getFieldsValue());
          }}
        >
          <FormattedMessage id="filters.reset" />
        </Button>
      </Space>
    </Form>
  );
}

interface ListItemsProps {
  items?: ItemListType;
  loading?: boolean;
  error?: ApolloError;
}

/**
 * Collection of items
 */
function ListItems({ items, loading, error }: ListItemsProps) {
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
    <Space direction="vertical" className="list-space">
      <List
        itemLayout="horizontal"
        bordered
        dataSource={items}
        renderItem={item => <ListItem item={item} key={item?.id} />}
      />
    </Space>
  );
}

function ListItem({ item }: { item: ItemType }) {
  // Get the action buttons that will be displayed in the row
  const rowActions: ReactNode[] = useRowActions(item);

  if (item == null) {
    return null;
  }

  return (
    <List.Item actions={rowActions}>
      <div className="list-wrapper">
        <ValueWithLabel
          key="identificationNumber"
          label="Identification Number"
          value={item.identificationNumber ?? undefined}
        />
        <ValueWithLabel
          key="birthDate"
          label="Birth Date"
          value={item.birthDate?.format("LL") ?? undefined}
        />
        <ValueWithLabel
          key="type"
          label="Type"
          value={getPetTypeDTODisplayName(item.type ?? undefined)}
        />
        <ValueWithLabel
          key="owner"
          label="Owner"
          value={getOwnerDTODisplayName(item.owner ?? undefined)}
        />
      </div>
    </List.Item>
  );
}

/**
 * Returns action buttons that will be displayed inside the item row.
 */
function useRowActions(item: ItemType): ReactNode[] {
  const intl = useIntl();
  const showDeleteConfirm = useDeleteConfirm(item?.id);

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
    <DeleteOutlined
      key="delete"
      title={intl.formatMessage({ id: "common.remove" })}
      onClick={showDeleteConfirm}
    />
  ];
}

/**
 * Returns a confirmation dialog and invokes delete mutation upon confirmation
 * @param id id of the entity instance that should be deleted
 */
function useDeleteConfirm(id: string | null | undefined) {
  const intl = useIntl();

  const [runDeleteMutation] = useMutation(DELETE_PET);
  const deleteItem = useDeleteItem(id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that deletes the item
  function handleDeleteItem() {
    return deleteItem()
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

  return () =>
    Modal.confirm({
      content: intl.formatMessage({
        id: "EntityListScreen.deleteConfirmation"
      }),
      okText: intl.formatMessage({ id: "common.ok" }),
      cancelText: intl.formatMessage({ id: "common.cancel" }),
      onOk: handleDeleteItem
    });
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_BY_IDENTIFICATION_NUMBER_LIST>;
/**
 * Type of variables used to filter the items list
 */
type QueryVariablesType = VariablesOf<typeof PET_BY_IDENTIFICATION_NUMBER_LIST>;
/**
 * Type of the items list
 */
type ItemListType = QueryResultType["petByIdentificationNumberList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemListType, null | undefined>[0];
