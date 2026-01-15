import {
  BrowserWindow,
  dialog,
  type Event,
  type WebContentsWillRedirectEventParams,
} from "electron";
import { WindowManager } from "../@core/decorators/window-manager.js";
import { setElectronStorage } from "../$shared/store.js";
import { TwoFactorWindowsFactoryService } from "../two-factor/services/windows-factory.js";
import { messages } from "../config.js";
import type { TWindowManager } from "../types.js";

@WindowManager<TWindows["authSocialNetwork"]>({
  hash: "window:auth-social-network",
  options: {
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    title: "",
    width: 400,
    height: 400,
  },
})
export class AuthSocialNetworkWindow implements TWindowManager {
  private window: BrowserWindow | undefined;

  constructor(
    private twoFactorWindowsFactoryService: TwoFactorWindowsFactoryService
  ) {}

  onWebContentsDidFinishLoad(window: BrowserWindow): void {
    this.window = window;
  }

  onWebContentsWillRedirect(
    _: Event<WebContentsWillRedirectEventParams>,
    url: string
  ): void {
    const callBackUrl = new URL(url);
    const searchParams = new URLSearchParams(callBackUrl.search);
    const isSetup = /api\/auth\/two\-factor\/setup\?token\=/g.test(url);
    const isVerify = /api\/auth\/two\-factor\/verify\?token\=/g.test(url);

    switch (true) {
      case isSetup: {
        this.setToStore("window:two-factor-qa", searchParams);
        break;
      }
      case isVerify: {
        this.setToStore("window:two-factor-verify", searchParams);
        break;
      }
      case /api\/auth\/user\-exists\?message\=/g.test(url): {
        this.window?.close();
        const message = searchParams.get("message");
        const email = searchParams.get("email");

        if (message !== null && email !== null) {
          dialog.showMessageBox({
            title: messages.auth.userAlreadyExists,
            message: `${message}\nEmail: ${email}`,
          });
        }
        break;
      }
      default: {
        return;
      }
    }
  }

  private setToStore(
    nameWindow: TWindows["twoFactorQA"] | TWindows["twoFactorVerify"],
    searchParams: URLSearchParams
  ): void {
    this.window?.close();
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (token !== null && userId !== null) {
      setElectronStorage("authToken", token);
      setElectronStorage("userId", userId);
      this.twoFactorWindowsFactoryService.createWindow(nameWindow);
    } else {
      dialog.showMessageBox({
        title: messages.auth.errorTokenUserMissing,
        message: `Token=${token}\nUserId: ${userId}`,
      });
    }
  }
}
