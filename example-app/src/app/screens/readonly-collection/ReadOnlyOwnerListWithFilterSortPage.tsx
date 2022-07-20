import { useMemo, ReactNode, useState, useCallback } from "react";
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
  Empty,
  List,
  Space,
  Spin,
  Pagination,
  Select
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { serializeVariables } from "../../../core/transform/model/serializeVariables";
import {
  EnterOutlined,
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
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

const initialQueryVariables: QueryVariablesType = {};
const initialPagination: OffsetPaginationType = {
  current: 1,
  pageSize: 10
};

export function ReadOnlyOwnerListWithFilterSortPage() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({ id: "screen.ReadOnlyOwnerListWithFilterSortPage" })
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

  const mergeQueryVariales = useCallback(
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
      mergeQueryVariales({
        page: {
          number: pagination.current - 1,
          size: pagination.pageSize
        }
      });
    },
    [mergeQueryVariales]
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
      mergeQueryVariales({ sort: newSortValue });
      setSortValue(newSortValue);
    },
    [mergeQueryVariales]
  );

  const applyFilters = useCallback(
    (filters: QueryVariablesType) => {
      mergeQueryVariales(
        serializeVariables(
          OWNER_LIST_BY_NAMES_FILTER_OFFSET_PAGE_SORTED,
          filters
        )
      );
      changePagination(initialPagination);
    },
    [changePagination, mergeQueryVariales]
  );

  const afterResetFilters = useCallback(() => applySort(undefined), [
    applySort
  ]);

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="list-space">
        <Card>
          <Filters
            onApplyFilters={applyFilters}
            onAfterReset={afterResetFilters}
          />
        </Card>
        <ButtonPanel onApplySort={applySort} sortValue={sortValue} />
        <ListItems items={items} loading={loading} error={error} />
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
  onApplySort: (sort: QueryVariablesType["sort"]) => void;
  sortValue?: QueryVariablesType["sort"];
}
/**
 * Button panel above
 */
function ButtonPanel({ onApplySort, sortValue }: ButtonPanelProps) {
  const intl = useIntl();

  return (
    <Row justify="space-between" gutter={[16, 8]}>
      <Col></Col>
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
          key="firstName"
          label="First Name"
          value={item.firstName ?? undefined}
        />
        <ValueWithLabel
          key="lastName"
          label="Last Name"
          value={item.lastName ?? undefined}
        />
        <ValueWithLabel
          key="city"
          label="City"
          value={item.city ?? undefined}
        />
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
      </div>
    </List.Item>
  );
}

/**
 * Returns action buttons that will be displayed inside the item row.
 */
function useRowActions(item: ItemType): ReactNode[] {
  const intl = useIntl();
  const navigate = useNavigate();

  return [
    <EnterOutlined
      key="open"
      title={intl.formatMessage({ id: "common.open" })}
      onClick={() => {
        if (item?.id != null) {
          navigate(item.id);
        }
      }}
    />
  ];
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
