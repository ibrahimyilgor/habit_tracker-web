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
import { getNotifications } from "src/pages/notification-admin";
import { NotificationSenderTypeSelector } from "src/components/notification-sender-type-selector";
import { PlanSelector } from "../plan/plan-selector";
import { UserSelector } from "src/components/user-selector";

export const NotificationAdd = ({
  back,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
  setRefetch,
}) => {
  const state = useAuthContext();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    title: {
      en: "",
      tr: "",
    },
    content: {
      en: "",
      tr: "",
    },
    plan: "",
    duration: 0,
  });
  const [senderType, setSenderType] = useState("all");
  const [user, setUser] = useState();

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const isDisabled = () => {
    if (
      (values?.title?.en?.length < 1 && values?.title?.tr?.length < 1) ||
      (values?.content?.en?.length < 1 && values?.content?.tr?.length < 1) ||
      isNaN(values?.duration)
    ) {
      return true;
    }
    if (senderType === "plan" && !values?.plan) {
      return true;
    } else if (senderType === "user" && !user) {
      return true;
    }
    return false;
  };

  const addNotification = async ({ title, content, user, duration }) => {
    const usersResponse = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_SERVER + `/notification/addNotification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({
          title,
          content,
          send_to: senderType,
          sender_id: state?.user?.user?._id,
          send_to_id:
            senderType === "user" ? user : senderType === "plan" ? values?.plan?.id : null,
          duration,
        }),
      },
    );
    const tempNotifications = await usersResponse.json();
    if (Array.isArray(tempNotifications)) {
      setNotifData(tempNotifications);
    }

    return tempNotifications;
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await addNotification({
        title: values.title,
        content: values.content,
        user: user,
        duration: values.duration,
      }).then((res) => {
        if (res._id) {
          setRefetch((r) => !r);
          back();
          setSnackbarOpen(true);
          setSnackbarSeverity("success");
          setSnackbarMessage("Notification added successfully!");
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Failed to add notification!");
          setSnackbarOpen(true);
        }
      });
    },
    [values, user],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title={t("notifications.addNotification")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.titleName")}
                  name="title"
                  onChange={(e) => {
                    setValues({ ...values, title: { tr: values.title.tr, en: e.target.value } });
                  }}
                  value={values.title.en}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.titleNameTr")}
                  name="title"
                  onChange={(e) => {
                    setValues({ ...values, title: { en: values.title.en, tr: e.target.value } });
                  }}
                  value={values.title.tr}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.content")}
                  name="content"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      content: { tr: values.content.tr, en: e.target.value },
                    });
                  }}
                  value={values.content.en}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("notifications.contentTr")}
                  name="content.tr"
                  onChange={(e) => {
                    setValues({
                      ...values,
                      content: { en: values.content.en, tr: e.target.value },
                    });
                  }}
                  value={values.content.tr}
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
                {senderType === "all" ? null : senderType === "plan" ? (
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
            {t("common.add")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
