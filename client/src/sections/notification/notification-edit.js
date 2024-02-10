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
import { UserSelector } from "src/components/user-selector";
import { PlanSelector } from "../plan/plan-selector";
import { NotificationSenderTypeSelector } from "src/components/notification-sender-type-selector";

export const NotificationEdit = ({
  back,
  selectedForEdit,
  setSelectedForEdit,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
  setRefetch,
}) => {
  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    id: selectedForEdit?._id,
    title: selectedForEdit?.title,
    content: selectedForEdit?.content,
    plan: selectedForEdit?.send_to?.value,
    duration: selectedForEdit?.duration,
  });

  const [senderType, setSenderType] = useState(selectedForEdit?.send_to?.type);
  const [user, setUser] = useState(selectedForEdit?.send_to?.value);

  useEffect(() => {
    console.log("values", selectedForEdit);
  }, [selectedForEdit]);

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const isDisabled = () => {
    if (values?.title?.length < 1 || values?.content?.length < 1 || isNaN(values?.duration)) {
      return true;
    }
    if (senderType === "plan" && !values?.plan) {
      return true;
    } else if (senderType === "user" && !user) {
      return true;
    }
    return false;
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_BACKEND_SERVER + `/notification/${values?.id}/updateNotification`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + state?.user?.token,
            },
            body: JSON.stringify({
              title: values?.title,
              content: values?.content,
              send_to: senderType,
              sender_id: state?.user?.user?._id,
              send_to_id:
                senderType === "user" ? user : senderType === "plan" ? values?.plan?.id : null,
              duration: values?.duration,
            }),
          },
        );
        const data = await response.json();
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(t("notifications.editSuccessMessage"));
        setRefetch((r) => !r);
        back();
        return data;
      } catch (err) {
        console.error("Error updating notification:", err);
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("notifications.editErrorMessage"));
      }
    },
    [values, senderType],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title={t("notifications.updateBranch")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.titleName")}
                  name="title"
                  onChange={handleChange}
                  value={values.title}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.content")}
                  name="content"
                  onChange={handleChange}
                  value={values.content}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <NotificationSenderTypeSelector
                  senderType={senderType}
                  setSenderType={setSenderType}
                  fullWidth
                />
              </Grid>
              <Grid xs={12} md={6}>
                {senderType === "all" ? (
                  <></>
                ) : senderType === "plan" ? (
                  <PlanSelector
                    name="plan"
                    setValue={(e) => {
                      setValues({ ...values, plan: e.target.value });
                    }}
                    width={"100%"}
                    value={values?.plan}
                  />
                ) : senderType === "user" ? (
                  <UserSelector selectedUser={user} setSelectedUser={setUser} fullWidth />
                ) : (
                  <></>
                )}
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.duration")}
                  name="duration"
                  onChange={handleChange}
                  value={values.duration}
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
          <Button variant="contained" type="submit" disabled={isDisabled()}>
            {t("common.update")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
