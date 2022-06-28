import { useState } from "react";
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
  Space,
  Spin,
  Table
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { PlusOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { GraphQLError } from "graphql/error/GraphQLError";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetDescriptionDTODisplayName } from "../../../core/display-name/getPetDescriptionDTODisplayName";
import { getTagDTODisplayName } from "../../../core/display-name/getTagDTODisplayName";
import { getPetDiseaseDTODisplayName } from "../../../core/display-name/getPetDiseaseDTODisplayName";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";
import {useDeletePetMutation, useGetPetListWithFilterQuery} from "../../../api/generatedApi";

const REFETCH_QUERIES = ["Get_Pet_List_With_Filter"];

// TODO generation doesn't work properly with Get_Pet_List_With_Filter
const PET_BY_IDENTIFICATION_NUMBER_LIST = gql(`
  query GetPetListWithFilter($identificationNumber: String) {
    petByIdentificationNumberList(identificationNumber: $identificationNumber) {
      __typename
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
      description {
        identifier
        description
      }
      tags {
        id
        name
      }
      diseases {
        petDiseaseIdentifier
        name
        description
      }
    }
  }
`);

const DELETE_PET = gql(`
  mutation DeletePet($id: ID!) {
    deletePet(id: $id)
  }
`);

const columns = [
  {
    title: "Identification Number",
    dataIndex: "identificationNumber",
    key: "identificationNumber"
  },
  {
    title: "Birth Date",
    dataIndex: "birthDate",
    key: "birthDate"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags"
  },
  {
    title: "Diseases",
    dataIndex: "diseases",
    key: "diseases"
  }
];

const initialFilterVars: QueryVariablesType = {};

export function PetTable() {
  const intl = useIntl();
  useBreadcrumbItem(intl.formatMessage({ id: "screen.PetTable" }));

  const [filterVars, setFilterVars] = useState<QueryVariablesType>(
    initialFilterVars
  );

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const { isLoading, error, data } = useGetPetListWithFilterQuery(filterVars);
  const items = deserialize(data?.petByIdentificationNumberList);

  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <ButtonPanel selectedRowId={selectedRowId} />
        <Card>
          <Filters onApplyFilters={setFilterVars} />
        </Card>
        <TableSection
          items={items}
          loading={isLoading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        {/* <Pagination /> - in future */}
      </Space>
    </div>
  );
}

/**
 * Button panel above
 */
function ButtonPanel({ selectedRowId }: { selectedRowId?: string }) {
  const intl = useIntl();
  const navigate = useNavigate();

  const { showDeleteConfirm, deleting } = useDeleteConfirm(selectedRowId!);

  return (
    <Space direction="horizontal">
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

      <Button
        htmlType="button"
        key="edit"
        title={intl.formatMessage({ id: "common.edit" })}
        disabled={selectedRowId == null}
        onClick={() => selectedRowId && navigate(selectedRowId)}
      >
        <span>
          <FormattedMessage id="common.edit" />
        </span>
      </Button>

      <Button
        htmlType="button"
        key="remove"
        title={intl.formatMessage({ id: "common.remove" })}
        disabled={selectedRowId == null}
        loading={deleting}
        onClick={showDeleteConfirm}
      >
        <span>
          <FormattedMessage id="common.remove" />
        </span>
      </Button>
    </Space>
  );
}

/**
 * Returns a confirmation dialog and invokes delete mutation upon confirmation
 * @param id id of the entity instance that should be deleted
 */
function useDeleteConfirm(id: string | null | undefined) {
  const intl = useIntl();

  const [runDeleteMutation, { isLoading }] = useDeletePetMutation();
  const deleteItem = useDeleteItem(id, runDeleteMutation, REFETCH_QUERIES);

  // Callback that deletes the item
  const handleDeleteItem = () => {
    deleteItem()
      .then(({ errors }: any) => {
        if (errors == null || errors.length === 0) {
          return handleDeleteSuccess();
        }
        return handleDeleteGraphQLError(errors);
      })
      .catch(handleDeleteNetworkError);
  };

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
  function handleDeleteNetworkError(error: Error | any) {
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
    deleting: isLoading
  };
}

interface FiltersProps {
  onApplyFilters: (filters: QueryVariablesType) => void;
}
function Filters({ onApplyFilters }: FiltersProps) {
  const [form] = useForm();

  const onResetFilters = async () => {
    await form.resetFields();
    const values = await form.validateFields();
    onApplyFilters(values);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onApplyFilters}
      initialValues={initialFilterVars}
    >
      <Form.Item shouldUpdate>
        {() => {
          return (
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item
                  name="identificationNumber"
                  label="Identification Number"
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

interface TableSectionProps {
  items?: ItemTableType;
  loading?: boolean;
  error?: any;
  selectedRowId?: string;
  setSelectedRowId: (id: any) => any;
}

/**
 * Collection of items
 */
function TableSection({
  items,
  loading,
  error,
  selectedRowId,
  setSelectedRowId
}: TableSectionProps) {
  if (loading) {
    return <Spin />;
  }

  if (error) {
    return <RequestFailedError />;
  }

  if (items == null || items.length === 0) {
    return <Empty />;
  }

  const dataSource = items
    .filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item,
      ...{
        birthDate: item!.birthDate?.format("LL") ?? undefined,
        type: getPetTypeDTODisplayName(item!.type ?? undefined),
        owner: getOwnerDTODisplayName(item!.owner ?? undefined),
        description: getPetDescriptionDTODisplayName(
          item!.description ?? undefined
        ),
        tags:
          item &&
          item.tags &&
          item.tags
            .map(entry => getTagDTODisplayName(entry))
            .filter(entry => entry !== "")
            .join(", "),
        diseases:
          item &&
          item.diseases &&
          item.diseases
            .map(entry => getPetDiseaseDTODisplayName(entry))
            .filter(entry => entry !== "")
            .join(", ")
      }
    }));

  return (
    <Space direction="vertical" className="table-space entity-table">
      <Table
        dataSource={dataSource as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return {
            onClick: () => {
              const id = (data as ItemType)?.id;
              setSelectedRowId(id === selectedRowId ? null : id);
            }
          };
        }}
        scroll={{ x: true }}
      />
    </Space>
  );
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
type ItemTableType = QueryResultType["petByIdentificationNumberList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
