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
import { useTranslation } from "react-i18next";

export const AccountProfileDetails = ({
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
}) => {
  const state = useAuthContext();
  const [values, setValues] = useState({
    id: state?.user?.user?._id,
    name: state?.user?.user?.name || "",
    phone: state?.user?.user?.phone || "",
    address: state?.user?.user?.address || "",
  });

  useEffect(() => {
    console.log("values", state, values);
  }, [values]);

  const { t } = useTranslation();

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
        const response = await fetch(process.env.BACKEND_SERVER + "/user/updateUser", {
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
        console.log("submit", data);
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(t("account.updateSuccessMessage"));
        state.getUser(state?.user?.user?._id);

        return data;
      } catch (error) {
        console.error("Error updating user:", error);
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("account.updateErrorMessage"));
      }
    },
    [values],
  );

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
      style={{ display: "flex", height: "100%" }}
    >
      <Card>
        <CardHeader subheader={t("account.basicInformation")} title={t("account.profile")} />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("account.name")}
                  name="name"
                  onChange={handleChange}
                  required
                  value={values.name}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("account.phone")}
                  name="phone"
                  onChange={handleChange}
                  required
                  value={values.phone}
                />
              </Grid>
              <Grid xs={12} md={12}>
                <TextField
                  fullWidth
                  label={t("account.address")}
                  name="address"
                  onChange={handleChange}
                  required
                  value={values.address}
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end", padding: "13px" }}>
          <Button variant="contained" type="submit">
            {t("common.save")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
