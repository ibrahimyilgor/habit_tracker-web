import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
  } from '@mui/material';
  import { useTranslation } from 'react-i18next';
import { useAuthContext } from 'src/contexts/auth-context';
import i18n from 'src/i18n';
import CustomizedSnackbars from '../snackbar';
import { useState } from 'react';
  
  export const PlanComponent = ({plan}) => { 
    const {t} = useTranslation()
    const state = useAuthContext()
      
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  
    const lang = i18n.language

    const changePlan = async (id) => {
      try {
        const response = await fetch("https://qr-meny.onrender.com/user/updateUser", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + state?.user?.token
          },
          body: JSON.stringify({ _id: state?.user?.user?._id, plan_id: id })
      });
      const data = await response.json();
      console.log("theresponse",data)
      if(data.success === true){
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        setSnackbarMessage(t("plan.successMessage"));
      }
      else{
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage(t("plan.errorMessage"));
      }
      state.getUser(state?.user?.user?._id)

      return data;
      } catch (error) {
        console.error("Error updating user:", error);
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage(t("plan.errorMessage"));
      }
    }
    
    return (
    <><Card sx={{
        height: "100%",
      }}>
        <CardContent sx={{ height: "80%" }}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: "center",
              height: "100%"
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
            >
              {plan?.name.filter(p => p.language === lang)[0]?.text}
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              {plan?.description.filter(p => p.language === lang)[0]?.text}
            </Typography>
          </Box>
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            fullWidth
            variant="text"
            onClick={() => changePlan(plan?._id)}
            disabled={state?.user?.user?.plan_id === plan?._id}
          >
            {state?.user?.user?.plan_id === plan?._id ? t("plan.currentPlan") : t("plan.changePlan")}
          </Button>
        </CardActions>
      </Card>
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage} 
      />
      </>
  )};
  