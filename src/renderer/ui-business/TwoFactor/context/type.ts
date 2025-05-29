export type TContext = {
  pending: boolean;
  base64: string;
  twoFactorCode: string;
};

export type TContextActions = {
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  setTwoFactorCode: React.Dispatch<React.SetStateAction<string>>;
  setBase64: React.Dispatch<React.SetStateAction<string>>;
};
