import { useMemo, useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  Button,
  Card,
  Row,
  Col,
  Form,
  Input,
  Pagination,
  Select,
  Space,
  Table
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { serializeVariables } from "../../../core/transform/model/serializeVariables";
import {
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { useBreadcrumbItem } from "../../../core/screen/useBreadcrumbItem";
import { mergeDeep } from "@apollo/client/utilities";
import { Direction, OwnerOrderByProperty } from "../../../gql/graphql";
import { DefaultOptionType } from "antd/lib/select";
import { OffsetPaginationType } from "../../../core/crud/OffsetPaginationType";

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

const columns = [
  {
    title: "First Name",
    dataIndex: "firstName",
    key: "firstName"
  },
  {
    title: "Last Name",
    dataIndex: "lastName",
    key: "lastName"
  },
  {
    title: "City",
    dataIndex: "city",
    key: "city"
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address"
  },
  {
    title: "Telephone",
    dataIndex: "telephone",
    key: "telephone"
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  }
];

const initialQueryVariables: QueryVariablesType = {};
const initialPagination: OffsetPaginationType = {
  current: 1,
  pageSize: 10
};

export function ReadOnlyOwnerTableWithFilterSortPage() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyOwnerTableWithFilterSortPage" })
  );

  const [queryVariables, setQueryVariables] = useState<QueryVariablesType>(
    initialQueryVariables
  );

  // Load the items from server. Will be reloaded reactively if one of variable changes
  const {
    loading,
    error,
    data
  } = useQuery(OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED, {
    variables: queryVariables
  });

  const mergeQueryVariables = useCallback(
    (newQueryVariables: QueryVariablesType) => {
      setQueryVariables(queryVariables =>
        mergeDeep(queryVariables, newQueryVariables)
      );
    },
    []
  );

  const items = useMemo(
    () => deserialize(data?.ownerListByNamesFilterOffsetPageSorted?.content),
    [data?.ownerListByNamesFilterOffsetPageSorted?.content]
  );

  const [pagination, setPagination] = useState<OffsetPaginationType>(
    initialPagination
  );

  const changePagination = useCallback(
    (pagination: OffsetPaginationType) => {
      setPagination(pagination);
      mergeQueryVariables({
        page: {
          number: pagination.current - 1,
          size: pagination.pageSize
        }
      });
    },
    [mergeQueryVariables]
  );
  const applyPagination = useCallback(
    (current: number, pageSize: number) =>
      changePagination({
        current,
        pageSize
      }),
    [changePagination]
  );

  const [sortValue, setSortValue] = useState<QueryVariablesType["sort"]>();

  const applySort = useCallback(
    (newSortValue: QueryVariablesType["sort"] | undefined) => {
      mergeQueryVariables({ sort: newSortValue });
      setSortValue(newSortValue);
    },
    [mergeQueryVariables]
  );

  const applyFilters = useCallback(
    (filters: QueryVariablesType) => {
      mergeQueryVariables(
        serializeVariables(
          OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED,
          filters
        )
      );
      changePagination(initialPagination);
    },
    [changePagination, mergeQueryVariables]
  );

  const afterResetFilters = useCallback(() => applySort(undefined), [
    applySort
  ]);

  // selected row id
  const [selectedRowId, setSelectedRowId] = useState();

  const navigate = useNavigate();

  // Open details if row selected
  useEffect(() => {
    if (selectedRowId != null) {
      navigate(selectedRowId);
    }
  }, [navigate, selectedRowId]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="table-space">
        <Card>
          <Filters
            onApplyFilters={applyFilters}
            onAfterReset={afterResetFilters}
          />
        </Card>
        <ButtonPanel
          selectedRowId={selectedRowId}
          onApplySort={applySort}
          sortValue={sortValue}
        />
        <TableSection
          items={items}
          loading={loading}
          error={error}
          selectedRowId={selectedRowId}
          setSelectedRowId={setSelectedRowId}
        />
        <Pagination
          current={pagination?.current}
          pageSize={pagination?.pageSize}
          onChange={applyPagination}
          showSizeChanger
          total={data?.ownerListByNamesFilterOffsetPageSorted?.totalElements}
        />
      </Space>
    </div>
  );
}

const sortBySelectorOptions: DefaultOptionType[] = [
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
];

interface ButtonPanelProps {
  selectedRowId?: string;
  onApplySort: (sort: QueryVariablesType["sort"]) => void;
  sortValue?: QueryVariablesType["sort"];
}
/**
 * Button panel above
 */
function ButtonPanel({
  selectedRowId,
  onApplySort,
  sortValue
}: ButtonPanelProps) {
  const intl = useIntl();

  return (
    <Row justify="space-between" gutter={[16, 8]}>
      <Col>
        <Space direction="horizontal"></Space>
      </Col>
      <Col>
        <Select
          value={JSON.stringify(sortValue)}
          className="sort-by-select-width"
          allowClear
          placeholder={intl.formatMessage({ id: "sort.sortBy" })}
          onChange={sortBy => onApplySort(sortBy && JSON.parse(sortBy))}
          options={sortBySelectorOptions}
        />
      </Col>
    </Row>
  );
}

interface FiltersProps {
  onApplyFilters: (queryVariables: QueryVariablesType) => void;
  onAfterReset: () => void;
}
function Filters({ onApplyFilters, onAfterReset }: FiltersProps) {
  const [form] = useForm();

  const onResetFilters = async () => {
    await form.resetFields();
    const filters = await form.validateFields();
    onApplyFilters(filters);
    onAfterReset();
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
  if (error) {
    return <RequestFailedError />;
  }

  const dataSource = items
    ?.filter(item => item != null)
    .map(item => ({
      key: item?.id,
      ...item
    }));

  return (
    <Space direction="vertical" className="table-space entity-table-readonly">
      <Table
        loading={loading}
        dataSource={dataSource}
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
        pagination={false}
      />
    </Space>
  );
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
type ItemTableType = Exclude<
  QueryResultType["ownerListByNamesFilterOffsetPageSorted"],
  null | undefined
>["content"];
/**
 * Type of a single item
 */
type ItemType = Exclude<ItemTableType, null | undefined>[0];
