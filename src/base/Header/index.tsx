import React from "react";

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
const Header = () => {
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
    navigate("/course", {
      replace: true,
    });
  };

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
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 30, height: 30 }}
              src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-1/311838825_631074391900861_3072429497901957907_n.jpg?stp=c0.67.200.200a_cp6_dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=7206a8&_nc_ohc=YrzZ6BPcQ8cAX_alGSp&_nc_ht=scontent.fsgn5-9.fna&oh=00_AfDn97xA0nvZosKeuvV3ekRAvOpAv102qyIDLzgOlBp5Iw&oe=644E2788"
            />
            <Typography color={theme.palette.common.white}>
              Jhonny Hồ
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
          <MenuItem onClick={handleClose}>Thông tin cá nhân</MenuItem>
          <Divider />
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
          <MenuItem onClick={handleClose}>Something 1</MenuItem>
          <MenuItem onClick={handleClose}>Something 2</MenuItem>
          <Divider />
          <MenuItem onClick={handleClose}>Đăng xuất</MenuItem>
        </MenuList>
      </Popover>
    </>
  );
};

export default Header;
