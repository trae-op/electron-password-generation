export type TContext = {
  list: TResource[] | undefined;
  isMasterKey?: boolean;
};

export type TContextActions = {
  setItems: (items: TResource[]) => void;
};
