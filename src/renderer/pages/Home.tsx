import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { ButtonLogout } from "@features/AuthSocialNetwork";
import Stack from "@mui/material/Stack";

export const Home = () => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Stack spacing={2} alignItems="center">
          <ButtonLogout text="Log Out" />
        </Stack>
      </CardContent>
    </Card>
  );
};
