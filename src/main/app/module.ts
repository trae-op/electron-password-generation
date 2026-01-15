import { RgModule } from "../@core/decorators/rg-module.js";
import { MenuModule } from "../menu/module.js";
import { TrayModule } from "../tray/module.js";
import { UpdaterModule } from "../updater/module.js";
import { AuthModule } from "../auth/module.js";
import { AppIpc } from "./ipc.js";
import { AppService } from "./service.js";
import { AppWindow } from "./window.js";
import { DataProvider } from "./data-provider.js";
import { MenuService } from "../menu/service.js";

@RgModule({
  imports: [MenuModule, TrayModule, UpdaterModule, AuthModule],
  ipc: [AppIpc],
  windows: [AppWindow],
  providers: [
    AppService,
    {
      provide: DataProvider,
      useFactory: (menuService: MenuService) => {
        return {
          getMenu: () => menuService.menu,
        };
      },
      inject: [MenuService],
    },
  ],
})
export class AppModule {}
