import React from "react";
import { useTranslation } from "react-i18next";
import { Box, Modal } from "@mui/material";

export const CreateCommentModal = ({ open, onClose }) => {
  const { t } = useTranslation();

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          height: "350px",
          width: "350px",
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
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        </Box>
      </Box>
    </Modal>
  );
};

