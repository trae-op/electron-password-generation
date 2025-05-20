import { HashRouter, Route, Routes } from "react-router-dom";
import {
  PrivateRoute,
  PublicRoute,
  SignIn,
  Provider as ProviderAuth,
  ContainerRoutes,
} from "@features/AuthSocialNetwork";
import {
  TwoFactorQRWindow,
  TwoFactorVerifyWindow,
  Provider as ProviderTwoFactorVerify,
} from "@features/TwoFactor";
import { Window as Update } from "@features/Updater";
import { MainLayout } from "./MainLayout";
import { Home } from "@pages/Home";

export const App = () => {
  return (
    <ProviderAuth>
      <ContainerRoutes>
        <HashRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route element={<PublicRoute />}>
                <Route path="/sign-in" element={<SignIn />} />
              </Route>

              <Route element={<PrivateRoute />}>
                <Route path="/window:main" element={<Home />} />
              </Route>

              <Route path="/window:update-app" element={<Update />} />
              <Route
                path="/window:two-factor-qa"
                element={<TwoFactorQRWindow />}
              />
              <Route
                path="/window:two-factor-verify"
                element={
                  <ProviderTwoFactorVerify>
                    <TwoFactorVerifyWindow />
                  </ProviderTwoFactorVerify>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </ContainerRoutes>
    </ProviderAuth>
  );
};
