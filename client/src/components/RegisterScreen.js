import { useContext } from 'react';
import AuthContext from '../auth';
import Copyright from './Copyright';
import MUIRegisterErrorModal from './MUIRegisterErrorModal';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function RegisterScreen() {
  const { auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.registerUser(
      formData.get('userName'),
      formData.get('firstName'),
      formData.get('lastName'),
      formData.get('email'),
      formData.get('password'),
      formData.get('passwordVerify')
    );
  };

  return (
    <div
      style={{
        backgroundImage:
          'url(https://tse4.mm.bing.net/th?id=OIP.zkoMRjZ1n7CsV2Y5TR1QDAHaEK&pid=Api&P=0)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
      }}
    >
      <Container component="main" maxWidth="xs">
        <MUIRegisterErrorModal />
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar> */}
          <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
            <LockOutlinedIcon style={{ color: '#FFFFFF' }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="userName"
                  placeholder="User Name"
                  name="userName"
                  autoComplete="User Name"
                  style={{ border: '1px solid black' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  placeholder="Email Address"
                  name="email"
                  autoComplete="email"
                  style={{ border: '1px solid black' }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  placeholder="First Name"
                  style={{ border: '1px solid black' }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  style={{ border: '1px solid black' }}
                  autoComplete="lname"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  placeholder="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  style={{ border: '1px solid black' }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordVerify"
                  placeholder="Password Verify"
                  type="password"
                  id="passwordVerify"
                  autoComplete="new-password"
                  style={{ border: '1px solid black' }}
                />
              </Grid>
            </Grid>
            <Button
              style={{
                fontFamily: 'Gummy',
                width: '10em',
                height: '3em',
                color: '#00334d',
                backgroundColor: '#f2f2f2',
                fontWeight:'bold',
                right:"0%"
              }}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Button
                  onClick={() => {
                    window.location.href = '/login/';
                  }}
                  style={{
                    fontFamily: 'Gummy',
                    width: '150px',
                    height: '3em',
                    color: '#00334d',
                    backgroundColor: '#f2f2f2',
                    fontWeight:'bold',
                    bottom:"58px",
                    left:"70%"
                  }}
                  variant="contained"
                >
                  Sign in
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
