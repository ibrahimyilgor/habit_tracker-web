import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export const ConfirmModal = ({ open, onClose, leftButtonMessage, rightButtonMessage, title, description, leftAction, rightAction }) => {
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
        <Typography variant="h5" sx={{ mb: 3 }}>
          {title || ""}
        </Typography>
        <Typography variant="h7" sx={{ mb: 5 }}>
          {description || ""}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button 
                variant="contained" 
                onClick={() => {
                    leftAction ? leftAction() : {} 
                }}
                sx={{ mr: 2 }}
            >
                {leftButtonMessage || ""}
            </Button>
            <Button
                variant="contained"
                color="primary"
                onClick={() => {
                    rightAction ? rightAction() : {} 
                }}
                // disabled={!selectedFile}
            >
                {rightButtonMessage || ""}
            </Button>
        </Box>
      </Box>
    </Modal>
  );
};

