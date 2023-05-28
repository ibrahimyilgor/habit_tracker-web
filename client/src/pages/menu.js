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
import { useEffect, useState } from 'react';
import { useRestaurantContext } from 'src/contexts/restaurant-context';
import { useAuthContext } from 'src/contexts/auth-context';
import CustomizedSnackbars from 'src/sections/snackbar';
import EyeIcon from '@heroicons/react/24/solid/EyeIcon';
import { navigateToLink } from 'src/utils/navigate-to-link';
import PdfDropzone from 'src/components/pdfDropzone';

const Menu = () => {
  const {t} = useTranslation()

  const restaurant = useRestaurantContext()
  console.log("ibrahime", restaurant)
  const state = useAuthContext()

  const [tabValue, setTabValue] = useState()

  const [menu, setMenu] = useState([]);

  const [selectedFile, setSelectedFile] = useState();
  const [numPages, setNumPages] = useState(null);
  const [file, setFile] = useState();
  
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const tabHandleChange = (event, newValue) => { 
    setTabValue(newValue);
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    console.log("selectedFile", file)
  }, [file])

  useEffect(() => {
    console.log("tabValue", tabValue)
  }, [tabValue])

  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      if (tabValue === 0) {
        setFile(null);
      } 
      else if (tabValue === 1) {
        try {
          const response = await fetch(
            `http://localhost:3001/pdfMenu/${restaurant.selectedBranchIds}`,
            {
              method: 'GET'
            }
          );
    
          if (response.ok) {
            console.log("response", response)
            const blob = await response.blob();
            const file = new File([blob], "fileName", { type: 'application/pdf' });
            setFile(file);
          } else {
            console.error('Failed to fetch PDF:', response.statusText);
            setFile(null);
          }
        } catch (error) {
          console.error('Error fetching PDF:', error);
          setFile(null);
        }
      }
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [tabValue])
  

  useEffect(() => {
    console.log("ibrahimeee", restaurant.selectedBranchIds, restaurant.restaurants)
    setTabValue((restaurant.selectedBranchIds && restaurant?.restaurants.length > 0 && restaurant?.restaurants.filter(r => r._id === restaurant.selectedBranchIds)?.[0]?.isPdf === false) ? 0 :  restaurant?.restaurants.filter(r => r._id === restaurant.selectedBranchIds)?.[0]?.isPdf === true ? 1 : null)
  }, [restaurant])

  const saveMenu = async () => { 
    if(tabValue === 0){
      try {
        const response = await fetch(`http://localhost:3001/restaurant/${restaurant.selectedBranchIds}/saveMenu`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + state?.user?.token
          },
          body: JSON.stringify({ menu: menu, isPdf: tabValue }),
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
    }
    else if(tabValue === 1){
      if(restaurant.selectedBranchIds){
        event.preventDefault();

        // Create a FormData object to send the file and other form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('restaurant_id', restaurant.selectedBranchIds);
        formData.append('fileName', file?.name)
    
        try {
          await fetch('http://localhost:3001/pdfMenu/save', {
            method: 'PUT',
            body: formData,
            headers: {"Authorization": "Bearer " + state?.user?.token },
          });
    
          const response = await fetch(`http://localhost:3001/restaurant/${restaurant.selectedBranchIds}/saveMenu`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              "Authorization": "Bearer " + state?.user?.token
            },
            body: JSON.stringify({ isPdf: tabValue }),
          });

          if (response.ok) {
            console.log('File uploaded!');
          }
        } catch (error) {
          console.error(error);
          // Handle error
        }
    }
    else{
        //restaurant id gitmedi error snackbar
    }
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

              {restaurant.selectedBranchIds.length > 0 && (
                <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <SvgIcon //Navigate to menu for customers
                    style={{cursor: "pointer"}}
                    onClick={() => {
                      navigateToLink(restaurant.selectedBranchIds)
                    } }>
                      <EyeIcon />
                  </SvgIcon>
                </div>
              )}

              <div style={{flex: 1, display: "flex", alignItems: "center", justifyContent: "center"}}>
                <BranchSelector width="100%" />
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
                  <PdfDropzone file={file} setFile={setFile} />
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
