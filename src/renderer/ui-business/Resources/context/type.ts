export type TContext = {
  list: TResource[] | undefined;
};

export type TContextActions = {
  setItems: (items: TResource[]) => void;
};
