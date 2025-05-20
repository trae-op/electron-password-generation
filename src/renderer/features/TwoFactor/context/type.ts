export type TContext = {
  pending: boolean;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  twoFactorCode: string;
  setTwoFactorCode: React.Dispatch<React.SetStateAction<string>>;
};
