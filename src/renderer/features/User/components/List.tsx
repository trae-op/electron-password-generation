import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import {
  useControlContext,
  useControlContextProfile,
} from "../hooks/useControlContext";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";

export const ProfileList = () => {
  const { user } = useControlContext();
  const { renderButtonLogout, renderButtonUpdateApp } =
    useControlContextProfile();

  if (user === undefined) {
    return null;
  }

  return (
    <Box sx={{ width: 200 }}>
      <Stack sx={{ mt: 2, mb: 2 }} spacing={2} alignItems="center">
        <Avatar
          sx={{ width: 80, height: 80 }}
          alt="profile"
          src={user.avatar || ""}
        />
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Stack>
      <Divider />
      <ButtonGroup
        orientation="vertical"
        aria-label="Vertical button group"
        variant="text"
        fullWidth
        color="inherit"
      >
        {renderButtonUpdateApp}
        {renderButtonLogout}
      </ButtonGroup>
    </Box>
  );
};
