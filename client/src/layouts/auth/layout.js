import PropTypes from "prop-types";
import NextLink from "next/link";
import { Box, Typography, Unstable_Grid2 as Grid, IconButton, Tooltip } from "@mui/material";
import { Logo } from "src/components/logo";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { useTranslation } from "react-i18next";
import { usePopover } from "src/hooks/use-popover";
import { LanguagePopover, languages } from "../dashboard/language-popover";
import { useEffect } from "react";
import i18n from "src/i18n";

export const Layout = (props) => {
  const { children } = props;

  useEffect(() => {
    console.log("i18nlanguage", i18n.languages[0]);
  }, []);

  const languagePopover = usePopover();
  const { t } = useTranslation();

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flex: "1 1 auto",
      }}
    >
      <Grid container sx={{ flex: "1 1 auto" }}>
        <Grid
          xs={12}
          lg={6}
          sx={{
            backgroundColor: "background.paper",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              p: 3,
              position: "fixed",
              top: 0,
              width: "100%",
            }}
          >
            <Box
              component={NextLink}
              href="/"
              sx={{
                display: "inline-flex",
                height: 32,
                width: 32,
              }}
            >
              <Logo />
            </Box>
            <Tooltip title={t("topNav.language")}>
              <IconButton onClick={languagePopover.handleOpen} ref={languagePopover.anchorRef}>
                <img
                  src={
                    languages.filter((e) => e.code === i18n.languages[0]).length > 0
                      ? languages.filter((e) => e.code === i18n.languages[0])[0].flag
                      : languages[0].flag
                  }
                  width={36}
                  height={24}
                />
              </IconButton>
            </Tooltip>
          </Box>
          {children}
        </Grid>
        <Grid
          xs={12}
          lg={6}
          sx={{
            alignItems: "center",
            background: "radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)",
            color: "white",
            display: "flex",
            justifyContent: "center",
            "& img": {
              maxWidth: "100%",
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align="center"
              color="inherit"
              sx={{
                fontSize: "24px",
                lineHeight: "32px",
                mb: 1,
              }}
              variant="h1"
            >
              Welcome to{" "}
              <Box component="a" sx={{ color: "#15B79E" }} target="_blank">
                Devias Kit
              </Box>
            </Typography>
            <Typography align="center" sx={{ mb: 3 }} variant="subtitle1">
              A professional kit that comes with ready-to-use MUI components.
            </Typography>
            <img alt="" src="https://assets4.lottiefiles.com/private_files/lf30_UlXgnV.json" />

            <Player
              autoplay
              loop
              src="https://assets4.lottiefiles.com/private_files/lf30_UlXgnV.json"
              style={{ height: "300px", width: "300px" }}
            ></Player>
          </Box>
        </Grid>
      </Grid>
      <LanguagePopover
        anchorEl={languagePopover.anchorRef.current}
        open={languagePopover.open}
        onClose={languagePopover.handleClose}
      />
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};
