import type { TRoutes } from "./types";

export const messages = {
  auth: {
    errorIncorrectTwoFactorCode: "Incorrect two factor code!",
  },
};

export const routes: TRoutes = {
  signIn: "sign-in",
  main: "window:main",
  preloadApp: "window:preload-app",
  updateApp: "window:update-app",
  twoFactorQA: "window:two-factor-qa",
  twoFactorVerify: "window:two-factor-verify",
  authSocialNetwork: "window:auth-social-network",
};
