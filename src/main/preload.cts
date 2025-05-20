const electron = require("electron");

electron.contextBridge.exposeInMainWorld("electron", {
  receive: {
    subscribeUpdateApp: (callback) =>
      ipcOn("updateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowOpenUpdateApp: (callback) =>
      ipcOn("openUpdateApp", (payload) => {
        callback(payload);
      }),
    subscribeWindowTwoFactorQA: (callback) =>
      ipcOn("twoFactorQA", (payload) => {
        callback(payload);
      }),
    subscribeWindowAuthSocialNetwork: (callback) =>
      ipcOn("authSocialNetwork", (payload) => {
        callback(payload);
      }),
    subscribeWindowSendTwoFactorCodeVerify: (callback) =>
      ipcOn("twoFactorCodeVerify", () => {
        callback();
      }),
  },
  send: {
    restart: () => {
      ipcSend("restart");
    },
    closePreloadWindow: () => {
      ipcSend("closePreloadWindow");
    },
    openLatestVersion: (payload) => {
      ipcSend("openLatestVersion", payload);
    },
    windowAuthSocialNetwork: (payload) => {
      ipcSend("authSocialNetwork", payload);
    },
    windowTwoFactorVerify: () => {
      ipcSend("twoFactorVerify");
    },
    sendTwoFactorCodeVerify: (payload) => {
      ipcSend("twoFactorCodeVerify", payload);
    },
    logout: () => {
      ipcSend("logout");
    },
  },
  invoke: {
    getVersion: () => ipcInvoke("getVersion"),
  },
} satisfies Window["electron"]);

function ipcInvoke<Key extends keyof TEventPayloadInvoke>(
  key: Key
): Promise<TEventPayloadInvoke[Key]> {
  return electron.ipcRenderer.invoke(key);
}

function ipcSend<Key extends keyof TEventPayloadSend>(
  key: Key,
  payload?: TEventPayloadSend[Key]
) {
  electron.ipcRenderer.send(key, payload);
}

function ipcOn<Key extends keyof TEventPayloadReceive>(
  key: Key,
  callback: (payload: TEventPayloadReceive[Key]) => void
) {
  const cb = (
    _: Electron.IpcRendererEvent,
    payload: TEventPayloadReceive[Key]
  ) => callback(payload);

  electron.ipcRenderer.on(key, cb);
  return () => electron.ipcRenderer.off(key, cb);
}
