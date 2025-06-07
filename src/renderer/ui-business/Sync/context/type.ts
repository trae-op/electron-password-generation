export type TContext = TSync;

export type TContextActions = {
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setUser: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setResources: React.Dispatch<React.SetStateAction<boolean | undefined>>;
};
