import { lazy, Suspense } from "react";
import { Provider as ProviderUser } from "@ui-business/User";
import {
  useIpc as useIpcMasterKey,
  Provider as ProviderMasterKey,
  useControlContext as useControlContextMasterKey,
} from "@ui-business/MasterKey";
import { Provider as ProviderSync } from "@ui-business/Sync";
import { LoadingSpinner } from "@components/LoadingSpinner";

const LazyTopPanel = lazy(() => import("./TopPanel"));
const LazyResources = lazy(() => import("./Resources"));
const LazyAddResource = lazy(() => import("./AddResource"));
const LazyActionsKey = lazy(() => import("./ActionsKey"));

const Home = () => {
  useIpcMasterKey();
  const { isMasterKey } = useControlContextMasterKey();

  return (
    <ProviderSync>
      <ProviderUser>
        <Suspense fallback={<LoadingSpinner />}>
          <LazyTopPanel />
        </Suspense>

        <ProviderMasterKey>
          <Suspense fallback={<LoadingSpinner />}>
            <LazyResources isMasterKey={isMasterKey} />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <LazyActionsKey isMasterKey={isMasterKey} />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <LazyAddResource isMasterKey={isMasterKey} />
          </Suspense>
        </ProviderMasterKey>
      </ProviderUser>
    </ProviderSync>
  );
};

export default Home;
