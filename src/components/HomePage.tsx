import React from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const HomePage = () => {
  

  return (
    <Box component="main"  sx={{ p: 0, }}>
        <Toolbar />
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center', }}>
          Welcome to lyrics finder
        </Typography>
        <Box sx={{ textAlign: 'center', }} className='input-container'>
          <TextField id="outlined-basic" label="Song Name" variant="outlined" className='input-field'/>
          <TextField id="outlined-basic" label="Artist Name" variant="outlined" className='input-field'/>
          <Button sx={{}}>Find Song Lyrics</Button>
        </Box>
        <Box >
        <Typography>
          Result will be shown here
        </Typography>
        </Box>
    </Box>
  )
}

export default HomePage