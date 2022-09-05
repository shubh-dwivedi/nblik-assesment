import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

const HomePage = () => {
  const [lyrics, setLyrics] = useState([]);
  const [lyricsSearch, setlyricsSearch] = useState({
    songName: "",
    artistName: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // this function uses fetch api to get lyrics of song from the api
  const fetchLyrics = async () => {
    try {
      let track = lyricsSearch.songName;
      let artist = lyricsSearch.artistName;
      if (track && artist) { //checks if both song name and artist name is entered by user
        let url = `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?q_track=${track}&q_artist=${artist}&apikey=39de21a625434384c0200df4e4daf7e8`;
        const urlNew = `https://musicapitesting.shubhdwivedi1.repl.co/translate?text=${url}`; // this is proxy url used to overcome the CORS error given by browser for musixmatch api requests sent through localhost
        setError("");
        setLyrics([]);
        setLoading(true); // start loading bar
        const data = await fetch(urlNew);
        const dataParsed = await data.json();
        setLoading(false);
        if (dataParsed.message.header.status_code === 404) { // checking for 'not found' error
          setError(
            "Lyrics not found! Please check the artist name and song name & try again."
          );
          setLoading(false);
        } else {
          let dataLyrics = dataParsed.message.body.lyrics.lyrics_body;
          dataLyrics = dataLyrics.split("\n");
          setLyrics(dataLyrics); // update lyrics
          setLoading(false); // stop loading
        }
      } else {
        setError("Please enter song name and artist name to get lyrics!");
      }
    } catch (error) {
      console.log(error);
      setError("An Error has occured! Please try again later.");
      setLoading(false);
    }
  };

  // update songName and artistName
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setlyricsSearch({ ...lyricsSearch, [e.target.name]: e.target.value });
  };

  return (
    <Box component="main" sx={{ p: 0 }}>
      <Toolbar />
      <Typography
        component="h1"
        variant="h4"
        sx={{ textAlign: "center", fontFamily: "monospace" }}
      >
        Welcome to Lyrics Finder App
      </Typography>
      <Box sx={{ textAlign: "center" }} className="input-container">
        <TextField
          id="outlined-basic"
          label="Song Name"
          variant="outlined"
          className="input-field"
          name="songName"
          onChange={handleChange}
        />
        <TextField
          id="outlined-basic"
          label="Artist Name"
          variant="outlined"
          className="input-field"
          name="artistName"
          onChange={handleChange}
        />
        <Button
          onClick={() => {
            fetchLyrics();
          }}
        >
          Find Song Lyrics
        </Button>
      </Box>
      {loading && (
        <Box sx={{ width: "30%", margin: "2rem auto" }}>
          <LinearProgress />
        </Box>
      )} {/** The code below checks if there is no error message in error state variable. After that it checks if the lyrics array is not empty and then set and view lyrics on the output container. Lyrics is stored as an array after splitting by \n characters, So that each lyric could appear on new line automatically*/}
      {error ? (
        <Typography
          sx={{ textAlign: "center", fontSize: "1.5rem", color: "red" }}
        >
          {error}
        </Typography>
      ) : ( 
        lyrics.length > 0 && (
          <Box className="output-container">
            <Typography
              component="h1"
              variant="h4"
              sx={{ textAlign: "center" }}
            >
              ----- Lyrics of the Song -----
            </Typography>
            <Typography
              component={"div"}
              sx={{ textAlign: "center", fontSize: "1.25rem", padding: "1rem" }}
            >
              {lyrics.map((lyric) => {
                return <p>{lyric}</p>;
              })}
            </Typography>
          </Box>
        )
      )}
    </Box>
  );
};

export default HomePage;
