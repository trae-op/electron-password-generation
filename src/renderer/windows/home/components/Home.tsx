import { Fragment } from "react";
import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { UserPopover, ContextUserPopover } from "@features/User";
import { LogoutButton } from "@features/AuthSocialNetwork";
import { Items as Resources } from "@features/Resources";
import { Item as Resource } from "@widgets/Resource";
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
        <Resources
          renderEntity={(item) => {
            const handleUpdate = () => {
              window.electron.send.windowOpenUpdateResource({
                id: item.id + "",
              });
            };

            return (
              <Fragment key={item.id}>
                <Resource
                  id={item.id}
                  key={item.key}
                  name={item.name}
                  handleCopy={() => {}}
                  handleUpdate={handleUpdate}
                />
              </Fragment>
            );
          }}
        />
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
