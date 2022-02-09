import { observer } from "mobx-react";
import { gql } from "@amplicode/gql";
import { Exact } from "@amplicode/gql/graphql";
import { useQuery, useMutation } from "@apollo/client";
import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Card, Modal, Spin, Empty, Result } from "antd";
import { FormattedMessage, IntlShape, useIntl } from "react-intl";
import { MutationFunctionOptions } from "@apollo/client/react/types/types";
import { FetchResult } from "@apollo/client/link/core";
import { useCallback, useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import {
  EntityListScreenProps,
  guessDisplayName,
  guessLabel,
  Screens,
  useScreens,
  useDefaultBrowserHotkeys
} from "@amplicode/react-core";

const ROUTE = "standalone-owner-list";

const OWNER_LIST = gql(/* GraphQL */ `
  query Get_Owner_List {
    ownerList {
      id
      firstName
      lastName
      city
    }
  }
`);

const DELETE__OWNER = gql(/* GraphQL */ `
  mutation Delete_Owner($id: BigInteger!) {
    delete_Owner(id: $id)
  }
`);

export const StandaloneOwnerList = observer(
  ({ onSelect }: EntityListScreenProps) => {
    const screens: Screens = useScreens();
    const intl = useIntl();
    const match = useRouteMatch<{ entityId: string }>(`/${ROUTE}/:entityId`);

    const { loading, error, data } = useQuery(OWNER_LIST);

    const [executeDeleteMutation] = useMutation(DELETE__OWNER, {
      refetchQueries: [OWNER_LIST]
    });

    // Entity list can work in select mode, which means that you can select an entity instance and it will be passed to onSelect callback.
    // This functionality is used in EntityLookupField.
    const isSelectMode = onSelect != null;

    const openItem = useCallback((id?: string) => {
      // TODO Uncomment the code below, specify the editor component and remove the alert
      alert("Please specify the editor component");
      // const params: OpenInBreadcrumbParams = {
      //   breadcrumbCaption: intl.formatMessage({ id: "screen.ExampleComponentName" }), // TODO specify message id
      //   component: ExampleComponentName, // TODO specify component name
      // };
      // if (id != null && id !== 'new') {
      //   params.props = { id };
      // }
      // screens.openInBreadcrumb(params);
      // // Append /id to existing url
      // history.push(id ? `/${ROUTE}/${id}` : `/${ROUTE}/new`);
    }, []);

    useEffect(() => {
      if (
        screens.activeTab?.breadcrumbs.length === 1 &&
        match?.params.entityId != null
      ) {
        openItem(match.params.entityId);
      }
    }, [match, openItem, screens]);

    useDefaultBrowserHotkeys({ openEditor: openItem });

    if (loading) {
      return <Spin />;
    }

    if (error) {
      return (
        <Result
          status="error"
          title={<FormattedMessage id="common.requestFailed" />}
        />
      );
    }

    const items = data?.ownerList;

    return (
      <div className="narrow-layout">
        {!isSelectMode && (
          <div style={{ marginBottom: "12px" }}>
            <Button
              htmlType="button"
              key="create"
              title='intl.formatMessage({id: "common.create"})'
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openItem()}
            >
              <span>
                <FormattedMessage id="common.create" />
              </span>
            </Button>
          </div>
        )}
        {isSelectMode && (
          <div style={{ marginBottom: "12px" }}>
            <Button
              htmlType="button"
              key="close"
              title='intl.formatMessage({id: "common.close"})'
              type="primary"
              icon={<CloseOutlined />}
              onClick={screens.closeActiveBreadcrumb}
            >
              <span>
                <FormattedMessage id="common.close" />
              </span>
            </Button>
          </div>
        )}

        {items == null || items.length === 0 ? (
          <Empty />
        ) : (
          items.map((e: any) => (
            <Card
              key={e["id"]}
              title={guessDisplayName(e)}
              style={{ marginBottom: "12px" }}
              actions={getCardActions({
                screens,
                entityInstance: e,
                onSelect,
                executeDeleteMutation,
                intl,
                openItem
              })}
            >
              <Fields entity={e} />
            </Card>
          ))
        )}
      </div>
    );
  }
);

const Fields = ({ entity }: { entity: any }) => (
  <>
    {Object.keys(entity)
      .filter(p => p !== "id" && entity[p] != null)
      .map(p => (
        <div key={p}>
          <strong>{guessLabel(p)}:</strong> {renderFieldValue(entity, p)}
        </div>
      ))}
  </>
);

function renderFieldValue(entity: any, property: string): string {
  return typeof entity[property] === "object"
    ? guessDisplayName(entity[property])
    : String(entity[property]);
}

interface CardActionsInput {
  screens: Screens;
  entityInstance: any;
  onSelect?: (entityInstance: this["entityInstance"]) => void;
  executeDeleteMutation: (
    options?: MutationFunctionOptions<any, Exact<{ id: any }>>
  ) => Promise<FetchResult>;
  intl: IntlShape;
  openItem: (id?: string) => void;
}

function getCardActions(input: CardActionsInput) {
  const {
    screens,
    entityInstance,
    onSelect,
    executeDeleteMutation,
    intl,
    openItem
  } = input;

  if (onSelect == null) {
    return [
      <DeleteOutlined
        key="delete"
        title={intl.formatMessage({ id: "common.remove" })}
        onClick={() => {
          Modal.confirm({
            content: intl.formatMessage({
              id: "EntityListScreen.deleteConfirmation"
            }),
            okText: intl.formatMessage({ id: "common.ok" }),
            cancelText: intl.formatMessage({ id: "common.cancel" }),
            onOk: () => {
              return executeDeleteMutation({
                variables: {
                  id: entityInstance.id
                }
              });
            }
          });
        }}
      />,
      <EditOutlined
        key="edit"
        title={intl.formatMessage({ id: "common.edit" })}
        onClick={() => {
          openItem(entityInstance.id);
        }}
      />
    ];
  }

  // onSelect != null
  return [
    <CheckOutlined
      key="select"
      title={intl.formatMessage({
        id: "EntityLookupField.selectEntityInstance"
      })}
      onClick={() => {
        onSelect(entityInstance);
        screens.closeActiveBreadcrumb();
      }}
    />
  ];
}
