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
import PayPalIntegration from "src/paypal";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { MonthSelector } from "src/components/monthSelector";

export const PlanComponent = ({ plan }) => {
  const { t } = useTranslation();

  const state = useAuthContext();
  const restaurant = useRestaurantContext();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [code, setCode] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [month, setMonth] = useState(1);
  const [tabValue, setTabValue] = useState(0);

  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const lang = i18n.languages[0];

  console.log("plann", plan);

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
      if (state?.user?.token) {
        restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
      }
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
              <Typography gutterBottom variant="h7" width="25%">
                {plan?.price + " € /" + t("common.monthShort")}
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
          sx={{
            padding: state?.user?.user?.plan_id?._id === plan?._id ? "16px" : "8px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{ flexDirection: "row", display: "flex" }}>
            <Box>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList
                    onChange={tabHandleChange}
                    aria-label="payment-methods"
                    sx={{ flexDirection: "row", display: "flex", width: "100%" }}
                  >
                    <Tab label={t("plan.code")} value={0} />
                    <Tab label={t("plan.paypal")} value={1} disabled={plan?.price === 0} />
                  </TabList>
                </Box>
                <TabPanel value={0}>
                  <Box
                    sx={{
                      width: "100%",
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
                      width: "100%",
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
                </TabPanel>
                <TabPanel value={1}>
                  {" "}
                  <MonthSelector
                    month={month}
                    setMonth={setMonth}
                    style={{ marginBottom: "5px", width: "100%" }}
                  />
                  <PayPalIntegration
                    price={plan?.price * month}
                    month={month}
                    setSnackbarOpen={setSnackbarOpen}
                    setSnackbarSeverity={setSnackbarSeverity}
                    setSnackbarMessage={setSnackbarMessage}
                  />
                </TabPanel>
              </TabContext>
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
