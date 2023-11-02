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
import CloseIcon from "@mui/icons-material/Close";

export const PlanComponent = ({ plan }) => {
  const { t } = useTranslation();
  const state = useAuthContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [code, setCode] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const lang = i18n.language;

  console.log("plann", plan);

  const changePlan = async (id) => {
    setCode("");
    try {
      const response = await fetch("http://localhost:3001/planCode/useCode", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.user?.token,
        },
        body: JSON.stringify({ plan_id: id, code: code, user_id: state?.user?.user?._id }),
      });
      const data = await response.json();
      console.log("theresponse", data);
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

      return data;
    } catch (error) {
      console.error("Error updating user:", error);
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
              ?.text.map((d) => {
                return (
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <SvgIcon htmlColor="#f44336" style={{ width: "15%" }}>
                      <CloseIcon />
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
        <CardActions>
          {state?.user?.user?.plan_id === plan?._id ? (
            <Button
              variant="text"
              fullWidth
              onClick={() => {}}
              // disabled={true}
            >
              {t("plan.currentPlan")}
            </Button>
          ) : (
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
                  {state?.user?.user?.plan_id === plan?._id
                    ? t("plan.currentPlan")
                    : t("plan.changePlan")}
                </Button>
              </Box>
            </Box>
          )}
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
