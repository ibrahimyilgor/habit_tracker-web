import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import { maxWidth } from "@mui/system";

export const NotificationModal = ({ open, onClose, notification }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          maxHeight: "90%",
          maxWidth: "90%",
          height: "auto", // Change to auto for dynamic content height
          width: "auto", // Change to auto for dynamic content width
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
        <Typography variant="h5" sx={{ mb: 3 }}>
          {notification?.title || ""}
        </Typography>
        <Typography variant="body1" sx={{ mb: 5, maxHeight: "60vh", overflowY: "auto" }}>
          {notification?.content || ""}
        </Typography>
        <Button variant="contained" onClick={onClose} sx={{ mt: 2 }}>
          {t("common.back")} {/* Assuming common.back is a translation key */}
        </Button>
      </Box>
    </Modal>
  );
};
