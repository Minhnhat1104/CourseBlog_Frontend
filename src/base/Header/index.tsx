import React, { useContext } from "react";

import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popover,
  Popper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import BackgroundLetterAvatars from "../components/BackgroundLetterAvatars";
const Header = () => {
  const { user, setUser } = useContext(UserContext);
  console.log("🚀 ~ file: index.tsx:25 ~ user:", user);

  const theme = useTheme();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<HTMLDivElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClickLogo = () => {
    navigate("/", {
      replace: true,
    });
  };

  const handleClickUserInfo = () => {
    navigate("/auth/user-info", {
      replace: true,
    });
  };

  const handleCickManageUser = () => {
    navigate("/auth/user-store", {
      replace: true,
    });
  };

  const handleLogOut = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/auth/sign-in", {
      replace: true,
    });
    handleClose();
  };

  // ================ handle not login ===========
  if (!user) {
    return (
      <>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ backgroundColor: theme.palette.grey[800] }}
          px={6}
          pt={1}
          pb={1}
        >
          <Typography
            color={theme.palette.common.white}
            onClick={handleClickLogo}
            sx={{ cursor: "pointer" }}
          >
            Courses Blog
          </Typography>

          <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              onClick={() => {
                navigate("/auth/sign-up", {
                  replace: true,
                });
              }}
            >
              Sign up
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/auth/sign-in", {
                  replace: true,
                });
              }}
            >
              Sign in
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ backgroundColor: theme.palette.grey[800] }}
        px={6}
        pt={1}
        pb={1}
      >
        <Typography
          color={theme.palette.common.white}
          onClick={handleClickLogo}
          sx={{ cursor: "pointer" }}
        >
          Courses Blog
        </Typography>
        <Box
          aria-describedby={id}
          onClick={handleClick}
          display="flex"
          alignItems="center"
          sx={{ cursor: "pointer" }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <BackgroundLetterAvatars name={user?.username || ""} />
            <Typography color={theme.palette.common.white}>
              {user?.username || ""}
            </Typography>
          </Stack>
          {open ? (
            <ArrowDropUpIcon sx={{ color: theme.palette.common.white }} />
          ) : (
            <ArrowDropDownIcon sx={{ color: theme.palette.common.white }} />
          )}
        </Box>
      </Stack>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuList
          autoFocusItem={open}
          id="composition-menu"
          aria-labelledby="composition-button"
          // onKeyDown={handleListKeyDown}
        >
          <MenuItem onClick={handleClickUserInfo}>Thông tin cá nhân</MenuItem>
          {user?.isAdmin && (
            <MenuItem onClick={handleCickManageUser}>
              Quản lý người dùng
            </MenuItem>
          )}
          <Divider />
          <MenuItem onClick={handleClickLogo}>Xem khóa học</MenuItem>

          <MenuItem
            onClick={() => {
              navigate("/course/store", {
                replace: true,
              });
              handleClose();
            }}
          >
            Quản lý khóa học
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate("/course/trash", {
                replace: true,
              });
              handleClose();
            }}
          >
            Thùng rác
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogOut}>Đăng xuất</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default Header;
