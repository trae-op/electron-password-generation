import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { UserPopover, ContextUserPopover } from "@features/User";
import { LogoutButton } from "@features/AuthSocialNetwork";
import {
  Items as Resources,
  Provider as ProviderResources,
} from "@features/Resources";
import { Item as Resource } from "@entities/Resource";
import {
  AddButton as AddResourceButton,
  Provider as ProviderAddResourceButton,
} from "@features/AddResource";
import {
  useUpdate,
  Context as ContextUpdater,
  DownloadedButton,
} from "@features/Updater";

export const Home = () => {
  const value = useUpdate();

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
        <ProviderResources>
          <Resources entityComponent={Resource} />
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
