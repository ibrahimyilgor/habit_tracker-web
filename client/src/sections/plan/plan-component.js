import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAuthContext } from "src/contexts/auth-context";
import i18n from "src/i18n";
import CustomizedSnackbars from "../snackbar";
import { useState } from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "@mui/icons-material";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { indigo } from "src/theme/colors";

export const PlanComponent = ({ plan }) => {
  const { t } = useTranslation();

  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [code, setCode] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const lang = i18n.languages[0];
  const changePlan = async (id) => {
    setCode("");
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_SERVER + "/planCode/useCode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({ plan_id: id, code: code, user_id: state?.user?.user?._id }),
      });
      const data = await response.json();
      if (data.success === true) {
        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage(t("plan.successMessage"));
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("plan.errorMessage"));
      }
      state.getUser(state?.user?.user?._id);
      if (state?.user?.token) {
        restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
      }
      return data;
    } catch (error) {
      setSnackbarOpen(true);
      setSnackbarSeverity("error");
      setSnackbarMessage(t("plan.errorMessage"));
    }
  };

  return (
    <>
      <Card
        sx={{
          height: "100%",
          borderStyle: state?.user?.user?.plan_id?._id === plan?._id && "solid",
          borderColor: state?.user?.user?.plan_id?._id === plan?._id && indigo.main,
        }}
      >
        <CardContent sx={{}}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                marginBottom: 1,
              }}
            >
              <Typography
                gutterBottom
                variant="h6"
                width="75%"
                justifyContent="center"
                display="flex"
              >
                {plan?.name.filter((p) => p.language === lang)[0]?.text}
              </Typography>
              <Typography gutterBottom variant="h6" width="25%">
                {plan?.price + " €"}
              </Typography>
            </Box>
            {plan?.description
              .filter((p) => p.language === lang)[0]
              ?.text.map((d, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <SvgIcon htmlColor="#6366F1" style={{ width: "15%" }}>
                      {plan?.description_yes_no[index] ? (
                        <RadioButtonChecked />
                      ) : (
                        <RadioButtonUnchecked />
                      )}
                    </SvgIcon>
                    <Typography color="text.secondary" variant="body2" width="85%">
                      {d}
                    </Typography>
                  </Box>
                );
              })}
          </Box>
        </CardContent>
        <Divider />
        <CardActions
          sx={{ padding: state?.user?.user?.plan_id?._id === plan?._id ? "16px" : "8px" }}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <Box
              sx={{
                width: "70%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                label={t("plan.enterCode")}
                value={code}
                onChange={(c) => setCode(c.target.value)}
              />
            </Box>
            <Box
              sx={{
                width: "30%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="text"
                onClick={() => {
                  changePlan(plan?._id);
                }}
                disabled={code.length === 0}
              >
                {state?.user?.user?.plan_id?._id === plan?._id
                  ? t("plan.extendPlan")
                  : t("plan.changePlan")}
              </Button>
            </Box>
          </Box>
        </CardActions>
      </Card>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </>
  );
};
