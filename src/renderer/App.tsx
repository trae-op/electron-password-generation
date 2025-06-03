import { lazy } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import {
  SignIn,
  Provider as ProviderAuth,
  ContainerRoutes,
} from "@ui-business/AuthSocialNetwork";
import {
  TwoFactorQRWindow,
  TwoFactorVerifyWindow,
  Provider as ProviderTwoFactor,
} from "@ui-business/TwoFactor";
import { Provider as ProviderUser } from "@ui-business/User";
import {
  Provider as ProviderMasterKey,
  Form as FormMasterKey,
} from "@ui-business/MasterKey";
import { MainLayout } from "@layouts/Main";
import { FormResourcesLayout } from "@layouts/FormResources";
import { Confirm as ConfirmDeleteResource } from "@ui-business/DeleteResource";
import { PublicRoute } from "@ui-composites/PublicRoute";
import { PrivateRoute } from "@ui-composites/PrivateRoute";

const LazyHomeWindow = lazy(() => import("./windows/home/Home"));

const LazyUpdateResourceWindow = lazy(
  () => import("./windows/updateResource/UpdateResource")
);

const LazyAddResourceWindow = lazy(
  () => import("./windows/addResource/AddResource")
);

const LazyUpdaterWindow = lazy(() => import("./windows/updater/Updater"));

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
                      <ProviderMasterKey>
                        <LazyHomeWindow />
                      </ProviderMasterKey>
                    </ProviderUser>
                  }
                />
              </Route>

              <Route element={<FormResourcesLayout />}>
                <Route
                  path="/window/resource/add"
                  element={<LazyAddResourceWindow />}
                />
                <Route
                  path="/window/resource/update/:id"
                  element={<LazyUpdateResourceWindow />}
                />
              </Route>

              <Route
                path="/window/resource/delete/:id"
                element={<ConfirmDeleteResource />}
              />

              <Route
                path="/window:update-app"
                element={<LazyUpdaterWindow />}
              />
              <Route
                path="/window:two-factor-qa"
                element={
                  <ProviderTwoFactor>
                    <TwoFactorQRWindow />
                  </ProviderTwoFactor>
                }
              />
              <Route
                path="/window:master-key"
                element={
                  <ProviderMasterKey>
                    <FormMasterKey />
                  </ProviderMasterKey>
                }
              />
              <Route
                path="/window:two-factor-verify"
                element={
                  <ProviderTwoFactor>
                    <TwoFactorVerifyWindow />
                  </ProviderTwoFactor>
                }
              />
            </Route>
          </Routes>
        </HashRouter>
      </ContainerRoutes>
    </ProviderAuth>
  );
};
