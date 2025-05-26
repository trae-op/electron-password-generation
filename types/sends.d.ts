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

type TCallbackOpenResource = TCallbackResource;

type TEventPayloadSend = {
  restart: undefined;
  closePreloadWindow: undefined;
  openLatestVersion: TCallbackOpenLatestVersion;
  authSocialNetwork: TCallbackAuthSocialNetwork;
  twoFactorCodeVerify: TCallbackSendTwoFactorCodeVerify;
  twoFactorVerify: undefined;
  checkUser: undefined;
  logout: undefined;
  openResource: TCallbackOpenResource;
  getResource: TCallbackResource;
  resources: undefined;
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
  windowOpenResource: (payload: TEventPayloadSend["openResource"]) => void;
  getResource: (payload: TEventPayloadSend["getResource"]) => void;
  logout: () => void;
  resources: () => void;
};
