import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useTranslation } from "react-i18next";

export const BranchSelector = ({ multiple, width }) => {
  const { t } = useTranslation();
  const restaurant = useRestaurantContext();

  useEffect(() => {
    console.log("restaurant", restaurant?.selectedBranchIds);
  }, [restaurant]);

  const handleChange = (event) => {
    const { value } = event.target;
    restaurant?.setSelectedBranchIds(value);
  };

  const renderValue = (selected) => {
    console.log("selected", selected);
    if (!selected || selected.length === 0) {
      console.log("bombos", selected);
      return t("branchSelector.noBranches");
    } else if ((multiple && selected.length === 1) || selected) {
      let selectedBranch;
      if (multiple) {
        selectedBranch = restaurant.restaurants.find((branch) => branch._id === selected[0]);
      } else {
        selectedBranch = restaurant.restaurants.find((branch) => branch._id === selected);
      }
      return selectedBranch.name;
    } else if (multiple && selected.length === restaurant.restaurants.length) {
      return t("branches.allBranchesSelected", { length: selected.length });
    } else {
      return t("branches.branchesSelected", { length: selected.length });
    }
  };

  return (
    <div style={{ width: width || 300 }}>
      <Select
        multiple={multiple}
        native={false}
        displayEmpty={true}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={restaurant?.selectedBranchIds}
        onChange={handleChange}
        sx={{ width: "100%" }}
        renderValue={renderValue}
      >
        {restaurant?.restaurants &&
          restaurant?.restaurants.map((rest, index) => {
            return (
              <MenuItem key={rest._id} value={rest?._id}>
                {rest?.name.length > 20 ? rest?.name.slice(0, 20) + "..." : rest?.name}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
};
