import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Collapse from "@mui/material/Collapse";
import { Box, Button, CardActions, Divider, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";

import { PriceUnitSelector } from "./price-unit-selector";
import { useRestaurantContext } from "src/contexts/restaurant-context";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { ImageUploader } from "./dropzone";
import { ImageUploaderMenuItemPhoto } from "./dropzoneMenuItemPhoto";
import { PLAN_IDS } from "src/utils/constants";
import { useAuthContext } from "src/contexts/auth-context";

export default function MenuTreeView({ menu, setMenu, activeStep }) {
  const { t } = useTranslation();
  const restaurant = useRestaurantContext();
  const state = useAuthContext();

  const [expanded, setExpanded] = React.useState([]);

  const [editIndex, setEditIndex] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const [photoItemIndex, setPhotoItemIndex] = React.useState(null);
  const [photoCategoryIndex, setPhotoCategoryIndex] = React.useState(null);

  const [editItemIndex, setEditItemIndex] = React.useState(null);
  const [editItemText, setEditItemText] = React.useState("");
  const [editItemPrice, setEditItemPrice] = React.useState("");
  const [editItemExplanation, setEditItemExplanation] = React.useState("");

  const [uploadImageOpen, setUploadImageOpen] = React.useState();

  const [priceUnit, setPriceUnit] = React.useState("");

  const fetchMenuItemPhoto = async (id, indexCategory, indexItem) => {
    try {
      const response = await fetch(`http://localhost:3001/menuItemPhoto/getMenuItemPhoto/${id}`, {
        method: "GET",
      });

      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], "fileName", { type: "image/*" });

        if (file) {
          console.log("ibrahimfile", file);

          let tempMenu = [...menu];
          tempMenu[indexCategory].items[indexItem].photo = file;
          setMenu(tempMenu);

          const reader = new FileReader();
          reader.onload = () => {
            let tempMenu = [...menu];
            tempMenu[indexCategory].items[indexItem].photoSrc = reader.result;
            setMenu(tempMenu);
          };
          reader.readAsDataURL(file);
        }

        return file;
      } else {
        console.error("Failed to fetch menu item photo:", response.statusText, id);
        let tempMenu = [...menu];
        tempMenu[indexCategory].items[indexItem].photo = null;
        setMenu(tempMenu);
        return null;
      }
    } catch (error) {
      console.error("Error fetching menu item photo:", error, id);
      let tempMenu = [...menu];
      tempMenu[indexCategory].items[indexItem].photo = null;
      setMenu(tempMenu);
      return null;
    }
  };

  React.useEffect(() => {
    if (activeStep === 1) {
      menu.forEach((category, indexCategory) => {
        category?.items?.forEach((item, indexItem) => {
          if (!item?.photo) {
            fetchMenuItemPhoto(item?._id, indexCategory, indexItem);
          }
        });
      });
    }
  }, [activeStep]);

  React.useEffect(() => {
    console.log("restchanged", restaurant);
    console.log("selectedBranchIdsselectedBranchIds2", restaurant.selectedBranchIds);
    if (restaurant?.restaurants && restaurant.restaurants.length > 0) {
      setMenu(
        restaurant.restaurants.filter((r) => r._id === restaurant.selectedBranchIds)?.[0]?.menu ??
          [],
      );
    }
  }, [restaurant.selectedBranchIds]);

  React.useEffect(() => {
    if (editIndex !== null) {
      setEditText(menu[editIndex].name);
    }
  }, [editIndex]);

  React.useEffect(() => {
    console.log("indexes", editItemIndex);
    if (editItemIndex !== null && editItemIndex.index >= 0 && editItemIndex.itemIndex >= 0) {
      setEditItemText(menu?.[editItemIndex.index]?.items[editItemIndex.itemIndex]?.name || "");
      setEditItemPrice(menu[editItemIndex.index].items[editItemIndex.itemIndex].price);
      setEditItemExplanation(
        menu[editItemIndex.index].items[editItemIndex.itemIndex].explanation || "",
      );
      setPriceUnit(menu?.[editItemIndex.index]?.items[editItemIndex.itemIndex]?.priceUnit);
    }
  }, [editItemIndex]);

  const toggleItemClearButton = (itemIndex) => {
    event.stopPropagation();
    setEditItemIndex(null);
  };

  const toggleItemDoneButton = (event, index, itemIndex) => {
    event.stopPropagation();
    let newMenu = [...menu];
    newMenu[index].items[itemIndex].name = editItemText;
    newMenu[index].items[itemIndex].price = editItemPrice;
    newMenu[index].items[itemIndex].explanation = editItemExplanation;
    newMenu[index].items[itemIndex].priceUnit = priceUnit;
    setMenu(newMenu);
    setEditItemIndex(null);
  };

  const toggleChangePhoto = (event, index, itemIndex) => {
    event.stopPropagation();
    setUploadImageOpen(true);
    setPhotoItemIndex(itemIndex);
    setPhotoCategoryIndex(index);
  };

  const toggleItemDeleteButton = (event, index, itemIndex) => {
    event.stopPropagation();
    let newMenu = [...menu];
    let newItems = [...newMenu[index].items];
    newItems.splice(itemIndex, 1);
    newMenu[index].items = [...newItems];
    console.log("deletedelete", newItems, newMenu);
    setMenu(newMenu);
  };

  const toggleItemDownButton = (event, index, itemIndex) => {
    event.stopPropagation();
    let newMenu = [...menu];
    let newItems = [...menu[index].items];
    if (itemIndex < newItems.length - 1) {
      [newItems[itemIndex], newItems[itemIndex + 1]] = [
        newItems[itemIndex + 1],
        newItems[itemIndex],
      ];
    }
    newMenu[index].items = [...newItems];
    setMenu(newMenu);
  };

  const toggleItemUpButton = (event, index, itemIndex) => {
    event.stopPropagation();
    let newMenu = [...menu];
    let newItems = [...menu[index].items];
    if (itemIndex !== 0) {
      [newItems[itemIndex], newItems[itemIndex - 1]] = [
        newItems[itemIndex - 1],
        newItems[itemIndex],
      ];
    }
    newMenu[index].items = [...newItems];
    setMenu(newMenu);
  };

  const toggleItemEditButton = (event, index, itemIndex) => {
    event.stopPropagation();
    setEditItemIndex({ index: index, itemIndex: itemIndex });
  };

  const toggleAddCategory = (event) => {
    event.stopPropagation();
    let newMenu = [...menu];
    newMenu.push({
      name: t("menu.defaultNewCategory"),
      items: [],
    });
    setMenu(newMenu);
  };

  const toggleAddButton = (event, index) => {
    event.stopPropagation();
    let newMenu = [...menu];
    newMenu[index].items.push({
      name: t("menu.defaultNewItem"),
      price: "0",
      priceUnit: "₺",
    });
    setMenu(newMenu);
  };

  const toggleEditButton = (event, index) => {
    event.stopPropagation();
    setEditIndex(index);
  };

  const toggleDoneButton = (event, index) => {
    event.stopPropagation();
    let newMenu = [...menu];
    newMenu[index].name = editText;
    setMenu(newMenu);
    setEditIndex(null);
  };

  const toggleClearButton = (event, index) => {
    event.stopPropagation();
    setEditIndex(null);
  };

  const toggleDeleteButton = (event, index) => {
    event.stopPropagation();
    let newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  };

  const toggleUpButton = (event, index) => {
    event.stopPropagation();
    let newMenu = [...menu];
    if (index !== 0) {
      [newMenu[index], newMenu[index - 1]] = [newMenu[index - 1], newMenu[index]];
    }
    setMenu(newMenu);
  };

  const toggleDownButton = (event, index) => {
    event.stopPropagation();
    let newMenu = [...menu];
    if (index < newMenu.length - 1) {
      [newMenu[index], newMenu[index + 1]] = [newMenu[index + 1], newMenu[index]];
    }
    setMenu(newMenu);
  };

  const handleExpand = (index) => {
    const newExpanded = [...expanded];
    if (newExpanded.includes(index)) {
      newExpanded.splice(newExpanded.indexOf(index), 1);
    } else {
      newExpanded.push(index);
    }
    setExpanded(newExpanded);
  };

  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {menu.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          const isExpanded = expanded.includes(index);
          return (
            <React.Fragment key={index}>
              <ListItem //Category
                alignItems="flex-start"
                disablePadding
              >
                <Card
                  sx={{
                    width: "100%",
                    marginBottom: 1,
                  }}
                  onClick={() => handleExpand(index)}
                >
                  <CardActionArea>
                    <CardContent>
                      {editIndex !== index ? (
                        <Typography
                          // color={colors?.textColor ?? "#000000"}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          {value?.name}
                        </Typography>
                      ) : (
                        <TextField
                          id="outlined-basic"
                          variant="outlined"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                        />
                      )}
                    </CardContent>
                    <CardActions>
                      {
                        //Category buttons
                        editIndex === index ? (
                          <Grid container spacing={1}>
                            <Grid item>
                              <Button onClick={(event) => toggleDoneButton(event, index)}>
                                <DoneIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={(event) => toggleClearButton(event, index)}>
                                <ClearIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid container spacing={1}>
                            <Grid item>
                              <Button onClick={(event) => toggleAddButton(event, index)}>
                                <AddIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={(event) => toggleEditButton(event, index)}>
                                <EditIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={(event) => toggleDeleteButton(event, index)}>
                                <DeleteIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={(event) => toggleUpButton(event, index)}>
                                <KeyboardArrowUpIcon />
                              </Button>
                            </Grid>
                            <Grid item>
                              <Button onClick={(event) => toggleDownButton(event, index)}>
                                <KeyboardArrowDownIcon />
                              </Button>
                            </Grid>
                          </Grid>
                        )
                      }
                    </CardActions>
                  </CardActionArea>
                </Card>
              </ListItem>
              <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                {value.items &&
                  value.items.map((item, itemIndex) => {
                    return (
                      <ListItem //Items
                        key={itemIndex}
                        alignItems="center"
                        disablePadding
                        sx={{ marginLeft: 5, marginBottom: 1, marginTop: 1 }}
                      >
                        <Card
                          sx={{
                            margin: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "90%",
                            // backgroundColor: colors?.itemColor ?? "#ffffff",
                          }}
                        >
                          <CardActionArea>
                            {menu?.[index]?.items[itemIndex]?.photo &&
                              PLAN_IDS[2] !== state?.user?.user?._id && (
                                <CardMedia
                                  component="img"
                                  height="140"
                                  image={menu?.[index]?.items[itemIndex]?.photoSrc}
                                  alt=""
                                />
                              )}
                            <CardContent>
                              {editItemIndex &&
                              editItemIndex.itemIndex === itemIndex &&
                              editItemIndex.index === index ? (
                                <Box>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      marginBottom: 1,
                                      height: "50%",
                                    }}
                                  >
                                    <TextField
                                      id="outlined-basic"
                                      variant="outlined"
                                      value={editItemText}
                                      onChange={(e) => setEditItemText(e.target.value)}
                                      style={{ marginRight: 5, width: "40%" }}
                                    />
                                    <TextField
                                      id="outlined-basic2"
                                      variant="outlined"
                                      value={editItemPrice}
                                      onChange={(e) => setEditItemPrice(e.target.value)}
                                      style={{ marginRight: 5, width: "40%" }}
                                    />
                                    <PriceUnitSelector
                                      priceUnit={priceUnit}
                                      setPriceUnit={setPriceUnit}
                                    />
                                  </Box>
                                  <Box sx={{ display: "flex", flexDirection: "row", width: "81%" }}>
                                    <TextField
                                      id="outlined-basic3"
                                      variant="outlined"
                                      value={editItemExplanation}
                                      onChange={(e) => setEditItemExplanation(e.target.value)}
                                      style={{ width: "100%" }}
                                    />
                                  </Box>
                                </Box>
                              ) : (
                                <>
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      width: "100%",
                                    }}
                                  >
                                    <Typography
                                      // color={colors?.textColor ?? "#000000"}
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {item.name}
                                    </Typography>
                                    <Typography
                                      // color={colors?.textColor ?? "#000000"}
                                      gutterBottom
                                      variant="h5"
                                      component="div"
                                    >
                                      {item.price + " " + item.priceUnit}
                                    </Typography>
                                  </Box>
                                  <Box></Box>
                                  <Typography variant="body2">{item?.explanation}</Typography>
                                </>
                              )}
                            </CardContent>
                            <CardActions>
                              {
                                // Item buttons
                                editItemIndex &&
                                editItemIndex.itemIndex === itemIndex &&
                                editItemIndex.index === index ? (
                                  <Grid container spacing={1}>
                                    <Grid item>
                                      <Button
                                        onClick={(event) =>
                                          toggleItemDoneButton(event, index, itemIndex)
                                        }
                                      >
                                        <DoneIcon />
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        onClick={(event) => toggleItemClearButton(event, itemIndex)}
                                      >
                                        <ClearIcon />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                ) : (
                                  <Grid container>
                                    {" "}
                                    {PLAN_IDS[2] === state?.user?.user?.plan_id?._id && (
                                      <Grid item>
                                        <Button
                                          onClick={(event) =>
                                            toggleChangePhoto(event, index, itemIndex)
                                          }
                                        >
                                          <AddAPhotoIcon />
                                        </Button>
                                      </Grid>
                                    )}
                                    <Grid item>
                                      <Button
                                        onClick={(event) =>
                                          toggleItemEditButton(event, index, itemIndex)
                                        }
                                      >
                                        <EditIcon />
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        onClick={() =>
                                          toggleItemDeleteButton(event, index, itemIndex)
                                        }
                                      >
                                        <DeleteIcon />
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        onClick={(event) =>
                                          toggleItemUpButton(event, index, itemIndex)
                                        }
                                      >
                                        <KeyboardArrowUpIcon />
                                      </Button>
                                    </Grid>
                                    <Grid item>
                                      <Button
                                        onClick={(event) =>
                                          toggleItemDownButton(event, index, itemIndex)
                                        }
                                      >
                                        <KeyboardArrowDownIcon />
                                      </Button>
                                    </Grid>
                                  </Grid>
                                )
                              }
                            </CardActions>
                          </CardActionArea>
                        </Card>
                      </ListItem>
                    );
                  })}
              </Collapse>
            </React.Fragment>
          );
        })}
        <Divider style={{ margin: 10 }} /> {/* Add Category */}
        <Card
          sx={{
            margin: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            cursor: "pointer",
          }}
          onClick={toggleAddCategory}
        >
          <CardContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <ListItemAvatar>
                <AddIcon />
              </ListItemAvatar>
              <Typography gutterBottom variant="h6" component="div">
                {t("menu.addCategory")}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </List>
      <ImageUploaderMenuItemPhoto
        open={uploadImageOpen}
        onClose={() => setUploadImageOpen(false)}
        id={1}
        menu={menu}
        setMenu={setMenu}
        itemIndex={photoItemIndex}
        setItemIndex={setPhotoItemIndex}
        categoryIndex={photoCategoryIndex}
        setCategoryIndex={setPhotoCategoryIndex}
      />
      {/* 
        BU İKİLİLER SAYFADA STEPPER İLERİ GERİ GİDİLDİĞİNDE VEYA ISPDF DEGİSTİGİNDE SIFIRLANIYOR MU BAK
        FOTOLAR KAYDETTEN SONRA TEKRAR BAKTIGIMIZDA GÖRÜNÜYOR MU BAK
        KATEGORI VE ITEM SILINDIGINDE IMAGEI DA STATETEN SİL
        + ITEM YERLERİ DEĞİŞTİĞİNDE NE OLUYOR TEST
        + EN SON KAYDETE BASILDIĞINDA ISPDF DEGİLSE IMAGELARI DA BACKENDDE KAYDET.
        + EN SON KAYDETE BASILDIĞINDA ISPDF İSE DBDEKİ, O MENÜDEKİ BÜTÜN IMAGELARI SİL.
        + MENU ÇEKİLDİĞİNDE IMAGELARI DA ÇEK
        + PREMIUM DEĞİLSE IMAGE EKLEME VE GÖSTERMEYİ KAPAT
        + HESAP SİLİNİRSE BÜTÜN İMAGELARI DB DEN SİL
        + PREMIUM HARİCİNE GEÇERSE BÜTÜN İMAGELARI DB DEN SİL
        + PLAN DEĞİŞTİRME TRIGGERINDA IMAGELARI DBDEN SİL
      */}
    </>
  );
}
