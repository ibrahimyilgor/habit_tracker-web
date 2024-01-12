import { useCallback, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { withAuthGuard } from "src/hocs/with-auth-guard";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";
import { useRouter } from "next/router";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = withAuthGuard((props) => {
  const { children } = props;
  const router = useRouter();
  const pathname = router.pathname;
  const [openNav, setOpenNav] = useState(false);

  useEffect(
    () => {
      console.log("PATHNAME", pathname);
      if (openNav) {
        setOpenNav(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname],
  );

  // useEffect(
  //   () => {
  //     console.log("PATHNAME2", pathname);
  //   },
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [pathname],
  // );

  return (
    <>
      {!pathname.toLowerCase().includes("/branchmenu") && (
        <>
          <TopNav onNavOpen={() => setOpenNav(true)} />
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>{children}</LayoutContainer>
          </LayoutRoot>
        </>
      )}
      {pathname.toLowerCase().includes("/branchmenu") && (
        <div style={{ margin: 0, maxWidth: "none" }}>{children}</div>
      )}
    </>
  );
});
