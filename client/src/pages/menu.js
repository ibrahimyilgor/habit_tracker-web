import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid, Button, SvgIcon } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import TreeViewCRUDExample from 'src/components/menu-tree-view';
import { useTranslation } from 'react-i18next';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { BranchSelector } from 'src/sections/branch/branch-selector';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { PdfDropzone } from 'src/components/pdfDropzone';
import { useState } from 'react';
import { useRestaurantContext } from 'src/contexts/restaurant-context';
import { useAuthContext } from 'src/contexts/auth-context';
import CustomizedSnackbars from 'src/sections/snackbar';

const Menu = () => {
  const {t} = useTranslation()

  const restaurant = useRestaurantContext()
  console.log("ibrahime", restaurant)
  const state = useAuthContext()

  const [tabValue, setTabValue] = useState(0)

  const [menu, setMenu] = useState([]);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const tabHandleChange = (event, newValue) => { 
    setTabValue(newValue);
  };

  const saveMenu = async () => { 
    try {
      const response = await fetch(`http://localhost:3001/restaurant/${restaurant.selectedBranchIds}/saveMenu`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": "Bearer " + state?.user?.token
        },
        body: JSON.stringify({ menu }),
      });
  
      if (response.ok) {
        const updatedRestaurant = await response.json();
        console.log('Menu added successfully:', updatedRestaurant);
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        setSnackbarMessage(t("menu.successMessage"));
        restaurant.getBranches(state?.user?.user?._id, state?.user?.token, null);
      } else {
        console.error('Failed to add menu:', response.statusText);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage(t("menu.errorMessage"));
      }
    } catch (error) {
      console.error('An error occurred while adding the menu:', error.message);
      setSnackbarOpen(true);
      setSnackbarSeverity('error');
      setSnackbarMessage(t("menu.errorMessage"));
    }
  };

  return (
    <>
      <Head>
        <title>
        Menu | Devias Kit
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <div style={{flex: 2, display: "flex", alignItems: "center"}}>
                <Typography variant="h4">
                  {t("menu.title")}
                </Typography>
              </div>
              <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <BranchSelector />
              </div>
              <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button
                  startIcon={(
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  )}
                  disabled={restaurant.selectedBranchIds.length === 0}
                  onClick={() => saveMenu()}
                  variant="contained"
                >
                  {t("common.save")}
                </Button>
              </div>
            </div>
           {restaurant.selectedBranchIds.length > 0 && (<div>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={tabHandleChange} aria-label="lab API tabs example">
                    <Tab label={t("menu.tabListCreateMenu")} value={0} />
                    <Tab label={t("menu.tabListPdf")} value={1} />
                  </TabList>
                </Box>
                <TabPanel value={0} >
                  <TreeViewCRUDExample menu={menu} setMenu={setMenu}/>
                </TabPanel>
                <TabPanel value={1}>
                  <PdfDropzone />
                </TabPanel>
              </TabContext>
            </div>)}
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
  )};

Menu.getLayout = (menu) => (
  <DashboardLayout>
    {menu}
  </DashboardLayout>
);

export default Menu;
