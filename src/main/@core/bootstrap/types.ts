export type TFolderSettings = {
  distRenderer: string;
  distMain: string;
};

export type TSettings = {
  baseRestApi: string;
  localhostPort: string;
  folders: TFolderSettings;
};
