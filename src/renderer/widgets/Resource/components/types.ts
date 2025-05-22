export type TPropsItem = Pick<TResource, "id" | "name" | "key"> & {
  handleCopy: () => void;
  handleUpdate: () => void;
};
