import { BrowserWindow, session, app } from "electron";
import path from "node:path";
import type { TParamsCreateWindow } from "./types.js";
import { folders } from "../../config.js";
import { cacheWindows } from "./cache.js";
import { getWindow } from "./receive.js";

export function createWindow<N extends string>({
  name,
  options,
  isCache,
  loadURL,
}: TParamsCreateWindow<N>) {
  const LOCALHOST_BASE_REST_API = process.env.LOCALHOST_BASE_REST_API;
  const LOCALHOST_ELECTRON_SERVER_PORT =
    process.env.LOCALHOST_ELECTRON_SERVER_PORT;
  const isDev = process.env.NODE_ENV === "development";
  const uiPath = path.join(
    app.getAppPath(),
    "/" + folders.distRenderer + "/index.html"
  );
  const preloadPath = path.join(
    app.getAppPath(),
    isDev ? "." : "..",
    "/" + folders.distMain + "/preload.cjs"
  );

  if (!LOCALHOST_BASE_REST_API) {
    console.warn(
      `Warning: You have to add an environment variable called "process.env.LOCALHOST_BASE_REST_API"!`
    );
  }

  if (!LOCALHOST_ELECTRON_SERVER_PORT) {
    console.warn(
      `Warning: You have to add an environment variable called "process.env.LOCALHOST_ELECTRON_SERVER_PORT"!`
    );
  }

  const hasWindow = name ? cacheWindows.has(name) : undefined;

  if (name && hasWindow && hasWindow && isCache) {
    const existingWindow = getWindow(name);
    if (existingWindow) {
      existingWindow.show();

      return existingWindow;
    }
  }

  const newWindow = new BrowserWindow({
    ...(options || {}),
    webPreferences: {
      preload: preloadPath,
      contextIsolation: true,
      nodeIntegration: false,
      ...(options ? options.webPreferences : {}),
    },
  });

  if (isCache && !loadURL) {
    const csp = `
  default-src 'self';
  connect-src 'self' ${LOCALHOST_BASE_REST_API};
  img-src * data:;
  style-src 'self' 'unsafe-inline';
  script-src 'self' ${isDev ? "'unsafe-inline'" : ""};
`
      .replace(/\s{2,}/g, " ")
      .trim();

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [csp],
        },
      });
    });
  }

  if (loadURL) {
    newWindow.loadURL(loadURL);
  }

  if (!loadURL && isDev) {
    newWindow.loadURL(
      `http://localhost:${process.env.LOCALHOST_ELECTRON_SERVER_PORT}${
        name !== undefined ? `#/${name}` : ""
      }`
    );
  }

  if (!loadURL && !isDev && name) {
    newWindow.loadFile(uiPath, {
      hash: name,
    });
  }

  if (name && isCache) {
    cacheWindows.set(name, newWindow);

    if (cacheWindows.has(name)) {
      const existingWindow = cacheWindows.get(name);

      if (existingWindow) {
        existingWindow.on("close", (event) => {
          event.preventDefault();
          existingWindow.hide();
        });
      }
    }
  }

  return newWindow;
}
