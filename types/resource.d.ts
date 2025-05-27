type TResource = {
  id: number;
  userId: number;
  name: string;
  key: string;
  iv: string;
  salt?: string;
  createdAt: Date;
  updatedAt: Date;
};
