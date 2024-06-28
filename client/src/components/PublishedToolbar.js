import { useContext, useEffect } from 'react';
import { GlobalStoreContext } from '../store';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import AuthContext from '../auth';

function PublishedToolbar(props) {
  const { store } = useContext(GlobalStoreContext);
  const { auth } = useContext(AuthContext);
  const { id, userName } = props;

  useEffect(() => {
    store.LoadPublishedPlaylists();
    auth.getLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleDeleteList(event, id) {
    event.stopPropagation();
    store.markListForDeletion(id);
  }

  function handleDuplicate(event, id) {
    event.stopPropagation();
    store.duplicate(id, true);
  }
  let u = '';
  if (auth.user) {
    u = auth.user.userName;
  }
  return (
    <div style={{ alignSelf: 'flex-end' }}>
      <Button
        disabled={userName !== u}
        style={{ backgroundColor: '#262626' }}
        variant="contained"
        onClick={(event) => {
          handleDeleteList(event, id);
        }}
        aria-label="delete"
      >
        <DeleteIcon style={{ fontSize: '22pt' }} />
      </Button>

      <Button
        disabled={!auth.loggedIn}
        style={{ backgroundColor: '#262626' }}
        variant="contained"
        onClick={(event) => {
          handleDuplicate(event, id);
        }}
        aria-label="duplicate"
      >
        <ContentCopyIcon style={{ fontSize: '22pt' }} />
      </Button>
    </div>
  );
}

export default PublishedToolbar;
