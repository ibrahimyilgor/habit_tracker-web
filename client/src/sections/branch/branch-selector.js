import {
    MenuItem,
    Select,
} from '@mui/material';
import { useEffect } from 'react';
import { useRestaurantContext } from 'src/contexts/restaurant-context';
import { error, indigo, info, neutral, success, warning } from '../../theme/colors';

export const BranchSelector = ({}) => {

  const restaurant = useRestaurantContext()

  useEffect(() => {
    console.log("restaurant",restaurant?.selectedBranchIds)
  }, [restaurant])


  const handleChange = (event) => {
    const { value } = event.target;
    restaurant?.setSelectedBranchIds(value);
  };

  const renderValue = (selected) => {
    if (!selected || selected.length === 0) {
      console.log("bombos", selected)
      return 'Select branches';
    } else if (selected.length === 1) {
      const selectedBranch = restaurant.restaurants.find((branch) => branch._id === selected[0]);
      return selectedBranch.name;
    } else if (selected.length === restaurant.restaurants.length) {
      return `All (${selected.length} branches)`;
    } else {
      return `${selected.length} branches selected`;
    }
  };

  return (
    <div style={{width: "100%"}}>
        <Select
          multiple
          native={false}
          displayEmpty={true}
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={restaurant?.selectedBranchIds}
          onChange={handleChange}
          renderValue={renderValue}
          sx={{
              '& .MuiInputLabel-root': {
                color: 'white',
              },
              '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                color: "white"
              },
              width: "100%"
          }}
          MenuProps={{
            sx: {
              "&& .Mui-selected": {
                backgroundColor: neutral[700],
                color: neutral[300]
              },
              "&& .Mui-selected:hover": {
                backgroundColor: neutral[600],
                color: neutral[400]
              },
              "& .css-khf1n0-MuiPaper-root-MuiMenu-paper-MuiPaper-root-MuiPopover-paper": {
                backgroundColor: neutral[500]
              }
            }
          }}
        >
          {restaurant?.restaurants && restaurant?.restaurants.map((rest, index) => {
            return(
            <MenuItem 
              key={rest._id}
              sx={{
                width: "200px",
                marginLeft: "2%",
                fontSize: 14,
                borderRadius: 1,
                marginBottom: (index === restaurant.restaurants.length -1) ? 0 : 0.5,
                backgroundColor: neutral[300],
                color: neutral[700],
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "white",
              }}
              value={rest?._id}>
                {rest?.name.length > 20 ? (rest?.name.slice(0,20) + "...") : rest?.name}
            </MenuItem>)
          })}
        </Select>
    </div>
  );
};
