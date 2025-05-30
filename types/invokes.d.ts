type TEventPayloadInvoke = {
  getVersion: string;
  putResource: undefined;
  postResource: undefined;
};

type TSendResource<V = FormDataEntryValue | null> = {
  id?: string;
  name: V;
  key: V;
};
type TEventSendInvoke = {
  putResource: TSendResource;
  postResource: TSendResource;
};
type TInvoke = {
  getVersion: () => Promise<TEventPayloadInvoke["getVersion"]>;
  putResource: (
    payload: TEventSendInvoke["putResource"]
  ) => Promise<TEventPayloadInvoke["putResource"]>;
  postResource: (
    payload: TEventSendInvoke["postResource"]
  ) => Promise<TEventPayloadInvoke["postResource"]>;
};
