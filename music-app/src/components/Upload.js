import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
 
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { baseUrl } from "../config";
import { FileUploader } from "react-drag-drop-files";
const Component = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3786e5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  min-width: 360px;
  width: 50%;
  /* height: 584px; */
  overflow-y: auto;
  border-radius: 41px;
  background: #ffffff;
`;
const Upper = styled.div`
  margin-top: 15px;
  flex: 3;
  width: 100%;
  /* height: 100%; */
`;
const Welcome = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const H = styled.h1`
  margin: 10px 0;
`;
const Mgs = styled.span``;
const Lower = styled.div`
  margin-top: 20px;
  flex: 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  align-items: center;
  justify-content: center;
  /* padding: 20px 40px; */
`;
const InputField = styled(TextField)`
  width: 80%;
  margin: 10px 0 !important;
`;
const InputFieldPassword = styled(OutlinedInput)`
  /* width: 80%; */
  margin: 10px 0 !important;
`;
const SubmitButton = styled(Button)`
  width: 80%;
  margin: 20px 0 !important;
  height: 50px;
`;

const LowerMost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
const FileUpload = styled(FileUploader)`
  .dHGdru {
    min-width: 100px !important;
    width: 80%;
    margin: 100px !important;
  }
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 450,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const types = ["mp3"];

const Upload = ({ setIsLogin, handleModalClose, setUser, getSong, user }) => {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState({
    password: "",

    showPassword: false,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Hi");
      let files = [];
      files.push(e.target.song.files[0]);
      files.push(e.target.coverAlbum.files[0]);
      console.log(files);

      var tempData = new FormData();
      tempData.append("files", e.target.coverAlbum.files[0]);
      tempData.append("files", e.target.song.files[0]);
      tempData.append("name", e.target.name.value);
      tempData.append("artist", e.target.artist.value);
      tempData.append("description", e.target.description.value);

      setOpen(true);

      const resIni = await fetch(baseUrl + "/music", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.authToken,
        },
        body: tempData,
        redirect: "follow",
      });

      const res = await resIni.json();
      getSong();
      // console.log(resIni)
      setOpen(false);
      handleModalClose();
      if (resIni.status === 200) {
      }
    } catch (error) {
      console.log(error);
      setOpen(false);
      handleModalClose();
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  const handleFileChange = (file) => {
    console.log(file);
  };

  return (
    // <Component>
    <Form style={style} onSubmit={handleSubmit}>
      <Upper>
        <Welcome>
          <H>Welcome </H>
          <Mgs>Lets add a song</Mgs>
        </Welcome>
      </Upper>
      <Lower>
        <InputField placeholder="Name" name="name" required />
        <InputField placeholder="Artist" name="artist" required />
        <InputField
          multiline
          rows={2}
          placeholder="Description"
          name="description"
          required
        />
        <InputField
          type="file"
          placeholder="Album Cover"
          name="coverAlbum"
          accept="image/*"
          required
        />

        {/* <InputField type="file" placeholder="Song" name="song" /> */}
        <FileUpload
          sx={{
            width: "80%",
            minWidth: "100px !important",
          }}
          //   handleChange={handleFileChange}
          name="song"
          types={types}
          required
        />
        <SubmitButton type="submit" color="success" variant="contained">
          Submit
        </SubmitButton>
      </Lower>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Form>
    // </Component>
  );
};

export default Upload;
