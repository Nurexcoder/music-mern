import { DataGrid } from "@mui/x-data-grid";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import { useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { baseUrl } from "../config";
import styled from "styled-components";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";

const Component = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 700px) {
    flex-direction: column-reverse;
    align-items: center;
    /* flex-direction: ce; */
    justify-content: center;
    width: 100%;
  } ;
`;
const CardContainer = styled(Box)`
  @media (min-width: 700px) {
    height: 30vh;
    padding: 1rem;
  }
  @media (max-width: 699px) {
    /* width: 70vw; */
  }
`;
export default function MusicList({ rows, getSong }) {
  const [pageSize, setPageSize] = useState(20);
  // const [rows, setRows] = useState([]);
  const [musicData, setMusicData] = useState("");
  const audioElement = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const theme = useTheme();

  const deleteSong = async (id) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };
      setOpenBackdrop(true);
      const jsonRes = await fetch(
        "http://localhost:5000/music/" + id,
        requestOptions
      );
      getSong();
      setOpenBackdrop(false);
      Swal.fire("Deleted", "Song deleted successfully", "success");
    } catch (error) {
      Swal.fire("Error occured", "Something went wrong", "error");
    }
  };

  const columns = [
    {
      field: "song",
      headerName: "Play",

      width: 80,
      renderCell: (data) => (
        <Button
          onClick={() => {
            console.log(data);
            setMusicData(data?.row);
            setIsPlaying(!isPlaying);
          }}
        >
          {data?.row === musicData ? <PauseCircleIcon /> : <PlayCircleIcon />}
        </Button>
      ),
    },
    { field: "name", headerName: "Song Name", width: 160 },
    { field: "artist", headerName: "Artist", width: 160 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "action",
      headerName: "Action",

      width: 160,
      renderCell: (data) => (
        <>
          <Button
            onClick={() => {
              deleteSong(data?.row.id);
            }}
          >
            <Delete />
          </Button>
          <Button
            onClick={() => {
              console.log(data);
              setMusicData(data?.row);
              setIsPlaying(!isPlaying);
            }}
          >
            <Edit />
          </Button>
        </>
      ),
    },
  ];

  // useEffect(() => {
  //   getSong();
  // }, []);
  useEffect(() => {
    if (isPlaying) {
      audioElement.current.play();
    } else {
      audioElement.current.pause();
    }
  }, [isPlaying, musicData]);
  console.log(musicData);
  return (
    <Component style={{ height: "90vh", width: "100%" }}>
      <DataGrid
        sx={{
          width: "100vw !important",
        }}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[20]}
        pagination
        columns={columns}
        rows={rows}
        // {...data}
      />
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column-reverse",
          width: "30%",
        }}
      >
        <CardContainer sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent>
            <Typography component="div" textAlign="center" variant="h5">
              {musicData?.name}
            </Typography>
            <Typography
              variant="subtitle1"
              color="text.secondary"
              component="div"
              textAlign="center"
            >
              {musicData?.artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
            <IconButton aria-label="previous">
              {theme.direction === "rtl" ? (
                <SkipNextIcon />
              ) : (
                <SkipPreviousIcon />
              )}
            </IconButton>
            <IconButton
              onClick={() => {
                setIsPlaying(!isPlaying);
              }}
              aria-label="play/pause"
            >
              {isPlaying ? (
                <PauseCircleIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayCircleIcon sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label="next">
              {theme.direction === "rtl" ? (
                <SkipPreviousIcon />
              ) : (
                <SkipNextIcon />
              )}
            </IconButton>
          </Box>
        </CardContainer>
        <CardMedia
          component="img"
          sx={{ width: 200, height: 200 }}
          image={musicData?.coverAlbum}
          alt="Live from space album cover"
        />
      </Card>
      <audio src={musicData?.song} ref={audioElement}></audio>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Component>
  );
}
