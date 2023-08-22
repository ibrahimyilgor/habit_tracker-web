import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon';
import { Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';
import { useState } from 'react';

export const Search = ({placeholder, value, setValue}) => {

  const [searchValue, setSearchValue] = useState(value || "");

  const handleInputChange = (event) => {
    setValue(event.target.value)
  };

  return (<Card sx={{ p: 2 }}>
    <OutlinedInput
      value={value || ""}
      onChange={handleInputChange}
      fullWidth
      placeholder={placeholder || ""}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ maxWidth: 500 }}
    />
  </Card>)
}
