
import Fab from '@mui/material/Fab';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import './App.css';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import ChatBox from './ChatBox';

function App() {





  const [drawerState, setDrawerState] = useState(true);

  return (
    <div className='App'>
      <div className='Fab'>
        <Fab color="secondary" aria-label="add" onClick={() => setDrawerState(true)}>
          <SmartToyIcon />
        </Fab>
        <Drawer
          anchor="bottom"
          open={drawerState}
          onClose={() => setDrawerState(false)}
        >
          <ChatBox />
        </Drawer>

      </div>

    </div>
  );
}

export default App;
