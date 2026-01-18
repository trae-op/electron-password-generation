import { RgModule } from "@_traeop_/electron-modular";
import { NotificationIpc } from "./ipc.js";
import { NotificationService } from "./service.js";

@RgModule({
  ipc: [NotificationIpc],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
