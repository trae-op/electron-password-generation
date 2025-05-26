export type TFormValues = {
  resource: string;
  password: string;
};

export type TNamesField = {
  password?: string;
  range?: string;
  numbers?: string;
  uppercase?: string;
  special?: string;
};

export type TProps = {
  watchToGenerate: (value: string) => void;
  minAmount?: number;
  maxAmount?: number;
  fields?: TNamesField;
};

export type TContext = {
  userId: number;
};

export interface IPropsProvider extends TContext {
  children: React.ReactNode;
}
