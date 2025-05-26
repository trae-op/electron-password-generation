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
import { Provider as ProviderUser } from "@features/User";
import { MainLayout } from "./MainLayout";
import { Home } from "@windows/home";
import { Update as UpdateResource } from "@windows/updateResource";
import { Add as AddResource } from "@windows/addResource";

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
                <Route
                  path="/window:main"
                  element={
                    <ProviderUser>
                      <Home />
                    </ProviderUser>
                  }
                />
              </Route>

              <Route path="/window:update-app" element={<Update />} />
              <Route
                path="/window:two-factor-qa"
                element={<TwoFactorQRWindow />}
              />
              <Route path="/window/resource/add" element={<AddResource />} />
              <Route
                path="/window/resource/update/:id"
                element={<UpdateResource />}
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
