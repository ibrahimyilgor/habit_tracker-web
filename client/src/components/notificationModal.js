import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import { maxWidth } from "@mui/system";
import { isDesktop, isTablet, isMobile } from "react-device-detect";

export const NotificationModal = ({ open, onClose, notification }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          height: isMobile ? "90%" : "60%",
          width: isMobile ? "90%" : "60%",
          // height: "auto", // Change to auto for dynamic content height
          // width: "auto", // Change to auto for dynamic content width
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            height: "15%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3 }}>
            {notification?.title || ""}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "75%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          <Typography variant="body1" sx={{ mb: 5, maxHeight: "60vh", overflowY: "auto" }}>
            {notification?.content || ""}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "10%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
            {t("common.back")} {/* Assuming common.back is a translation key */}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
