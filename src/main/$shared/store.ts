import ElectronStorage from "electron-store";

type TStore = {
  updateProcess: boolean;
};

type TElectronStorage = {
  authToken: string;
  userId: string;
  twoFactorSecret: string;
  masterKey: string;
};

const electronStorage = new ElectronStorage<TElectronStorage>();
const store = new Map<keyof TStore, TStore[keyof TStore]>();

export function getStore<K extends keyof TStore>(key: K) {
  return store.get(key) as TStore[K] | undefined;
}

export function hasStore<K extends keyof TStore>(name: K) {
  return store.has(name);
}

export function setStore<K extends keyof TStore>(name: K, value: TStore[K]) {
  store.set(name, value);
}

export function clearStore() {
  store.clear();
}

export function getElectronStorage<K extends keyof TElectronStorage>(key: K) {
  return electronStorage.get(key) as TElectronStorage[K] | undefined;
}

export function hasElectronStorage<K extends keyof TElectronStorage>(name: K) {
  return electronStorage.has(name);
}

export function setElectronStorage<K extends keyof TElectronStorage>(
  name: K,
  value: TElectronStorage[K]
) {
  electronStorage.set(name, value);
}

export function clearElectronStorage() {
  electronStorage.clear();
}

export function deleteFromElectronStorage<K extends keyof TElectronStorage>(
  name: K
) {
  electronStorage.delete(name);
}
