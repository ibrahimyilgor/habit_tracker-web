import { MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "src/contexts/auth-context";

export const UserSelector = ({ selectedUser, setSelectedUser, fullWidth }) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const [users, setUsers] = useState([]);

  const handleChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const getUsers = async (token) => {
    const usersResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/user/getAllUsers`,
      {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      },
    );
    const tempUsers = await usersResponse.json();
    console.log("ibrahim", tempUsers);
    if (Array.isArray(tempUsers)) {
      setUsers(tempUsers);
    }

    return tempUsers;
  };

  useEffect(() => {
    getUsers(state?.user?.token);
  }, []);

  const styles = {
    select: {
      width: fullWidth ? "100%" : "65px",
    },
  };

  return (
    <Select
      native={false}
      displayEmpty={true}
      labelId="demo-simple-select-standard-label"
      id="demo-simple-select-standard"
      value={selectedUser}
      onChange={handleChange}
      sx={styles.select}
    >
      {Array.isArray(users) &&
        users.map((user, index) => {
          return (
            <MenuItem key={"senderType" + index} value={user?._id}>
              {user?.name + " - " + user?.email}
            </MenuItem>
          );
        })}
    </Select>
  );
};
