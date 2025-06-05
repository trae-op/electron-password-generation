type TStatusesUpdate =
  | "checking-for-update"
  | "update-not-available"
  | "update-available"
  | "download-progress"
  | "update-downloaded"
  | "error";
type TUnsubscribeFunction = () => void;
type TUpdateData = {
  downloadedPercent?: string;
  message?: string;
  version?: string;
  platform?: string;
  updateFile?: string;
  status: TStatusesUpdate;
};
type TCallbackOpenUpdateWindow = {
  isOpen: boolean;
};
type TCallbackTwoFactorQRWindow = {
  base64: string;
};
type TCallbackAuthSocialNetworkWindow = {
  isAuthenticated: boolean;
};
type TCallbackUser = {
  user: TUser;
};
type TCallbackResources = {
  items: TResource[];
};
type TCallbackGetResource = {
  item: TResource | undefined;
};

type TCallbackMasterKey = {
  isMasterKey: boolean;
};

type TEventPayloadReceive = {
  updateApp: TUpdateData;
  openUpdateApp: TCallbackOpenUpdateWindow;
  twoFactorQA: TCallbackTwoFactorQRWindow;
  authSocialNetwork: TCallbackAuthSocialNetworkWindow;
  statusAuthSocialNetwork: TCallbackAuthSocialNetworkWindow;
  twoFactorCodeVerify: undefined;
  checkUser: TCallbackUser;
  resources: TCallbackResources;
  getResource: TCallbackGetResource;
  masterKey: TCallbackMasterKey;
};

type TReceive = {
  subscribeWindowOpenUpdateApp: (
    callback: (payload: TEventPayloadReceive["openUpdateApp"]) => void
  ) => TUnsubscribeFunction;
  subscribeUpdateApp: (
    callback: (payload: TEventPayloadReceive["updateApp"]) => void
  ) => TUnsubscribeFunction;
  subscribeWindowTwoFactorQA: (
    callback: (payload: TEventPayloadReceive["twoFactorQA"]) => void
  ) => TUnsubscribeFunction;
  subscribeWindowAuthSocialNetwork: (
    callback: (payload: TEventPayloadReceive["authSocialNetwork"]) => void
  ) => TUnsubscribeFunction;
  subscribeWindowStatusAuthSocialNetwork: (
    callback: (payload: TEventPayloadReceive["statusAuthSocialNetwork"]) => void
  ) => TUnsubscribeFunction;
  subscribeWindowSendTwoFactorCodeVerify: (
    callback: () => void
  ) => TUnsubscribeFunction;
  subscribeCheckUser: (
    callback: (payload: TEventPayloadReceive["checkUser"]) => void
  ) => TUnsubscribeFunction;
  subscribeResources: (
    callback: (payload: TEventPayloadReceive["resources"]) => void
  ) => TUnsubscribeFunction;
  subscribeGetResource: (
    callback: (payload: TEventPayloadReceive["getResource"]) => void
  ) => TUnsubscribeFunction;
  subscribeMasterKey: (
    callback: (payload: TEventPayloadReceive["masterKey"]) => void
  ) => TUnsubscribeFunction;
};
