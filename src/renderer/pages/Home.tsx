import { Profile, ContextProfile } from "../features/User";
import { ButtonLogout } from "../features/AuthSocialNetwork";
import {
  useUpdate,
  Context as ContextUpdater,
  ButtonDownloaded,
} from "@features/Updater";

export const Home = () => {
  const value = useUpdate();

  return (
    <ContextProfile.Provider
      value={{
        isNewVersionApp: value.status === "update-downloaded",
        renderButtonLogout: (
          <ButtonLogout sx={{ pt: 1, pb: 1 }} text="Logout" variant="text" />
        ),
        renderButtonUpdateApp: (
          <ContextUpdater.Provider value={value}>
            <ButtonDownloaded
              sx={{ pt: 1, pb: 1 }}
              variant="text"
              text="Update"
            />
          </ContextUpdater.Provider>
        ),
      }}
    >
      <Profile />
    </ContextProfile.Provider>
  );
};
