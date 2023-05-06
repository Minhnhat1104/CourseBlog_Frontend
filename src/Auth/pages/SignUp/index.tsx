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

const SignUp = () => {
  const { user, setUser } = useContext(UserContext);
  const [getUser, setGetUser] = useState<Boolean>(false);
  const [loginData, setLoginData] = useState();
  const theme = useTheme();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      phoneNumber: "",
    },
  });
  console.log("🚀 ~ file: index.tsx:37 ~ watch:", watch());

  const { mAdd } = useUserMutation();

  const onSubmit = (data: any) => {
    mAdd.mutate(data, {
      onSuccess: () => {
        navigate("/auth/sign-in");
      },
    });
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
          Sign Up To Course Studio
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
        >
          Sign Up
        </Button>
        <Stack direction="row" spacing={1}>
          <Typography variant="subtitle2">Do not have account?</Typography>{" "}
          <Typography
            variant="subtitle2"
            color={theme.palette.primary.main}
            sx={{ cursor: "pointer" }}
            onClick={handleClickSignIn}
          >
            Sign In
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignUp;
