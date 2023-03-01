import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";
import styled from "styled-components";
import { useState } from "react";
import LoginPage from "./LoginPage";
import Modal from "@mui/material/Modal";
import Signup from "./SignUp";
import Upload from "./Upload";

const LogoDiv = styled.h1`
  color: white;
  margin: 0;
  font-family: sans-serif;
`;
const ActionControler = styled.div``;

export default function Navbar({ user, setUser, getSong }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const [isLogin, setIsLogin] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const handleUploadModalOpen = () => setOpenUploadModal(true);
  const handleUploadModalClose = () => setOpenUploadModal(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    localStorage.clear();
    window.location.reload(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          height: "10vh",
          background: "#39555c",
          padding: "0 1rem",
        }}
      >
        <LogoDiv>Music Player</LogoDiv>
        <ActionControler>
          {!user ? (
            <Button onClick={() => handleModalOpen()} sx={{ minWidth: 100 }}>
              Sign In
            </Button>
          ) : (
            <>
              <Button sx={{ minWidth: 100 }} onClick={handleUploadModalOpen}>
                Upload
              </Button>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {user?.name[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </>
          )}
        </ActionControler>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {isLogin ? (
          <LoginPage
            setUser={setUser}
            setIsLogin={setIsLogin}
            handleModalClose={handleModalClose}
          />
        ) : (
          <Signup
            setIsLogin={setIsLogin}
            setUser={setUser}
            handleModalClose={handleModalClose}
          />
        )}
      </Modal>
      <Modal
        open={openUploadModal}
        onClose={handleUploadModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Upload
          setUser={setUser}
          user={user}
          setIsLogin={setIsLogin}
          handleModalClose={handleUploadModalClose}
          getSong={getSong}
        />
      </Modal>
    </>
  );
}
