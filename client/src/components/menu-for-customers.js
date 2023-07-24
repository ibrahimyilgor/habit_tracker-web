import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PriceUnitSelector } from './price-unit-selector';
import { Box } from '@mui/system';
import RightTopMenu from 'src/sections/menu-for-customer/right-top-menu';
import { Image } from '@mui/icons-material';
import { useRouter } from 'next/router';

export default function MenuForCustomers({menu, setMenu, settings, colors, setSnackbarMessage, setSnackbarOpen, setSnackbarSeverity}) {
  const {t} = useTranslation()
  const router = useRouter();
  const { id } = router.query;

  const [expanded, setExpanded] = React.useState([]);

  const [editIndex, setEditIndex] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const [editItemIndex, setEditItemIndex] = React.useState(null);
  const [editItemText, setEditItemText] = React.useState("");
  const [editItemPrice, setEditItemPrice] = React.useState("");

  const [userAvatar, setUserAvatar] = React.useState()
  const [userAvatarSrc, setUserAvatarSrc] = React.useState("")

  const fetchLogo = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3001/userAvatar/getAvatarByRestaurantId/${id}`,
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
    if(userAvatar){
      const reader = new FileReader();
      reader.onload = () => {
        setUserAvatarSrc(reader.result);
      };
      reader.readAsDataURL(userAvatar);
    }
  }, [userAvatar]);

  React.useEffect(() => {
    if(editIndex !== null){
      setEditText(menu[editIndex].name)
    }
  }, [editIndex])

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
                  <ListItemButton onClick={() => handleExpand(index)}>
                    <ListItemAvatar>
                      <Avatar alt={editIndex === index ? editText : value.name ?? "-"} src="/static/images/avatar/1.jpg" sx={{backgroundColor: colors?.backgroundColor ?? "#eeeeee"}}/>
                    </ListItemAvatar>
                    {editIndex === index ?
                      <TextField id="outlined-basic" variant="outlined" value={editText} onChange={e => setEditText(e.target.value)} /> :
                      (<ListItemText
                        id={labelId}
                        primary={value.name}
                        />)
                    }
                  </ListItemButton>

                </ListItem>
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  {value.items && value.items.map((item, itemIndex) => {
                    return (
                      <ListItem //Items
                        alignItems="center"
                        disablePadding
                        sx={{marginLeft: 5, marginBottom: 1, marginTop: 1, padding: 1, borderRadius: 1, width: "auto", backgroundColor: colors?.itemColor ?? 'background.paper' }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={(editItemIndex && editItemIndex.itemIndex  === itemIndex && editItemIndex.index  === index) ? editItemText : item.name ?? "-"} sx={{backgroundColor: colors?.backgroundColor ?? "#eeeeee"}} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText sx={{width: "75%"}} secondary={item.name}/>
                        <ListItemText sx={{width: "25%"}} secondary={item.price + " " + item.priceUnit}  />
                      </ListItem>
                    )
                  })}
                </Collapse>
              </React.Fragment>
            );
          })}
    </List>
  );
}