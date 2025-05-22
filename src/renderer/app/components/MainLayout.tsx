import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { Container as ContainerAppVersion } from "@widgets/AppVersion";
import { Container as ContainerAllowedRouters } from "@widgets/AllowedRoutes";
import { useClosePreloadWindow } from "../hooks";
import { useControlContext } from "@features/AuthSocialNetwork/hooks/useControlContext";
import CircularProgress from "@mui/material/CircularProgress";

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
  const { isAuthenticated } = useControlContext();

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
            {isAuthenticated === undefined && (
              <Stack
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  zIndex: 1000,
                  backgroundColor: "rgba(24, 24, 24)",
                }}
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress size={70} />
              </Stack>
            )}

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
