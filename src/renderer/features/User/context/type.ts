export type TContext = {
  user: TUser | undefined;
  setUser: React.Dispatch<React.SetStateAction<TUser | undefined>>;
};

export type TContextProfile = {
  renderButtonUpdateApp: React.ReactElement | null;
  renderButtonLogout: React.ReactElement;
  isNewVersionApp: boolean;
};
