export type TContext = {
  isAuthenticated: boolean | undefined;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
};
