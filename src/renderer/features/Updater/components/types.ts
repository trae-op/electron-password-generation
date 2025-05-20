import { type ButtonProps } from "@mui/material/Button";

export interface IPropsProvider extends TUpdateData {
  children: React.ReactNode;
}

export type TPropsButtonDownloaded = ButtonProps & {
  text: string;
};
