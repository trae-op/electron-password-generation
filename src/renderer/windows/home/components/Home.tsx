import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { UserPopover, ContextUserPopover } from "@ui-business/User";
import { LogoutButton } from "@ui-business/AuthSocialNetwork";
import {
  Items as Resources,
  Provider as ProviderResources,
} from "@ui-business/Resources";
import {
  useControlContext as useControlContextMasterKey,
  useIpc as useIpcMasterKey,
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

export const Home = () => {
  useIpcMasterKey();
  const { isMasterKey } = useControlContextMasterKey();
  const value = useIpcUpdate();

  return (
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
            <DownloadedButton<ListItemButtonProps> component={ListItemButton}>
              Update
            </DownloadedButton>
          </ContextUpdater.Provider>
        ),
      }}
    >
      <UserPopover />
      <Stack spacing={2} direction="row" sx={{ flexWrap: "wrap" }} useFlexGap>
        <ProviderResources isMasterKey={isMasterKey}>
          <Resources />
        </ProviderResources>
      </Stack>
      <ProviderAddResourceButton>
        <AddResourceButton
          sx={{
            position: "fixed",
            bottom: 10,
            right: 10,
          }}
        />
      </ProviderAddResourceButton>
    </ContextUserPopover.Provider>
  );
};
