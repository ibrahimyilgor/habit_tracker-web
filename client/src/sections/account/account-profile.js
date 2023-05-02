import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { ImageUploader } from 'src/components/dropzone';
import { useAuthContext } from 'src/contexts/auth-context';
import { ParseToDate, ParseToDateAndHour } from 'src/utils/date';
import CustomizedSnackbars from '../snackbar';
import { useTranslation } from 'react-i18next';

const user = {
  avatar: '/assets/avatars/avatar-anika-visser.png',
  city: 'Los Angeles',
  country: 'USA',
  jobTitle: 'Senior Developer',
  name: 'Anika Visser',
  timezone: 'GTM-7'
};

export const AccountProfile = () => { 
  const state = useAuthContext()
  const [uploadImageOpen, setUploadImageOpen] = useState()
  const [logo, setLogo] = useState(null)

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const {t} = useTranslation()

  useEffect(() => {
    if(state?.user?.user?.id){
      state.getUser(state?.user?.user?.id);
    }
  }, [])

  useEffect(() => {
    console.log("ibrahimlogo",logo)
  }, [logo])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
  
      } catch (error) {
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage('Logo could not updated')
        // handle the error, e.g. show a message to the user
      }
    },
    []
  );
  
  
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
          <Avatar
            src={user.avatar}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }} />
          <Typography
            gutterBottom
            variant="h5"
          >
            {state?.user?.user?.name}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {state?.user?.user?.createdAt ? ParseToDate(state?.user?.user?.createdAt) : ""}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
          onClick={() => setUploadImageOpen(true)}
        >
          {t("account.uploadAvatar")}
        </Button>
      </CardActions>
    </Card>
    <ImageUploader 
      open={uploadImageOpen}
      onClose={() => setUploadImageOpen(false)}
      handleSubmit={handleSubmit}
      setSelectedFile={setLogo}
      selectedFile={logo}
    />
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage} />
    </>
)};
