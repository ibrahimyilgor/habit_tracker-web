import { Typography } from "@mui/material";
import React from "react";
import { Logo } from "src/components/logo";
import { error, indigo, info, neutral, success, warning } from "../theme/colors";

export const SplashScreen = () => {
  return (
    <div style={styles.root}>
      <div style={styles.container}>
        <Logo />
        <div style={styles.textContainer}>
          <Typography style={styles.bigText}>Sitename</Typography>
          <Typography style={styles.smallText}>Loading...</Typography>
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: neutral[500],
  },
  container: {
    maxWidth: "95%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "15%",
    backgroundColor: neutral[50],
    padding: "25px",
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    textAlign: "center",
  },
  bigText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
  },
  smallText: {
    fontSize: 16,
    color: "#000",
  },
};

export default SplashScreen;
