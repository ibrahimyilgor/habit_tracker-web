import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { useTranslation } from 'react-i18next';

import { Box } from '@mui/system';
import RightTopMenu from 'src/sections/menu-for-customer/right-top-menu';
import { useRouter } from 'next/router';
import { Grid, Typography } from '@mui/material';

export default function MenuForCustomers({menu, setMenu, settings, colors, setSnackbarMessage, setSnackbarOpen, setSnackbarSeverity}) {
  const {t} = useTranslation()
  const router = useRouter();
  const { id } = router.query;

  const [expanded, setExpanded] = React.useState([]);
  const [expandedItem, setExpandedItem] = React.useState([]);

  const [userAvatar, setUserAvatar] = React.useState()
  const [userAvatarSrc, setUserAvatarSrc] = React.useState("")

  const fetchLogo = async (id) => {
    try {
      const response = await fetch(
        `https://qr-meny.onrender.com/userAvatar/getAvatarByRestaurantId/${id}`,
        {
          method: 'GET'
        }
      );

      if (response.ok) {
        console.log("response", response)
        const blob = await response.blob();
        const file = new File([blob], "fileName", { type: 'image/*' });
        setUserAvatar(file);
      } else {
        console.error('Failed to fetch PDF:', response.statusText);
        setUserAvatar(null);
      }
    } catch (error) {
      console.error('Error fetching PDF:', error);
      setUserAvatar(null);
    }
  }

  React.useEffect(() => {
    if(settings?.showLogo){
      fetchLogo(id)
    }
  }, [settings]);

  React.useEffect(() => {
    console.log("expanded", expanded)
  }, [expanded]);

  React.useEffect(() => {
    // Filter out any elements in expandedItem that have an index value not in expanded
    const filteredExpandedItem = expandedItem.filter(
      (item) => expanded.some((index) => index === item.index)
    );
  
    setExpandedItem(filteredExpandedItem);
  }, [expanded]);

  React.useEffect(() => {
    if(userAvatar){
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
      (item) => item.index === index && item.itemIndex === itemIndex
    );
  
    if (existingIndex !== -1) {
      newExpandedItem.splice(existingIndex, 1);
    } else {
      newExpandedItem.push(expandedItemObj);
    }
    setExpandedItem(newExpandedItem);
  };

  return (
    <List sx={{ width: '90%', backgroundColor: colors?.backgroundColor ?? 'background.paper', margin: "5%" }}>
      <Box sx={{display: "flex", flexDirection: "row", marginBottom: 2, float: settings?.showComment && !settings?.showLogo ? "right" : "center"}}>
        {settings?.showLogo && (
          <Box sx={{backgroundColor: colors?.backgroundColor ?? "#ffffff", width: settings?.showComment ? "80%" : "100%", height: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <img
                src={userAvatarSrc || ""}
                alt=""
                style={{
                  height: '100%',
                  width: 'auto',
                }}
              />         
          </Box>
        )}
        {settings?.showComment && (
          <Box sx={{backgroundColor: colors?.backgroundColor ?? "#ffffff", width: "10%" , height: "10vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
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
                  sx={{
                    backgroundColor: colors?.itemColor ?? 'background.paper',
                    borderRadius: 1,
                    marginBottom: 1
                  }}
                > 
                  <ListItemButton 
                    onClick={() => handleExpand(index)}
                  >
                    <ListItemAvatar>
                      <Avatar alt={value.name ?? "-"} src="/static/images/avatar/1.jpg" sx={{backgroundColor: colors?.backgroundColor ?? "#eeeeee", color: colors?.textColor ?? "#ffffff"}}/>
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={<Typography variant="body2" style={{ color: colors?.textColor ?? '#FFFFFF' }}>{value.name}</Typography>}
                    />
                  </ListItemButton>

                </ListItem>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  {value.items && value.items.map((item, itemIndex) => {
                    const isExpandedItem = isExpanded ? expandedItem.some((item) => item.index === index && item.itemIndex === itemIndex) : null;
                    return (
                      <React.Fragment key={itemIndex}>
                        <ListItemButton onClick={() => handleExpandItem(index, itemIndex)} //Items
                          alignItems="center"
                          disablePadding
                          sx={{
                            marginLeft: 5,
                            marginBottom: isExpandedItem && item.explanation ? 0 : 1,
                            marginTop: 1,
                            padding: 1,
                            borderRadius: isExpandedItem && item.explanation ? "5px 5px 0 0" : "5px",
                            width: "auto",
                            backgroundColor: colors?.itemColor ?? 'background.paper',
                            "&:hover": {
                              backgroundColor: colors?.itemColor ?? 'background.paper'
                            }
                          }}
                        >
                          <Grid container>
                            <Grid item xs={9} sx={{ display: "flex", alignItems: "center" }}>
                              <Avatar alt={item.name ?? "-"} sx={{ backgroundColor: colors?.backgroundColor ?? "#eeeeee", color: colors?.textColor ?? "#ffffff", marginRight: 1 }} src="/static/images/avatar/1.jpg" />
                              <ListItemText primary={<Typography variant="body2" style={{ color: colors?.textColor ?? '#FFFFFF' }}>{item.name}</Typography>} />
                            </Grid>
                            <Grid item xs={3} sx={{ display: "flex", alignItems: "center" }}>
                              <ListItemText primary={<Typography variant="body2" style={{ color: colors?.textColor ?? '#FFFFFF' }}>{item.price + " " + item.priceUnit}</Typography>} />
                            </Grid>
                          </Grid>
                        </ListItemButton>
                        <Collapse in={isExpandedItem && item.explanation} timeout="auto" unmountOnExit>
                          <ListItemButton 
                            alignItems="center" 
                            disablePadding 
                            sx={{ 
                              marginLeft: 5,
                              marginBottom: 1,
                              padding: 1, 
                              borderRadius: "0 0 5px 5px", 
                              width: "auto", 
                              backgroundColor: colors?.itemColor ?? 'background.paper',
                              "&:hover": {
                                backgroundColor: colors?.itemColor ?? 'background.paper'
                              }
                            }}
                          >
                            <Grid container>
                              <Grid item xs={12}>
                                <ListItemText primary={<Typography variant="body2" style={{ color: colors?.textColor ?? '#FFFFFF' }}>{item.explanation}</Typography>} />
                              </Grid>
                            </Grid>
                          </ListItemButton>
                        </Collapse>
                      </React.Fragment>
                      )
                    })}
                  </Collapse>
                </React.Fragment>
            );
          })}
    </List>
  );
}
