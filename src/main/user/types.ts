export type TResponseUserById = {
  id: number;
  email: string | null;
  sourceId: string | null;
  twoFactorSecret: string | null;
  isTwoFactorEnabled: boolean;
  provider: TProviders;
};
