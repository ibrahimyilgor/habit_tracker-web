import { MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const OverviewYearSelector = ({ width, value, handleChange }) => {
  const { t } = useTranslation();

  useEffect(() => {
    console.log("valuevalue", value);
  }, [value]);

  const renderValue = (selected) => {
    console.log("ibrahimselectedyear", selected);
    return selected;
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
        {Array(new Date().getFullYear() - 2024 + 1)
          .fill(0)
          .map((rest, index) => {
            return (
              <MenuItem key={2024 + index} value={2024 + index}>
                {2024 + index}
              </MenuItem>
            );
          })}
      </Select>
    </div>
  );
};
