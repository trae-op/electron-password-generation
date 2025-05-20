import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  Context as ContextUpdater,
  ButtonDownloaded,
  useUpdate,
} from "@features/Updater";
import { Container as ContainerAppVersion } from "@widgets/AppVersion";
import { Container as ContainerAllowedRouters } from "@widgets/AllowedRoutes";
import { useClosePreloadWindow } from "../hooks";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          "& #root": {
            width: "100%",
          },
        },
      },
    },
  },
  colorSchemes: {
    dark: true,
  },
});

export const MainLayout = () => {
  useClosePreloadWindow();
  const value = useUpdate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <ContainerAllowedRouters routes={["window:main", "sign-in"]}>
            <ContextUpdater.Provider value={value}>
              <Stack
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                }}
                spacing={2}
                alignItems="end"
              >
                <ButtonDownloaded text="Update downloaded" />
              </Stack>
            </ContextUpdater.Provider>

            <ContainerAppVersion
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
              }}
            />
          </ContainerAllowedRouters>

          <Outlet />
        </Box>
      </Container>
    </ThemeProvider>
  );
};
