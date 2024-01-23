import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

export const ImageUploader = ({
  open,
  onClose,
  handleSubmit,
  selectedFile,
  setSelectedFile,
  defaultImage,
}) => {
  const { t } = useTranslation();

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  useEffect(() => {
    setSelectedFile(defaultImage);
  }, [open]);

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
        <Typography variant="h5" sx={{ mb: 2 }}>
          {t("imageUploader.title")}
        </Typography>
        {!selectedFile && (
          <Box
            {...getRootProps()}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              color: "text.secondary",
              p: 4,
              borderRadius: 1,
              border: "1px dashed",
              borderColor: "divider",
              cursor: "pointer",
              height: "70%",
              "&:hover": {
                opacity: 0.7,
              },
            }}
          >
            <input {...getInputProps()} />
            <Typography variant="h6">{t("imageUploader.dropFile")}</Typography>
          </Box>
        )}
        {selectedFile && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 2,
              height: "70%",
            }}
          >
            <Box
              sx={{
                bgcolor: "background.default",
                borderRadius: 1,
                border: "1px solid",
                borderColor: "divider",
                overflow: "hidden",
                mr: 2,
              }}
            >
              <img
                src={URL.createObjectURL(selectedFile)}
                alt={selectedFile.name}
                style={{ width: 100 }}
              />
            </Box>
            <Button variant="outlined" size="small" sx={{ ml: 2 }} onClick={handleClearFile}>
              {t("common.clear")}
            </Button>
          </Box>
        )}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={onClose} sx={{ mr: 2 }}>
            {t("common.back")}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {t("common.save")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
