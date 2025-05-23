export type TEventButton = React.MouseEvent<HTMLButtonElement>;
export type THookSubscribeEvent = {};
export type THookControl = {
  handleUpdate: (event: TEventButton) => void;
};
