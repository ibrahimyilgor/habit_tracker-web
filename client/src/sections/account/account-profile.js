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
import { useEffect, useState } from 'react';
import { ImageUploader } from 'src/components/dropzone';
import { useAuthContext } from 'src/contexts/auth-context';
import { ParseToDate, ParseToDateAndHour } from 'src/utils/date';

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

  useEffect(() => {
    if(state?.user?.user?.id){
      state.getUser(state?.user?.user?.id);
    }
  }, [])
  
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
          Upload picture
        </Button>
      </CardActions>
    </Card>
    <ImageUploader 
      open={uploadImageOpen}
      onClose={() => setUploadImageOpen(false)}
    />
    </>
)};
