import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';

const HomePage = () => {
  const [lyrics, setLyrics] = useState([]);
  const [lyricsSearch, setlyricsSearch] = useState({songName: '', artistName: ''});
  const [error, setError] = useState('');
  const fetchLyrics = async ()=> {
    try {
      let track = lyricsSearch.songName;
      let artist =  lyricsSearch.artistName;
      // artist = artist.split(' ').join('%20');
      if(track && artist) {
        let url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=39de21a625434384c0200df4e4daf7e8`
        const url2 = `https://musicapitesting.shubhdwivedi1.repl.co/translate?text=${url}`

        const data = await fetch(url2);
        const dataParsed = await data.json();
        console.log(dataParsed);
        if(dataParsed.message.header.status_code === 404) {
          console.log('Error: ' + dataParsed.message.header.status_code + ' Song not found');
        } else {
          let dataLyrics = dataParsed.message.body.lyrics.lyrics_body;
          dataLyrics = dataLyrics.split('\n');
          setLyrics(dataLyrics);
          // console.log(dataLyrics);
          // setLyrics(dataParsed.message.body.lyrics.lyrics_body);
          // console.log(dataParsed.message.header.status_code);
          // console.log(dataParsed.message.body.lyrics.lyrics_body);
          setError("");
        }
      } else {
        setError('Please provide song and artist name to get lyrics!');
      }
      
        
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlyricsSearch({...lyricsSearch,[e.target.name]: e.target.value});
  }

  return (
    <Box component="main"  sx={{ p: 0, }}>
        <Toolbar />
        <Typography component="h1" variant="h4" sx={{ textAlign: 'center', }}>
          Welcome to Lyrics Finder App
        </Typography>
        <Box sx={{ textAlign: 'center', }} className='input-container'>
          <TextField id="outlined-basic" label="Song Name" variant="outlined" className='input-field' name='songName' onChange={handleChange}/>
          <TextField id="outlined-basic" label="Artist Name" variant="outlined" className='input-field' name='artistName' onChange={handleChange}/>
          <Button onClick={()=>{fetchLyrics()}}>Find Song Lyrics</Button>
        </Box>
        {error ? <Typography sx={{ textAlign: 'center', color: 'red'}}>{error}</Typography>
        : lyrics.length > 0 && <Box className='output-container'>
          <Typography component="h1" variant="h4" sx={{ textAlign: 'center', }}>
           ----- Lyrics of {lyricsSearch.songName} by {lyricsSearch.artistName} -----
          </Typography>
          <Typography component={"div"} sx={{textAlign: 'center', fontSize: '1.25rem', padding: '1rem'}}>
            {lyrics.map((lyric) => {
              return <p>{lyric}</p>
            })}
          </Typography>
        </Box>
        }
        
    </Box>
  )
}

export default HomePage