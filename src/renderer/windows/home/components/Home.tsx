import { lazy, Suspense } from "react";
import Box from "@mui/material/Box";
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

const Home = () => {
  useIpcMasterKey();
  const { isMasterKey } = useControlContextMasterKey();

  return (
    <ProviderSync>
      <ProviderUser>
        <Suspense fallback={<LoadingSpinner />}>
          <LazyTopPanel isMasterKey={isMasterKey} />
        </Suspense>

        <ProviderMasterKey>
          <Box sx={{ mt: 6, width: "100%" }}>
            <Suspense fallback={<LoadingSpinner />}>
              <LazyResources isMasterKey={isMasterKey} />
            </Suspense>
          </Box>
        </ProviderMasterKey>
      </ProviderUser>
    </ProviderSync>
  );
};

export default Home;
