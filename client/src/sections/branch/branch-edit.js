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
import { useTranslation } from "react-i18next";

export const BranchEdit = ({
  back,
  selectedForEdit,
  setSelectedForEdit,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
}) => {
  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    id: selectedForEdit?._id,
    name: selectedForEdit?.name,
    phone: selectedForEdit?.phone,
    address: selectedForEdit?.address,
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
      try {
        const response = await fetch("http://localhost:3001/restaurant/updateBranch", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.user?.token,
          },
          body: JSON.stringify({
            _id: values?.id,
            name: values?.name,
            address: values?.address,
            phone: values?.phone,
          }),
        });
        const data = await response.json();
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Branch edited successfully!");
        restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
        back();
        return data;
      } catch (error) {
        console.error("Error updating branch:", error);
        // handle the error, e.g. show a message to the user
      }
    },
    [values],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title={t("branches.updateBranch")}
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
                  s
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
            {t("common.update")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
