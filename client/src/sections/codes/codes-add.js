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
import { useAuthContext } from "src/contexts/auth-context";
import { useTranslation } from "react-i18next";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";
import { PlanSelector } from "../plan/plan-selector";

export const CodesAdd = ({
  back,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
  setRefetch,
}) => {
  const state = useAuthContext();

  const { t } = useTranslation();

  const [values, setValues] = useState({
    plan: {
      id: PLAN_IDS[0],
      name: PLAN_NAMES[0],
    },
    code: "",
    duration: 0,
  });

  const addCode = async ({ code, plan_id, duration_in_days }) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER + `/planCode/addCode`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({
          code,
          plan_id: values?.plan?.id,
          duration_in_days: values?.duration,
        }),
      });

      const data = await response.json();
      return data;
    } catch (err) {
      err.success = false;
      return err;
    }
  };

  const handleChange = useCallback((event) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await addCode({
        code: values?.code,
        plan_id: values?.plan_id,
        duration_in_days: values?.duration_in_days,
      }).then((res) => {
        if (res.success === true) {
          setRefetch((r) => !r);
          setSnackbarOpen(true);
          setSnackbarSeverity("success");
          setSnackbarMessage("Code added successfully!");
          state.getUser(state?.user?.user?._id);
          back();
        } else {
          setSnackbarSeverity("error");
          setSnackbarMessage("Failed to add code!");
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
          title={t("codes.addCode")}
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              <Grid xs={12} md={6}>
                <PlanSelector
                  name="plan"
                  setValue={(e) => {
                    setValues({ ...values, plan: e.target.value });
                  }}
                  width={"100%"}
                  value={values?.plan}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("codes.code")}
                  name="code"
                  onChange={handleChange}
                  s
                  value={values?.code}
                />
              </Grid>
              <Grid xs={12} md={6}>
                <TextField
                  fullWidth
                  label={t("codes.duration")}
                  name="duration"
                  onChange={handleChange}
                  value={values?.duration}
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
          <Button
            variant="contained"
            type="submit"
            disabled={
              !values?.plan ||
              values?.code.length < 1 ||
              isNaN(values.duration) ||
              values?.duration < 1 ||
              values?.duration === "" ||
              values?.duration?.includes?.(".")
            }
          >
            {t("common.add")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
