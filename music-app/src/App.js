import logo from "./logo.svg";
import "./App.css";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useEffect, useState } from "react";
import MusicList from "./components/MusicList";
import Navbar from "./components/Navbar";
import { baseUrl } from "./config";
import styled from "styled-components";

const PleaseLogin = styled.div`
  height: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Text = styled.h2`
  margin: 0;
  font-size: 2rem;
  font-family: 'Courier New', Courier, monospace;
`;
const Image = styled.img``;
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
          description:music.description,
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
      {user ? (
        <MusicList
          user={user}
          setUser={setUser}
          getSong={getSong}
          rows={rows}
        />
      ) : (
        <PleaseLogin>
          <Text>Please Login first</Text>
          <Image src="/error.gif" />
        </PleaseLogin>
      )}
    </div>
  );
}

export default App;
