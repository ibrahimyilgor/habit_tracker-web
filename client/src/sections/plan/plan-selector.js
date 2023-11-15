import { Divider, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useTranslation } from "react-i18next";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";

export const PlanSelector = ({ value, setValue, multiple, width, withTitle = false }) => {
  const { t } = useTranslation();

  const renderValue = (selected) => {
    return selected?.name ? t("plan.planNames." + selected?.name) : "";
  };

  return (
    <div style={{ width: width || 300 }}>
      <Select
        multiple={multiple}
        native={false}
        displayEmpty={true}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={value}
        onChange={(e) => setValue(e)}
        sx={{ width: "100%" }}
        renderValue={renderValue}
      >
        {withTitle && (
          <>
            <MenuItem key={"clear"} value={{ id: 0, name: "plans" }}>
              {t("plan.planNames.plans")}
            </MenuItem>
            <Divider />
          </>
        )}
        {PLAN_NAMES.map((plan, index) => {
          return (
            <MenuItem key={"plan_" + index} value={{ id: PLAN_IDS[index], name: plan }}>
              {t("plan.planNames." + plan)}
            </MenuItem>
          );
        })}
      </Select>
    </div>
  );
};
