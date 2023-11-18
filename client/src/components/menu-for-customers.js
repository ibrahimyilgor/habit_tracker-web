import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import { useTranslation } from "react-i18next";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { Box } from "@mui/system";
import RightTopMenu from "src/sections/menu-for-customer/right-top-menu";
import { useRouter } from "next/router";
import { Grid, ImageList, ImageListItem, Typography } from "@mui/material";

export default function MenuForCustomers({
  menu,
  setMenu,
  settings,
  colors,
  setSnackbarMessage,
  setSnackbarOpen,
  setSnackbarSeverity,
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;

  const imageRef = React.useRef();

  const [expanded, setExpanded] = React.useState([]);
  const [expandedItem, setExpandedItem] = React.useState([]);

  const [userAvatar, setUserAvatar] = React.useState();
  const [userAvatarSrc, setUserAvatarSrc] = React.useState("");

  const fetchLogo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/userAvatar/getAvatarByRestaurantId/${id}`,
        {
          method: "GET",
        },
      );

      if (response.ok) {
        console.log("response", response);
        const blob = await response.blob();
        const file = new File([blob], "fileName", { type: "image/*" });
        setUserAvatar(file);
      } else {
        console.error("Failed to fetch PDF:", response.statusText);
        setUserAvatar(null);
      }
    } catch (error) {
      console.error("Error fetching PDF:", error);
      setUserAvatar(null);
    }
  };

  React.useEffect(() => {
    if (settings?.showLogo) {
      fetchLogo(id);
    }
  }, [settings]);

  React.useEffect(() => {
    console.log("imageRef", imageRef);
  }, [imageRef]);

  React.useEffect(() => {
    // Filter out any elements in expandedItem that have an index value not in expanded
    const filteredExpandedItem = expandedItem.filter((item) =>
      expanded.some((index) => index === item.index),
    );

    setExpandedItem(filteredExpandedItem);
  }, [expanded]);

  React.useEffect(() => {
    if (userAvatar) {
      const reader = new FileReader();
      reader.onload = () => {
        setUserAvatarSrc(reader.result);
      };
      reader.readAsDataURL(userAvatar);
    }
  }, [userAvatar]);

  const handleExpand = (index) => {
    const newExpanded = [...expanded];
    if (newExpanded.includes(index)) {
      newExpanded.splice(newExpanded.indexOf(index), 1);
    } else {
      newExpanded.push(index);
    }
    setExpanded(newExpanded);
  };

  const handleExpandItem = (index, itemIndex) => {
    const newExpandedItem = [...expandedItem];
    const expandedItemObj = { index, itemIndex };

    const existingIndex = newExpandedItem.findIndex(
      (item) => item.index === index && item.itemIndex === itemIndex,
    );

    if (existingIndex !== -1) {
      newExpandedItem.splice(existingIndex, 1);
    } else {
      newExpandedItem.push(expandedItemObj);
    }
    setExpandedItem(newExpandedItem);
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: colors?.backgroundColor ?? "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <List
        sx={{
          width: "90%",
          maxWidth: "300px",
          backgroundColor: colors?.backgroundColor ?? "background.paper",
          margin: "5%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: settings?.showComment && !settings?.showLogo ? "end" : "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          {settings?.showLogo && (
            <Box
              sx={{
                backgroundColor: colors?.backgroundColor ?? "#ffffff",
                width: settings?.showComment ? "80%" : "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={userAvatarSrc || ""}
                alt=""
                style={{
                  height: "100%",
                  width: "auto",
                }}
              />
            </Box>
          )}
          {settings?.showComment && (
            <Box
              sx={{
                backgroundColor: colors?.backgroundColor ?? "#ffffff",
                width: "10%",
                height: "10vh",
                display: "flex",
                alignItems: "center",
              }}
            >
              <RightTopMenu
                settings={settings}
                colors={colors}
                setSnackbarOpen={setSnackbarOpen}
                setSnackbarSeverity={setSnackbarSeverity}
                setSnackbarMessage={setSnackbarMessage}
              />
            </Box>
          )}
        </Box>
        {menu.map((value, index) => {
          const labelId = `checkbox-list-secondary-label-${index}`;
          const isExpanded = expanded.includes(index);
          return (
            <React.Fragment key={index}>
              <ListItem //Category
                alignItems="flex-start"
                disablePadding
              >
                <ListItemButton onClick={() => handleExpand(index)}>
                  <Card
                    sx={{
                      width: "100%",
                      backgroundColor: colors?.itemColor ?? "#ffffff",
                    }}
                  >
                    <CardActionArea>
                      <CardContent>
                        <Typography
                          color={colors?.textColor ?? "#000000"}
                          gutterBottom
                          variant="h5"
                          component="div"
                        >
                          {value.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </ListItemButton>
              </ListItem>
              <Collapse
                in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{
                  width: "100%",
                  margin: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {value.items &&
                  value.items.map((item, itemIndex) => {
                    return (
                      <React.Fragment key={itemIndex}>
                        <Card
                          sx={{
                            margin: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: colors?.itemColor ?? "#ffffff",
                          }}
                        >
                          <CardActionArea>
                            <CardMedia
                              component="img"
                              height="140"
                              image="https://i.sozcucdn.com/wp-content/uploads/2022/04/05/iecrop/adana2_16_9_1649152561.jpg?w=776&h=436&mode=crop"
                              alt="green iguana"
                            />
                            <CardContent>
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Typography
                                  color={colors?.textColor ?? "#000000"}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {item.name}
                                </Typography>
                                <Typography
                                  color={colors?.textColor ?? "#000000"}
                                  gutterBottom
                                  variant="h5"
                                  component="div"
                                >
                                  {item.price + " " + item.priceUnit}
                                </Typography>
                              </Box>
                              <Box></Box>
                              <Typography color={colors?.textColor ?? "#000000"} variant="body2">
                                {item.explanation}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </React.Fragment>
                    );
                  })}
              </Collapse>
            </React.Fragment>
          );
        })}
      </List>
    </Box>
  );
}
