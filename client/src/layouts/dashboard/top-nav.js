import PropTypes from "prop-types";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import LanguageIcon from "@heroicons/react/24/solid/LanguageIcon";
import Bars3Icon from "@heroicons/react/24/solid/Bars3Icon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import ArrowsPointingOutIcon from "@heroicons/react/24/solid/ArrowsPointingOutIcon";
import ArrowsPointingInIcon from "@heroicons/react/24/solid/ArrowsPointingInIcon";
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { usePopover } from "src/hooks/use-popover";
import { AccountPopover } from "./account-popover";
import { LanguagePopover, languages } from "./language-popover";
import { useEffect, useState } from "react";
import { useAuthContext } from "src/contexts/auth-context";
import { useTranslation } from "react-i18next";
import i18n from "src/i18n";
import { NotificationPopover } from "./notification-popover";
import { indigo } from "src/theme/colors";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const state = useAuthContext();

  const accountPopover = usePopover();
  const languagePopover = usePopover();
  const notificationPopover = usePopover();

  const { t } = useTranslation();

  const { userAvatarSrc } = useAuthContext();

  const [fullScreen, setFullScreen] = useState(false);
  const [flagInfo, setFlagInfo] = useState();
  const [notifications, setNotifications] = useState([]);

  const getNotificationsForAUser = async (token, user_id, plan_id) => {
    const usersResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER +
        `/notification/${user_id}/${plan_id}/getNotificationsForAUser`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempNotifications = await usersResponse.json();
    if (Array.isArray(tempNotifications)) {
      setNotifications(tempNotifications);
    }

    return tempNotifications;
  };

  useEffect(() => {
    getNotificationsForAUser(
      state?.user?.token,
      state?.user?.user?._id,
      state?.user?.user?.plan_id?._id,
    );
  }, []);

  useEffect(() => {
    setFlagInfo(languages.filter((x) => x.code === i18n.languages[0])[0]);
  }, [i18n.languages[0]]);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setFullScreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setFullScreen(false);
      }
    }
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}>
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
          </Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            <Tooltip title={t("topNav.language")}>
              <IconButton onClick={languagePopover.handleOpen} ref={languagePopover.anchorRef}>
                <img
                  src={flagInfo?.flag}
                  alt={i18n.languages[0]}
                  width={36}
                  height={36 / flagInfo?.ratio}
                />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("topNav.fullscreen")}>
              <IconButton onClick={toggleFullScreen}>
                <SvgIcon fontSize="small">
                  {!fullScreen ? <ArrowsPointingOutIcon /> : <ArrowsPointingInIcon />}
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("topNav.notifications")}>
              <IconButton
                onClick={notificationPopover.handleOpen}
                ref={notificationPopover.anchorRef}
              >
                <Badge
                  badgeContent={notifications?.length || 0}
                  sx={{
                    "& .MuiBadge-badge": {
                      color: indigo.light,
                      backgroundColor: indigo.main,
                    },
                  }}
                  variant="standard"
                >
                  <SvgIcon fontSize="small">
                    <BellIcon />
                  </SvgIcon>
                </Badge>
              </IconButton>
            </Tooltip>
            <Avatar
              onClick={accountPopover.handleOpen}
              ref={accountPopover.anchorRef}
              sx={{
                cursor: "pointer",
                height: 40,
                width: 40,
              }}
              src={userAvatarSrc || ""}
            />
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />
      <LanguagePopover
        anchorEl={languagePopover.anchorRef.current}
        open={languagePopover.open}
        onClose={languagePopover.handleClose}
      />
      <NotificationPopover
        anchorEl={notificationPopover.anchorRef.current}
        open={notificationPopover.open}
        onClose={notificationPopover.handleClose}
        notifications={notifications}
        setNotifications={setNotifications}
      />
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
