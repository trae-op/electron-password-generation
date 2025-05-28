type TCallbackOpenLatestVersion = {
  updateFile: string;
};
type TCallbackAuthSocialNetwork = {
  providers: TProviders;
};
type TCallbackSendTwoFactorCodeVerify = {
  twoFactorCode: string;
};

type TCallbackResource = {
  id: string;
};

type TCallbackOpenUpdateResource = TCallbackResource;
type TCallbackOpenDeleteResource = TCallbackResource;
type TCallbackDeleteResource = TCallbackResource;

type TCallbackSendResource<V = FormDataEntryValue | null> = {
  id?: string;
  name: V;
  key: V;
};

type TEventPayloadSend = {
  restart: undefined;
  closePreloadWindow: undefined;
  openLatestVersion: TCallbackOpenLatestVersion;
  authSocialNetwork: TCallbackAuthSocialNetwork;
  twoFactorCodeVerify: TCallbackSendTwoFactorCodeVerify;
  twoFactorVerify: undefined;
  checkUser: undefined;
  logout: undefined;
  openUpdateResource: TCallbackOpenUpdateResource;
  openDeleteResource: TCallbackOpenDeleteResource;
  getResource: TCallbackResource;
  resources: undefined;
  openAddResource: undefined;
  postResource: TCallbackSendResource;
  putResource: TCallbackSendResource;
  deleteResource: TCallbackDeleteResource;
  cancelDeleteResource: undefined;
};

type TSend = {
  restart: () => void;
  closePreloadWindow: () => void;
  openLatestVersion: (payload: TEventPayloadSend["openLatestVersion"]) => void;
  windowAuthSocialNetwork: (
    payload: TEventPayloadSend["authSocialNetwork"]
  ) => void;
  windowTwoFactorVerify: () => void;
  checkUser: () => void;
  sendTwoFactorCodeVerify: (
    payload: TEventPayloadSend["twoFactorCodeVerify"]
  ) => void;
  windowOpenUpdateResource: (
    payload: TEventPayloadSend["openUpdateResource"]
  ) => void;
  windowOpenDeleteResource: (
    payload: TEventPayloadSend["openDeleteResource"]
  ) => void;
  windowOpenAddResource: () => void;
  postResource: (payload: TEventPayloadSend["postResource"]) => void;
  putResource: (payload: TEventPayloadSend["putResource"]) => void;
  deleteResource: (payload: TEventPayloadSend["deleteResource"]) => void;
  cancelDeleteResource: () => void;
  getResource: (payload: TEventPayloadSend["getResource"]) => void;
  logout: () => void;
  resources: () => void;
};
