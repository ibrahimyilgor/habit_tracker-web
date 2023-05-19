import {
    MenuItem,
    Select,
} from '@mui/material';

export const PriceUnitSelector = ({priceUnit, setPriceUnit}) => {

    const priceUnits = [
        "£",
        "€",
        "$",
        "₺"
    ]

  const handleChange = (event) => {
    setPriceUnit(event.target.value)
  };

  return (
    <Select
        native={false}
        displayEmpty={true}
        labelId="demo-simple-select-standard-label"
        id="demo-simple-select-standard"
        value={priceUnit}
        onChange={handleChange}
        sx={{width: 65}}
    >
        {priceUnits.map((pu, index) => {
        return(
        <MenuItem 
            key={"priceUnit" + index}
            value={pu}>
            {pu}
        </MenuItem>)
        })}
    </Select>
  );
};
