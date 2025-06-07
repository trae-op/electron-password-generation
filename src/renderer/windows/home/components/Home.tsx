import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import IconButton from "@mui/material/IconButton";
import { grey } from "@mui/material/colors";
import HttpsIcon from "@mui/icons-material/Https";
import NoEncryptionGmailerrorredIcon from "@mui/icons-material/NoEncryptionGmailerrorred";
import {
  UserPopover,
  ContextUserPopover,
  Provider as ProviderUser,
} from "@ui-business/User";
import { LogoutButton } from "@ui-business/AuthSocialNetwork";
import {
  Items as Resources,
  Provider as ProviderResources,
} from "@ui-business/Resources";
import {
  useControlContext as useControlContextMasterKey,
  useIpc as useIpcMasterKey,
  Provider as ProviderMasterKey,
} from "@ui-business/MasterKey";
import {
  AddButton as AddResourceButton,
  Provider as ProviderAddResourceButton,
} from "@ui-business/AddResource";
import {
  useIpc as useIpcUpdate,
  Context as ContextUpdater,
  DownloadedButton,
} from "@ui-business/Updater";
import { TopPanel } from "@layouts/TopPanel";
import { Container as ContainerAppVersion } from "@ui-composites/AppVersion";
import { Provider as ProviderSync } from "@ui-business/Sync";
import { PreloadStatusTopPanel } from "./PreloadStatusTopPanel";

const Home = () => {
  useIpcMasterKey();
  const { isMasterKey } = useControlContextMasterKey();
  const value = useIpcUpdate();
  const handleKey = () => {
    window.electron.send.windowMasterKey();
  };

  return (
    <ProviderSync>
      <ProviderUser>
        <TopPanel
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            paddingTop: 0.5,
            paddingBottom: 0.5,
            paddingRight: 1,
            paddingLeft: 1,
            backgroundColor: grey[900],
          }}
        >
          <ContainerAppVersion
            sx={{ width: "100%" }}
            variant="subtitle2"
            component="span"
          />
          <Stack
            spacing={1}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <PreloadStatusTopPanel />
            <ContextUserPopover.Provider
              value={{
                isNewVersionApp: value.status === "update-downloaded",
                renderButtonLogout: (
                  <LogoutButton<ListItemButtonProps> component={ListItemButton}>
                    Logout
                  </LogoutButton>
                ),
                renderButtonUpdateApp: (
                  <ContextUpdater.Provider value={value}>
                    <DownloadedButton<ListItemButtonProps>
                      component={ListItemButton}
                    >
                      Update
                    </DownloadedButton>
                  </ContextUpdater.Provider>
                ),
              }}
            >
              <UserPopover />
            </ContextUserPopover.Provider>
          </Stack>
        </TopPanel>
        <ProviderMasterKey>
          <Stack
            spacing={2}
            direction="row"
            sx={{ flexWrap: "wrap" }}
            useFlexGap
          >
            <ProviderResources isMasterKey={isMasterKey}>
              <Resources />
            </ProviderResources>
          </Stack>

          {!isMasterKey ? (
            <IconButton
              sx={{
                position: "fixed",
                bottom: 10,
                right: 10,
              }}
              onClick={handleKey}
            >
              <HttpsIcon fontSize="large" />
            </IconButton>
          ) : (
            <ProviderAddResourceButton>
              <IconButton
                sx={{
                  position: "fixed",
                  bottom: 10,
                  right: 70,
                }}
                onClick={handleKey}
              >
                <NoEncryptionGmailerrorredIcon fontSize="large" />
              </IconButton>
              <AddResourceButton
                sx={{
                  position: "fixed",
                  bottom: 10,
                  right: 10,
                }}
              />
            </ProviderAddResourceButton>
          )}
        </ProviderMasterKey>
      </ProviderUser>
    </ProviderSync>
  );
};

export default Home;
