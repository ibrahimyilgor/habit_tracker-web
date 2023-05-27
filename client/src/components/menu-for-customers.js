import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { PriceUnitSelector } from './price-unit-selector';

export default function MenuForCustomers({menu, setMenu}) {
  const {t} = useTranslation()

  const [expanded, setExpanded] = React.useState([]);

  const [editIndex, setEditIndex] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const [editItemIndex, setEditItemIndex] = React.useState(null);
  const [editItemText, setEditItemText] = React.useState("");
  const [editItemPrice, setEditItemPrice] = React.useState("");

  const [priceUnit, setPriceUnit] = React.useState("");

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
    <List sx={{ width: '90%', bgcolor: 'background.paper', margin: "5%" }}>
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
                    <ListItemAvatar>
                      <Avatar alt={editIndex === index ? editText : value.name ?? "-"} src="/static/images/avatar/1.jpg" />
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
                        sx={{marginLeft: 5, marginBottom: 1, marginTop: 1, width: "auto" }}
                      >
                        <ListItemAvatar>
                          <Avatar alt={(editItemIndex && editItemIndex.itemIndex  === itemIndex && editItemIndex.index  === index) ? editItemText : item.name ?? "-"} src="/static/images/avatar/1.jpg" />
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
