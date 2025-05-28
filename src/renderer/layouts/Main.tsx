import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import { Container as ContainerAppVersion } from "@ui-composites/AppVersion";
import { Container as ContainerAllowedRouters } from "@ui-composites/AllowedRoutes";
import { useClosePreloadWindow } from "@hooks/closePreloadWindow";
import { AuthLoadingSpinner } from "@ui-composites/AuthLoadingSpinner";

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
            <AuthLoadingSpinner />

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
