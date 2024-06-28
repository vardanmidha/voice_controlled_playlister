import React, { useContext, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import StyledMenu from './StyledMenu';
import TextField from '@mui/material/TextField';
import { Button, IconButton } from '@mui/material';
import { GlobalStoreContext } from '../store';
import AuthContext from '../auth';
import { Link } from 'react-router-dom';

export default function AppTools(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { published } = props;

  // const Dropdown = () => {
   const [selectedValue, setSelectedValue] = useState("");
    
   const handleChange = (event) => {
    setSelectedValue(event.target.value);
    switch(event.target.value) {
      case 'option1':
        window.location.assign('/Playlister/spellCheck/');
        break;
      case 'option2':
        window.location.assign('/Playlister/apiKey/');
        break;
      case 'option3':
        window.location.assign('/Playlister/system/');
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentScreen]);


  

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));
let handleSpell = ()=>{<Link
  style={{textDecoration:"none",color:"white",backgroundColor:"#595959"}}
    
    to="/Playlister/spellCheck/"
 />
}

let handleVoice = ()=>{<Link
  style={{textDecoration:"none",color:"white",backgroundColor:"#595959"}}
    
    to="/Playlister/voiceSearch/"
 />
}

const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick2 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


let Items = 
    <div>
      <Link to="/Playlister/spellCheck/">
      <MenuItem style={{
              fontFamily: 'Gummy',
              width: '100%',
              height: '30%',
              color: 'white',
              backgroundColor: '#363535',
              textDecoration:"none"
            }} onClick={handleSpell} disableRipple>
    Spell Check
    </MenuItem>
    </Link>
    
    {/* <Divider sx={{ my: 0 }} /> */}
    <Link to="/Playlister/voiceSearch/">
    <MenuItem style={{
              fontFamily: 'Gummy',
              width: '100%',
              height: '30%',
              color: 'white',
              backgroundColor: '#363535'
            }}onClick={handleVoice} disableRipple>
    Voice Search
    </MenuItem>
    </Link>
    </div>;
  const handleSearch = (event) => {
    if (event.key === 'Enter') { 
      store.setSearch(event.target.value);
    }
  };
    const [isOpen, setIsOpen] = useState(false);
  
    const handleDrop = () => {
      setIsOpen(!isOpen);
    };
  let handleAllListScreen = () => {
    store.setScreen('AllListScreen');
  };

  let handleHomeScreen = () => {
    store.setHomeScreen('HomeScreen');
  };

  let handleUserScreen = () => {
    store.setScreen('UserScreen');
  };
  const [displayArea, setDisplayArea] = useState('');
  const [displayArea1, setDisplayArea1] = useState('');
  const [inputField, setInputField] = useState('');
  const synth = window.speechSynthesis;
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };
  
  const [text, setText] = useState('');

  const handleClick1 = () => {
    console.log(text);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleClick = () => {
    //setDisplayArea(`Hi, this is ${inputField}`);
    let greeting;
let extra1;
const currentDate = new Date();
const currentHour = currentDate.getHours();
// const userName1 = prompt("Enter  user name:");
if (currentHour >= 5 && currentHour < 12) {
greeting = "Good Morning!"+text;
extra1="Have a great day";
speak(greeting);
speak(extra1);
// speak(`${userName1}`)
} else if (currentHour >= 12 && currentHour < 17) {
greeting = "Good Afternoon!"+text;
extra1="How as your morning" 
speak(greeting);
speak(extra1);
// speak(`${userName1}`)
} else if (currentHour >= 17 && currentHour < 21) {
greeting = "Good Evening!"+text;
extra1="Are you tired, wanna play spellcheck";
speak(greeting);
speak(extra1);
// speak(`${userName1}`)
} else {
greeting = "Good Night!"+text;
speak(greeting);
extra1="How was your day"
speak(extra1);
// speak(`${userName1}`)
}
// document.body.appendChild(inputField); 
// document.body.appendChild(displayButton);
// document.body.appendChild(displayArea); 
// document.body.appendChild(displayArea1);

    //setDisplayArea1(greeting + ` ${inputField}`);
  };


  return (
    <Box style={{color:"black"}}>
      <AppBar position="static" style={{color:"black"}}>
        <Toolbar id="AppTools" style={{color:"black"}}>
          <div className="tool-icons">
            <IconButton
              onClick={handleAllListScreen}
              color={
                store.currentScreen === 'AllListScreen' ? 'success' : 'default'
              }
              aria-label="all-list"
            >
              {/* <Groups3Icon /> */}
              <PeopleRoundedIcon />
              
            </IconButton>

            <IconButton
              onClick={handleHomeScreen}
              color={
                store.currentScreen === 'HomeScreen' ? 'success' : 'default'
              }
              disabled={!auth.loggedIn}
              aria-label="home"
            >
              {/* <PersonIcon /> */}
              <AccountBoxRoundedIcon />
            </IconButton>

            
          </div>
          <TextField className="search-bar"
            margin="normal"
            id="search"
            label="Search..."
            name="search"
            defaultValue={''}
            color={'success'}
            onKeyPress={handleSearch}
            style={{marginRight: '400px',border: '1px solid #181515'}}
          />


     <input type="text" placeholder='&nbsp;Name...' value={text} onChange={handleTextChange} style={{
              fontFamily: 'Gummy',
              width: '6em',
              height: '1.5em',
              color: '#00334d',
              backgroundColor: '#f2f2f2',
              fontWeight:'bold'
            }}/>
      <button onClick={handleClick}
      style={{
        fontFamily: 'Gummy',
        width: '6em',
        height: '2em',
        color: '#00334d',
        backgroundColor: '#f2f2f2',
        fontWeight:'bold'
      }}>Greetings</button>
{/*           
          <StyledMenu published={published} /> */}


          <div className="dropdown-container">
          {/* <Button
        style={{
          fontFamily: 'Gummy',
          width: '100%',
          height: '20%',
          color: '#00334d',
          backgroundColor: '#f2f2f2',
          fontWeight:'bold',
          border:"1px solid black"
              
        }}
        onClick={handleDrop}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Search
      </Button>
      {isOpen && (
        <ul className="dropdown-list">
          <Link
        style={{textDecoration:"none",color:"white",backgroundColor:"#595959"}}
          
          to="/Playlister/spellCheck/"
        >
          SpellCheck
        </Link>
        <hr></hr>
        <Link
        style={{textDecoration:"none",color:"white",backgroundColor:"#595959"}}
          
          to="/Playlister/voiceSearch/"
        >
          VoiceSearch
        </Link>
        </ul>
      )} */}

<Button
        style={{
          fontFamily: 'Gummy',
          width: '100%',
          height: '20%',
          color: '#00334d',
          backgroundColor: '#f2f2f2',
          fontWeight:'bold',
          border:"1px solid black"
              
        }}
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick2}
        endIcon={<KeyboardArrowDownIcon />}
      >
        Search
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {Items}
      </StyledMenu>
    </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
         

}
