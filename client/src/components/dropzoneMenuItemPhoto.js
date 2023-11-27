import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Modal, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useAuthContext } from "src/contexts/auth-context";

export const ImageUploaderMenuItemPhoto = ({
  open,
  onClose,
  selectedFile,
  setSelectedFile,
  id,
  menu,
  setMenu,
  indexItem,
}) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  useEffect(() => {
    console.log("ibrahimindex", indexItem);
  }, [indexItem]);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("file", menu[indexItem?.index]?.items[indexItem?.itemIndex]?.photo);
      formData.append("user_id", state?.user?.user?._id);
      formData.append("menu_item_id", menu[indexItem?.index]?.items[indexItem?.itemIndex]?._id);
      await fetch("http://localhost:3001/menuItemPhoto/save", {
        method: "PUT",
        body: formData,
        headers: { Authorization: "Bearer " + state?.user?.token },
      });
      onClose();
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setMenu((prevMenu) => {
        const tempMenu = [...prevMenu];

        // Ensure tempMenu has an element at indexCategory
        if (!tempMenu[indexItem?.index]) {
          tempMenu[indexItem?.index] = { items: [] };
        }

        const category = { ...tempMenu[indexItem?.index] };

        // Ensure category has an items array and an element at indexItem
        if (!category.items) {
          category.items = [];
        }
        if (!category.items[indexItem?.itemIndex]) {
          category.items[indexItem?.itemIndex] = {};
        }

        const updatedItem = { ...category.items[indexItem?.itemIndex] };
        updatedItem.photo = acceptedFiles[0];
        category.items[indexItem?.itemIndex] = updatedItem;

        tempMenu[indexItem?.index] = category;

        return tempMenu;
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleClearFile = () => {
    let tempMenu = [...menu];
    tempMenu[indexItem?.index].items[indexItem?.itemIndex].photo = null;
    setMenu(tempMenu);
  };

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
        {!menu?.[indexItem?.index]?.items[indexItem?.itemIndex]?.photo && (
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
        {menu?.[indexItem?.index]?.items[indexItem?.itemIndex]?.photo && (
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
                src={URL.createObjectURL(
                  menu?.[indexItem?.index]?.items?.[indexItem?.itemIndex]?.photo,
                )}
                // alt={menuItemPhotos["6559fc440266b2d0072affea"]?.name}
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            // disabled={!selectedFile}
          >
            {t("common.save")}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
