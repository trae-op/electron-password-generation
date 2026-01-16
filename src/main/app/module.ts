import { RgModule } from "../@core/decorators/rg-module.js";
import { MenuModule } from "../menu/module.js";
import { TrayModule } from "../tray/module.js";
import { UpdaterModule } from "../updater/module.js";
import { AuthModule } from "../auth/module.js";
import { AppIpc } from "./ipc.js";
import { AppService } from "./service.js";
import { AppWindow } from "./window.js";
import { MenuService } from "../menu/service.js";
import { MENU_PROVIDER } from "./tokens.js";
import type { TMenuProvider } from "./types.js";

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
  ],
})
export class AppModule {}
