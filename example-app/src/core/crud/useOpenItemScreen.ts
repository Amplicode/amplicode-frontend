import {
  OpenInBreadcrumbParams,
  ReactComponent,
  useScreens
} from "@amplicode/react-core";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import { RefetchQueries } from "../type-aliases/RefetchQueries";
import { useIntl } from "react-intl";

export interface OpenItemScreenParams<TData> {
  route: string;
  screenComponent: ReactComponent;
  screenCaptionKey: string;
  refetchQueries?: RefetchQueries<TData>;
  id?: string | null;
}

/**
 * Returns a callback that will open an entity editor form.
 * If no `id` has been provided then the editor form will be empty and submitting the editor
 * will create a new entity instance.
 * Otherwise an existing entity instance will be open for editing.
 *
 * @param route
 * @param screenComponent item editor component
 * @param screenCaptionKey caption for the editor screen
 * @param id id of the entity instance to be opened
 * @param refetchQueries
 */
export function useOpenItemScreen<TData = any>({
  route,
  screenComponent,
  screenCaptionKey,
  refetchQueries,
  id
}: OpenItemScreenParams<TData>) {
  const screens = useScreens();
  const history = useHistory();
  const intl = useIntl();

  const screenCaption = intl.formatMessage({ id: screenCaptionKey });

  return useCallback(() => {
    // Open editor/details screen
    screens.openInBreadcrumb(
      getScreenParams<TData>(screenComponent, screenCaption, refetchQueries, id)
    );
    // Append /id to existing url
    history.push(id ? `/${route}/${id}` : `/${route}/new`);
  }, [
    screens,
    screenComponent,
    screenCaption,
    refetchQueries,
    id,
    history,
    route
  ]);
}

function getScreenParams<TData>(
  screenComponent: ReactComponent,
  screenCaption: string,
  refetchQueries?: RefetchQueries<TData>,
  id?: string | null
) {
  const params: OpenInBreadcrumbParams = {
    breadcrumbCaption: screenCaption,
    component: screenComponent,
    props: {
      // TODO: For some reason passing PET_LIST doesn't work - investigate
      refetchQueries
    }
  };

  if (id != null && id !== "new") {
    params.props = {
      ...params.props,
      id
    };
  }

  return params;
}
