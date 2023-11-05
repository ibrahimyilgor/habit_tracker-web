import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { HANDLERS, useAuthContext } from "src/contexts/auth-context";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import CustomizedSnackbars from "../snackbar";
import { useTranslation } from "react-i18next";

export const BranchAdd = ({ back, setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage }) => {
  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    name: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    console.log("values", state, values);
  }, [values]);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await restaurant
        .addBranch({
          id: state?.user?.user?._id,
          name: values?.name,
          phone: values?.phone,
          address: values?.address,
          restaurantsLength: restaurant?.restaurants?.length || 0,
          planId: state?.user?.user?.plan_id?._id,
        })
        .then((res) => {
          console.log("return", res);
          if (res.success === true) {
            restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
            setSnackbarOpen(true);
            setSnackbarSeverity("success");
            setSnackbarMessage("Branch added successfully!");
            state.getUser(state?.user?.user?._id);
            back();
          } else {
            setSnackbarSeverity("error");
            setSnackbarMessage("Failed to add branch!");
            setSnackbarOpen(true);
          }
        });
    },
    [values],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title={t("branches.addBranch")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("branches.name")}
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                  helperText={values.name.length < 3 && t("branches.nameMinThreeChar")}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("branches.address")}
                  name="address"
                  onChange={handleChange}
                  value={values.address}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("branches.phone")}
                  name="phone"
                  onChange={handleChange}
                  value={values.phone}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained" onClick={back}>
            {t("common.back")}
          </Button>
          <Button variant="contained" type="submit" disabled={values.name.length < 3}>
            {t("common.add")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
