import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store';
import { useHistory } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function AppBanner() {
  const { auth } = useContext(AuthContext);
  const { store } = useContext(GlobalStoreContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  store.history = useHistory();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    auth.logoutUser();
    store.clearTransaction();
  };

  const menuId = 'primary-search-account-menu';
  const loggedOutMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        style={{ backgroundColor: '#595959' }}
        onClick={handleMenuClose}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#595959',
          }}
          onClick={() => {
            store.setScreen('HomeScreen');
          }}
          to="/login/"
        >
          Login
        </Link>
      </MenuItem>
      <MenuItem
        style={{ backgroundColor: '#595959' }}
        onClick={handleMenuClose}
      >
        <Link
          style={{
            textDecoration: 'none',
            color: 'white',
            backgroundColor: '#595959',
          }}
          onClick={() => {
            store.setScreen('HomeScreen');
          }}
          to="/register/"
        >
          Create New Account
        </Link>
      </MenuItem>
    </Menu>
  );
  const loggedInMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem style={{ textDecoration: 'none' }} onClick={handleLogout}>
        Logout
      </MenuItem>
    </Menu>
  );
  let menu = loggedOutMenu;
  if (auth.loggedIn) {
    menu = loggedInMenu;
  }

  function getAccountMenu(loggedIn) {
    let userInitials = auth.getUserInitials();
    if (loggedIn) return <div>{userInitials}</div>;
    else return <AccountCircle />;
  }

  return (
    <Box style={{ fontFamily: 'Gummy', backgroundColor: 'white' }}>
      <AppBar
        style={{
          backgroundColor: '#678983',
          fontFamily: 'Gummy',
          backgroundColor: '#595959',
          // backgroundImage: "url(https://cdn.wallpapersafari.com/21/34/ta5xgS.jpg)",
          marginBottom: '3px',
        }}
        position="static"
      >
        <Toolbar>
          <Link
            style={{ textDecoration: 'none' }}
            to={auth.loggedIn ? '/Playlister/' : '/'}
          >
            <Box className="logo">
              <img
                src="/brane1.png"
                style={{ height: '40px', borderRadius: '500px' }}
              />
              <Typography
                style={{
                  fontFamily: 'Gummy',
                  color: 'white',
                  fontWeight: 'bold',
                }}
                variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: 'none', sm: 'block' } }}
              >
                &nbsp;&nbsp;Voice controlled Video Playlister
              </Typography>
            </Box>
          </Link>

          <Box sx={{ flexGrow: 1 }}></Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {getAccountMenu(auth.loggedIn)}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {menu}
    </Box>
  );
}
