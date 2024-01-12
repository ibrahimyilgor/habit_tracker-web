import Head from "next/head";
import NextLink from "next/link";
import ArrowLeftIcon from "@heroicons/react/24/solid/ArrowLeftIcon";
import { Box, Button, Container, SvgIcon, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "src/contexts/auth-context";

export const links = {
  user: "/",
  admin: "/",
  customer: "/branchmenu",
};

const Page = () => {
  const { t } = useTranslation();
  const state = useAuthContext();

  return (
    <>
      <Head>
        <title>404 | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                mb: 3,
                textAlign: "center",
              }}
            >
              <img
                alt="Under development"
                src="/assets/errors/error-404.png"
                style={{
                  display: "inline-block",
                  maxWidth: "100%",
                  width: 400,
                }}
              />
            </Box>
            <Typography align="center" sx={{ mb: 3 }} variant="h3">
              {t("error.404error")}
            </Typography>
            <Typography align="center" color="text.secondary" variant="body1">
              {t("error.404errorDetail")}
            </Typography>
            <Button
              component={NextLink}
              href={links?.[state?.user?.user?.role] || "/"}
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowLeftIcon />
                </SvgIcon>
              }
              sx={{ mt: 3 }}
              variant="contained"
            >
              {t("error.goBackToDashboard")}
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Page;
