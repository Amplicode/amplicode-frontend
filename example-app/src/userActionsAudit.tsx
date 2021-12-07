// THIS FILE WILL BE HERE ONLY BEFORE REVIEW AFTER REVIEW WILL BE DELETED AND MOVED TO ANOTHER REPOSITORY
import { useMutation, gql} from "@apollo/client";
import { ReactNode, useCallback, useEffect, createContext, useContext } from "react";
import dayjs from "dayjs";
import {ScreenMeta, useScreens, useScreenMeta, TabState, BreadcrumbState} from '@amplicode/react-core'

export const REGISTER_USER_ACTION = gql(`
  mutation ($input: UserActionInputDtoInput!){
    registerUserAction(
        input: $input
    )
  }
`);

const insertScreenId = (id: string, screenId: string) => `${screenId}#${id}`;
const getScreenId = (tab: TabState, breadcrumb: BreadcrumbState) => breadcrumb.screenId || tab.key;

export type ActionAuditComponentType = 'button' | 'screen' | 'field';
export interface ActionAuditVars {
  clientIp?: string;
  componentId: string;
  componentType: ActionAuditComponentType;
}
export interface ActionAuditOptions {
  withScreenId?: boolean,
}
export const useActionAudit = () => {
  const [registerUserAction] = useMutation(REGISTER_USER_ACTION);
  const screenMeta = useScreenMeta();

  return useCallback(
    (vars: ActionAuditVars, options?: ActionAuditOptions) => {
      const actionDateTime = dayjs().format();
      const componentId = options?.withScreenId && screenMeta != null
        ? insertScreenId(vars.componentId, getScreenId(screenMeta.tab, screenMeta.breadcrumb))
        : vars.componentId;

      registerUserAction({
        variables: {
          input: {
            actionDateTime,
            componentId,
            clientIp: vars.clientIp,
            componentType: vars.componentType
          }
        }
      });
    },
    [screenMeta, registerUserAction],
  );
}

export interface AuditContextValue {
  includeScreens?: string[];
  excludeScreens?: string[];
}
export const AuditContext = createContext<AuditContextValue>({});
export const useAuditContext = () => useContext(AuditContext);

export interface AuditProviderProps extends Partial<AuditContextValue> {
  children: ReactNode;
}
export const AuditProvider = ({
  includeScreens,
  excludeScreens,
  children,
}: AuditProviderProps) => {
  const [registerUserAction] = useMutation(REGISTER_USER_ACTION);
  const screens = useScreens();

  useEffect(() => {
    const switchScreenHandler = ({tab, breadcrumb}: ScreenMeta) => {
      const componentId = getScreenId(tab, breadcrumb);
      const actionDateTime = dayjs().format();

      if (includeScreens != null) {
        if (includeScreens.includes(componentId)) {
          registerUserAction({
            variables: {
              input: {
                actionDateTime,
                componentId,
                componentType: 'screen'
              }
            }
          });
        }
      } else {
        if (excludeScreens != null && excludeScreens.includes(componentId)) return;

        registerUserAction({
          variables: {
            input: {
              actionDateTime,
              componentId,
              componentType: 'screen'
            }
          }
        });
      }
    };

    screens.emitter.on('switchScreen', switchScreenHandler);
    return () => screens.emitter.off('switchScreen', switchScreenHandler);
  }, [excludeScreens, includeScreens, registerUserAction, screens.emitter]);

  return (
    <AuditContext.Provider
      value={{
        includeScreens,
        excludeScreens,
      }}
    >
      {children}
    </ AuditContext.Provider>
  );
};
