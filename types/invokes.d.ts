type TEventPayloadInvoke = {
  getVersion: string;
};
type TInvoke = {
  getVersion: () => Promise<TEventPayloadInvoke["getVersion"]>;
};
