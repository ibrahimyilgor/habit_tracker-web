import Head from "next/head";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  Button,
  SvgIcon,
} from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import TreeViewCRUDExample from "src/components/menu-tree-view";
import { useTranslation } from "react-i18next";
import PlusIcon from "@heroicons/react/24/solid/PlusIcon";
import ArrowUturnLeftIcon from "@heroicons/react/24/solid/ArrowUturnLeftIcon";
import ArrowUturnRightIcon from "@heroicons/react/24/solid/ArrowUturnRightIcon";
import BookmarkSquareIcon from "@heroicons/react/24/solid/BookmarkSquareIcon";

import { BranchSelector } from "src/sections/branch/branch-selector";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useEffect, useState } from "react";
import { useRestaurantContext } from "src/contexts/restaurant-context";
import { useAuthContext } from "src/contexts/auth-context";
import CustomizedSnackbars from "src/sections/snackbar";
import EyeIcon from "@heroicons/react/24/solid/EyeIcon";
import { navigateToLink } from "src/utils/navigate-to-link";
import PdfDropzone from "src/components/pdfDropzone";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { MenuSettings } from "src/sections/menu/menu-settings";

const Menu = () => {
  const { t } = useTranslation();

  const restaurant = useRestaurantContext();
  const state = useAuthContext();

  const [tabValue, setTabValue] = useState();

  const [menu, setMenu] = useState([]);

  const [settings, setSettings] = useState({
    showComment: true,
    showLogo: true,
    colors: {
      backgroundColor: "#ffffff",
      itemColor: "#eeeeee",
      textColor: "#ffffff",
    },
  });

  const [activeStep, setActiveStep] = useState(0);
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const steps = [t("menu.selectBranch"), t("menu.selectType"), t("menu.setting")];

  const tabHandleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    console.log("settings", settings);
  }, [settings]);

  useEffect(() => {
    console.log("settingsmenu", restaurant);
  }, [restaurant]);

  useEffect(() => {
    if (
      restaurant?.restaurants?.filter((rest) => rest._id === restaurant.selectedBranchIds).length >
      0
    ) {
      console.log("settingsibo", settings, restaurant);

      setSettings({
        showComment: restaurant?.restaurants?.filter(
          (rest) => rest._id === restaurant.selectedBranchIds,
        )[0].settings?.showComment,
        showLogo: restaurant?.restaurants?.filter(
          (rest) => rest._id === restaurant.selectedBranchIds,
        )[0].settings?.showLogo,
        colors:
          restaurant?.restaurants?.filter((rest) => rest._id === restaurant.selectedBranchIds)[0]
            ?.colors || settings?.colors,
      });
    }
  }, [restaurant]);

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if (tabValue === 0) {
        setFile(null);
      } else if (tabValue === 1) {
        try {
          const response = await fetch(
            `http://localhost:3001/pdfMenu/${restaurant.selectedBranchIds}`,
            {
              method: "GET",
            },
          );

          if (response.ok) {
            console.log("response", response);
            const blob = await response.blob();
            const file = new File([blob], "fileName", { type: "application/pdf" });
            setFile(file);
          } else {
            console.error("Failed to fetch PDF:", response.statusText);
            setFile(null);
          }
        } catch (error) {
          console.error("Error fetching PDF:", error);
          setFile(null);
        }
      }
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [tabValue]);

  useEffect(() => {
    console.log("ibrahimeee", restaurant.selectedBranchIds, restaurant.restaurants);
    setTabValue(
      restaurant.selectedBranchIds &&
        restaurant?.restaurants.length > 0 &&
        restaurant?.restaurants.filter((r) => r._id === restaurant.selectedBranchIds)?.[0]
          ?.isPdf === false
        ? 0
        : restaurant?.restaurants.filter((r) => r._id === restaurant.selectedBranchIds)?.[0]
            ?.isPdf === true
        ? 1
        : null,
    );
  }, [restaurant]);

  const saveMenu = async () => {
    if (tabValue === 0) {
      console.log("settings2", settings);

      try {
        const response = await fetch(
          `http://localhost:3001/restaurant/${restaurant.selectedBranchIds}/saveMenu`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + state?.user?.token,
            },
            body: JSON.stringify({
              menu: menu,
              isPdf: tabValue,
              settings: settings,
              colors: settings?.colors,
            }),
          },
        );

        if (response.ok) {
          const updatedRestaurant = await response.json();
          console.log("Menu added successfully:", updatedRestaurant);
          setSnackbarOpen(true);
          setSnackbarSeverity("success");
          setSnackbarMessage(t("menu.successMessage"));
          restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
        } else {
          console.error("Failed to add menu:", response.statusText);
          setSnackbarOpen(true);
          setSnackbarSeverity("error");
          setSnackbarMessage(t("menu.errorMessage"));
        }
      } catch (error) {
        console.error("An error occurred while adding the menu:", error.message);
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("menu.errorMessage"));
      }
    } else if (tabValue === 1) {
      if (restaurant.selectedBranchIds) {
        event.preventDefault();

        // Create a FormData object to send the file and other form data
        const formData = new FormData();
        formData.append("file", file);
        formData.append("restaurant_id", restaurant.selectedBranchIds);
        formData.append("fileName", file?.name);

        try {
          await fetch("http://localhost:3001/pdfMenu/save", {
            method: "PUT",
            body: formData,
            headers: { Authorization: "Bearer " + state?.user?.token },
          });

          const response = await fetch(
            `http://localhost:3001/restaurant/${restaurant.selectedBranchIds}/saveMenu`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + state?.user?.token,
              },
              body: JSON.stringify({ isPdf: tabValue }),
            },
          );

          if (response.ok) {
            setSnackbarOpen(true);
            setSnackbarSeverity("success");
            setSnackbarMessage(t("menu.successMessage"));
          }
        } catch (error) {
          console.error(error);
          setSnackbarOpen(true);
          setSnackbarSeverity("error");
          setSnackbarMessage(t("menu.errorMessage"));
        }
      } else {
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage(t("menu.errorMessage"));
      }
    }
  };

  return (
    <>
      <Head>
        <title>Menu | Devias Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
              <div style={{ flex: 2, display: "flex", alignItems: "center" }}>
                <Typography variant="h4">{t("menu.title")}</Typography>
              </div>

              {restaurant.selectedBranchIds.length > 0 && (
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SvgIcon //Navigate to menu for customers
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      navigateToLink(restaurant.selectedBranchIds);
                    }}
                  >
                    <EyeIcon />
                  </SvgIcon>
                </div>
              )}

              <div
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUturnLeftIcon />
                    </SvgIcon>
                  }
                  onClick={() => {
                    if (activeStep !== 0) {
                      setActiveStep((step) => step - 1);
                    }
                  }}
                  variant="contained"
                  disabled={activeStep === 0}
                >
                  {t("common.back")}
                </Button>
              </div>
              <div
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <Button
                  startIcon={
                    <SvgIcon fontSize="small">
                      {activeStep !== steps.length - 1 ? (
                        <ArrowUturnRightIcon />
                      ) : (
                        <BookmarkSquareIcon />
                      )}
                    </SvgIcon>
                  }
                  disabled={activeStep === 0 && restaurant.selectedBranchIds.length === 0}
                  onClick={() => {
                    if (activeStep === steps.length - 1) {
                      saveMenu();
                    } else {
                      setActiveStep((step) => step + 1);
                    }
                  }}
                  variant="contained"
                >
                  {activeStep === steps.length - 1 ? t("common.save") : t("common.next")}
                </Button>
              </div>
            </div>
            <Box sx={{ width: "100%" }}>
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{ marginTop: 5, marginBottom: 5 }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
            {activeStep === 0 && (
              <div
                style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <BranchSelector width="100%" />
              </div>
            )}
            {activeStep === 1 && restaurant.selectedBranchIds.length > 0 && (
              <div>
                <TabContext value={tabValue}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList onChange={tabHandleChange} aria-label="lab API tabs example">
                      <Tab label={t("menu.tabListCreateMenu")} value={0} />
                      <Tab label={t("menu.tabListPdf")} value={1} />
                    </TabList>
                  </Box>
                  <TabPanel value={0}>
                    <TreeViewCRUDExample menu={menu} setMenu={setMenu} />
                  </TabPanel>
                  <TabPanel value={1}>
                    <PdfDropzone file={file} setFile={setFile} />
                  </TabPanel>
                </TabContext>
              </div>
            )}
            {activeStep === 2 && <MenuSettings settings={settings} setSettings={setSettings} />}
          </Stack>
        </Container>
        <CustomizedSnackbars
          open={snackbarOpen}
          setOpen={setSnackbarOpen}
          severity={snackbarSeverity}
          message={snackbarMessage}
        />
      </Box>
    </>
  );
};

Menu.getLayout = (menu) => <DashboardLayout>{menu}</DashboardLayout>;

export default Menu;
