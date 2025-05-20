export type TContext = {
  isAuthenticated: boolean;
  logout: () => void;
  setAuthenticated: (value: boolean) => void;
};
