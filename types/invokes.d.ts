type TEventPayloadInvoke = {
  getVersion: string;
  getPlatform: string;
};
type TInvoke = {
  getVersion: () => Promise<TEventPayloadInvoke["getVersion"]>;
};
