import { RgModule } from "../@core/decorators/rg-module.js";
import { MenuModule } from "../menu/module.js";
import { TrayModule } from "../tray/module.js";
import { UpdaterModule } from "../updater/module.js";
import { UserModule } from "../user/module.js";
import { AppIpc } from "./ipc.js";
import { AppService } from "./service.js";
import { AppWindow } from "./window.js";

@RgModule({
  imports: [MenuModule, TrayModule, UpdaterModule, UserModule],
  ipc: [AppIpc],
  windows: [AppWindow],
  providers: [AppService],
})
export class AppModule {}
