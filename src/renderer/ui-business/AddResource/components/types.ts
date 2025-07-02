import { ReactElement, ReactNode } from "react";
import { IconButtonProps } from "@mui/material/IconButton";

export type TPropsProvider = {
  children: ReactNode;
  renderGenerateCharacters: ReactElement;
};

export type TPropsButtonProvider = IconButtonProps & {};
