import { useState, useMemo, MouseEvent } from "react";
import type { THookControl } from "./types";

export const useControl = (): THookControl => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isOpen = useMemo(() => Boolean(anchorEl), [anchorEl]);

  const id = useMemo(() => (isOpen ? "profile-popover" : undefined), [isOpen]);

  return {
    id,
    isOpen,
    anchorEl,
    handleClick,
    handleClose,
  };
};
