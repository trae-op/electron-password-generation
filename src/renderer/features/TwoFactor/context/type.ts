export type TContext = {
  pending: boolean;
  base64: string;
  setPending: React.Dispatch<React.SetStateAction<boolean>>;
  twoFactorCode: string;
  setTwoFactorCode: React.Dispatch<React.SetStateAction<string>>;
  setBase64: React.Dispatch<React.SetStateAction<string>>;
};
