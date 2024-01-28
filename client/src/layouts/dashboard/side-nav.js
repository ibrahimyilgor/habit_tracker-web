import NextLink from "next/link";
import { usePathname } from "next/navigation";
import PropTypes from "prop-types";
import ArrowTopRightOnSquareIcon from "@heroicons/react/24/solid/ArrowTopRightOnSquareIcon";
import ChevronUpDownIcon from "@heroicons/react/24/solid/ChevronUpDownIcon";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Stack,
  SvgIcon,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Logo } from "src/components/logo";
import { Scrollbar } from "src/components/scrollbar";
import { items } from "./config";
import { SideNavItem } from "./side-nav-item";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { BranchSelector } from "src/sections/branch/branch-selector";
import { useAuthContext } from "src/contexts/auth-context";
import { useRouter } from "next/router";

export const SideNav = (props) => {
  const { open, onClose } = props;
  const pathname = usePathname();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const router = useRouter();

  const state = useAuthContext();
  const { userAvatarSrc } = useAuthContext();

  const content = (
    <Scrollbar
      sx={{
        height: "100%",
        "& .simplebar-content": {
          height: "100%",
        },
        "& .simplebar-scrollbar:before": {
          background: "neutral.400",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box sx={{ p: 3 }}>
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
          <Box
            sx={{
              alignItems: "center",
              backgroundColor: "rgba(255, 255, 255, 0.04)",
              borderRadius: 1,
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
              mt: 2,
              p: "12px",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "65px",
              }}
            >
              <img
                src={userAvatarSrc || ""}
                style={{
                  height: "auto",
                  width: "100%",
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", flex: 1, marginLeft: 5 }}>
              <Typography color="inherit" variant="subtitle1" wrap>
                {state?.user?.user?.name || ""}
              </Typography>
            </div>
          </Box>
        </Box>
        <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          component="nav"
          sx={{
            flexGrow: 1,
            px: 2,
            py: 3,
          }}
        >
          <Stack
            component="ul"
            spacing={0.5}
            sx={{
              listStyle: "none",
              p: 0,
              m: 0,
            }}
          >
            {items.map((item) => {
              const active = item.path ? pathname === item.path : false;

              if (
                item.permission?.includes(state?.user?.user?.role) &&
                (state?.user?.user?.role === "admin" ||
                  !item.not_permitted_plan_ids?.includes(state?.user?.user?.plan_id?._id)) &&
                item.visibleOnSideNav !== false
              ) {
                return (
                  <SideNavItem
                    active={active}
                    disabled={item.disabled}
                    external={item.external}
                    icon={item.icon}
                    key={item.title}
                    path={item.path}
                    title={item.title}
                  />
                );
              } else {
                return null;
              }
            })}
          </Stack>
        </Box>
        {/* <Divider sx={{ borderColor: "neutral.700" }} />
        <Box
          sx={{
            px: 2,
            py: 3,
          }}
        >
          <Typography color="neutral.100" variant="subtitle2">
            Need more features?
          </Typography>
          <Typography color="neutral.500" variant="body2">
            Check out our Pro solution template.
          </Typography>
          <Box
            sx={{
              display: "flex",
              mt: 2,
              mx: "auto",
              width: "160px",
              "& img": {
                width: "100%",
              },
            }}
          >
            <img alt="Go to pro" src="/assets/devias-kit-pro.png" />
          </Box>
          <Button
            component="a"
            endIcon={
              <SvgIcon fontSize="small">
                <ArrowTopRightOnSquareIcon />
              </SvgIcon>
            }
            fullWidth
            href="https://material-kit-pro-react.devias.io/"
            sx={{ mt: 2 }}
            target="_blank"
            variant="contained"
          >
            Pro Live Preview
          </Button>
        </Box> */}
      </Box>
    </Scrollbar>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: "neutral.800",
            color: "common.white",
            width: 280,
          },
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: "neutral.800",
          color: "common.white",
          width: 280,
        },
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

SideNav.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
