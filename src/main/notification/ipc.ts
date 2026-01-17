import { IpcHandler } from "@traeop/electron-modular";
import type { TIpcHandlerInterface } from "@traeop/electron-modular";
import { NotificationService } from "./service.js";

@IpcHandler()
export class NotificationIpc implements TIpcHandlerInterface {
  constructor(private notificationService: NotificationService) {}

  onInit() {
    this.notificationService.initNotification();
  }
}
