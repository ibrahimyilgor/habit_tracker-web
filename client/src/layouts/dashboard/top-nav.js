import PropTypes from 'prop-types';
import BellIcon from '@heroicons/react/24/solid/BellIcon';
import LanguageIcon from '@heroicons/react/24/solid/LanguageIcon';
import Bars3Icon from '@heroicons/react/24/solid/Bars3Icon';
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import ArrowsPointingOutIcon from '@heroicons/react/24/solid/ArrowsPointingOutIcon';
import ArrowsPointingInIcon from '@heroicons/react/24/solid/ArrowsPointingInIcon';
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { usePopover } from 'src/hooks/use-popover';
import { AccountPopover } from './account-popover';
import { LanguagePopover, languages } from './language-popover';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'src/contexts/auth-context';
import { useTranslation } from 'react-i18next';
import i18n from 'src/i18n'

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props) => {
  const { onNavOpen } = props;
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const accountPopover = usePopover();
  const languagePopover = usePopover();

  const {t} = useTranslation()

  const {userAvatarSrc} = useAuthContext()
  

  const [fullScreen, setFullScreen] = useState(false)
  const [flagInfo, setFlagInfo] = useState()

  useEffect(() => {
    setFlagInfo(languages.filter(x => x.code === i18n.language)[0])
  },[i18n.language])

  const state = useAuthContext()

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        setFullScreen(true)
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
        setFullScreen(false)
      }
    }
  }

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: 'blur(6px)',
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
          position: 'sticky',
          left: {
            lg: `${SIDE_NAV_WIDTH}px`
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
          },
          zIndex: (theme) => theme.zIndex.appBar
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2
          }}
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            {!lgUp && (
              <IconButton onClick={onNavOpen}>
                <SvgIcon fontSize="small">
                  <Bars3Icon />
                </SvgIcon>
              </IconButton>
            )}
            <Tooltip title={t("topNav.search")}>
              <IconButton>
                <SvgIcon fontSize="small">
                  <MagnifyingGlassIcon />
                </SvgIcon>
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack
            alignItems="center"
            direction="row"
            spacing={2}
          >
            <Tooltip title={t("topNav.language")}>
              <IconButton  
                onClick={languagePopover.handleOpen}
                ref={languagePopover.anchorRef}>
                  <img src={flagInfo?.flag} alt={i18n.language || ""} width={36} height={36/flagInfo?.ratio} />
              </IconButton>
            </Tooltip>
            <Tooltip title={t("topNav.fullscreen")}>
              <IconButton
                onClick={toggleFullScreen}
              >
                <SvgIcon fontSize="small">
                  {!fullScreen ? (<ArrowsPointingOutIcon />) : (<ArrowsPointingInIcon />)}
                </SvgIcon>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("topNav.notifications")}>
              <IconButton>
                <Badge
                  badgeContent={4}
                  color="success"
                  variant="dot"
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
                cursor: 'pointer',
                height: 40,
                width: 40
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
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func
};
