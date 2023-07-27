import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Checkbox from '@mui/material/Checkbox';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import { Box, Divider, IconButton, ListItemIcon, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import { PriceUnitSelector } from './price-unit-selector';
import { useRestaurantContext } from 'src/contexts/restaurant-context';

export default function CheckboxListSecondary({menu, setMenu}) {
  const {t} = useTranslation()
  const restaurant = useRestaurantContext()

  const [checked, setChecked] = React.useState([1]);
  const [expanded, setExpanded] = React.useState([]);

  const [editIndex, setEditIndex] = React.useState(null);
  const [editText, setEditText] = React.useState("");

  const [editItemIndex, setEditItemIndex] = React.useState(null);
  const [editItemText, setEditItemText] = React.useState("");
  const [editItemPrice, setEditItemPrice] = React.useState("");
  const [editItemExplanation, setEditItemExplanation] = React.useState("");

  const [priceUnit, setPriceUnit] = React.useState("");

  React.useEffect(() => {
    if(restaurant?.restaurants && restaurant.restaurants.length > 0){
      setMenu(restaurant.restaurants.filter(r => r._id === restaurant.selectedBranchIds)?.[0]?.menu ?? [])
    }
  }, [restaurant])

  React.useEffect(() => {
    if(editIndex !== null){
      setEditText(menu[editIndex].name)
    }
  }, [editIndex])

  React.useEffect(() => {
    console.log("indexes", editItemIndex)
    if(editItemIndex !== null && editItemIndex.index >= 0 && editItemIndex.itemIndex >= 0){
      setEditItemText(menu?.[editItemIndex.index]?.items[editItemIndex.itemIndex]?.name || "")
      setEditItemPrice(menu[editItemIndex.index].items[editItemIndex.itemIndex].price)
      setEditItemExplanation(menu[editItemIndex.index].items[editItemIndex.itemIndex].explanation || "")
      setPriceUnit(menu?.[editItemIndex.index]?.items[editItemIndex.itemIndex]?.priceUnit)
    }
  }, [editItemIndex])

  const toggleItemClearButton = (itemIndex) => {
    setEditItemIndex(null)
  }

  const toggleItemDoneButton = (index, itemIndex) => {
    let newMenu = [...menu];
    console.log("done", newMenu, index)
    newMenu[index].items[itemIndex].name = editItemText
    newMenu[index].items[itemIndex].price = editItemPrice
    newMenu[index].items[itemIndex].explanation = editItemExplanation
    newMenu[index].items[itemIndex].priceUnit = priceUnit
    setMenu(newMenu);
    setEditItemIndex(null)
  }

  const toggleItemDeleteButton = (index, itemIndex) => {

    let newMenu = [...menu];
    let newItems = [...newMenu[index].items]
    newItems.splice(itemIndex, 1)
    newMenu[index].items = [...newItems]
    console.log("deletedelete", newItems, newMenu)
    setMenu(newMenu);
  }

  const toggleItemDownButton = (index, itemIndex) => {
    console.log("down")
    let newMenu = [...menu];
    let newItems = [...menu[index].items];
    if(itemIndex < newItems.length-1){
      [ newItems[itemIndex], newItems[itemIndex+1] ] = [ newItems[itemIndex+1], newItems[itemIndex] ];
    }
    newMenu[index].items = [...newItems]
    setMenu(newMenu);
  }
  
  const toggleItemUpButton = (index, itemIndex) => {
    console.log("up")
    let newMenu = [...menu];
    let newItems = [...menu[index].items];
    if(itemIndex !== 0){
      [ newItems[itemIndex], newItems[itemIndex-1] ] = [ newItems[itemIndex-1], newItems[itemIndex] ];
    }
    newMenu[index].items = [...newItems]
    setMenu(newMenu);
  }

  const toggleItemEditButton = (index, itemIndex) => {
    setEditItemIndex({index: index, itemIndex: itemIndex})
  }


  const toggleAddCategory = (index) => {
    let newMenu = [...menu];
    newMenu.push(
      {
        name: t("menu.defaultNewCategory"),
        items: []
      },
    )
    setMenu(newMenu);
  };

  const toggleAddButton = (index) => {
    console.log("add", menu, index)
    let newMenu = [...menu];
    newMenu[index].items.push({
      name: t("menu.defaultNewItem"),
      price: "0",
      priceUnit: "₺"
    })
    setMenu(newMenu);
  };

  const toggleEditButton = (index) => {
    console.log("edit")
    setEditIndex(index)
  };

  const toggleDoneButton = (index) => {
    console.log("done")
    let newMenu = [...menu];
    newMenu[index].name = editText
    setMenu(newMenu);
    setEditIndex(null)
  };


  const toggleClearButton = (index) => {
    console.log("clear")
    setEditIndex(null)
  };


  const toggleDeleteButton = (index) => {
    console.log("deletedelete")
    let newMenu = [...menu];
    newMenu.splice(index, 1);
    setMenu(newMenu);
  };

  const toggleUpButton = (index) => {
    console.log("up")
    let newMenu = [...menu];
    if(index !== 0){
      [ newMenu[index], newMenu[index-1] ] = [ newMenu[index-1], newMenu[index] ];
    }
    setMenu(newMenu);
  };

  const toggleDownButton = (index) => {
    console.log("down")
    let newMenu = [...menu];
    if(index < newMenu.length-1){
      [ newMenu[index], newMenu[index+1] ] = [ newMenu[index+1], newMenu[index] ];
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
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          {menu.map((value, index) => {
            const labelId = `checkbox-list-secondary-label-${index}`;
            const isExpanded = expanded.includes(index);
            return (
              <React.Fragment key={index}>
                <ListItem //Category
                  alignItems="flex-start"
                  disablePadding
                  secondaryAction={ //Category buttons
                    editIndex === index ?
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItemButton onClick={() => toggleDoneButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <DoneIcon />
                          </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => toggleClearButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <ClearIcon />
                          </ListItemIcon>
                        </ListItemButton>
                      </div> :
                      <div style={{display: "flex", flexDirection: "row"}}>
                        <ListItemButton onClick={() => toggleAddButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <AddIcon />
                          </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => toggleEditButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <EditIcon />
                          </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => toggleDeleteButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <DeleteIcon />
                          </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => toggleUpButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <KeyboardArrowUpIcon />
                          </ListItemIcon>
                        </ListItemButton>
                        <ListItemButton onClick={() => toggleDownButton(index)}>
                          <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                            <KeyboardArrowDownIcon />
                          </ListItemIcon>
                        </ListItemButton>
                      </div>
                  }
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
                        sx={{marginLeft: 5, marginBottom: 1, marginTop: 1 }}
                        secondaryAction={ //Item buttons
                          (editItemIndex && editItemIndex.itemIndex  === itemIndex && editItemIndex.index  === index) ?
                            <div style={{display: "flex", flexDirection: "row"}}>
                              <ListItemButton onClick={() => toggleItemDoneButton(index, itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <DoneIcon />
                                </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton onClick={() => toggleItemClearButton(itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <ClearIcon />
                                </ListItemIcon>
                              </ListItemButton>
                            </div> :
                            <div style={{display: "flex", flexDirection: "row"}}>
                              <ListItemButton onClick={() => toggleItemEditButton(index, itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <EditIcon />
                                </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton onClick={() => toggleItemDeleteButton(index, itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <DeleteIcon />
                                </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton onClick={() => toggleItemUpButton(index, itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <KeyboardArrowUpIcon />
                                </ListItemIcon>
                              </ListItemButton>
                              <ListItemButton onClick={() => toggleItemDownButton(index, itemIndex)}>
                                <ListItemIcon style={{display: "flex", justifyContent: "center"}}>
                                  <KeyboardArrowDownIcon />
                                </ListItemIcon>
                              </ListItemButton>
                            </div>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar alt={(editItemIndex && editItemIndex.itemIndex  === itemIndex && editItemIndex.index  === index) ? editItemText : item.name ?? "-"} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        {(editItemIndex && editItemIndex.itemIndex  === itemIndex && editItemIndex.index  === index) ?
                          (
                          <Box>
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                              <TextField id="outlined-basic" variant="outlined" value={editItemText} onChange={e => setEditItemText(e.target.value)} style={{marginRight: 5}} />
                              <TextField id="outlined-basic2" variant="outlined" value={editItemPrice} onChange={e => setEditItemPrice(e.target.value)} style={{marginRight: 5}}/>
                              <PriceUnitSelector priceUnit={priceUnit} setPriceUnit={setPriceUnit} />
                            </Box>
                            <Box sx={{display: "flex", flexDirection: "row"}}>
                              <TextField id="outlined-basic3" variant="outlined" value={editItemExplanation} onChange={e => setEditItemExplanation(e.target.value)} style={{width: "100%"}}/>
                            </Box>
                          </Box>
                          )
                          :
                          (
                            <Box>
                              <Box sx={{display: "flex", flexDirection: "row"}}>
                                <ListItemText secondary={item.name + " " + item.price + " " + item.priceUnit}/>
                              </Box>
                              <Box sx={{display: "flex", flexDirection: "row", width: "60%"}}>
                                <ListItemText secondary={item.explanation}  />
                              </Box>
                          </Box>
                          )
                        }
                      </ListItem>
                    )
                  })}
                </Collapse>
              </React.Fragment>
            );
          })}
          <Divider style={{margin: 10}} /> {/* Add Category */}
          <ListItemButton onClick={toggleAddCategory}>
            <ListItemAvatar>
              <Avatar alt="+">
              <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              id={"add"}
              primary={t("menu.addCategory")}
              sx={{fontWeight: "bold",}}
            />
          </ListItemButton>
    </List>
  );
}
