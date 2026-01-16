import { RgModule } from "../@core/decorators/rg-module.js";
import { MenuModule } from "../menu/module.js";
import { TrayModule } from "../tray/module.js";
import { TrayService } from "../tray/service.js";

import { UpdaterModule } from "../updater/module.js";
import { AuthModule } from "../auth/module.js";
import { AppIpc } from "./ipc.js";
import { AppService } from "./service.js";
import { AppWindow } from "./window.js";
import { MenuService } from "../menu/service.js";
import { MENU_PROVIDER, TRAY_PROVIDER } from "./tokens.js";
import type { TMenuProvider, TTrayProvider } from "./types.js";

@RgModule({
  imports: [MenuModule, TrayModule, UpdaterModule, AuthModule],
  ipc: [AppIpc],
  windows: [AppWindow],
  providers: [
    AppService,
    {
      provide: MENU_PROVIDER,
      useFactory: (menuService: MenuService): TMenuProvider => ({
        getMenu: () => menuService.menu,
        buildMenu: (items) => menuService.buildMenu(items),
      }),
      inject: [MenuService],
    },
    {
      provide: TRAY_PROVIDER,
      useFactory: (trayService: TrayService): TTrayProvider => ({
        getTray: () => trayService.trayMenu,
        buildTray: (items) => trayService.buildTray(items),
        destroyTray: () => trayService.destroyTray(),
      }),
      inject: [TrayService],
    },
  ],
})
export class AppModule {}
