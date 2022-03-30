import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf } from "@graphql-typed-document-node/core";
import {
  Button,
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
import { PlusOutlined } from "@ant-design/icons";
import { useRouteMatch } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { useScreens } from "@amplicode/react-core";
import { gql } from "@amplicode/gql";
import { PetTableEditor } from "./PetTableEditor";
import { useOpenItemScreen } from "../../../core/crud/useOpenItemScreen";
import { useDeleteItem } from "../../../core/crud/useDeleteItem";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
import { getPetTypeDTODisplayName } from "../../../core/display-name/getPetTypeDTODisplayName";

const ROUTE = "pet-table";
const REFETCH_QUERIES = ["Get_Pet_List"];

const PET_LIST = gql(`
  query Get_Pet_List {
    petList {
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

const DELETE__PET = gql(`
  mutation Delete_Pet($id: BigInteger!) {
    delete_Pet(id: $id)
  }
`);

const columns = [
  {
    title: "Birth Date",
    dataIndex: "birthDate",
    key: "birthDate"
  },
  {
    title: "Identification Number",
    dataIndex: "identificationNumber",
    key: "identificationNumber"
  },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner"
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type"
  }
];

export function PetTable() {
  // Load the items from server
  const { loading, error, data } = useQuery(PET_LIST);
  const items = data?.petList;
  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  // If we have navigated here using a link, or a page has been refreshed,
  // we need to check whether the url contains the item id, and if yes - open item editor/details screen.
  useItemUrl();

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <ButtonPanel selectedRowId={selectedRowId} />
        <Card>
          <Filters
            // TODO define when we will know about graphQL filters API
            // eslint-disable-next-line no-console
            onApplyFilters={filters => console.log(filters)}
            onErrorFilters={error => console.error(error)}
          />
        </Card>
        <TableSection
          items={items}
          loading={loading}
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
 * Checks whether the url contains the item id, and if yes - open item editor/details screen.
 */
function useItemUrl() {
  const screens = useScreens();
  const match = useRouteMatch<{ id: string }>(`/${ROUTE}/:id`);

  const openItem = useOpenItemScreen({
    route: ROUTE,
    screenComponent: PetTableEditor,
    screenCaptionKey: "screen.PetTableEditor",
    refetchQueries: REFETCH_QUERIES,
    id: match?.params.id
  });

  useEffect(() => {
    if (
      screens.activeTab?.breadcrumbs.length === 1 &&
      match?.params.id != null
    ) {
      openItem();
    }
  });
}

/**
 * Button panel above
 */
function ButtonPanel(props: { selectedRowId?: string }) {
  const intl = useIntl();

  const openEditorProps = {
    route: ROUTE,
    screenComponent: PetTableEditor,
    screenCaptionKey: "screen.PetTableEditor",
    refetchQueries: REFETCH_QUERIES
  };

  // A callback that will open an empty editor
  const openEmptyEditor = useOpenItemScreen(openEditorProps);
  // A callback that will open an editor with item
  const openEditorWithItem = useOpenItemScreen({
    ...openEditorProps,
    id: props.selectedRowId!
  });

  const [runDeleteMutation] = useMutation(DELETE__PET);
  // Callback that deletes the item
  const deleteItem = useDeleteItem(
    props.selectedRowId!,
    runDeleteMutation,
    REFETCH_QUERIES
  );

  return (
    <Space direction="horizontal">
      <Button
        htmlType="button"
        key="create"
        title={intl.formatMessage({ id: "common.create" })}
        type="primary"
        icon={<PlusOutlined />}
        onClick={openEmptyEditor}
      >
        <span>
          <FormattedMessage id="common.create" />
        </span>
      </Button>

      <Button
        htmlType="button"
        key="edit"
        title={intl.formatMessage({ id: "common.edit" })}
        disabled={props.selectedRowId == null}
        onClick={openEditorWithItem}
      >
        <span>
          <FormattedMessage id="common.edit" />
        </span>
      </Button>

      <Button
        htmlType="button"
        key="remove"
        title={intl.formatMessage({ id: "common.remove" })}
        disabled={props.selectedRowId == null}
        onClick={deleteItem}
      >
        <span>
          <FormattedMessage id="common.remove" />
        </span>
      </Button>
    </Space>
  );
}

interface FiltersProps {
  onApplyFilters: (filters: Record<string, unknown>) => void;
  onErrorFilters: (errorInfo: any) => void;
}
function Filters({ onApplyFilters, onErrorFilters }: FiltersProps) {
  const [form] = useForm();

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onApplyFilters}
      onFinishFailed={onErrorFilters}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item label="Owner First Name" name={["owner", "firstName"]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item label="Owner Last Name" name={["owner", "lastName"]}>
            <Input />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            label="Identification Number"
            name={"identificationNumber"}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Space>
        <Button type="primary" htmlType="submit">
          <FormattedMessage id="filters.apply" />
        </Button>
        <Button onClick={() => form.resetFields()}>
          <FormattedMessage id="filters.reset" />
        </Button>
      </Space>
    </Form>
  );
}

interface TableSectionProps {
  items?: ItemTableType;
  loading?: boolean;
  error?: ApolloError;
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
      ...item,
      ...{
        owner: getOwnerDTODisplayName(item!.owner ?? undefined),
        type: getPetTypeDTODisplayName(item!.type ?? undefined)
      }
    }));

  return (
    <Space direction="vertical" className="table-space">
      <Table
        dataSource={dataSource as object[]}
        columns={columns}
        rowClassName={record =>
          (record as ItemType)?.id === selectedRowId ? "table-row-selected" : ""
        }
        onRow={data => {
          return { onClick: () => setSelectedRowId((data as ItemType)?.id) };
        }}
      />
    </Space>
  );
}

/**
 * Type of data object received when executing the query
 */
type QueryResultType = ResultOf<typeof PET_LIST>;
/**
 * Type of the items list
 */
type ItemTableType = QueryResultType["petList"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
