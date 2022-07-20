import { useMemo, useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { ApolloError } from "@apollo/client/errors";
import { ResultOf, VariablesOf } from "@graphql-typed-document-node/core";
import {
  Button,
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
  CloseCircleOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined
} from "@ant-design/icons";
import { FormattedMessage, useIntl } from "react-intl";
import { gql } from "../../../gql";
import { ValueWithLabel } from "../../../core/crud/ValueWithLabel";
import { RequestFailedError } from "../../../core/crud/RequestFailedError";
import { deserialize } from "../../../core/transform/model/deserialize";
import { getOwnerDTODisplayName } from "../../../core/display-name/getOwnerDTODisplayName";
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

export function StandaloneReadOnlyOwnerCardsWithFilterSortPage() {
  const intl = useIntl();
  useBreadcrumbItem(
    intl.formatMessage({
      id: "screen.StandaloneReadOnlyOwnerCardsWithFilterSortPage"
    })
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

  return (
    <div className="narrow-layout">
      <Space direction="vertical" className="card-space">
        <Card>
          <Filters
            onApplyFilters={applyFilters}
            onAfterReset={afterResetFilters}
          />
        </Card>
        <ButtonPanel onApplySort={applySort} sortValue={sortValue} />
        <Cards items={items} loading={loading} error={error} />
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
 * Button panel above the cards
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
  if (item == null) {
    return null;
  }

  return (
    <Card
      key={item.id}
      title={getOwnerDTODisplayName(item)}
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
