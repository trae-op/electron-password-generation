import { app, Menu } from "electron";
import dotenv from "dotenv";
import path from "node:path";
import { isDev } from "./$shared/utils.js";
import { AppModule } from "./app/module.js";
import { AuthSocialNetworkModule } from "./auth-social-network/module.js";
import { bootstrapModules } from "./@core/bootstrap/bootstrap.js";
import { UpdaterModule } from "./updater/module.js";
import { TwoFactorModule } from "./two-factor/module.js";
import { AppPreloadModule } from "./app-preload/module.js";
import { NotificationModule } from "./notification/module.js";
import { AppVersionModule } from "./app-version/module.js";
import { UserModule } from "./user/module.js";
import { ResourcesModule } from "./resources/module.js";

const envPath = path.join(process.resourcesPath, ".env");
dotenv.config(!isDev() ? { path: envPath } : undefined);

app.disableHardwareAcceleration();

Menu.setApplicationMenu(null);

app.on("ready", async () => {
  await bootstrapModules([
    AppPreloadModule,
    AppModule,
    AuthSocialNetworkModule,
    UpdaterModule,
    TwoFactorModule,
    AppVersionModule,
    NotificationModule,
    UserModule,
    ResourcesModule,
  ]);
});
