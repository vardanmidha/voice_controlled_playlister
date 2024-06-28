import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import Typography from '@mui/material/Typography'
import AppTools from './AppTools';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { VideoPlayer } from './VideoPlayer';
import { Comments } from './Comments';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { useHistory } from 'react-router-dom'
import MUIDeleteModal from './MUIDeleteModal';
import { ListArea } from './ListArea';
import MUIAccessErrorModal from './MUIAccessErrorModal'

const UserScreen = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#262626',
            darker: '#1565c0',
          },
        },
      });
    const { store } = useContext(GlobalStoreContext);
    const [playerVariant, setPlayerVariant] = useState("contained");
    const [commentsVariant, setCommentsVariant] = useState("outlined");
    store.history = useHistory();

    useEffect(() => {
      store.LoadPublishedPlaylists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.search]);


    let togglePlayer = ()=>{
            setPlayerVariant("contained");
            setCommentsVariant("outlined");
           
    }
    let toggleComments =()=>{
            setPlayerVariant("outlined");
            setCommentsVariant("contained");
    }


    return (
        <div id="home-screen">
            <AppTools published={true}/>
            <div className="home-main">
                <ListArea parent={"UserScreen"}/>
                <div className='player-comments'>
                <ButtonGroup className='buttonGroup'>
                <ThemeProvider theme={theme}>
                    <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                    <Button onClick={toggleComments} color="primary" variant={commentsVariant}>Comments</Button>
                    </ThemeProvider>
                </ButtonGroup>
                <VideoPlayer selection={playerVariant}/>
                <Comments selection={commentsVariant}/>
                </div>
                
            </div>

            <div className="">
                <Typography style={{fontFamily: "Gummy"}} variant="h2"> {store.search} Lists</Typography>
            </div>
            <MUIDeleteModal/>
            <MUIAccessErrorModal/>
        </div>)
}



export default UserScreen;