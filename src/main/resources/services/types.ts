export type TPostBody = {
  name: string;
  key: string;
  iv: string;
  salt: string;
};

export type TPutBody = {
  [key: string]: string;
};

export type TEncryptedVault = {
  iv: string;
  salt: string;
  encryptedData: string;
};
