// import React, { useContext, useEffect, useState } from 'react';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Copyright from './Copyright';
// import Typography from '@mui/material/Typography';
// import YouTubeIcon from '@mui/icons-material/YouTube';
// import { GlobalStoreContext } from '../store';
// import { useHistory } from 'react-router-dom';

// export default function SplashScreen() {
//   const { store } = useContext(GlobalStoreContext);
//   store.history = useHistory();

//   function handleGuest() {
//     store.setScreen('AllListScreen');
//     store.history.push('/Playlister/');
//   }
//   function handleLogin() {
//     store.setScreen('HomeScreen');
//     store.history.push('/login/');
//   }
//   function handleRegister() {
//     store.setScreen('HomeScreen');
//     store.history.push('/register/');
//   }

//   return (
//     <div id="splash-screen">
//       <div className="splash-header">
//         <img src="brane.png" style={{ height: '7em' }} />
//         <Typography style={{ fontFamily: 'Gummy' }} variant="h1" component="h1">
//           Video Player
//         </Typography>
//       </div>

//       <div
//         id="main-splash"
//         style={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Typography style={{ fontFamily: 'Gummy' }} variant="h2" component="h2">
//           Welcome to Video Player !
//         </Typography>
//         <div style={{ display: 'flex', justifyContent: 'center' }}>
//           <Button
//             onClick={handleLogin}
//             style={{
//               fontFamily: 'Gummy',
//               width: '160px',
//               height: '70px',
//               color: 'white',
//               backgroundColor: 'black',
//               marginRight: '20px',
//             }}
//             variant="contained"
//           >
//             Login
//           </Button>
//           <Button
//             onClick={handleRegister}
//             style={{
//               fontFamily: 'Gummy',
//               width: '180px',
//               height: '70px',
//               color: 'white',
//               backgroundColor: 'black',
//             }}
//             variant="contained"
//           >
//             Create Account
//           </Button>
//         </div>
//       </div>

//       <div className="splash-bottom">
//         {/* <Typography  style={{fontFamily: "Gummy"}} className='splash-text' variant="h4" component="h2">
//                 Use Playlister to create,edit, and play playlists
//                 as well as share playlists
//                 so that others may then play and comment on them
//             </Typography> */}
//         {/* <Button  onClick={handleGuest} style={{fontFamily: "Gummy",width:'190px', height:'70px', color:'white' , backgroundColor:"black"}}variant="contained">Continue as Guest</Button> */}
//       </div>
//       <Copyright style={{ position: 'fixed', bottom: 0 }} />
//     </div>
//   );
// }
import React, { useContext, useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import Typography from '@mui/material/Typography';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom';

export default function SplashScreen() {
  const { store } = useContext(GlobalStoreContext);
  store.history = useHistory();

  function handleGuest() {
    store.setScreen('AllListScreen');
    store.history.push('/Playlister/');
  }
  function handleLogin() {
    store.setScreen('HomeScreen');
    store.history.push('/login/');
  }
  function handleRegister() {
    store.setScreen('HomeScreen');
    store.history.push('/register/');
  }

  return (
    <div id="splash-screen">
      <div className="splash-header">
        <img src="brane.png" style={{ height: '7em' }} />
        <Typography style={{ fontFamily: 'Gummy' }} variant="h1" component="h1">
          Playlist Manager
        </Typography>
      </div>
      <div
        id="main-splash"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography style={{ fontFamily: 'Gummy' }} variant="h2" component="h2">
          Welcome !
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            onClick={handleLogin}
            style={{
              fontFamily: 'Gummy',
              width: '10em',
              height: '3em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight: 'bold',
              marginRight: '20px',
            }}
            variant="contained"
          >
            Login
          </Button>
          <Button
            onClick={handleRegister}
            style={{
              fontFamily: 'Gummy',
              width: '180px',
              height: '3em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight: 'bold',
            }}
            variant="contained"
          >
            Create Account
          </Button>
          <Button
            onClick={handleLogin}
            style={{
              fontFamily: 'Gummy',
              width: '10em',
              height: '3em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight: 'bold',
              marginLeft: '20px',
            }}
            variant="contained"
          >
            Admin Login
          </Button>
        </div>
      </div>
      <div className="splash-bottom">
        {/* <Typography  style={{fontFamily: "Gummy"}} className='splash-text' variant="h4" component="h2">
                Use Playlister to create,edit, and play playlists 
                as well as share playlists 
                so that others may then play and comment on them
            </Typography> */}
        {/* <Button  onClick={handleGuest} style={{fontFamily: "Gummy",width:'190px', height:'70px', color:'white' , backgroundColor:"black"}}variant="contained">Continue as Guest</Button> */}
      </div>
      <Copyright style={{ position: 'fixed', bottom: 0 }} />
         
    </div>
  );
}
