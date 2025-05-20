import { type ButtonProps } from "@mui/material/Button";
import { type ReactNode } from "react";

export type TPropsButtonProvider = ButtonProps & {
  text: string;
};

export type TPropsButtonLogout = TPropsButtonProvider;

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsPrivateRoute = {
  children: ReactNode;
};
