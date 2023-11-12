import { ImageList, ImageListItem, Dialog, DialogContent, Avatar } from "@mui/material";
import React from "react";
import { useState } from "react";

const images = ["https://via.placeholder.com/150", "https://via.placeholder.com/150"];

const classes = {
  root: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "auto",
    marginTop: "10px",
  },
  imageList: {
    flexWrap: "nowrap",
  },
  largerImage: {
    maxWidth: "100%",
    maxHeight: "80vh", // Adjust as needed
  },
};

const MenuImages = ({ item, colors }) => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar
        alt={item?.name ?? "-"}
        sx={{
          backgroundColor: colors?.backgroundColor ?? "#eeeeee",
          color: colors?.textColor ?? "#ffffff",
          marginRight: 1,
        }}
        src={images[0]}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <ImageList style={classes.imageList} cols={2}>
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <img src={image} alt={`Image ${index}`} />
              </ImageListItem>
            ))}
          </ImageList>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MenuImages;
