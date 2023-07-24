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

export const AccountProfile = () => { 
  const {t} = useTranslation()

  const { userAvatar, setUserAvatar, fetchUserAvatar, userAvatarSrc} = useAuthContext()
  const state = useAuthContext()

  const [uploadImageOpen, setUploadImageOpen] = useState()

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [avatarSrc, setAvatarSrc] = useState('');
  const [localAvatar, setLocalAvatar] = useState();
  const [localAvatarSrc, setLocalAvatarSrc] = useState("");

  useEffect(() => {
    if(userAvatar){
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(userAvatar);
    }
  }, [userAvatar]);

  useEffect(() => {
    if(localAvatar){
      const reader = new FileReader();
      reader.onload = () => {
        setLocalAvatarSrc(reader.result);
      };
      reader.readAsDataURL(localAvatar);
    }
  }, [localAvatar]);

  useEffect(() => {
    console.log("userAvatar", userAvatar)
  }, [userAvatar])

  useEffect(() => {
    if(state?.user?.user?.id){
      state.getUser(state?.user?.user?.id);
    }
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append('file', localAvatar);
        formData.append('user_id', state?.user?.user?._id);

        await fetch('http://localhost:3001/userAvatar/save', {
          method: 'PUT',
          body: formData,
          headers: {"Authorization": "Bearer " + state?.user?.token },
        });

        fetchUserAvatar(state.user?.user?._id)
        setUploadImageOpen(false)
        setSnackbarOpen(true);
        setSnackbarSeverity('success');
        setSnackbarMessage(t("account.avatarUpdateSuccess"))
      } catch (error) {
        setSnackbarOpen(true);
        setSnackbarSeverity('error');
        setSnackbarMessage(t("account.avatarUpdateError"))
        // handle the error, e.g. show a message to the user
      }
    },
    [localAvatar]
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
            src={avatarSrc}
            alt={userAvatar?.name || "-"}
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
      setSelectedFile={setLocalAvatar}
      selectedFile={localAvatar}
    />
      <CustomizedSnackbars
        open={snackbarOpen}
        setOpen={setSnackbarOpen}
        severity={snackbarSeverity}
        message={snackbarMessage} />
    </>
)};
