import { MenuItem, Select } from "@mui/material";
import { useTranslation } from "react-i18next";

export const MonthSelector = ({ month, setMonth, style }) => {
  const styles = {
    select: {
      height: "53.133px",
      width: style?.width || "65px",
      marginBottom: style?.marginBottom || 0,
    },
  };

  const { t } = useTranslation();

  const monthDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const handleChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <Select
      native={false}
      displayEmpty={true}
      labelId="demo-simple-select-standard-label2"
      id="demo-simple-select-standard2"
      value={month}
      onChange={handleChange}
      sx={styles.select}
    >
      {monthDuration.map((pu, index) => {
        return (
          <MenuItem key={"month" + index} value={pu}>
            {pu + " " + t("common.month")}
          </MenuItem>
        );
      })}
    </Select>
  );
};
