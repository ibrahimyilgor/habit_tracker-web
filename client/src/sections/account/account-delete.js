import { useCallback, useState } from 'react';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField
} from '@mui/material';
import { useAuthContext } from 'src/contexts/auth-context';
import { useRouter } from 'next/router';

export const AccountDelete = ({setSnackbarOpen, setSnackbarSeverity, setSnackbarMessage}) => {
  const router = useRouter();
  const state = useAuthContext()

  const [values, setValues] = useState({
    password: '',
    confirm: ''
  });

  const handleChange = useCallback(
    (event) => {
      setValues((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      state.deleteUser(state?.user?.user?._id).then(res => {
        console.log("ibrahimres",res)
        if(res.success === true){
          setSnackbarOpen(true);
          setSnackbarSeverity('success');
          setSnackbarMessage('Branch deleted successfully!');
          router.push('/auth/login');
        }
        else {
          setSnackbarOpen(true);
          setSnackbarSeverity('error');
          setSnackbarMessage('User could not deleted successfully!');
        }
      }); 
    },
    []
  );

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="Account will be deleted permanently"
          title="Delete Account"
        />
        <Divider />
        <CardContent >
          <Stack
            spacing={3}
            sx={{ maxWidth: 400, height: "130px"}}
          >
            
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" color="error" type="submit">
            Delete
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
