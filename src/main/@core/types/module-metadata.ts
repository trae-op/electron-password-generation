import type { TIpcHandlerInterface } from "./ipc-handler.js";
import type { Constructor } from "./constructor.js";

export type RgModuleMetadata = {
  imports?: Constructor[];
  ipc?: (new (...args: any[]) => TIpcHandlerInterface)[];
  windows?: Constructor[];
  providers?: Constructor[];
  exports?: Constructor[];
};
