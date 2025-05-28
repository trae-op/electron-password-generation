import { HashRouter, Route, Routes } from "react-router-dom";
import {
  SignIn,
  Provider as ProviderAuth,
  ContainerRoutes,
} from "@ui-business/AuthSocialNetwork";
import {
  TwoFactorQRWindow,
  TwoFactorVerifyWindow,
  Provider as ProviderTwoFactorVerify,
} from "@ui-business/TwoFactor";
import { Window as Update } from "@ui-business/Updater";
import { Provider as ProviderUser } from "@ui-business/User";
import { MainLayout } from "@layouts/Main";
import { FormResourcesLayout } from "@layouts/FormResources";
import { Home } from "@windows/home";
import { Update as UpdateResource } from "@windows/updateResource";
import { Add as AddResource } from "@windows/addResource";
import { PublicRoute } from "@ui-composites/PublicRoute";
import { PrivateRoute } from "@ui-composites/PrivateRoute";

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

              <Route element={<FormResourcesLayout />}>
                <Route path="/window/resource/add" element={<AddResource />} />
                <Route
                  path="/window/resource/update/:id"
                  element={<UpdateResource />}
                />
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
