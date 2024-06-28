import React, { useContext, useEffect,useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Typography from '@mui/material/Typography'
import AppTools from './AppTools';
import { ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { VideoPlayer } from './VideoPlayer';
import { Comments } from './Comments';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import { WorkspaceScreen } from '.';
import PublishedCard from './PublishedCard';
import { useHistory } from 'react-router-dom'
import PublishedArea from './PublishedArea';
import MUIDeleteModal from './MUIDeleteModal';
import ErrorBoundary from './ErrorBoundary'
import MUIAccessErrorModal from './MUIAccessErrorModal'



const HomeScreen = () => {
    const theme = createTheme({
        palette: {
          primary: {
            main: '#000000',
            darker: '#1565c0',
          },
        },
      });
      
    const { store } = useContext(GlobalStoreContext);
    const [playerVariant, setPlayerVariant] = useState("contained");
    const [commentsVariant, setCommentsVariant] = useState("outlined");
    const [expanded, setExpanded] = useState(false);
    store.history = useHistory();
      console.log(store)
    useEffect(() => {
      store.scrollUp('scroll-list');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.playlists?store.playlists.length: '']);

    useEffect(() => {
      store.LoadPlaylists();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.search,store.currentList? store.currentList._id:'']);


    /// Accordion 
    const handleChange = (panel,id) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      store.clearTransaction();
      if(!store.currentList || store.currentList._id!== id){
        store.setCurrentList(id);
      }
    
    };

    function handleCreateNewList(event) {
        setExpanded('panel');
        store.createNewList();
     
    }

    let togglePlayer = ()=>{
            setPlayerVariant("contained");
            setCommentsVariant("outlined");
           
    }
    let toggleComments =()=>{
            setPlayerVariant("outlined");
            setCommentsVariant("contained");
    }

    //// Editing Functions 
        
    let Lists = "";
  
    if (store.playlists) {
        /// Search by PlaylistName
        let playlists=store.playlists;
        if(store.search && store.search!==""){
           playlists= playlists.filter( list => list.name.startsWith(store.search));
        }
        // Sorting
        switch (store.sortMethod) {
            case 'Name':
              playlists=store.SortName(playlists);
              break;
            case 'CreationDate':
                playlists=store.SortCreationDate(playlists);
                break;
            case 'LastEditDate':
              playlists=store.SortLastEdit(playlists);
              break;
              
            default:
             
        }
 

        Lists = 
        <List  sx={{width: '90%', left: '5%'}}>
        {
                playlists.map((list) => (
            <Accordion 
        
            key={list._id} id='user-list' 
            style={{backgroundColor: store.currentList && store.currentList._id===list._id? '#666666': list.published? '#4d4d4d':'#cccccc' , color:'black'}}
            expanded={store.currentList && store.currentList._id === list._id ?(expanded === 'panel' ):false}
            onChange={handleChange('panel',list._id)}
            
            >

              <AccordionSummary
               style={{display:'flex' , alignItems:'flex-end'}} 
              expandIcon={<KeyboardDoubleArrowDownIcon style={{marginBottom:'1rem', fontSize:'24pt'}}/>}
              aria-controls="panel1bh-content"
              id="panel1bh-header">
                {list.published ? <PublishedCard key={list._id} List={list} />: <ListCard  key={list._id} List={list} />}
              </AccordionSummary>
        
              <AccordionDetails>
                    {list.published ? <PublishedArea userName={list.owner} key={list._id} id={list._id}/>: <WorkspaceScreen key={list._id} id={list._id}/>}
              </AccordionDetails>

            </Accordion>
            ))
       }
    </List>
    }
   
    return (
        <div id="home-screen">
            <AppTools published={false}/>
            <div className="home-main">
              
                <div id="scroll-list" className='list-area'>
                    {Lists}
                </div>

                <div className='player-comments'>
                <ButtonGroup className='buttonGroup'>
                <ThemeProvider theme={theme}>
                    <Button onClick={togglePlayer} color="primary"  variant={playerVariant} >Player</Button>
                    <Button onClick={toggleComments} disabled={!store.currentList || (store.currentList && !store.currentList.published)} color="primary" variant={commentsVariant}>Comments</Button>
                </ThemeProvider>
                </ButtonGroup>
                  <VideoPlayer selection={playerVariant}/>
                  <Comments selection={commentsVariant}/>
                </div>
                
            </div>


            <div style={{marginTop:'4rem'}} className="home-footer">
            <Fab 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab>
                <Typography style={{fontFamily: "Gummy", marginLeft:"1rem"}} variant="h2">Your Lists</Typography>
              
            
               
          
            </div>

         
            <MUIDeleteModal/>
            
            <MUIAccessErrorModal/>
           
        </div>
        )
}







export default HomeScreen;