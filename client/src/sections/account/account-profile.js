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
import { useEffect } from 'react';
import { useAuthContext } from 'src/contexts/auth-context';

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
  const getAccount = async (id) => {
    
    console.log("fetchdata3", state) 
    const accountResponse = await fetch(
        "http://localhost:3001/account/" + id,
        {
          method: "GET",
          headers: {"Authorization": "Bearer " + state?.user?.token }
        }
      )
      const account = await accountResponse.json()
  
      console.log("accountss",accountResponse)
  
      return account
    };

  useEffect(() => {
    getAccount("6435987be54a1761d03b547a");
  }, [])
  
  return (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={user.avatar}
          sx={{
            height: 80,
            mb: 2,
            width: 80
          }}
        />
        <Typography
          gutterBottom
          variant="h5"
        >
          {user.name}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.city} {user.country}
        </Typography>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {user.timezone}
        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
)};
