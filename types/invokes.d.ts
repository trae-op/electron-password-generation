type TEventPayloadInvoke = {
  getVersion: string;
  putResource: undefined;
  postResource: undefined;
  deleteResource: undefined;
  postMasterKey: undefined;
};

type TSendResource<V = FormDataEntryValue | null> = {
  id?: string;
  name: V;
  key: V;
};

type TDeleteResource = {
  id: string;
};
type TPostMasterKey = {
  key: string;
};
type TEventSendInvoke = {
  getVersion: string;
  putResource: TSendResource;
  postResource: TSendResource;
  deleteResource: TDeleteResource;
  postMasterKey: TPostMasterKey;
};

type TInvoke = {
  getVersion: () => Promise<TEventSendInvoke["getVersion"]>;
  putResource: (
    payload: TEventSendInvoke["putResource"]
  ) => Promise<TEventPayloadInvoke["putResource"]>;
  postResource: (
    payload: TEventSendInvoke["postResource"]
  ) => Promise<TEventPayloadInvoke["postResource"]>;
  deleteResource: (
    payload: TEventSendInvoke["deleteResource"]
  ) => Promise<TEventPayloadInvoke["deleteResource"]>;
  postMasterKey: (
    payload: TEventSendInvoke["postMasterKey"]
  ) => Promise<TEventPayloadInvoke["postMasterKey"]>;
};
