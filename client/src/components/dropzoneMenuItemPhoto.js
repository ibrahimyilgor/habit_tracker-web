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
  itemIndex,
  setItemIndex,
  categoryIndex,
  setCategoryIndex,
}) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const [tempMenu, setTempMenu] = useState([]);
  const [prevPhoto, setPrevPhoto] = useState(null);
  const [newPhoto, setNewPhoto] = useState(null);

  useEffect(() => {
    if (!open) {
      setItemIndex(0);
      setCategoryIndex(0);
    } else {
      setNewPhoto(null);
      setPrevPhoto(menu[categoryIndex]?.items[itemIndex]?.photo);
      setTempMenu([...menu]);
    }
  }, [open]);

  const handleClose = () => {};

  const handleSubmit = async () => {
    // try {
    //   const formData = new FormData();
    //   formData.append("file", menu[categoryIndex]?.items[itemIndex]?.photo);
    //   formData.append("user_id", state?.user?.user?._id);
    //   formData.append("menu_item_id", menu[categoryIndex]?.items[itemIndex]?._id);
    //   await fetch(process.env.BACKEND_SERVER + "/menuItemPhoto/save", {
    //     method: "PUT",
    //     body: formData,
    //     headers: { Authorization: "Bearer " + state?.user?.token },
    //   });
    //   onClose();
    // } catch (error) {
    //   console.error("Error in handleSubmit:", error);
    // }

    setMenu((prevMenu) => {
      const tempMenu = [...prevMenu];
      // Ensure tempMenu has an element at indexCategory
      if (!tempMenu[categoryIndex]) {
        tempMenu[categoryIndex] = { items: [] };
      }
      const category = { ...tempMenu[categoryIndex] };
      // Ensure category has an items array and an element at indexItem
      if (!category.items) {
        category.items = [];
      }
      if (!category.items[itemIndex]) {
        category.items[itemIndex] = {};
      }
      const updatedItem = { ...category.items[itemIndex] };
      updatedItem.photo = newPhoto;
      updatedItem.photoSrc = newPhoto ? URL.createObjectURL(newPhoto) : null;
      category.items[itemIndex] = updatedItem;
      tempMenu[categoryIndex] = category;
      return tempMenu;
    });
    onClose();
  };

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setNewPhoto(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
  });

  const handleClearFile = () => {
    setNewPhoto(null);
    setPrevPhoto(null);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose();
        handleClose();
      }}
    >
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
        {!(newPhoto || prevPhoto) && (
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
        {(newPhoto || prevPhoto) && (
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
                src={newPhoto || prevPhoto ? URL.createObjectURL(newPhoto || prevPhoto) : null}
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
          <Button
            variant="contained"
            onClick={() => {
              onClose();
              handleClose();
            }}
            sx={{ mr: 2 }}
          >
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
