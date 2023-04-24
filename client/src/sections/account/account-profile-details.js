import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { HANDLERS, useAuthContext } from 'src/contexts/auth-context';

export const AccountProfileDetails = () => {
  const state = useAuthContext()
  const [values, setValues] = useState({
    id: state?.user?.user?._id,
    name: state?.user?.user?.name ||  "",
    phone: state?.user?.user?.phone || "",
    address: state?.user?.user?.address || ""
  });

  useEffect(() => {
    console.log("values", state, values)
  }, [values])

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await fetch("http://localhost:3001/user/updateUser", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + state?.user?.token
          },
          body: JSON.stringify({ _id: values?.id, name: values?.name, address: values?.address, phone: values?.phone })
      });
      const data = await response.json();
      console.log("submit", data)
      state.getUser(state?.user?.user?._id)

      return data;
      } catch (error) {
        console.error("Error updating user:", error);
        // handle the error, e.g. show a message to the user
      }
    },
    [values]
  );
  

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  onChange={handleChange}
                  required
                  value={values.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit">
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
