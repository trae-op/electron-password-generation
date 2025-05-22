import Button, { ButtonProps } from "@mui/material/Button";
import ListItemButton, {
  ListItemButtonProps,
} from "@mui/material/ListItemButton";
import { UserPopover, ContextUserPopover } from "@features/User";
import { ButtonLogout } from "@features/AuthSocialNetwork";
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
    </ContextUserPopover.Provider>
  );
};
