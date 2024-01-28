import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useTranslation } from "react-i18next";

export const OverviewBranchSelector = ({ width, value, handleChange }) => {
  const { t } = useTranslation();
  const restaurant = useRestaurantContext();

  useEffect(() => {
    console.log("valuevalue", value);
  }, [value]);

  // const handleChange = (event) => {
  //   const { value } = event.target;
  //   // restaurant?.setSelectedBranchIds(value);
  // };

  const renderValue = (selected) => {
    console.log("ibrahimselected", selected);
    if (!selected?.value || selected?.value.length === 0) {
      return t("overview.allBranches");
    } else if (selected) {
      let selectedBranch;
      selectedBranch = restaurant.restaurants.find((branch) => branch._id === selected?.value);
      return selectedBranch?.name ?? null;
    }
  };

  return (
    <div style={{ width: width || 300 }}>
      <Select
        native={false}
        displayEmpty={true}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={handleChange}
        sx={{ width: "100%" }}
        renderValue={renderValue}
      >
        <MenuItem key={0} value={null}>
          {t("overview.allBranches")}
        </MenuItem>
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
