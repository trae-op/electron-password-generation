type TEventPayloadInvoke = {
  getVersion: string;
  putResource: undefined;
};

type TSendPutResource<V = FormDataEntryValue | null> = {
  id?: string;
  name: V;
  key: V;
};
type TEventSendInvoke = {
  putResource: TSendPutResource;
};
type TInvoke = {
  getVersion: () => Promise<TEventPayloadInvoke["getVersion"]>;
  putResource: (payload: TEventSendInvoke["putResource"]) => Promise<undefined>;
};
