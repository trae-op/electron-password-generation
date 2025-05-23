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
  item: TResource;
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
  resource: TCallbackResource;
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
  resource: (payload: TEventPayloadSend["resource"]) => void;
  logout: () => void;
  resources: () => void;
};
