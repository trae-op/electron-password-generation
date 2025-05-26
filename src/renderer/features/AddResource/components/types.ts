import { IconButtonProps } from "@mui/material/IconButton";
import { ReactNode, ReactElement } from "react";

export type TPropsForm = {
  renderGenerateCharacters: ReactElement;
};

export type TPropsProvider = {
  children: ReactNode;
};

export type TPropsButtonProvider = IconButtonProps & {};
