import { useContext,useState } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';



function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const {id} = props;
    
    function handleUndo(event) {
        event.stopPropagation();
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation();
        store.redo();
    }
    function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }
    function handlePublishList(event,id) {
        event.preventDefault();
        event.stopPropagation();
        store.publishList(id);
    }

    async function handleDuplicate(event, id) {
        event.stopPropagation();
        store.duplicate(id,false);
    }

    return (
        <div id="edit-toolbar">
            <div> 
                <Button 
                    style={{backgroundColor:'#262626',color:'white'}}
                    disabled={!store.canUndo()}
                    id='undo-button'
                    onClick={handleUndo}
                    variant="contained">
                        <UndoIcon  />
                </Button>

                <Button 
                    style={{backgroundColor:'#262626',color:'white'}}
                    disabled={!store.canRedo()}
                    id='redo-button'
                    onClick={handleRedo}
                    variant="contained">
                        <RedoIcon />
                </Button>
            </div>
            
            <div> 
                <Button 
                style={{backgroundColor:'#262626'}}
                variant="contained"
                onClick={(event) => {
                    handlePublishList(event,id)
                }} 
                aria-label='publish'>
                    <PublishIcon style={{fontSize:'22pt'}} />
                </Button>
            
                <Button 
                style={{backgroundColor:'#262626'}}
                variant="contained"
                onClick={(event) => {
                            handleDeleteList(event,id)
                        }} 
                aria-label='delete'>
                    <DeleteIcon style={{fontSize:'22pt'}} />
                </Button>

                <Button
                style={{backgroundColor:'#262626'}}
                variant="contained"
                onClick={(event) => {
                            handleDuplicate(event,id)
                        }} 
                aria-label='duplicate'>
                    <ContentCopyIcon style={{fontSize:'22pt'}} />
                </Button>
            </div>   
        </div>
    )
}

export default EditToolbar;