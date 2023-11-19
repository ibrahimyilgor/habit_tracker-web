import { MenuItem, Select } from "@mui/material";

const styles = {
  select: {
    height: "53.133px",
    width: "65px",
  },
};

export const PriceUnitSelector = ({ priceUnit, setPriceUnit }) => {
  const priceUnits = ["£", "€", "$", "₺"];

  const handleChange = (event) => {
    setPriceUnit(event.target.value);
  };

  return (
    <Select
      native={false}
      displayEmpty={true}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={priceUnit}
      onChange={handleChange}
      sx={styles.select}
    >
      {priceUnits.map((pu, index) => {
        return (
          <MenuItem key={"priceUnit" + index} value={pu}>
            {pu}
          </MenuItem>
        );
      })}
    </Select>
  );
};
