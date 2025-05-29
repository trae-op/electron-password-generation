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

type TEventPayloadReceive = {
  updateApp: TUpdateData;
  openUpdateApp: TCallbackOpenUpdateWindow;
  twoFactorQA: TCallbackTwoFactorQRWindow;
  authSocialNetwork: TCallbackAuthSocialNetworkWindow;
  twoFactorCodeVerify: undefined;
  checkUser: TCallbackUser;
  resources: TCallbackResources;
  getResource: TCallbackGetResource;
  putResource: undefined;
  postResource: undefined;
  deleteResource: undefined;
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
  subscribePutResource: (callback: () => void) => TUnsubscribeFunction;
  subscribePostResource: (callback: () => void) => TUnsubscribeFunction;
  subscribeDeleteResource: (callback: () => void) => TUnsubscribeFunction;
};
