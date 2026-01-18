import {
  IpcHandler,
  type TIpcHandlerInterface,
} from "@_traeop_/electron-modular";
import { NotificationService } from "./service.js";

@IpcHandler()
export class NotificationIpc implements TIpcHandlerInterface {
  constructor(private notificationService: NotificationService) {}

  onInit() {
    this.notificationService.initNotification();
  }
}
