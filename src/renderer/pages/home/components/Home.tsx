import { Fragment } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { UserPopover, ContextUserPopover } from "@features/User";
import { ButtonLogout } from "@features/AuthSocialNetwork";
import { Items as Resources } from "@features/Resources";
import { Item as Resource } from "@widgets/Resource";
import {
  useUpdate,
  Context as ContextUpdater,
  ButtonDownloaded,
} from "@features/Updater";

export const Home = () => {
  const value = useUpdate();

  return (
    <ContextUserPopover.Provider
      value={{
        isNewVersionApp: value.status === "update-downloaded",
        renderButtonLogout: (
          <ButtonLogout<ListItemButtonProps> component={ListItemButton}>
            Logout
          </ButtonLogout>
        ),
        renderButtonUpdateApp: (
          <ContextUpdater.Provider value={value}>
            <ButtonDownloaded<ButtonProps>
              component={Button}
              sx={{ pt: 1, pb: 1 }}
              variant="text"
            >
              Update
            </ButtonDownloaded>
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
    </ContextUserPopover.Provider>
  );
};
