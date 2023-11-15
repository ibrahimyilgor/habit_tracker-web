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
import { PlanSelector } from "../plan/plan-selector";
import { PLAN_IDS, PLAN_NAMES } from "src/utils/constants";

export const CodesEdit = ({
  back,
  selectedForEdit,
  setSelectedForEdit,
  setSnackbarOpen,
  setSnackbarSeverity,
  setSnackbarMessage,
  setRefetch,
}) => {
  const state = useAuthContext();
  const { t } = useTranslation();

  const [values, setValues] = useState({
    id: selectedForEdit?._id,
    plan: {
      id: setSelectedForEdit?.plan_id,
      name: PLAN_NAMES[PLAN_IDS.indexOf(selectedForEdit?.plan_id)],
    },
    code: selectedForEdit?.code,
    duration: selectedForEdit?.duration_in_days,
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

  const editCode = async ({ id, code, plan_id, duration_in_days }) => {
    try {
      const response = await fetch(`http://localhost:3001/planCode/${id}/updateCode`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({
          _id: id,
          plan_id,
          code,
          duration_in_days,
        }),
      });
      const data = await response.json();
      setSnackbarOpen(true);
      setSnackbarSeverity("success");
      setSnackbarMessage(t("codes.editSuccessMessage"));
      setRefetch((r) => !r);
      back();
      return data;
    } catch (err) {
      console.error("Error updating code:", err);
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(t("codes.editErrorMessage"));
    }
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      await editCode({
        id: values?.id,
        code: values?.code,
        plan_id: values?.plan?.id,
        duration_in_days: values?.duration,
      });
    },
    [values],
  );

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          // subheader="The information can be edited"
          title={t("codes.updateCode")}
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
              values?.duration < 0 ||
              values?.duration === "" ||
              values?.duration?.includes?.(".")
            }
          >
            {t("common.update")}
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
