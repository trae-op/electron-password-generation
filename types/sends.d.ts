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
  getResource: TCallbackResource;
  resources: undefined;
  openAddResource: undefined;
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
  windowOpenAddResource: () => void;
  getResource: (payload: TEventPayloadSend["getResource"]) => void;
  logout: () => void;
  resources: () => void;
};
