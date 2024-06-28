import { createContext, useContext, useState } from 'react';
import AuthContext from '../auth';
import MUILoginErrorModal from './MUILoginErrorModal';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

const data= createContext();

export default function LoginScreen() {
  const { auth } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    auth.loginUser(formData.get('email'), formData.get('password'));
  };
 

  return (
    <div
      style={{
        backgroundImage:
          'url(https://tse3.mm.bing.net/th?id=OIP.ActlzGnyLKJ1WZMMlbNbQAHaEK&pid=Api&P=0)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
      }}
    >
      <MUILoginErrorModal />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          mt: '5rem',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#000000' }}>
          <LockOutlinedIcon style={{ color: '#FFFFFF' }} />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <Box component="form" noValidate onSubmit={handleSubmit}  sx={{ mt: 1 , display: 'flex', justifyContent: 'center' , flexDirection:"column"}} >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            name="email"
            placeholder="brane@gmail.com"
            autoComplete="email"
            autoFocus
            style={{ border: '3px solid black', width:"150%",right:"40px" }}
           // onChange={(e)=>{setData(e.target.value)}}
          />
          <TextField
            margin="normal"
            required
            name="password"
            placeholder="password"
            type="password"
            id="password"
            autoComplete="current-password"
            style={{ border: '3px solid black' , width:"150%", right:"40px"}}
          />
          
          <Button
            style={{
              fontFamily: 'Gummy',
              width: '10em',
              height: '3em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight:'bold',
              right:"18%"
            }}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

          {/* <Link
            style={{ alignSelf: 'flex-end' }}
            href="/register/"
            variant="body2"
          >
            {"Don't have an account? Sign Up"}
          </Link> */}
          <Button
            onClick={() => {
              window.location.href = '/register/';
            }}
            style={{
              fontFamily: 'Gummy',
              width: '150px',
              height: '3em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight:'bold',
              bottom:"58px",
              left:"60%"
            }}
            variant="contained"
          >
            Register
          </Button>
         
        </Box>
      </Box>
 </div>

);
}
export {data};