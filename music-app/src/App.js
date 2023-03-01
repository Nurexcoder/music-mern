import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import MusicList from "./components/MusicList";
import Navbar from "./components/Navbar";
import { baseUrl } from "./config";

function App() {
  const [user, setUser] = useState();
  const [rows, setRows] = useState([]);
  const getSong = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + user.authToken);

      const res = await fetch(baseUrl + "/music", {
        method: "GET",
        headers: myHeaders,
      });
      const data = await res.json();
      let newData = [];
      data?.map((music) => {
        newData.push({
          name: music.name,
          song: music.song,
          artist: music.artist,
          coverAlbum: music.coverAlbum,
          id: music._id,
        });
      });
      setRows(newData);

      console.log(data);
    } catch (error) {}
  };
  useEffect(() => {
    const tempUser = localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null;
    setUser(tempUser);
  }, []);
  useEffect(() => {
    if (user) getSong();
  }, [user]);

  return (
    <div>
      <Navbar user={user} setUser={setUser} getSong={getSong} />
      <MusicList user={user} setUser={setUser} getSong={getSong} rows={rows} />
    </div>
  );
}

export default App;
