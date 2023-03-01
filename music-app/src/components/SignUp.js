import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Button,
  CircularProgress,
  IconButton,
  Input,
  InputAdornment,
  OutlinedInput,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { baseUrl } from "../config";

const Component = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #3786e5;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  width: 391px;
  height: 584px;
  border-radius: 41px;
  background: #ffffff;
`;
const Upper = styled.div`
  margin-top: 30px;
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
const H = styled.h1``;
const Mgs = styled.span``;
const Lower = styled.div`
  margin-top: 60px;
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
  width: 80%;
  margin: 10px 0 !important;
`;
const SubmitButton = styled(Button)`
  width: 80%;
  margin: 10px 0 !important;
  height: 50px;
`;

const LowerMost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 0;
`;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Signup = ({ setIsLogin, handleModalClose, setUser }) => {
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
      if (e.target.password.value.length <= 6) {
        handleModalClose();
        Swal.fire(
          "Short password",
          "Please enter a password atleast consist of 6 character",
          "warning"
        );
        return;
      }
      console.log("Hi")

      setOpen(true);

      const resIni = await fetch(baseUrl + "/auth/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: e.target.email.value,
          password: e.target.password.value,
          name: e.target.name.value,
        }),
        redirect: "follow",
      });

      const res = await resIni.json();
      // console.log(resIni)
      setOpen(false);
      handleModalClose();
      if (resIni.status === 200) {
        setUser(res);
        localStorage.setItem("user", JSON.stringify(res));

        return;
      }
      if (resIni.status === 401) {
        Swal.fire("Incoorect", "Incoorect  password or Username", "waning");
      }
    } catch (error) {
      console.log(error)
      setOpen(false);
      // if (error.response.status === 400) {
      //   Swal.fire("Incoorect  ", "Incoorect  password or Username", "error");
      //   return;
      // }
      handleModalClose();
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    // <Component>
    <Form style={style} onSubmit={handleSubmit}>
      <Upper>
        <Welcome>
          <H>Welcome </H>
          <Mgs>Create a account to continue</Mgs>
        </Welcome>
      </Upper>
      <Lower>
        <InputField placeholder="Name" name="name" />
        <InputField placeholder="Email" name="email" />
        <InputFieldPassword
          id="outlined-adornment-password"
          name="password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={(e) => handleChange(e)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {values.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          placeholder="Password"
        />
        <SubmitButton type="submit" color="success" variant="contained">
          Submit
        </SubmitButton>
      </Lower>
      <LowerMost>
        Already have a account
        <Button
          sx={{
            m: "0",
            p: "0",
          }}
          onClick={() => setIsLogin(true)}
        >
          Click here
        </Button>
      </LowerMost>
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

export default Signup;
