export type TContext = {
  isAuthenticated: boolean | undefined;
  isStatusAuthenticated: boolean | undefined;
};

export type TContextActions = {
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
  setStatusAuthenticated: (value: boolean) => void;
};
