import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSignIn from "../../hooks/useSignIn";
import { UserContext } from "../../../base/App";
import useUserMutation from "../../hooks/useUserMutation";

const UserInfo = () => {
  const { user, setUser } = useContext(UserContext);
  const [getUser, setGetUser] = useState<Boolean>(false);
  const [loginData, setLoginData] = useState();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "fake password",
      phoneNumber: "",
    },
  });
  console.log("🚀 ~ file: index.tsx:27 ~ isDirty:", isDirty);
  useEffect(() => {
    if (user) {
      setValue("email", user?.email || "");
      setValue("username", user?.username || "");
      // setValue("password", user?.password || "");
      setValue("phoneNumber", user?.phoneNumber || "");
    }
  }, [user, setValue]);

  const { mUpdate } = useUserMutation();

  const onSubmit = (data: any) => {
    console.log("🚀 ~ file: index.tsx:40 ~ data:", data);
    const params = {
      ...data,
      id: user?._id,
    };
    mUpdate.mutate(params);
  };

  const handleClickSignIn = () => {
    navigate("/auth/sign-in", {
      replace: true,
    });
  };

  return (
    <Box
      sx={{ background: theme.palette.common.white }}
      p={2}
      width="fit-content"
      margin="auto"
    >
      <Stack spacing={1}>
        <Typography
          textAlign="center"
          fontSize={"1.2rem"}
          fontWeight={600}
          py={2}
        >
          User information
        </Typography>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Email
          </Typography>
          <TextField
            size="small"
            {...register("email")}
            variant="outlined"
            sx={{ width: 400 }}
            type="email"
          />
        </Box>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Username
          </Typography>
          <TextField
            size="small"
            {...register("username")}
            variant="outlined"
            sx={{ width: 400 }}
            disabled
          />
        </Box>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Password
          </Typography>
          <TextField
            size="small"
            {...register("password")}
            variant="outlined"
            sx={{ width: 400 }}
            type="password"
            disabled
          />
        </Box>
        <Box width="fit-content">
          <Typography variant="subtitle2" width="fit-content">
            Phone Number
          </Typography>
          <TextField
            size="small"
            {...register("phoneNumber")}
            variant="outlined"
            sx={{ width: 400 }}
            type="number"
          />
        </Box>
        <Button
          variant="contained"
          sx={{ borderRadius: "99px" }}
          onClick={() => handleSubmit((data: any) => onSubmit(data))()}
          disabled={!isDirty}
        >
          Update Information
        </Button>
      </Stack>
    </Box>
  );
};

export default UserInfo;
